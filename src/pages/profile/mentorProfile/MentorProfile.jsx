import { useEffect, useState } from "react";
import styles from "./mentorProfile.module.css";

import { IoAddCircle, IoSend } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { store } from "../../../config/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import PopUpScheduleHandler from "./PopUpScheduleHandler";
import { useNavigate } from "react-router-dom";

const timeSlots = [
  "00:00 AM",
  "00:15 AM",
  "00:30 AM",
  "00:45 AM",
  "01:00 AM",
  "01:15 AM",
  "01:30 AM",
  "01:45 AM",
  "02:00 AM",
  "02:15 AM",
  "02:30 AM",
  "02:45 AM",
  "03:00 AM",
  "03:15 AM",
  "03:30 AM",
  "03:45 AM",
  "04:00 AM",
  "04:15 AM",
  "04:30 AM",
  "04:45 AM",
  "05:00 AM",
  "05:15 AM",
  "05:30 AM",
  "05:45 AM",
  "06:00 AM",
  "06:15 AM",
  "06:30 AM",
  "06:45 AM",
  "07:00 AM",
  "07:15 AM",
  "07:30 AM",
  "07:45 AM",
  "08:00 AM",
  "08:15 AM",
  "08:30 AM",
  "08:45 AM",
  "09:00 AM",
  "09:15 AM",
  "09:30 AM",
  "09:45 AM",
  "10:00 AM",
  "10:15 AM",
  "10:30 AM",
  "10:45 AM",
  "11:00 AM",
  "11:15 AM",
  "11:30 AM",
  "11:45 AM",
  "12:00 PM",
  "12:15 PM",
  "12:30 PM",
  "12:45 PM",
  "01:00 PM",
  "01:15 PM",
  "01:30 PM",
  "01:45 PM",
  "02:00 PM",
  "02:15 PM",
  "02:30 PM",
  "02:45 PM",
  "03:00 PM",
  "03:15 PM",
  "03:30 PM",
  "03:45 PM",
  "04:00 PM",
  "04:15 PM",
  "04:30 PM",
  "04:45 PM",
  "05:00 PM",
  "05:15 PM",
  "05:30 PM",
  "05:45 PM",
  "06:00 PM",
  "06:15 PM",
  "06:30 PM",
  "06:45 PM",
  "07:00 PM",
  "07:15 PM",
  "07:30 PM",
  "07:45 PM",
  "08:00 PM",
  "08:15 PM",
  "08:30 PM",
  "08:45 PM",
  "09:00 PM",
  "09:15 PM",
  "09:30 PM",
  "09:45 PM",
  "10:00 PM",
  "10:15 PM",
  "10:30 PM",
  "10:45 PM",
  "11:00 PM",
  "11:15 PM",
  "11:30 PM",
  "11:45 PM",
  "00:00 AM",
];
const profiles = {
  core: [
    { name: "Choose Profile", value: "" },
    { name: "Aerospace Engineering", value: "Aerospace Engineering" },
    { name: "Biomedical Engineering", value: "Biomedical Engineering" },
    {
      name: "Bioscience and Bioengineering",
      value: "Bioscience and Bioengineering",
    },
    { name: "Biotechnology", value: "Biotechnology" },
    { name: "Chemical Engineering", value: "Chemical Engineering" },
    { name: "Civil Engineering", value: "Civil Engineering" },
    {
      name: "Computer Science and Engineering",
      value: "Computer Science and Engineering",
    },
    { name: "Electrical Engineering", value: "Electrical Engineering" },
    {
      name: "Electrical and Electronics Engineering",
      value: "Electrical and Electronics Engineering",
    },
    {
      name: "Electronics and Communication Engineering",
      value: "Electronics and Communication Engineering",
    },
    { name: "Electric Vehicles (EV)", value: "Electric Vehicles (EV)" },
    { name: "Mechanical Engineering", value: "Mechanical Engineering" },
    {
      name: "Metallurgical and Materials Engineering",
      value: "Metallurgical and Materials Engineering",
    },
    { name: "Mining Engineering", value: "Mining Engineering" },
    { name: "Ocean Engineering", value: "Ocean Engineering" },
  ],
  nonCore: [
    { name: "Choose Profile", value: "" },
    { name: "Data Science", value: "Data Science" },
    { name: "Software", value: "Software" },
    { name: "Banking and Finance", value: "Banking and Finance" },
    { name: "Consulting", value: "Consulting" },
    { name: "Analytics", value: "Analytics" },
    { name: "Product Management", value: "Product Management" },
    { name: "Operations", value: "Operations" },
    { name: "Supply Chain", value: "Supply Chain" },
    { name: "FMCG", value: "FMCG" },
    { name: "Operations Research", value: "Operations Research" },
    { name: "Sales", value: "Sales" },
    { name: "Inventory Management", value: "Inventory Management" },
    { name: "Logistics", value: "Logistics" },
  ],
};

