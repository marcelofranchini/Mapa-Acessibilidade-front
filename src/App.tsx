import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MapPage from "./pages/MapPage";


export const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY as string

function App() {
  return <>
    <Routes >
      <Route element = { <MapPage/> }  path="/"/>
    </Routes>
  </>;
}

export default App;
