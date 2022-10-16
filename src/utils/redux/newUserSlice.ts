import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import jwt_decode from "jwt-decode";


export const createUserAction = createAsyncThunk(
  `newUser`,
  async (value: any , {rejectWithValue}) => {
    try {
      const response = await api.post(`/users`, {
        email: value.email,
	    password: value.password,
	    cpf: value.cpf,
	    name: value.name
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

const newUserSlice = createSlice({
  name: "newUser",
  initialState,
  extraReducers: (builder) => {
    builder.addCase( createUserAction.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase( createUserAction.fulfilled,
       (state, { payload }) => {
          state.user = 'create';
          state.status = 'create sucess';
        return state;
        
      });

    builder.addCase( createUserAction.rejected,
      (state, { payload }) => {
        if (payload)
          state.error = payload;
          state.status = "error";
      });
  },
  reducers: {
  },
});


export default newUserSlice.reducer;

