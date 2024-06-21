/** @format */

import React, { useState, useEffect } from "react";

function TimeSlotGenerator({ schedule, duration, setFormData }) {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    generateTimeSlots();
  }, [schedule, duration]);

const generateTimeSlots = () => {
  if (!schedule.length) {
    alert("No schedule available.");
    return;
  }

  const slots = [];
  schedule.forEach((slot) => {
    const start = new Date(`01/01/2022 ${slot.startingTime}`);
    const end = new Date(`01/01/2022 ${slot.endingTime}`);
    const slotDuration = end - start;

    if (slotDuration >= duration * 60 * 1000) {
      let currentTime = start.getTime();

      while (currentTime + duration * 60 * 1000 <= end.getTime()) {
        const startTime = new Date(currentTime);
        const endTime = new Date(currentTime + duration * 60 * 1000);

        const startHours = startTime.getHours().toString().padStart(2, "0");
        const startMinutes = startTime.getMinutes().toString().padStart(2, "0");
        const startAmPm = startHours >= 12 ? "PM" : "AM";
        const formattedStartTime = `${
          startHours % 12
        }:${startMinutes} ${startAmPm}`;

        const endHours = endTime.getHours().toString().padStart(2, "0");
        const endMinutes = endTime.getMinutes().toString().padStart(2, "0");
        const endAmPm = endHours >= 12 ? "PM" : "AM";
        const formattedEndTime = `${endHours % 12}:${endMinutes} ${endAmPm}`;

        const formattedSlot = `${formattedStartTime} - ${formattedEndTime}`;
        slots.push({
          startTime: formattedStartTime,
          endTime: formattedEndTime,
        });

        currentTime += duration * 60 * 1000;
      }
    }
  });

  setTimeSlots(slots);
};


  const handleSlotClick = (slot, index) => {
    setSelectedSlot(index);
    if (setFormData) {
      setFormData((prev) => ({
        ...prev,
        startTime: slot.startTime,
        endTime: slot.endTime,
      }));
    }
  };


  return (
    <div>
      <ul style={{height : "100px", overflowY : "auto"}}>
        {timeSlots.map((slot, index) => (
          <li
            key={index}
            onClick={() => handleSlotClick(slot, index)}
            style={{
              cursor: "pointer",
              backgroundColor: selectedSlot === index ? "blue" : "",
              color: selectedSlot === index ? "white" : "",
              display: "flex",
              padding: "5px",
              width: "max-content",
            }}>
            <span>
              <span>{slot.startTime}</span> - <span>{slot.endTime}</span>{" "}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TimeSlotGenerator;
