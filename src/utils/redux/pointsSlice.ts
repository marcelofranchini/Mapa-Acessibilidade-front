import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const getPoints = createAsyncThunk(
  `pontos`,
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get(`/points`);
      return response.data;
    } catch (err: any) {
      const resp = err?.response;
      return rejectWithValue(resp.data?.message);
    }
  },
);

const initialState: any = {
  list: [],
  error: null,
  status: "idle",
}

const pointsSlice = createSlice({
  name: "point",
  initialState,
  extraReducers: (builder) => {
    builder.addCase( getPoints.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase( getPoints.fulfilled,
      (state, { payload }) => {
        state.list = [...payload];
        state.status = "idle";
      });

    builder.addCase( getPoints.rejected,
      (state, { payload }) => {
        if (payload)
          state.error = payload;
        state.status = "idle";
      });
  },
  reducers: {
  },
});


export default pointsSlice.reducer;

