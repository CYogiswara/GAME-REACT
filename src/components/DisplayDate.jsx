import React, { useState, useEffect } from "react";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DisplayDate = () => {
  const [hours, setHours] = useState(() => parseInt(localStorage.getItem("hours")) || 0);
  const [minutes, setMinutes] = useState(() => parseInt(localStorage.getItem("minutes")) || 0);
  const [day, setDay] = useState(() => parseInt(localStorage.getItem("day")) || 1);
  const [weekDayIndex, setWeekDayIndex] = useState(() =>
    daysOfWeek.indexOf(localStorage.getItem("weekDay")) >= 0
      ? daysOfWeek.indexOf(localStorage.getItem("weekDay"))
      : 0
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutes(prevMinutes => {
        let newMinutes = prevMinutes + 1;
        if (newMinutes >= 60) {
          newMinutes = 0;
          setHours(prevHours => {
            let newHours = prevHours + 1;
            if (newHours >= 24) {
              newHours = 0;
              setDay(prevDay => prevDay + 1);
              setWeekDayIndex(prevIndex => (prevIndex + 1) % 7);
            }
            localStorage.setItem("hours", newHours);
            return newHours;
          });
        }
        localStorage.setItem("minutes", newMinutes);
        return newMinutes;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("day", day);
  }, [day]);

  useEffect(() => {
    localStorage.setItem("weekDay", daysOfWeek[weekDayIndex]);
  }, [weekDayIndex]);

  const getGreeting = (hour) => {
    if (hour >= 3 && hour < 11) return "Good Morning";
    if (hour >= 11 && hour < 15) return "Good Afternoon";
    if (hour >= 15 && hour < 19) return "Good Evening";
    return "Good Night";
  };

  const formatTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  const greeting = getGreeting(hours);
  const weekDay = daysOfWeek[weekDayIndex];
  const playerName = localStorage.getItem("playerName");

  return (
    <div>
      <div className="date">Day {day} - {weekDay} | {formatTime}</div>
      <div className="character-name">{greeting}, {playerName}!</div>
    </div>
  );
};

export default DisplayDate;
