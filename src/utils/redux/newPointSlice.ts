import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import jwt_decode from "jwt-decode";


export const newPointAction = createAsyncThunk(
  `newPoint`,
  async (value: any , {rejectWithValue}) => {
    try {
      const response = await api.post(`/points`, {
        title: value.title,
        description: value.description,
        coord: value.coord,
        image: value.image,
        type: value.type,
        idUser: value.idUser
      },{ 
        headers: { 'x-access-token': value.token } 
        }
      );

      return response.data;
    } catch (err: any) {
      const resp = err?.response;
      return rejectWithValue(resp.data?.message);
    }
  },
);

const initialState: any = {
  point: null,
  token: null,
  error: null,
  status: null,
}

const newPointSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase( newPointAction.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase( newPointAction.fulfilled,
      (state, { payload }) => {
        if(payload){
          state.status = "create Point ok";
          state.error = null;
          return state

        }else{
          return state
        }
        
      });

    builder.addCase( newPointAction.rejected,
      (state, { payload }) => {
        if (payload)
          state.error = payload;
          state.status = "error";
      });
  },
  reducers: {
  },
});


export default newPointSlice.reducer;

