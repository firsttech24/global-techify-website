import React, { useEffect, useState } from "react";
import styles from "./calender.module.css";

function CustomDatePicker({ schedule, handleDateChange, setSelectedDay }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [displayedMonth, setDisplayedMonth] = useState(new Date());

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    setSelectedDay(dayName);
    handleDateChange(date);
  };

  

  const isWeekend = (dayIndex) => {
    if (dayIndex === 0 && schedule?.sunday?.length) {
      return true;
    } else if (dayIndex === 1 && schedule?.monday?.length) {
      return true;
    } else if (dayIndex === 2 && schedule?.tuesday?.length) {
      return true;
    } else if (dayIndex === 3 && schedule?.wednesday?.length) {
      return true;
    } else if (dayIndex === 4 && schedule?.thursday?.length) {
      return true;
    } else if (dayIndex === 5 && schedule?.friday?.length) {
      return true;
    } else if (dayIndex === 6 && schedule?.saturday?.length) {
      return true;
    }
    return false;
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

 const getMonthDays = (year, month) => {
   const today = new Date();
   today.setHours(0, 0, 0, 0);
   const firstDayOfMonth = new Date(year, month, 1);
   const lastDayOfMonth = new Date(year, month + 1, 0);
   const startDay = firstDayOfMonth.getDay();
   const daysInMonth = lastDayOfMonth.getDate();
   const days = [];

   for (let i = 0; i < startDay; i++) {
     days.push(null);
   }

   for (let i = 1; i <= daysInMonth; i++) {
     const currentDate = new Date(year, month, i);
     if (currentDate >= today) {
       days.push(currentDate);
     }
   }
   return days;
 };


  const handlePrevMonth = () => {
    const newDate = new Date(displayedMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setDisplayedMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(displayedMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setDisplayedMonth(newDate);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerLista}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {displayedMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className={styles.calendar}>
        <div className={styles.weekdays}>
          {daysOfWeek.map((day) => (
            <div key={day} className={styles.day}>
              {day}
            </div>
          ))}
        </div>
        <div className={styles.days}>
          {getMonthDays(
            displayedMonth.getFullYear(),
            displayedMonth.getMonth()
          ).map((day, index) => (
            <div
              key={index}
              className={`${styles.day} ${
                day &&
                selectedDate &&
                selectedDate.toDateString() === day.toDateString()
                  ? styles.selected
                  : ""
              } ${day && isWeekend(day.getDay()) ? styles.weekend : ""}`}
              onClick={() => handleDateClick(day)}
            >
              {day ? day.getDate() : ""}
            </div>
          ))}
        </div>
      </div>
      <div>
        Selected Date: {selectedDate ? formatDate(selectedDate) : "None"}
      </div>

    </div>
  );
}

export default CustomDatePicker;
