import React, { useState, useEffect } from "react";
import styles from "./mentorPage.module.css";

import Loader from "../../components/loader/Loader";

import { TbFilterEdit } from "react-icons/tb";
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

  // Function to capitalize the first letter of each word in a string
  function capitalizeName(name) {
    return name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  filteredMentors && console.log(filteredMentors);

  return (
    <div className={styles.MentorPage}>
      {/*   <div data-aos="fade-up" className={styles.leftContainer}>
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
            </select>
          </div>
          <div className={styles.filterByProfileName}>
            <select value={selectedProfile} onChange={handleProfileChange}>
              <option value="">All Profiles</option>
              <option value="analytics">analytics</option>
              <option value="python developer">Python Developer</option>
              <option value="full stack developer">Full Stack Developer</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
            </select>
          </div>
          <span
            onClick={() => {
              setSearchQuery("");
              setSelectedCompany("");
              setSelectedProfile("");
            }}
            className={styles.clear}
          >
            Clear filters
          </span>
        </div>
      </div> */}
      <div /* data-aos="fade-up" */ className={styles.rightContainer}>
        {!mentors && <Loader />}

        {filteredMentors &&
          filteredMentors.map(mentor => (
            <div className={styles.singleContainer} key={mentor.id}>
              <div className={styles.top}>
                <div className={styles.imgContainer}>
                  <img src={mentor.profile} alt="profile-picture" />
                </div>
                <p className={`normalText ${styles.name}`}>
                  {capitalizeName(mentor.name)}
                </p>
              </div>
              <div className={styles.line}></div>
              <p className={styles.bio}>{mentor.bio.substring(0, 91)}...</p>
              {mentor.areasOfInterest.map((item, idx) => (
                <span key={idx}>{item}</span>
              ))}

              <p>{mentor.currentCompany.company}</p>
              <p>{mentor.currentCompany.position}</p>
            </div>
          ))}
      </div>

      <button className={`btn1`}>See All</button>
    </div>
  );
}

/* 
.profile => image
.name => string
.bio => string 
.areasOfInterest => array of strings
.currentCompany => object
    .currentCompany.company => string
    .currentCompany.position => string
*/
