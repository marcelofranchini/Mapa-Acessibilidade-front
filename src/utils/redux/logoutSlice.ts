import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import api from "../api";
import jwt_decode from "jwt-decode";
import storage from "redux-persist/es/storage";


export const logoutAction = createAction('logout', () => {
    storage.removeItem('persist:root')
    return {payload: true}

  })


const initialState: any = {
  user: null,
  token: null,
  error: null,
  status: null,
}

const logoutSlice: any = createSlice({
  name: "logout",
  initialState,
  extraReducers: (builder) => {
   
  },
  reducers: {
    logoutAction
  },
});


export default logoutSlice.reducer;

