import { render, screen, waitFor } from "@testing-library/react";
import CalendarComponent from "./Calendar";
import { MemoryRouter } from "react-router-dom";

global.fetch = jest.fn();

describe("CalendarComponent", () => {
  it("renders without crashing", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [] }),
    });

    render(
      <MemoryRouter>
        <CalendarComponent events={[]} removeEvent={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  it("displays error message when fetch fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Network Error"));

    render(
      <MemoryRouter>
        <CalendarComponent events={[]} removeEvent={() => {}} />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/error/i));

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
