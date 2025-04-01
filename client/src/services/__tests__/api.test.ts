import { fetchUserData } from "../api";

global.fetch = jest.fn();

describe("fetchUserData", () => {
  it("should fetch user data successfully", async () => {
    const mockUser = { id: "1", name: "John Doe" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const result = await fetchUserData("1");
    expect(result).toEqual(mockUser);
  });
});