const MentorProfile = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();
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
    approved: false,
    price: {
      15: "",
      30: "",
      45: "",
      60: "",
    },
    schedule: {
      sunday: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      satuday: [],
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

  /*  useEffect(() => {
    const item = localStorage.getItem("gtechify!#");
    // if (!item) navigate("/auth");
    setId(item);
    fetch(`${import.meta.env.VITE_HOST_API}/mentor/get/${item}`)
      .then(response => response.json())
      .then(data => {
        setMentorData(data);
      })
      .catch(error => {
        console.error("Error fetching mentor data:", error);
      });
  }, []); */

  const [selectedTimes, setSelectedTimes] = useState({});
  const [allDayChecked, setAllDayChecked] = useState(false);
  const [popOpen, setPopOpen] = useState({});

  const handleCheckboxChange = (day, checked) => {
    setSelectedTimes(prevState => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        allDay: checked,
        startingTime: checked ? timeSlots[0] : null,
        endingTime: checked ? timeSlots[timeSlots.length - 1] : null,
      },
    }));
  };

  const handleStartingTimeChange = (day, event) => {
    setSelectedTimes(prevState => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        startingTime: event.target.value,
        endingTime:
          prevState[day]?.endingTime < event.target.value
            ? event.target.value
            : prevState[day]?.endingTime,
      },
    }));
  };

  const handleEndingTimeChange = (day, event) => {
    setSelectedTimes(prevState => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        endingTime: event.target.value,
        startingTime:
          prevState[day]?.startingTime > event.target.value
            ? event.target.value
            : prevState[day]?.startingTime,
      },
    }));
  };

  const saveTimeRange = e => {
    e.preventDefault();
    const outputSchedule = {};
    const daysOfWeek = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    daysOfWeek.forEach(day => {
      outputSchedule[day] = selectedTimes[day]
        ? {
            status: selectedTimes[day].allDay,
            startingTime: selectedTimes[day].startingTime,
            endingTime: selectedTimes[day].endingTime,
          }
        : {
            status: false,
            startingTime: "00:00 AM",
            endingTime: "00:00 AM",
          };
    });

    setMentorData({
      ...mentorData,
      schedule: outputSchedule,
    });
  };

  const handleScheduleSlotAdd = (day, startingTime, endingTime) => {
    setMentorData({
      ...mentorData,
      schedule: {
        ...mentorData.schedule,
        [day]: [
          ...(mentorData.schedule ? mentorData.schedule[day] : []),
          { startingTime, endingTime },
        ],
      },
    });
  };

  const handleScheduleSlotDelete = (day, item) => {
    setMentorData({
      ...mentorData,
      schedule: {
        ...mentorData.schedule,
        [day]: mentorData.schedule[day].filter(ite => ite != item),
      },
    });
  };

  const handleProfileChange = async e => {
    let imageRef = ref(store, `mentors/profilePics/${mentorData.name}`);
    await uploadBytes(imageRef, e.target.files[0]);
    const imageUrl = await getDownloadURL(imageRef);
    console.log(imageUrl);
    setMentorData({
      ...mentorData,
      profile: imageUrl,
    });
  };

  const handleProfileRemove = async e => {
    setMentorData({
      ...mentorData,
      profile: "",
    });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setMentorData({
      ...mentorData,
      [name]: value,
    });
  };
  const handleExpChange = event => {
    const { name, value } = event.target;
    setDummyExp({
      ...dummyExp,
      [name]: value,
    });
  };
  const handleEduChange = event => {
    const { name, value } = event.target;
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

  const priceChange = (time, value) => {
    const newPrice = { ...mentorData.price, [time]: value };
    setMentorData({ ...mentorData, price: newPrice });
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
    console.log(mentorData);
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
    <form className={`flex-col-center ${styles.MentorProfile}`}>
      {/* <div className={styles.profile}>
        <div className={`flex-row-center ${styles.imgContainer}`}>
          <img
            src={mentorData.profile}
            className={styles.profileImage}
            alt="profile image"
          />
        </div>
        <input type="file" name="profile" onChange={handleProfileChange} />
        <button className={styles.removeProfileButton}>Remove</button>
      </div>
 */}
      {/* name */}
      <div className={`flex-row-center ${styles.inputContainer}`}>
        <span>Name:</span>
        <input
          type="text"
          name="name"
          value={mentorData.name}
          onChange={handleChange}
        />
      </div>

      {/* email */}
      <div className={`flex-row-center ${styles.inputContainer}`}>
        <span>Email:</span>
        <input
          type="email"
          name="email"
          value={mentorData.email}
          onChange={handleChange}
        />
      </div>

      {/* whatsapp */}
      <div className={`flex-row-center ${styles.inputContainer}`}>
        <span>WhatsApp No.:</span>
        <input
          type="number"
          name="wnumber"
          value={mentorData.wnumber}
          onChange={handleChange}
        />
      </div>

      {/* bio */}
      <div className={`flex-row-center ${styles.inputContainer}`}>
        <span>Bio:</span>
        <textarea
          name="bio"
          className={styles.biotextArea}
          value={mentorData.bio}
          onChange={handleChange}
        />
      </div>

      {/* areas of interest */}
      <div className={`flex-col-center ${styles.areasOfInterest}`}>
        <span>Areas Of Interest:</span>

        <div className={`flex-col-center ${styles.allProfilesContainer}`}>
          <div className={`flex-col-center ${styles.profilesBox}`}>
            {mentorData.areasOfInterest.map((item, ind) => (
              <div
                key={ind}
                className={`flex-row-center ${styles.profilesItem} ${styles.profilesItem}`}
              >
                <span className={styles.profileName}>{item}</span>
                <span
                  className={styles.trashIcon}
                  onClick={() => {
                    setMentorData({
                      ...mentorData,
                      areasOfInterest: mentorData.areasOfInterest.filter(
                        ite => ite !== item
                      ),
                    });
                  }}
                >
                  <FaTrash />
                </span>{" "}
              </div>
            ))}
          </div>

          <div className={`flex-col-center ${styles.profileContainer}`}>
            <label className={`flex-row-center ${styles.singleProfile}`}>
              <span>Non-Core Profiles:</span>
              <select
                name="nonCoreAreasOfInterest"
                value={mentorData.areasOfInterest}
                onChange={event => {
                  if (event.target.value !== "")
                    setMentorData({
                      ...mentorData,
                      areasOfInterest: [
                        ...mentorData.areasOfInterest,
                        event.target.value,
                      ],
                    });
                }}
              >
                {profiles.nonCore.map((item, ind) => (
                  <option key={ind} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <label className={`flex-row-center ${styles.singleProfile}`}>
              <span> Core Profiles: </span>
              <select
                name="coreAreasOfInterest"
                value={mentorData.areasOfInterest}
                onChange={event => {
                  if (event.target.value !== "")
                    setMentorData({
                      ...mentorData,
                      areasOfInterest: [
                        ...mentorData.areasOfInterest,
                        event.target.value,
                      ],
                    });
                }}
              >
                {profiles.core.map((item, ind) => (
                  <option key={ind} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* company details */}
      <div className={`flex-col-center ${styles.companyDetails}`}>
        <span>Company Details:</span>

        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span>Current Company:</span>

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
        </div>
        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span>Current Position:</span>
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
      </div>

      {/* experience */}
      <div className={`flex-col-center ${styles.experienceContainer}`}>
        <span>Experience:</span>

        <div className={`flex-col-center ${styles.experienceBox}`}>
          <div className={`flex-col-center ${styles.top}`}>
            {mentorData.experience.map((item, key) => (
              <div key={key} className={`flex-row-center ${styles.expListBox}`}>
                <p className={styles.expListItems}>
                  {item.position} at {item.company} ({item.startDate} -{" "}
                  {item.endDate})
                </p>
                <FaTrash
                  onClick={() =>
                    setMentorData({
                      ...mentorData,
                      experience: mentorData.experience.filter(
                        ite => ite !== item
                      ),
                    })
                  }
                />
              </div>
            ))}
          </div>
          <div className={`flex-row-center ${styles.bottom}`}>
            <div className={`flex-row-center ${styles.inputContainer}`}>
              <span>Company:</span>
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={dummyExp.company}
                onChange={handleExpChange}
              />
            </div>
            <div className={`flex-row-center ${styles.inputContainer}`}>
              <span>Position: </span>
              <input
                type="text"
                name="position"
                placeholder="Position"
                value={dummyExp.position}
                onChange={handleExpChange}
              />
            </div>
            <div className={`flex-row-center ${styles.inputContainer}`}>
              <span>Start Date:</span>
              <input
                type="text"
                name="startDate"
                placeholder="Start Date"
                value={dummyExp.startDate}
                onChange={handleExpChange}
              />
            </div>
            <div className={`flex-row-center ${styles.inputContainer}`}>
              <span>End Date:</span>
              <input
                type="text"
                name="endDate"
                placeholder="End Date"
                value={dummyExp.endDate}
                onChange={handleExpChange}
              />
            </div>
          </div>
          <IoSend onClick={handleExperienceAddButton} />
        </div>
      </div>

      {/* education */}
      <div className={`flex-col-center ${styles.experienceContainer}`}>
        <span>Education:</span>

        <div className={`flex-col-center ${styles.experienceBox}`}>
          <div className={`flex-col-center ${styles.top}`}>
            {mentorData.education.map((item, key) => (
              <div className={`flex-row-center ${styles.expListBox}`} key={key}>
                <p className={styles.eduListItems}>
                  {item.degree} in {item.passingYear} at specialisation in{" "}
                  {item.specialisation} from {item.department}, {item.institute}
                </p>
                <FaTrash
                  onClick={() => {
                    setMentorData({
                      ...mentorData,
                      education: mentorData.education.filter(
                        ite => ite != item
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
                placeholder="Institute"
                value={dummyEdu.institute}
                onChange={handleEduChange}
              />
            </div>
            <div className={`flex-row-center ${styles.inputContainer}`}>
              <span>Passing Year:</span>
              <input
                type="text"
                name="passingYear"
                placeholder="Passing year"
                value={dummyEdu.passingYear}
                onChange={handleEduChange}
              />
            </div>
            <div className={`flex-row-center ${styles.inputContainer}`}>
              <span>Degree:</span>
              <input
                type="text"
                name="degree"
                placeholder="Degree"
                value={dummyEdu.degree}
                onChange={handleEduChange}
              />
            </div>
            <div className={`flex-row-center ${styles.inputContainer}`}>
              <span>Department:</span>
              <input
                type="text"
                name="department"
                placeholder="department"
                value={dummyEdu.department}
                onChange={handleEduChange}
              />
            </div>
            <div className={`flex-row-center ${styles.inputContainer}`}>
              <span>Specialisation:</span>
              <input
                type="text"
                name="specialisation"
                placeholder="specialisation"
                value={dummyEdu.specialisation}
                onChange={handleEduChange}
              />
            </div>
          </div>

          <IoSend
            className={styles.addEduButton}
            onClick={handleEducationAddButton}
          />
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
        </div>
        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span>Github:</span>
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
        </div>
        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span>Github:</span>
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
        </div>
      </div>

      {/* price */}
      <div className={`flex-col-center ${styles.priceContainer}`}>
        <span>Price:</span>
        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span>For 15 min (INR):</span>
          <input
            type="number"
            value={mentorData.price[15]}
            onChange={e => priceChange(15, e.target.value)}
            placeholder="Price"
          />
        </div>
        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span> For 30 min (INR):</span>
          <input
            type="number"
            value={mentorData.price[30]}
            onChange={e => priceChange(30, e.target.value)}
            placeholder="Price"
          />
        </div>
        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span>For 45 min (INR):</span>
          <input
            type="number"
            value={mentorData.price[45]}
            onChange={e => priceChange(45, e.target.value)}
            placeholder="Price"
          />
        </div>
        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span>For 60 min (INR):</span>
          <input
            type="number"
            value={mentorData.price[60]}
            onChange={e => priceChange(60, e.target.value)}
            placeholder="Price"
          />
        </div>
      </div>

      {/* schedule */}
      <div className={`flex-col-center ${styles.scheduleContainer}`}>
        <span>Schedule</span>
        <div>
          {[
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ].map(day => (
            <div key={day} className={styles.scheduleGroup}>
              <div className={styles.dayCheck}>
                <input
                  type="checkbox"
                  id={`${day}-checkbox`}
                  checked={selectedTimes[day]?.allDay || false}
                  onChange={e => handleCheckboxChange(day, e.target.checked)}
                />
                <h3>{day}</h3>
              </div>
              <div onClick={() => setPopOpen(pre => ({ ...pre, [day]: true }))}>
                <IoAddCircle /> Add
              </div>

              <PopUpScheduleHandler
                open={popOpen[day] || false}
                setOpen={setPopOpen}
                day={day}
                handleScheduleSlotAdd={handleScheduleSlotAdd}
              />

              {mentorData.schedule[day]
                ? mentorData.schedule[day].map((item, index) => (
                    <div key={index}>
                      {" "}
                      {item.startingTime} - {item.endingTime}{" "}
                      <FaTrash
                        onClick={() => handleScheduleSlotDelete(day, item)}
                      />
                    </div>
                  ))
                : null}
            </div>
          ))}
          <button className={styles.scheduleSaveButton}>Reset</button>
        </div>
      </div>

      {/* payment */}
      <div className={`flex-col-center ${styles.paymentContainer}`}>
        <span className={styles.paymentLabel}> Payment Details:</span>

        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span>Account Name:</span>
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
        </div>
        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span>Account Number:</span>
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
        </div>
        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span>IFSC Code:</span>
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
        </div>
        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span>Branch Name:</span>
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
        </div>
        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span>Branch Code:</span>
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
        </div>
        <div className={`flex-row-center ${styles.inputContainer}`}>
          <span>UPI:</span>
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
        <div className={styles.paymentInputGroup}></div>
      </div>

      <button type="submit" className={`btn1`} onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default MentorProfile;
