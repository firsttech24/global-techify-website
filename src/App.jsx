import React from "react";
import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
