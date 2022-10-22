import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const userEdit = createAsyncThunk(
  `userEdit`,
  async (value: any, {rejectWithValue}) => {
    try {
      console.log('userEdit', value.userId)

      const response = await api.patch(`/users/${value.userId}`, value.user, { 
        headers: { 'x-access-token': value.token } 
        });

      console.log('userEdit', response)
      return response.data;
    } catch (err: any) {
      const resp = err?.response;
      return rejectWithValue(resp.data?.message);
    }
  },
);

const initialState: any = {
  user: null,
  error: null,
  status: "idle",
}

const userEditSlice = createSlice({
  name: "userEdit",
  initialState,
  extraReducers: (builder) => {
    builder.addCase( userEdit.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase( userEdit.fulfilled,
      (state, { payload }) => {
        state.user = payload      
        state.status = "editado";
      });

    builder.addCase( userEdit.rejected,
      (state, { payload }) => {
        if (payload)
          state.error = payload;
          state.status = "error";
      });
  },
  reducers: {
  },
});


export default userEditSlice.reducer;

