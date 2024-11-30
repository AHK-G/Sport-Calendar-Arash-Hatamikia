import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { parseISO, isSameDay } from "date-fns";
import { useNavigate } from "react-router-dom";
import FilterComponent from "../components/filterComponent/FilterComponent";
import "./Calendar.css";

function CalendarComponent({ events, removeEvent }) {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const localSportData = [
    {
      dateVenue: "2019-07-18",
      sport: "Football",
      homeTeam: { name: "Salzburg" },
      awayTeam: { name: "Sturm" },
      timeVenueUTC: "18:30:00",
    },
    {
      dateVenue: "2019-10-23",
      sport: "Ice Hockey",
      homeTeam: { name: "KAC" },
      awayTeam: { name: "Capitals" },
      timeVenueUTC: "09:45:00",
    },
  ];

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/sportData.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const allEvents = [...(data || []), ...localSportData, ...events];

  const getEventsForDate = (date) => {
    return allEvents.filter((event) =>
      isSameDay(parseISO(event.dateVenue), date)
    );
  };

  const handleEventClick = (event) => {
    navigate("/event-details", { state: { event } });
  };

  const renderEventMarker = ({ date, view }) => {
    if (view === "month") {
      const eventsForDate = getEventsForDate(date);

      return (
        <div className="tile-container">
          <div className="day-number">{date.getDate()}</div>

          {eventsForDate.length > 0 && (
            <div className="tile-content">
              {eventsForDate.map((event, idx) => {
                const eventNameAlternative = event.sport
                  ? event.sport
                  : `${event.homeTeam?.name || "TBA"} Vs ${
                      event.awayTeam?.name || "TBA"
                    }`;
                return (
                  <div key={idx}>
                    <button
                      className="event-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleEventClick(event);
                      }}
                    >
                      {eventNameAlternative}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <FilterComponent
        allEvents={allEvents}
        onEventClick={handleEventClick}
        onDeleteEvent={removeEvent}
      />
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={renderEventMarker}
        className={"calendar"}
        showNeighboringMonth={true}
      />
    </div>
  );
}

export default CalendarComponent;
