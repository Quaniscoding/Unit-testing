import { render, screen } from "@testing-library/react";
import App from "../App";

// Mock RegisterForm component
jest.mock("./components/RegisterForm", () => {
  const mockRegisterForm = () => <div>RegisterForm Mocked</div>;
  mockRegisterForm.displayName = "RegisterForm";
  return mockRegisterForm;
});

describe("App Component", () => {
  it("should render the app title", () => {
    render(<App />);
    expect(screen.getByText("My React TS App")).toBeInTheDocument();
  });

  it("should render RegisterForm mocked content", () => {
    render(<App />);
    expect(screen.getByText("RegisterForm Mocked")).toBeInTheDocument();
  });
});
