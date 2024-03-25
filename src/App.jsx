import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { HomePage, AuthPage } from "./pages";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

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
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/auth"} element={<AuthPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
