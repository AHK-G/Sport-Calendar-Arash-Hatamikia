import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EventDetailPage from "./EventDetailPage";

const renderWithRouter = (ui, { route = "/", state = {} } = {}) => {
  window.history.pushState(state, "Test page", route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe("EventDetailPage", () => {
  test("renders 'No event details available.' when no event data is passed", () => {
    renderWithRouter(<EventDetailPage />, { route: "/" });

    expect(screen.getByText("No event details available.")).toBeInTheDocument();
  });
});
