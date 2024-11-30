import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterComponent from "./FilterComponent";

const mockEvents = [
  {
    sport: "Football",
    homeTeam: { name: "Team A" },
    awayTeam: { name: "Team B" },
    dateVenue: "2024-12-01",
    isUserAdded: true,
  },
  {
    sport: "Basketball",
    homeTeam: { name: "Team C" },
    awayTeam: { name: "Team D" },
    dateVenue: "2024-12-05",
    isUserAdded: false,
  },
  {
    sport: "Ice Hockey",
    homeTeam: { name: "Team E" },
    awayTeam: { name: "Team F" },
    dateVenue: "2024-12-10",
    isUserAdded: true,
  },
];

test("renders 'No events found' when no events match filters", () => {
  render(
    <FilterComponent
      allEvents={mockEvents}
      onEventClick={() => {}}
      onDeleteEvent={() => {}}
    />
  );

  fireEvent.change(screen.getByLabelText("Start-date"), {
    target: { value: "2025-01-01" },
  });
  fireEvent.change(screen.getByLabelText("End-date"), {
    target: { value: "2025-01-31" },
  });

  expect(screen.getByText("No events found.")).toBeInTheDocument();
});
