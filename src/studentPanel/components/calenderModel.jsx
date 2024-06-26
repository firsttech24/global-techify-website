/**
 * @format
 * @htmlFormat
 */

import React, { useEffect, useState } from "react";
import styles from "./calendermodel.module.css";
import CustomDatePicker from "./Calender";
import TimeSlotGenerator from "./TimeSlotGenerator";

const CalenderModel = ({ isOpen, setIsOpen, mentor }) => {
  const [duration, setDuration] = useState(null);

  const [selectedDay, setSelectedDay] = useState("");

  const [formData, setFormData] = useState({
    topic: "",
    type: "",
    student: JSON.parse(localStorage.getItem("gtechify!#")).id,
    mentor: mentor._id,
    date: "",
    startTime: "",
    endTime: "",
    duration: 60,
    price : null,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = date => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleRequestClick = e => {
    e.preventDefault();

    if (
      !formData.topic ||
      !formData.type ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    console.log(formData);

    fetch(`${import.meta.env.VITE_HOST_API}/meet/initiate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          const message = response.json().message;
          if (message) alert(message);
          else alert("server error");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setIsOpen(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      {isOpen && (
        <div
          className={`flex-row-center ${styles.modalBackground}`}
          onClick={closeModal}
        >
          <div
            className={`flex-col-center ${styles.modalContent}`}
            onClick={e => e.stopPropagation()}
          >
            {/* header */}
            <div className={`flex-row-center ${styles.modalHeader}`}>
              <h2>Set Schedule:</h2>
              <button className={styles.closeButton} onClick={closeModal}>
                Close
              </button>
            </div>

            {/* body */}
            <div className={`flex-row-center ${styles.modalBody}`}>
              <CustomDatePicker
                schedule={mentor?.schedule}
                handleDateChange={handleDateChange}
                setSelectedDay={setSelectedDay}
              />

              <div className={`flex-col-center ${styles.rightModal}`}>
                {/* choose profile */}
                <div className={`flex-col-center ${styles.profileRadio}`}>
                  <span>Choose Profile:</span>
                  <div className={styles.profileRadioOptionsBox}>
                    {mentor?.areasOfInterest.map((item, index) => (
                      <div key={index} className={styles.profileRadioOptions}>
                        <input
                          type="radio"
                          id={item}
                          name="topic"
                          value={item}
                          onChange={handleChange}
                        />
                        <label htmlFor={item}>{item}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* type of session */}
                <div className={`flex-col-center ${styles.typeRadio}`}>
                  <span className={styles.typeHeading}>Type Of Session:</span>

                  <div className={`flex-col-center ${styles.typeRow}`}>
                    <label className={`flex-row-center ${styles.typeOptions}`}>
                      <input
                        type="radio"
                        name="type"
                        value="mock_interview"
                        onChange={handleChange}
                      />
                      Mock Interview
                    </label>
                    <label className={`flex-row-center ${styles.typeOptions}`}>
                      <input
                        type="radio"
                        name="type"
                        value="mentorship_session"
                        onChange={handleChange}
                      />
                      Mentorship Session
                    </label>
                  </div>
                </div>

                {/* choose duration */}
                <div className={`flex-col-center ${styles.durationRadio}`}>
                  <span className={styles.heading}>Choose Duration (min):</span>
                  <div className={`flex-row-center ${styles.durationRadioBox}`}>
                    {[15, 30, 45, 60].map((dur, ind) => (
                      <span
                        className={`flex-col-center ${styles.durationRadioItems}`}
                      >
                        <input
                          type="radio"
                          name="duration"
                          id={dur}
                          onChange={() => {
                            setDuration(dur);
                            setFormData({...formData, price : mentor.price[dur]})
                          }}
                        />
                        <label htmlFor={dur}>
                          {dur} (Rs.{mentor.price[dur]})
                        </label>
                      </span>
                    ))}
                  </div>
                </div>

                {/* choose slot */}
                <div className={styles.slotRadio}>
                  <span className={styles.heading}>Choose Slot: </span>
                  {selectedDay && duration && (
                    <TimeSlotGenerator
                      schedule={mentor.schedule[selectedDay.toLowerCase()]}
                      duration={duration}
                      setFormData={setFormData}
                    />
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleRequestClick}
              className={`btn1 ${styles.sendRqstBtn}`}
            >
              Send Requests
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CalenderModel;
