/** @format */

import React, { useEffect } from "react";
import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages";
import AOS from "aos";
import "aos/dist/aos.css";
import MentorSignUp from "./pages/login/MentorSignup";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path={"/"}
          element={<HomePage />}
        />
        <Route
          path="/mentor/signup"
          element={<MentorSignUp />}
        />
      </Routes>
    </BrowserRouter>
  );
}
