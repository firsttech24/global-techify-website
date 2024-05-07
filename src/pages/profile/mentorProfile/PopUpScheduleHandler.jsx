import React, { useState } from "react";

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

const PopUpScheduleHandler = ({
  open,
  setOpen,
  handleScheduleSlotAdd,
  day,
}) => {
  const [startingTime, setStartingTime] = useState("");
  const [endingTime, setEndingTime] = useState("");

  const submitHandler = () => {
    console.log(day);
    if (timeSlots.indexOf(startingTime) >= timeSlots.indexOf(endingTime)) {
      alert("not valid slot");
    } else {
      handleScheduleSlotAdd(day, startingTime, endingTime);
      setOpen(false);
    }
  };

  return (
    <div style={open ? { display: "flex" } : { display: "none" }}>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          top: 0,
          left: 0,
          position: "fixed",
          backgroundColor: "rgba(33, 33, 33, 0.6)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#333",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="start-time" style={{ marginRight: "10px" }}>
              Starting Time:
            </label>
            <select
              name="start-time"
              id="start-time"
              style={{ padding: "5px", borderRadius: "4px", border: "none" }}
              value={startingTime}
              onChange={e => setStartingTime(e.target.value)}
            >
              {timeSlots.map((timeSlot, index) => (
                <option key={index} value={timeSlot}>
                  {timeSlot}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="end-time" style={{ marginRight: "10px" }}>
              Ending Time:
            </label>
            <select
              name="end-time"
              id="end-time"
              style={{ padding: "5px", borderRadius: "4px", border: "none" }}
              value={endingTime}
              onChange={e => setEndingTime(e.target.value)}
            >
              {timeSlots.map((timeSlot, index) => (
                <option key={index} value={timeSlot}>
                  {timeSlot}
                </option>
              ))}
            </select>
          </div>
          <span
            style={{
              padding: "8px 20px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "rgb(76, 175, 80)",
              color: "white",
              margin: "10px",
            }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </span>
          <span
            style={{
              padding: "8px 20px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#4CAF50",
              color: "white",
              margin: "10px",
            }}
            onClick={submitHandler}
          >
            Add
          </span>
        </div>
      </div>
    </div>
  );
};

export default PopUpScheduleHandler;
