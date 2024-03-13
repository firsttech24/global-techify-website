import React from "react";
import Header from "./components/header/Header";
import { BrowserRouter, Routes, Router } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}
