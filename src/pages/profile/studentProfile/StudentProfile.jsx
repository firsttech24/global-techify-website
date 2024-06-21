/** @format */

import { useEffect, useState } from "react";
import styles from "./studentProfile.module.css";
import { IoSend } from "react-icons/io5";
import { store } from "../../../config/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentProfile = ({ setIsLogout }) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    wnumber: "",
    education: [],
    profilePhoto: "",
    areasOfInterest: [],
    resume: "",
    socials: {
      linkedin: "",
      github: "",
      twitter: "",
    },
  });

  const [dummyEdu, setDummyEdu] = useState({
    institute: "",
    passingYear: "",
    degree: "",
    department: "",
    specialisation: "",
  });

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("gtechify!#"));
    console.log(item.id, "log");
    if (item.role != "student") navigate("/");
    else {
      setId(item.id);
    }
    fetch(`${import.meta.env.VITE_HOST_API}/user/get/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.profilePhoto)
          setUserData((prevData) => ({ ...prevData, profilePhoto: data.profilePhoto }));
        if (data.name)
          setUserData((prevData) => ({ ...prevData, name: data.name }));
        if (data.email)
          setUserData((prevData) => ({ ...prevData, email: data.email }));
        if (data.wnumber)
          setUserData((prevData) => ({ ...prevData, wnumber: data.wnumber }));
        if (data.resume)
          setUserData((prevData) => ({ ...prevData, resume: data.resume }));

        if (data.experience)
          setUserData((prevData) => ({
            ...prevData,
            experience: data.experience,
          }));
        if (data.education)
          setUserData((prevData) => ({
            ...prevData,
            education: data.education,
          }));
        if (data.socials)
          setUserData((prevData) => ({
            ...prevData,
            socials: data.socials,
          }));
      })
      .catch((error) => {
        console.error("Error fetching mentor data:", error);
      });
  }, []);

  const handleProfileChange = async (e) => {
    let imageRef = ref(store, "users/profilePics");
    await uploadBytes(imageRef, e.target.files[0]);
    const imageUrl = await getDownloadURL(imageRef);
    console.log(imageUrl);
    setUserData({
      ...userData,
      profilePhoto: imageUrl,
    });
  };

  const handleResumeChange = async (e) => {
    let resumeRef = ref(store, "users/resume");
    await uploadBytes(resumeRef, e.target.files[0]);
    const resumeUrl = await getDownloadURL(resumeRef);
    console.log(resumeUrl);
    setUserData({
      ...userData,
      resume: resumeUrl,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleEduChange = (event) => {
    const { name, value } = event.target;
    setDummyEdu({
      ...dummyEdu,
      [name]: value,
    });
  };

  const handleEducationAddButton = () => {
    const newEducation = userData.education;
    // console.log(dummyEdu);
    if (
      dummyEdu.institute === "" ||
      dummyEdu.passingYear === "" ||
      dummyEdu.degree === "" ||
      dummyEdu.department === "" ||
      dummyEdu.specialisation === ""
    ) {
      alert("Please fill all the fields");
    } else {
      newEducation.push(dummyEdu);
      setDummyEdu({
        institute: "",
        passingYear: "",
        degree: "",
        department: "",
        specialisation: "",
      });
      setUserData({
        ...userData,
        education: newEducation,
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userData);
    updateUser()
      .then((data) => {
        console.log("Student registered successfully:", data);
      })
      .catch((error) => {
        console.error("Failed to register student:", error);
      });
  };
  const updateUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/user/update/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register student");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error registering student:", error);
      throw error;
    }
  };

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("gtechify!#");
    setIsLogout((prev) => !prev);
    navigate("/");
  };
  return (
    <form
      action=""
      className={`flex-col-center ${styles.StudentProfile}`}>
      {/* profile */}
      {/*  <div className={styles.profile}>
        <div className={`flex-row-center ${styles.imgContainer}`}>
          <img
            src={userData.profilePhoto}
            className={styles.profileImage}
            alt=""
          />
        </div>
        <input
          type="file"
          name="profile"
          value={""}
          onChange={handleProfileChange}
        />
        <button className={styles.removeProfileButton}>Remove</button>
      </div> */}

      {/* <div className={styles.formGroup}>
        <span>Resume : </span>
        <input
          type="file"
          name="profile"
          value={""}
          onChange={handleResumeChange}
        />
      </div> */}

      <div className={`flex-row-center ${styles.top}`}>
        <div className={`flex-col-center ${styles.profile}`}>
          <div className={`flex-row-center ${styles.imgContainer}`}>
            <img
              src={userData.profilePhoto}
              className={styles.profileImage}
              alt="profile"
            />
          </div>
          <input
            type="file"
            name="profile"
            onChange={handleProfileChange}
          />
          {/* <button className={styles.removeProfileButton}>Remove</button>*/}
        </div>
        <button
          onClick={() => {
            handleLogout();
          }}
          className={`btn1`}>
          Logout
        </button>
      </div>

      {/* name */}
      <div className={`flex-row-center ${styles.inputContainer}`}>
        <span>Name:</span>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          important
          placeholder="Enter your name"
        />
      </div>

      {/* email */}
      <div className={`flex-row-center ${styles.inputContainer}`}>
        <span>Email:</span>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          important
          placeholder="Enter your email"
        />
      </div>

      {/* whatsapp */}
      <div className={`flex-row-center ${styles.inputContainer}`}>
        <span>WhatsApp No.:</span>
        <input
          type="number"
          name="wnumber"
          value={userData.wnumber}
          onChange={handleChange}
          important
          placeholder="Enter your whatsapp number"
        />
      </div>

      {/* education */}
      <div className={`flex-col-center ${styles.experienceContainer}`}>
        <span>Education:</span>

        <div className={`flex-col-center ${styles.experienceBox}`}>
          <div className={`flex-col-center ${styles.top}`}>
            {userData.education.map((item, key) => (
              <div
                key={key}
                className={`flex-row-center ${styles.expListBox}`}>
                <p className={styles.expListItems}>
                  {item.degree} in {item.passingYear} at specialisation in{" "}
                  {item.specialisation} from {item.department}, {item.institute}
                </p>

                <FaTrash
                  onClick={() => {
                    setUserData({
                      ...userData,
                      education: userData.education.filter(
                        (ite) => ite != item
                      ),
                    });
                  }}
                />
              </div>
            ))}
          </div>

          <div className={`flex-row-center ${styles.bottom}`}>
            <div className={`flex-row-center ${styles.inputContainer}`}>
              <span>Institute:</span>
              <input
                type="text"
                name="institute"
                placeholder="Institute *"
                value={dummyEdu.institute}
                onChange={handleEduChange}
                important
              />
            </div>
            <div className={`flex-row-center ${styles.inputContainer}`}>
              <span>Passing Year:</span>
              <input
                type="text"
                name="passingYear"
                placeholder="Passing year *"
                value={dummyEdu.passingYear}
                onChange={handleEduChange}
                important
              />
            </div>
            <div className={`flex-row-center ${styles.inputContainer}`}>
              <span>Degree:</span>
              <input
                type="text"
                name="degree"
                placeholder="Degree *"
                value={dummyEdu.degree}
                onChange={handleEduChange}
                important
              />
            </div>
            <div className={`flex-row-center ${styles.inputContainer}`}>
              <span>Department:</span>
              <input
                type="text"
                name="department"
                placeholder="Department *"
                value={dummyEdu.department}
                onChange={handleEduChange}
                important
              />
            </div>
            <div className={`flex-row-center ${styles.inputContainer}`}>
              <span>Specialisation:</span>
              <input
                type="text"
                name="specialisation"
                placeholder="Specialisation *"
                value={dummyEdu.specialisation}
                onChange={handleEduChange}
                important
              />
            </div>
          </div>

          <IoSend
            className={styles.addEduButton}
            onClick={handleEducationAddButton}
          />
        </div>
      </div>

      {/* areas of interest */}
      <div className={`flex-col-center ${styles.areasOfInterest}`}>
        <span>Areas Of Interest:</span>
        <div className={`flex-col-center ${styles.allProfilesContainer}`}>
          {userData.areasOfInterest.map((item, key) => (
            <div
              key={key}
              className={`flex-row-center ${styles.profilesBox}`}>
              <p className={styles.profilesItems}>
                {item}{" "}
                <FaTrash
                  className={styles.trashIcon}
                  onClick={() => {
                    setUserData({
                      ...userData,
                      areasOfInterest: userData.areasOfInterest.filter(
                        (ite) => ite != item
                      ),
                    });
                  }}
                />
              </p>
            </div>
          ))}
          <div className={`flex-col-center ${styles.profileContainer}`}>
            <label className={`flex-row-center ${styles.singleProfile}`}>
              <span>Non-Core Profiles:</span>
              <select
                name="nonCoreAreasOfInterest"
                value={userData.areasOfInterest}
                onChange={(event) => {
                  const newValue = event.target.value;
                  setUserData((prevState) => {
                    if (!prevState.areasOfInterest.includes(newValue)) {
                      return {
                        ...prevState,
                        areasOfInterest: [
                          ...prevState.areasOfInterest,
                          newValue,
                        ],
                      };
                    } else {
                      return prevState;
                    }
                  });
                }}>
                <option value="Data Science">Data Science</option>
                <option value="Software">Software</option>
                <option value="Banking and Finance">Banking and Finance</option>
                <option value="Consulting">Consulting</option>
                <option value="Analytics">Analytics</option>
                <option value="Product Management">Product Management</option>
                <option value="Operations">Operations</option>
                <option value="Supply Chain">Supply Chain</option>
                <option value="FMCG">FMCG</option>
                <option value="Operations Research">Operations Research</option>
                <option value="Sales">Sales</option>
                <option value="Inventory Management">
                  Inventory Management
                </option>
                <option value="Logistics">Logistics</option>
              </select>
            </label>

            <label className={`flex-row-center ${styles.singleProfile}`}>
              <span> Core Profiles: </span>
              <select
                name="coreAreasOfInterest"
                value={userData.areasOfInterest}
                onChange={(event) => {
                  const newValue = event.target.value;
                  setUserData((prevState) => {
                    if (!prevState.areasOfInterest.includes(newValue)) {
                      return {
                        ...prevState,
                        areasOfInterest: [
                          ...prevState.areasOfInterest,
                          newValue,
                        ],
                      };
                    } else return prevState;
                  });
                }}>
                <option value="Aerospace Engineering">
                  Aerospace Engineering
                </option>
                <option value="Biomedical Engineering">
                  Biomedical Engineering
                </option>
                <option value="Bioscience and Bioengineering">
                  Bioscience and Bioengineering
                </option>
                <option value="Biotechnology">Biotechnology</option>
                <option value="Chemical Engineering">
                  Chemical Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Computer Science and Engineering">
                  Computer Science and Engineering
                </option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Electrical and Electronics Engineering">
                  Electrical and Electronics Engineering
                </option>
                <option value="Electronics and Communication Engineering">
                  Electronics and Communication Engineering
                </option>
                <option value="Electric Vehicles (EV)">
                  Electric Vehicles (EV)
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Metallurgical and Materials Engineering">
                  Metallurgical and Materials Engineering
                </option>
                <option value="Mining Engineering">Mining Engineering</option>
                <option value="Ocean Engineering">Ocean Engineering</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* socials */}
      <div className={`flex-col-center ${styles.socialsContainer}`}>
        <span>Socials:</span>
        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span>Linkedin:</span>
          <input
            type="text"
            name="socials.linkedin"
            placeholder="Linkedin"
            value={userData.socials.linkedin}
            onChange={(e) =>
              setUserData({
                ...userData,
                socials: {
                  ...userData.socials,
                  linkedin: e.target.value,
                },
              })
            }
          />
        </div>
        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span>Github:</span>
          <input
            type="text"
            name="socials.github"
            placeholder="Github"
            value={userData.socials.github}
            onChange={(e) =>
              setUserData({
                ...userData,
                socials: {
                  ...userData.socials,
                  github: e.target.value,
                },
              })
            }
          />
        </div>
        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span>Twitter:</span>
          <input
            type="text"
            name="socials.twitter"
            placeholder="Twitter"
            value={userData.socials.twitter}
            onChange={(e) =>
              setUserData({
                ...userData,
                socials: {
                  ...userData.socials,
                  twitter: e.target.value,
                },
              })
            }
          />
        </div>
      </div>

      <button
        type="submit"
        className={`btn1`}
        onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default StudentProfile;
