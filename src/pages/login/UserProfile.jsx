/** @format */

import { useState } from "react";
import styles from "./MentorSignUp.module.css";
import { IoSend } from "react-icons/io5";

const UserProfile = () => {
  const [id, setId] = useState("6601d7428970d237c6afb025");
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

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleEduChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    setDummyEdu({
      ...dummyEdu,
      [name]: value,
    });
  };

  const handleEducationAddButton = () => {
    const newEducation = userData.education;
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
  };
  const handleSubmit = event => {
    event.preventDefault();
    console.log(userData);
    updateUser()
      .then(data => {
        console.log("Student registered successfully:", data);
      })
      .catch(error => {
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

  return (
    <div className={styles.page}>
      <h1>Profile | Student</h1>
      <form action="" className={styles.mentorSignUpForm}>
        <div className={styles.formGroup}>
          <span>Profile Photo : </span>
          🔗
          <input type="file" name="profile" value={userData.profile} />
        </div>
        <div className={styles.formGroup}>
          <span>Name : </span>
          🔗
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <span>Email : </span>🔗
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <span>WhatsApp Number : </span>
          🔗
          <input
            type="number"
            name="wnumber"
            value={userData.wnumber}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <span>Education : </span>
          🔗
          <div className={styles.educationInputDetails}>
            <div className={styles.educationStatements}>
              {userData.education.map((item, key) => (
                <div key={key}>
                  {item.degree} in {item.passingYear} at specialisation in{" "}
                  {item.specialisation} from {item.department}, {item.institute}
                </div>
              ))}
            </div>
            <input
              type="text"
              name="institute"
              placeholder="Institute"
              value={dummyEdu.institute}
              onChange={handleEduChange}
            />
            <input
              type="text"
              name="passingYear"
              placeholder="Passing year"
              value={dummyEdu.passingYear}
              onChange={handleEduChange}
            />
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={dummyEdu.degree}
              onChange={handleEduChange}
            />
            <input
              type="text"
              name="department"
              placeholder="department"
              value={dummyEdu.department}
              onChange={handleEduChange}
            />
            <input
              type="text"
              name="specialisation"
              placeholder="specialisation"
              value={dummyEdu.specialisation}
              onChange={handleEduChange}
            />
            <IoSend
              className={styles.addEduButton}
              onClick={handleEducationAddButton}
            />
          </div>
        </div>
        <div className={styles.formGroupSelect}>
          <span>Profiles : </span>
          🔗
          <div>
            <div>{userData.areasOfInterest.join(", ")}</div>
            <label>
              <span>Non-Core Profiles</span> :
              <select
                name="nonCoreAreasOfInterest"
                value={userData.areasOfInterest}
                onChange={event =>
                  setUserData({
                    ...userData,
                    areasOfInterest: [
                      ...userData.areasOfInterest,
                      event.target.value,
                    ],
                  })
                }
              >
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
            <label>
              <span> Core Profiles </span>:
              <select
                name="coreAreasOfInterest"
                value={userData.areasOfInterest}
                onChange={event =>
                  setUserData({
                    ...userData,
                    areasOfInterest: [
                      ...userData.areasOfInterest,
                      event.target.value,
                    ],
                  })
                }
              >
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
        <div className={styles.formGroup}>
          <span>Socials : </span>
          🔗
          <div className={styles.socailInputGroup}>
            <label htmlFor="">
              <input
                type="text"
                name="socials.linkedin"
                placeholder="Linkedin"
                value={userData.socials.linkedin}
                onChange={e =>
                  setUserData({
                    ...userData,
                    socials: {
                      ...userData.socials,
                      linkedin: e.target.value,
                    },
                  })
                }
              />
            </label>
            <label htmlFor="">
              <input
                type="text"
                name="socials.github"
                placeholder="Github"
                value={userData.socials.github}
                onChange={e =>
                  setUserData({
                    ...userData,
                    socials: {
                      ...userData.socials,
                      github: e.target.value,
                    },
                  })
                }
              />
            </label>
            <label htmlFor="">
              <input
                type="text"
                name="socials.twitter"
                placeholder="Twitter"
                value={userData.socials.twitter}
                onChange={e =>
                  setUserData({
                    ...userData,
                    socials: {
                      ...userData.socials,
                      twitter: e.target.value,
                    },
                  })
                }
              />
            </label>
          </div>
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
