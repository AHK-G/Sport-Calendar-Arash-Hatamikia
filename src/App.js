import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Calendar from "./pages/Calendar";
import EventDetailPage from "./components/eventDetailPage/EventDetailPage";
import AddEventForm from "./components/addEventForm/AddEventForm";
import Navigation from "./components/navigation/Navigation";
import "./index.css";

function App() {
  const [events, setEvents] = useState([]);

  const loadEventsFromStorage = () => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      return JSON.parse(storedEvents);
    }
    return [];
  };

  useEffect(() => {
    const storedEvents = loadEventsFromStorage();
    setEvents(storedEvents);
  }, []);

  const addEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const removeEvent = (eventToDelete) => {
    const updatedEvents = events.filter((event) => event !== eventToDelete);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={<Calendar events={events} removeEvent={removeEvent} />}
          />
          <Route path="/event-details" element={<EventDetailPage />} />
          <Route
            path="/add-event"
            element={<AddEventForm addEvent={addEvent} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
