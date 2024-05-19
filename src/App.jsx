import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MentorPage from "./pages/mentorpage/MentorPage";
import {
  HomePage,
  AboutPage,
  ServicesPage,
  ContactPage,
  AuthPage,
  OurTeamPage,
  MentorProfile,
  StudentProfile,
} from "./pages";

import StudentDashboard from "./studentPanel/studentDashboard";
import Allmentors from "./studentPanel/Allmentors";
import StudentAcceptedRequests from "./studentPanel/AcceptedRequests";
import StudentUpcomingSessions from "./studentPanel/UpcomingSessions";
import StudentRequestPage from "./studentPanel/requestPage";

import MentorDashboard from "./mentorPanel/mentorDashboard";
import AcceptedRequests from "./mentorPanel/AcceptedRequests";
import RequestPage from "./mentorPanel/requestPage";
import UpcomingSessions from "./mentorPanel/UpcomingSessions";

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [role, setRole] = useState();
  const [isLogout, setIsLogout] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const log = JSON.parse(localStorage.getItem("gtechify!#"));
      console.log("log => ", log);
      if (log) {
        setRole(log.role);
        console.log("log role => ", log.role);
      } else {
        setRole("");
        console.log("log role => ", log);
      }
    }, 1000);
  }, [isLogout, isLogin]);

  return (
    <BrowserRouter>
      <Header
        setIsDarkTheme={setIsDarkTheme}
        isLogin={isLogin}
        isLogout={isLogout}
      />

      <Routes>
        {/* home page */}
        <Route path={"/"} element={<HomePage role={role} />} />

        {/* about page */}
        <Route
          path={"/about"}
          element={<AboutPage isDarkTheme={isDarkTheme} />}
        />

        {/* mentor page */}
        <Route path={"/mentor"} element={<MentorPage />} />

        {/* services page */}
        <Route path={"/services"} element={<ServicesPage />} />

        {/* our team page */}
        <Route path={"/team"} element={<OurTeamPage />} />

        {/* contact page */}
        <Route path={"/contact"} element={<ContactPage />} />

        {/* auth page */}
        <Route path={"/auth"} element={<AuthPage setIsLogin={setIsLogin} />} />

        {/* mentor profile */}
        <Route
          path={"/mentor-profile"}
          element={<MentorProfile setIsLogout={setIsLogout} />}
        />

        <Route
          path="/student-profile"
          element={<StudentProfile setIsLogout={setIsLogout} />}
        />

        {/* student panel */}
        <Route path="/student" element={<StudentDashboard />}>
          <Route path="mentors" element={<Allmentors />} />
          <Route path="meetrequests" element={<StudentRequestPage />} />
          <Route
            path="acceptedrequests"
            element={<StudentAcceptedRequests />}
          />
          <Route
            path="upcomingsessions"
            element={<StudentUpcomingSessions />}
          />
        </Route>

        {/* mentor panel */}
        <Route path="/mentor" element={<MentorDashboard />}>
          <Route path="meetrequests" element={<RequestPage />} />
          <Route path="acceptedrequests" element={<AcceptedRequests />} />
          <Route path="upcomingsessions" element={<UpcomingSessions />} />
        </Route>
      </Routes>
      <Footer role={role} />
    </BrowserRouter>
  );
}
