/** @format */

import React, { useEffect } from "react";
import Header from "./components/header/Header";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/homePage/HomePage";
import AuthPage from "./pages/authPage/AuthPage";
import UserProfile from "./pages/login/UserProfile";

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
          path={"/auth"}
          element={<AuthPage />}
        />
        <Route
          path="user/profile"
          element={<UserProfile />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
