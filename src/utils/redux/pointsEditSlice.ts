import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const editPoints = createAsyncThunk(
  `editPoints`,
  async (value: any, {rejectWithValue}) => {
    try {

      const response = await api.patch(`/points/${value.pointId}`, value.point, { 
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

const pointsEditSlice = createSlice({
  name: "editPoint",
  initialState,
  extraReducers: (builder) => {
    builder.addCase( editPoints.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase( editPoints.fulfilled,
      (state, { payload }) => {
        state.status = "excluido";
      });

    builder.addCase( editPoints.rejected,
      (state, { payload }) => {
        if (payload)
          state.error = payload;
          state.status = "error";
      });
  },
  reducers: {
  },
});


export default pointsEditSlice.reducer;

