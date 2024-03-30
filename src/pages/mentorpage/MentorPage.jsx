import React, { useState, useEffect } from "react";
import styles from "./mentorPage.module.css";
import { TbFilterEdit } from "react-icons/tb";
import { ThemeChanger } from "../../components/themeChanger/ThemeChanger";

import { FaSearch } from "react-icons/fa";

export default function MentorPage() {
  const [mentors, setMentors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");

  const fetchAllMentors = () => {
    fetch(`${import.meta.env.VITE_HOST_API}/mentor/get/approved`)
      .then(response => response.json())
      .then(data => {
        setMentors(data.all);
        console.log(data.all);
      });
  };

  useEffect(() => {
    fetchAllMentors();
  }, []);

  // Function to handle search query change
  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  // Function to handle company filter change
  const handleCompanyChange = event => {
    setSelectedCompany(event.target.value);
  };

  // Function to handle profile filter change
  const handleProfileChange = event => {
    setSelectedProfile(event.target.value);
  };

  // Filter mentors based on search query, selected company, and selected profile
  const filteredMentors = mentors.filter(
    mentor =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCompany === "" ||
        mentor.currentCompany.company.toLowerCase() ===
          selectedCompany.toLowerCase()) &&
      (selectedProfile === "" ||
        mentor.areasOfInterest
          .map(area => area.toLowerCase())
          .includes(selectedProfile.toLowerCase()))
  );

  selectedCompany && console.log(selectedCompany);

  return (
    <div className={styles.MentorPage}>
      <div className={styles.leftContainer}>
        <div className={`normalText ${styles.heading}`}>
          <TbFilterEdit />
          Filters
        </div>
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
            <select value={selectedCompany} onChange={handleCompanyChange}>
              <option value="">All Companies</option>
              <option value="amazon">Amazon</option>
              <option value="techkilla">Techkilla</option>
              <option value="google">Google</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className={styles.filterByProfileName}>
            <select value={selectedProfile} onChange={handleProfileChange}>
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
      <div className={styles.rightContainer}>
        {filteredMentors?.map(mentor => (
          <div className={styles.singleContainer} key={mentor.id}>
            <div className={styles.imgContainer}>
              <img src={mentor.profile} alt="profile-picture" />
            </div>
            <p className={`normalText ${styles.name}`}>{mentor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
