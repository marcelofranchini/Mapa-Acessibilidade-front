import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import api from "../api";

export const userDelete = createAsyncThunk(
  `userDelete`,
  async (value: any, {rejectWithValue}) => {
    try {

      const response = await api.delete(`/users/${value.userId}`, { 
        headers: { 'x-access-token': value.token } 
        });

      console.log('delete', response)
      return response.data;
    } catch (err: any) {
      const resp = err?.response;
      return rejectWithValue(resp.data?.message);
    }
  },
);

const initialState: any = {
  error: null,
  status: "idle",
}

const userDeleteSlice = createSlice({
  name: "userDelete",
  initialState,
  extraReducers: (builder) => {
    builder.addCase( userDelete.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase( userDelete.fulfilled,
      (state, { payload }) => {
        state.status = "excluido";
        storage.removeItem('persist:root')

      });

    builder.addCase( userDelete.rejected,
      (state, { payload }) => {
        if (payload)
          state.error = payload;
          state.status = "error";
      });
  },
  reducers: {
  },
});


export default userDeleteSlice.reducer;

