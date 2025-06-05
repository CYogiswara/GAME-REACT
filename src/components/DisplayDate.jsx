import React, { useState, useEffect } from "react";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DisplayDate = () => {
  const [time, setTime] = useState(() => ({
    hours: parseInt(localStorage.getItem("hours")) || 0,
    minutes: parseInt(localStorage.getItem("minutes")) || 0,
    day: parseInt(localStorage.getItem("day")) || 1,
    weekDayIndex:
      daysOfWeek.indexOf(localStorage.getItem("weekDay")) >= 0
        ? daysOfWeek.indexOf(localStorage.getItem("weekDay"))
        : 0,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, day, weekDayIndex } = prev;

        minutes++;
        if (minutes >= 60) {
          minutes = 0;
          hours++;
          if (hours >= 24) {
            hours = 0;
            day++;
            weekDayIndex = (weekDayIndex + 1) % 7;
          }
        }

      
        localStorage.setItem("hours", hours);
        localStorage.setItem("minutes", minutes);
        localStorage.setItem("day", day);
        localStorage.setItem("weekDay", daysOfWeek[weekDayIndex]);

        return { hours, minutes, day, weekDayIndex };
      });
    }, 300); 

    return () => clearInterval(interval);
  }, []);

  const { hours, minutes, day, weekDayIndex } = time;

  const formatTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  const greeting = getGreeting(hours);
  const weekDay = daysOfWeek[weekDayIndex];
  const playerName = localStorage.getItem("playerName") || "Player";

  function getGreeting(hour) {
    if (hour >= 3 && hour < 11) return "Good Morning";
    if (hour >= 11 && hour < 15) return "Good Afternoon";
    if (hour >= 15 && hour < 19) return "Good Evening";
    return "Good Night";
  }

  return (
    <div>
      <div className="date">Day {day} - {weekDay} | {formatTime}</div>
      <div className="character-name">{greeting}, {playerName}!</div>
    </div>
  );
};

export default DisplayDate;
