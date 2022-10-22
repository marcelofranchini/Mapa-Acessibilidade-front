import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import pointsReducer from "./pointsSlice";
import authReducer from "./authSlice";
import newUserReducer from './newUserSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import newPointReducer from './newPointSlice'
import pointDelete from "./pointsDeleteSlice";


const reducers = combineReducers({
  points: pointsReducer,
  auth: authReducer,  
  newUser: newUserReducer,  
  newPoint: newPointReducer,
  deletePoint: pointDelete 
        
 });
 
 const persistConfig = {
     key: 'root',
     storage
 };

 
 
 const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;