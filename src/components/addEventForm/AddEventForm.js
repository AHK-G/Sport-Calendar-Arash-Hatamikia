import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddEventForm.css";

function AddEventForm({ addEvent }) {
  const [sport, setSport] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [stadium, setStadium] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!sport || !homeTeam || !awayTeam || !date || !time || !stadium) {
      alert("Please fill in all fields!");
      return;
    }

    const newEvent = {
      dateVenue: date,
      sport,
      homeTeam: { name: homeTeam },
      awayTeam: { name: awayTeam },
      timeVenueUTC: time,
      stadium,
      group: "TBA",
      isUserAdded: true,
    };

    addEvent(newEvent);
    navigate("/");
  };

  return (
    <div className="add-event-form-container">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sport">Sport:</label>
          <input
            id="sport"
            type="text"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="homeTeam">Home Team:</label>
          <input
            id="homeTeam"
            type="text"
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="awayTeam">Away Team:</label>
          <input
            id="awayTeam"
            type="text"
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date (YYYY-MM-DD):</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Time (HH:mm):</label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="stadium">Stadium:</label>
          <input
            id="stadium"
            type="text"
            value={stadium}
            onChange={(e) => setStadium(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default AddEventForm;
