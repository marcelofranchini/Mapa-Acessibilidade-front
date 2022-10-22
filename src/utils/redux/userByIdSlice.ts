import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const getUser = createAsyncThunk(
  `getUser`,
  async (value: any, {rejectWithValue}) => {
    try {
      const response = await api.get(`/users/${value.userId}`,  { 
        headers: { 'x-access-token': value.token as string} 
        });
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

const getUserSlice = createSlice({
  name: "getUser",
  initialState,
  extraReducers: (builder) => {
    builder.addCase( getUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase( getUser.fulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.status = "ok";
      });

    builder.addCase( getUser.rejected,
      (state, { payload }) => {
        if (payload)
          state.error = payload;
        state.status = "idle";
      });
  },
  reducers: {
  },
});


export default getUserSlice.reducer;

