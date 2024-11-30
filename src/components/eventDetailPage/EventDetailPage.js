import React from "react";
import { useLocation } from "react-router-dom";
import "./EventDetailPage.css";

const EventDetailPage = () => {
  const location = useLocation();
  const { event } = location.state || {};

  if (!event) {
    return (
      <div className="event-detail-container">No event details available.</div>
    );
  }

  return (
    <div className="event-detail-container">
      <h1>{event.sport} Match Details</h1>
      <p>
        <strong>Home Team:</strong> {event.homeTeam?.name || "TBA"}
      </p>
      <p>
        <p>
          <strong>Away Team:</strong> {event.awayTeam?.name || "TBA"}
        </p>
      </p>
      <p>
        <strong>Competition:</strong> {event.originCompetitionName || "N/A"}
      </p>
      <p>
        <strong>Season:</strong> {event.season || "N/A"}
      </p>
      <p>
        <strong>Date:</strong> {event.dateVenue || "TBA"}
      </p>
      <p>
        <strong>Time:</strong> {event.timeVenueUTC || "TBA"}
      </p>
      <p>
        <strong>Stadium:</strong> {event.stadium || "Not Available"}
      </p>
      <p>
        <strong>Stage:</strong> {event.stage?.name || "N/A"} (Order:{" "}
        {event.stage?.ordering || "N/A"})
      </p>
      <p>
        <strong>Group:</strong> {event.group || "Not Available"}
      </p>

      {event.status === "played" && event.result && (
        <div className="result-section">
          <div className="result">
            <p className="score">
              {event.result.homeGoals} - {event.result.awayGoals}
            </p>
            <p>
              <strong>Winner:</strong> {event.result.winner}
            </p>
          </div>
        </div>
      )}

      {event.status === "scheduled" && !event.result && (
        <div className="status-scheduled">
          <p>
            <strong>Match is scheduled but no result yet.</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;
