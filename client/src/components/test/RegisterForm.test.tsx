import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "../RegisterForm";
import { registerUser } from "../../services/auth";

jest.mock("../../services/auth");

describe("RegisterForm Component", () => {
  const mockRegisterUser = registerUser as jest.Mock;

  beforeEach(() => {
    mockRegisterUser.mockClear();
  });

  it("should render the form with email and password inputs", () => {
    render(<RegisterForm />);
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("should update email and password inputs on change", () => {
    render(<RegisterForm />);
    const emailInput = screen.getByLabelText("Email:") as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      "Password:"
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("should display success message on successful registration", async () => {
    mockRegisterUser.mockResolvedValueOnce({
      message: "Registration successful",
      user: { email: "test@example.com", password: "password123" },
    });

    render(<RegisterForm />);
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Registration successful")).toBeInTheDocument();
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });
  });

  it("should display error message on failed registration", async () => {
    mockRegisterUser.mockRejectedValueOnce(new Error("User already exists"));

    render(<RegisterForm />);
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("User already exists")).toBeInTheDocument();
      expect(screen.queryByText(/successful/i)).not.toBeInTheDocument();
    });
  });

  it("should display generic error message for unexpected errors", async () => {
    mockRegisterUser.mockRejectedValueOnce("Unknown error");

    render(<RegisterForm />);
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("An unexpected error occurred")
      ).toBeInTheDocument();
    });
  });

  it("should display error if email or password is missing", async () => {
    render(<RegisterForm />);
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Email and password are required")
      ).toBeInTheDocument();
      expect(mockRegisterUser).not.toHaveBeenCalled();
    });
  });
});
