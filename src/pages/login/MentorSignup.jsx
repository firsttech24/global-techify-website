/** @format */

import { useState } from "react";
import styles from "./MentorSignUp.module.css";
import { IoSend } from "react-icons/io5";

const MentorSignUp = () => {
  const [id, setId] = useState("");
  const [mentorData, setMentorData] = useState({
    name: "",
    email: "",
    wnumber: "",
    bio: "",
    profile: "",
    areasOfInterest: [],
    currentCompany: {
      company: "",
      position: "",
    },
    experience: [],
    education: [],
    socials: {
      linkedin: "",
      github: "",
      twitter: "",
    },
    pmt: {
      acn: "",
      acno: "",
      ic: "",
      nb: "",
      bc: "",
      ui: "",
    },
  });

  const [dummyExp, setDummyExp] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
  });
  const [dummyEdu, setDummyEdu] = useState({
    institute: "",
    passingYear: "",
    degree: "",
    department: "",
    specialisation: "",
  });

  useState(() => {
    const item = localStorage.getItem("gtechify!#");
    setId(item);
    fetch(`${import.meta.env.VITE_HOST_API}/mentor/get/${item}`)
      .then(response => response.json())
      .then(data => {
        if (data.name)
          setMentorData(prevData => ({ ...prevData, name: data.name }));
        if (data.email)
          setMentorData(prevData => ({ ...prevData, email: data.email }));
        if (data.wnumber)
          setMentorData(prevData => ({ ...prevData, wnumber: data.wnumber }));
        if (data.bio)
          setMentorData(prevData => ({ ...prevData, bio: data.bio }));
        if (data.currentCompany)
          setMentorData(prevData => ({
            ...prevData,
            currentCompany: data.currentCompany,
          }));

        if (data.experience)
          setMentorData(prevData => ({
            ...prevData,
            experience: data.experience,
          }));
        if (data.education)
          setMentorData(prevData => ({
            ...prevData,
            education: data.education,
          }));
        if (data.socials)
          setMentorData(prevData => ({
            ...prevData,
            socials: data.socials,
          }));
        if (data.pmt)
          setMentorData(prevData => ({
            ...prevData,
            pmt: data.pmt,
          }));
      })
      .catch(error => {
        console.error("Error fetching mentor data:", error);
      });
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    setMentorData({
      ...mentorData,
      [name]: value,
    });
  };
  const handleExpChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    setDummyExp({
      ...dummyExp,
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

  const handleExperienceAddButton = () => {
    const newExperience = mentorData.experience;
    newExperience.push(dummyExp);
    setDummyExp({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
    });
    setMentorData({
      ...mentorData,
      experience: newExperience,
    });
  };
  const handleEducationAddButton = () => {
    const newEducation = mentorData.education;
    newEducation.push(dummyEdu);
    setDummyEdu({
      institute: "",
      passingYear: "",
      degree: "",
      department: "",
      specialisation: "",
    });
    setMentorData({
      ...mentorData,
      education: newEducation,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    updateMentor()
      .then(data => {
        console.log("Student registered successfully:", data);
      })
      .catch(error => {
        console.error("Failed to register student:", error);
      });
  };

  const updateMentor = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/mentor/update/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mentorData),
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
      <h1>Profile | Mentor</h1>
      <form onSubmit={handleSubmit} className={styles.mentorSignUpForm}>
        <div className={styles.formGroup}>
          <span>Profile:</span>
          🔗
          <input
            type="file"
            name="profile"
            value={mentorData.profile}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <span>Name:</span>
          🔗
          <input
            type="text"
            name="name"
            value={mentorData.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <span>Email:</span>
          🔗
          <input
            type="email"
            name="email"
            value={mentorData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <span>WhatsApp Number:</span>
          🔗
          <input
            type="number"
            name="wnumber"
            value={mentorData.wnumber}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <span>Bio/Description:</span>
          🔗
          <textarea
            name="bio"
            className={styles.biotextArea}
            value={mentorData.bio}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroupSelect}>
          <span>Areas Of Interest</span>
          🔗
          <div>
            <div>{mentorData.areasOfInterest.join(", ")}</div>
            <label>
              <span>Non-Core Profiles</span> :
              <select
                name="nonCoreAreasOfInterest"
                value={mentorData.areasOfInterest}
                onChange={event =>
                  setMentorData({
                    ...mentorData,
                    areasOfInterest: [
                      ...mentorData.areasOfInterest,
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
                value={mentorData.areasOfInterest}
                onChange={event =>
                  setMentorData({
                    ...mentorData,
                    areasOfInterest: [
                      ...mentorData.areasOfInterest,
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
          <span> Current Company: </span>
          🔗
          <input
            type="text"
            name="currentCompany.company"
            value={mentorData.currentCompany.company}
            placeholder="Current Company"
            onChange={e =>
              setMentorData({
                ...mentorData,
                currentCompany: {
                  ...mentorData.currentCompany,
                  company: e.target.value,
                },
              })
            }
          />
          <input
            type="text"
            name="currentCompany.position"
            placeholder="Current Position"
            value={mentorData.currentCompany.position}
            onChange={e =>
              setMentorData({
                ...mentorData,
                currentCompany: {
                  ...mentorData.currentCompany,
                  position: e.target.value,
                },
              })
            }
          />
        </div>
        <div className={styles.formGroup}>
          <span>Experience:</span>
          🔗
          <span className={styles.experienceValueGroup}>
            <div className={styles.experienceStatements}>
              {mentorData.experience.map((item, key) => (
                <div key={key}>
                  {item.position} at {item.company} ({item.startDate} -{" "}
                  {item.endDate})
                </div>
              ))}
            </div>
            <label>
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={dummyExp.company}
                onChange={handleExpChange}
              />
            </label>
            <label>
              <input
                type="text"
                name="position"
                placeholder="Position"
                value={dummyExp.position}
                onChange={handleExpChange}
              />
            </label>
            <label>
              <input
                type="text"
                name="startDate"
                placeholder="Start Date"
                value={dummyExp.startDate}
                onChange={handleExpChange}
              />
            </label>{" "}
            <label>
              <input
                type="text"
                name="endDate"
                placeholder="End Date"
                value={dummyExp.endDate}
                onChange={handleExpChange}
              />
            </label>
            <IoSend
              className={styles.addEduButton}
              onClick={handleExperienceAddButton}
            />
          </span>
        </div>
        <div className={styles.formGroup}>
          <span>Education :</span>
          🔗
          <div className={styles.educationInputDetails}>
            <div className={styles.educationStatements}>
              {mentorData.education.map((item, key) => (
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
        <div className={styles.formGroup}>
          <span>Socials:</span>
          🔗
          <div className={styles.socailInputGroup}>
            <label htmlFor="">
              <input
                type="text"
                name="socials.linkedin"
                placeholder="Linkedin"
                value={mentorData.socials.linkedin}
                onChange={e =>
                  setMentorData({
                    ...mentorData,
                    socials: {
                      ...mentorData.socials,
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
                value={mentorData.socials.github}
                onChange={e =>
                  setMentorData({
                    ...mentorData,
                    socials: {
                      ...mentorData.socials,
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
                value={mentorData.socials.twitter}
                onChange={e =>
                  setMentorData({
                    ...mentorData,
                    socials: {
                      ...mentorData.socials,
                      twitter: e.target.value,
                    },
                  })
                }
              />
            </label>
          </div>
        </div>
        <div className={styles.paymentGroup}>
          <span className={styles.paymentLabel}> Payment Details:</span>
          🔗
          <div className={styles.paymentInputGroup}>
            <input
              type="text"
              name="pmt.acn"
              className={styles.paymentInputs}
              placeholder="Account Name"
              value={mentorData.pmt.acn}
              onChange={e =>
                setMentorData({
                  ...mentorData,
                  pmt: {
                    ...mentorData.pmt,
                    acn: e.target.value,
                  },
                })
              }
            />
            <input
              type="number"
              name="pmt.acno"
              className={styles.paymentInputs}
              placeholder="Account Number"
              value={mentorData.pmt.acno}
              onChange={e =>
                setMentorData({
                  ...mentorData,
                  pmt: {
                    ...mentorData.pmt,
                    acno: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              name="pmt.ic"
              className={styles.paymentInputs}
              placeholder="IFSC Code"
              value={mentorData.pmt.ic}
              onChange={e =>
                setMentorData({
                  ...mentorData,
                  pmt: {
                    ...mentorData.pmt,
                    ic: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              name="pmt.nb"
              placeholder="Branch Name"
              className={styles.paymentInputs}
              value={mentorData.pmt.nb}
              onChange={e =>
                setMentorData({
                  ...mentorData,
                  pmt: {
                    ...mentorData.pmt,
                    nb: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              name="pmt.bc"
              placeholder="Branch Code"
              className={styles.paymentInputs}
              value={mentorData.pmt.bc}
              onChange={e =>
                setMentorData({
                  ...mentorData,
                  pmt: {
                    ...mentorData.pmt,
                    bc: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              name="pmt.ui"
              placeholder="UPI"
              className={styles.paymentInputs}
              value={mentorData.pmt.ui}
              onChange={e =>
                setMentorData({
                  ...mentorData,
                  pmt: {
                    ...mentorData.pmt,
                    ui: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MentorSignUp;
