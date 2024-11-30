import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";

describe("Navigation", () => {
  test("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const calendarLink = screen.getByText(/calendar/i);
    const addEventLink = screen.getByText(/add event/i);

    expect(calendarLink).toBeInTheDocument();
    expect(addEventLink).toBeInTheDocument();
  });

  test("links have the correct href attributes", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const calendarLink = screen.getByText(/calendar/i);
    const addEventLink = screen.getByText(/add event/i);

    expect(calendarLink.closest("a")).toHaveAttribute("href", "/");
    expect(addEventLink.closest("a")).toHaveAttribute("href", "/add-event");
  });
});
