import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddEventForm from "./AddEventForm";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("AddEventForm", () => {
  test("renders the form with the correct fields and button", () => {
    render(
      <Router>
        <AddEventForm addEvent={jest.fn()} />
      </Router>
    );

    expect(screen.getByLabelText(/home team/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/away team/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/stadium/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /add event/i })
    ).toBeInTheDocument();
  });

  test("submits the form and calls addEvent with correct data", async () => {
    const addEvent = jest.fn();
    const mockNavigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => mockNavigate);

    render(
      <Router>
        <AddEventForm addEvent={addEvent} />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/sport/i), {
      target: { value: "Football" },
    });
    fireEvent.change(screen.getByLabelText(/home team/i), {
      target: { value: "Team A" },
    });
    fireEvent.change(screen.getByLabelText(/away team/i), {
      target: { value: "Team B" },
    });
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: "2024-12-25" },
    });
    fireEvent.change(screen.getByLabelText(/time/i), {
      target: { value: "15:00" },
    });
    fireEvent.change(screen.getByLabelText(/stadium/i), {
      target: { value: "Stadium A" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add event/i }));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/"));

    expect(addEvent).toHaveBeenCalledWith({
      dateVenue: "2024-12-25",
      sport: "Football",
      homeTeam: { name: "Team A" },
      awayTeam: { name: "Team B" },
      timeVenueUTC: "15:00",
      stadium: "Stadium A",
      group: "TBA",
      isUserAdded: true,
    });
  });

  test("alerts if form is submitted with missing fields", () => {
    window.alert = jest.fn();

    render(
      <Router>
        <AddEventForm addEvent={jest.fn()} />
      </Router>
    );

    fireEvent.click(screen.getByRole("button", { name: /add event/i }));

    expect(window.alert).toHaveBeenCalledWith("Please fill in all fields!");
  });
});
