import React from "react";
import "./App.css";
import MapPage from "./pages/MapPage";


export const REACT_APP_GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY as string

function App() {
  return <MapPage />;
}

export default App;
