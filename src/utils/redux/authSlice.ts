import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import jwt_decode from "jwt-decode";


export const authAction = createAsyncThunk(
  `auth`,
  async (value: any , {rejectWithValue}) => {
    try {
      const response = await api.post(`/login`, {
        email: value.email,
	      password: value.password
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
  token: null,
  error: null,
  status: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase( authAction.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase( authAction.fulfilled,
      (state, { payload }) => {
        const userToken =  jwt_decode(payload.token);
        if(payload && userToken){
          console.log('j23232323232ondojnsfojndjnsdkjknsd')

          state.user = payload;
          state.status = "auth";
          state.error = null;
          

        }else{

          console.log('jondojnsfojndjnsdkjknsd')
          return state
        }
        
      });

    builder.addCase( authAction.rejected,
      (state, { payload }) => {
        if (payload)
          state.error = payload;
          state.status = "error";
      });
  },
  reducers: {
  },
});


export default authSlice.reducer;

