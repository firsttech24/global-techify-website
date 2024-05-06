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
    student: localStorage.getItem("gtechify!#"),
    mentor: mentor._id,
    date: "",
    startTime: "",
    endTime: "",
    duration: 60,
    price : null,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
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

  const handleRequestClick = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_HOST_API}/meet/initiate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          const message = response.json().message;
          if(message) alert(message);
          else alert("server error")
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIsOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {isOpen && (
        <div
          className={styles.modalBackground}
          onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Set Schedule</h3>
              <button
                className={styles.closeButton}
                onClick={closeModal}>
                Close
              </button>
            </div>
            <div className={styles.modalBody}>
              <CustomDatePicker
                schedule={mentor?.schedule}
                handleDateChange={handleDateChange}
                setSelectedDay={setSelectedDay}
              />
              <div className={styles.rightModal}>
                <div className={styles.profileRadio}>
                  <span>Choose Profile:</span>
                  <div className={styles.profileRadioOptionsBox}>
                    {mentor?.areasOfInterest.map((item, index) => (
                      <div
                        key={index}
                        className={styles.profileRadioOptions}>
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
                <div className={styles.typeRadio}>
                  <span className={styles.typeHeading}>
                    Type Of Session :-{" "}
                  </span>
                  <div className={styles.typeRow}>
                    <label className={styles.typeOptions}>
                      <input
                        type="radio"
                        name="type"
                        value="mock_interview"
                        onChange={handleChange}
                      />
                      Mock Interview
                    </label>
                    <label className={styles.typeOptions}>
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

                <div className={styles.durationRadio}>
                  <span>Choose Duration (min) :- </span>
                  <div className={styles.durationRadioBox}>
                    {[15, 30, 45, 60].map((dur, ind) => (
                      <span className={styles.durationRadioItems}>
                        {" "}
                        <input
                          type="radio"
                          name="duration"
                          onChange={() => {
                            setDuration(dur);
                            setFormData({...formData, price : mentor.price[dur]})
                          }}
                        />
                        {dur} (Rs.{mentor.price[dur]})
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.slotRadio}>
                  <span>Choose Slot :- </span>
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
            <div className={styles.buttonRow}>
              <button onClick={handleRequestClick}>Send Requests</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalenderModel;
