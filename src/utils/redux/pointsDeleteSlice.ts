import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const deletePoints = createAsyncThunk(
  `pointDelete`,
  async (value: any, {rejectWithValue}) => {
    try {

      const response = await api.delete(`/points/${value.pointId}`, { 
        headers: { 'x-access-token': value.token } 
        });

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

const pointsDeleteSlice = createSlice({
  name: "pointDelete",
  initialState,
  extraReducers: (builder) => {
    builder.addCase( deletePoints.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase( deletePoints.fulfilled,
      (state, { payload }) => {
        state.status = "excluido";
      });

    builder.addCase( deletePoints.rejected,
      (state, { payload }) => {
        if (payload)
          state.error = payload;
          state.status = "error";
      });
  },
  reducers: {
  },
});


export default pointsDeleteSlice.reducer;

