/** @format */

import React, { useState } from "react";
import styles from "./sidebar.module.css";
import { Link } from "react-router-dom";
import { TbFilterEdit } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";

const Sidebar = ({mentors}) => {
  const [activeButton, setActiveButton] = useState("");
  const [filterShow, setFilterShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle company filter change
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  // Function to handle profile filter change
  const handleProfileChange = (event) => {
    setSelectedProfile(event.target.value);
  };

  const filteredMentors = mentors?.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCompany === "" ||
        mentor.currentCompany.company.toLowerCase() ===
          selectedCompany.toLowerCase()) &&
      (selectedProfile === "" ||
        mentor.areasOfInterest
          .map((area) => area.toLowerCase())
          .includes(selectedProfile.toLowerCase()))
  );

  selectedCompany && console.log(selectedCompany);

  return (
    <div className={styles.sidebar}>
      <img className={styles.imageInSidebar} />
      <span>Name</span>
      <div
        className={`normalText ${styles.heading}`}
        onClick={() => setFilterShow(() => !filterShow)}>
        <TbFilterEdit />
        Filters
      </div>
      <div
        className={styles.leftContainer}
        style={filterShow == true ? {} : { display: "none" }}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search mentors by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FaSearch />
        </div>
        <div className={styles.filters}>
          <div className={styles.filterByCompanyName}>
            <select
              value={selectedCompany}
              onChange={handleCompanyChange}>
              <option value="">All Companies</option>
              <option value="amazon">Amazon</option>
              <option value="techkilla">Techkilla</option>
              <option value="google">Google</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className={styles.filterByProfileName}>
            <select
              value={selectedProfile}
              onChange={handleProfileChange}>
              <option value="">All Profiles</option>
              <option value="analytics">analytics</option>
              <option value="python developer">Python Developer</option>
              <option value="full stack developer">Full Stack Developer</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
      </div>
      <button className={styles.profileButton}>View profile</button>
      <div className={styles.navlist}>
        <Link to={"/student/meetrequests"}>
          <button
            className={
              activeButton === "meetrequests"
                ? styles.activeButton
                : styles.inActiveButton
            }
            onClick={() => handleButtonClick("meetrequests")}>
            Meet Requests
          </button>
        </Link>
        <Link to={"/student/acceptedrequests"}>
          <button
            className={
              activeButton === "acceptedrequests"
                ? styles.activeButton
                : styles.inActiveButton
            }
            onClick={() => handleButtonClick("acceptedrequests")}>
            Accepted Requests
          </button>
        </Link>
        <Link to={"/student/upcomingsessions"}>
          <button
            className={
              activeButton === "upcomingsessions"
                ? styles.activeButton
                : styles.inActiveButton
            }
            onClick={() => handleButtonClick("upcomingsessions")}>
            Upcoming Sessions
          </button>
        </Link>
        <Link to={"/student/completedsessions"}>
          <button
            className={
              activeButton === "completedsessions"
                ? styles.activeButton
                : styles.inActiveButton
            }
            onClick={() => handleButtonClick("completedsessions")}>
            Completed Sessions
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
