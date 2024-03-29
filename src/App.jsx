/** @format */

import React, { useEffect } from "react";
import Header from "./components/header/Header";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./components/footer/Footer";
import {
  HomePage,
  AboutPage,
  MentorPage,
  ServicesPage,
  ContactPage,
  AuthPage,
  OurTeamPage,
} from "./pages";
import MentorSignUp from "./pages/login/MentorSignup";
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
        {/* home page */}
        <Route
          path={"/"}
          element={<HomePage />}
        />

        {/* about page */}
        <Route
          path={"/about"}
          element={<AboutPage />}
        />
        <Route path={"/about"} element={<AboutPage />} />

        {/* mentor page */}
        <Route path={"/mentor"} element={<MentorPage />} />

        {/* services page */}
        <Route path={"/services"} element={<ServicesPage />} />

        {/* our team page */}
        <Route path={"/team"} element={<OurTeamPage />} />

        {/* contact page */}
        <Route path={"/contact"} element={<ContactPage />} />

        {/* auth page */}
        <Route
          path={"/auth"}
          element={<AuthPage />}
        />
        <Route
          path="/user/profile"
          element={<UserProfile />}
        />
        <Route
          path={"/mentor/profile"}
          element={<MentorSignUp />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
