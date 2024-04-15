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
} from "./pages";
import UserProfile from "./pages/login/UserProfile";
import MentorDashboard from "./mentorPanel/mentorDashboard";
import AcceptedRequests from "./mentorPanel/AcceptedRequests";
import RequestPage from "./mentorPanel/requestPage";
import UpcomingSessions from "./mentorPanel/UpcomingSessions";
import CompletedSessions from "./mentorPanel/CompletedSessions";

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  return (
    <BrowserRouter>
      <Header setIsDarkTheme={setIsDarkTheme} />

      <Routes>
        {/* home page */}
        <Route path={"/"} element={<HomePage />} />

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
        <Route path={"/auth"} element={<AuthPage />} />

        {/* mentor profile */}
        <Route path={"/mentor-profile"} element={<MentorProfile />} />

        <Route path="/user/profile" element={<UserProfile />} />

        <Route path="/mentor" element={<MentorDashboard />}>
          <Route path="meetrequests" element={<RequestPage />} />
          <Route path="acceptedrequests" element={<AcceptedRequests />} />
          <Route path="upcomingsessions" element={<UpcomingSessions />} />
          <Route path="completedsessions" element={<CompletedSessions />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
