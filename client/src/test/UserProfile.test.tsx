import { render, screen, waitFor } from "@testing-library/react";
import * as api from "../services/api";
import { UserProfile } from "../components/UserProfile";

jest.mock("../../services/api");

describe("UserProfile", () => {
  const mockFetchUserData = api.fetchUserData as jest.Mock;

  it("should display user name after fetching", async () => {
    mockFetchUserData.mockResolvedValueOnce({ id: "1", name: "John Doe" });
    render(<UserProfile userId="1" />);

    await waitFor(() => {
      expect(screen.getByText("User: John Doe")).toBeInTheDocument();
    });
  });
});
