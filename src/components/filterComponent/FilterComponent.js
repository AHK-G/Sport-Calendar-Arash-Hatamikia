import React, { useState } from "react";
import { parseISO } from "date-fns";
import "./FilterComponent.css";

function FilterComponent({ allEvents, onEventClick, onDeleteEvent }) {
  const [filters, setFilters] = useState({
    sports: [],
    sportSearch: "",
    startDate: "",
    endDate: "",
    showAddedOnly: false,
  });

  const predefinedFilters = ["Football", "Ice Hockey", "Basketball", "Tennis"];

  const togglePredefinedFilter = (filter) => {
    setFilters((prevFilters) => {
      const { sports } = prevFilters;
      const newSports = sports.includes(filter)
        ? sports.filter((sport) => sport !== filter)
        : [...sports, filter];
      return { ...prevFilters, sports: newSports };
    });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const toggleShowAddedOnly = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      showAddedOnly: !prevFilters.showAddedOnly,
    }));
  };

  const getFilteredEvents = () => {
    if (
      !filters.sports.length &&
      !filters.sportSearch &&
      !filters.startDate &&
      !filters.endDate &&
      !filters.showAddedOnly
    ) {
      return [];
    }

    return allEvents.filter((event) => {
      const eventDate = parseISO(event.dateVenue);
      const eventSport = event.sport ? event.sport : "Football";

      const matchesSports =
        !filters.sports.length ||
        filters.sports.some(
          (selectedSport) =>
            eventSport.toLowerCase() === selectedSport.toLowerCase()
        );

      const matchesSearch =
        !filters.sportSearch ||
        eventSport.toLowerCase().includes(filters.sportSearch.toLowerCase());

      const matchesStartDate =
        !filters.startDate || eventDate >= parseISO(filters.startDate);

      const matchesEndDate =
        !filters.endDate || eventDate <= parseISO(filters.endDate);

      const matchesAddedOnly = !filters.showAddedOnly || event.isUserAdded;

      return (
        matchesSports &&
        matchesSearch &&
        matchesStartDate &&
        matchesEndDate &&
        matchesAddedOnly
      );
    });
  };

  const filteredEvents = getFilteredEvents();

  return (
    <div className="filter-component">
      <div className="search-box">
        <div className="input-group">
          <label className="input-label">
            Search
            <input
              type="text"
              name="sportSearch"
              value={filters.sportSearch}
              onChange={handleFilterChange}
              placeholder="Search by sport..."
              className="input-field"
            />
          </label>
          <label className="input-label">
            Start-date
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="input-field"
            />
          </label>
          <label className="input-label">
            End-date
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="input-field"
            />
          </label>
        </div>
      </div>

      <div className="results-list">
        <div className="filters-in-results">
          {predefinedFilters.map((filter, index) => (
            <div
              key={index}
              className="filter-item"
              onClick={() => togglePredefinedFilter(filter)}
            >
              <input
                type="checkbox"
                checked={filters.sports.includes(filter)}
                onChange={() => togglePredefinedFilter(filter)}
                className="checkbox"
              />
              {filter}
            </div>
          ))}
          <div className="toggle-added-only">
            <input
              type="checkbox"
              checked={filters.showAddedOnly}
              onChange={toggleShowAddedOnly}
              id="showAddedOnly"
            />
            <label htmlFor="showAddedOnly" className="checkbox-label">
              Added Events Only
            </label>
          </div>
        </div>

        <div className="results">
          {filteredEvents.map((event, index) => (
            <li
              key={index}
              className="result-item"
              onClick={() => onEventClick(event)}
            >
              <strong>{event.sport || "Football"}</strong>
              <p>
                {event.homeTeam?.name || "TBA"} vs{" "}
                {event.awayTeam?.name || "TBA"}
              </p>
              <p>{new Date(event.dateVenue).toLocaleDateString()}</p>
              {event.isUserAdded && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteEvent(event, e);
                  }}
                  className="delete-btn"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <p className="no-results">No events found.</p>
        )}
      </div>
    </div>
  );
}

export default FilterComponent;
