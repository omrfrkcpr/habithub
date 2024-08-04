import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import "@testing-library/jest-dom";

// Mock components to avoid unnecessary rendering in tests
jest.mock("../layouts/Navbar", () => () => <div>Navbar</div>);
jest.mock("../components/backgrounds/MainBg", () => () => <div>MainBg</div>);
jest.mock("../layouts/MainCards", () => () => <div>MainCards</div>);
jest.mock("../layouts/Footer", () => () => <div>Footer</div>);

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Main Component", () => {
  it("renders Main component with all child components", () => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );

    // Check that Navbar, MainBg, MainCards, and Footer are rendered
    expect(screen.getByText(/Navbar/i)).toBeInTheDocument();
    expect(screen.getByText(/MainBg/i)).toBeInTheDocument();
    expect(screen.getByText(/MainCards/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer/i)).toBeInTheDocument();

    // Check that the main heading and text are rendered
    expect(screen.getByText(/Do your tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/quickly/i)).toBeInTheDocument();
    expect(screen.getByText(/easy/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Your tasks, your rules, our support/i)
    ).toBeInTheDocument();

    // Check that the "Get Started" button is rendered
    const getStartedButton = screen.getByRole("button", {
      name: /Get Started/i,
    });
    expect(getStartedButton).toBeInTheDocument();
  });

  it("navigates to /signin when 'Get Started' button is clicked", () => {
    const mockNavigate = jest.fn();

    // Use the mocked version of useNavigate
    (require("react-router-dom").useNavigate as jest.Mock).mockImplementation(
      () => mockNavigate
    );

    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );

    const getStartedButton = screen.getByRole("button", {
      name: /Get Started/i,
    });
    fireEvent.click(getStartedButton);

    // Verify that navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/signin");
  });

  it("renders advertisement and app store images", () => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );

    // Check if advertisement image is present
    const advertisementImg = screen.getByAltText(/advertisement/i);
    expect(advertisementImg).toBeInTheDocument();

    // Check if Google Play and App Store images are present
    const googlePlayImg = screen.getByAltText(/google-play/i);
    const appStoreImg = screen.getByAltText(/app-store/i);
    expect(googlePlayImg).toBeInTheDocument();
    expect(appStoreImg).toBeInTheDocument();
  });

  it("renders mental health image and description", () => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );

    // Check if mental health image is present
    const mentalHealthImg = screen.getByAltText(/mental-health/i);
    expect(mentalHealthImg).toBeInTheDocument();

    // Check each part of the description text individually
    expect(screen.getByText(/Maximize/i)).toBeInTheDocument();
    expect(screen.getByText(/productivity/i)).toBeInTheDocument();
    expect(screen.getByText(/and prioritize/i)).toBeInTheDocument();
    expect(screen.getByText(/mental wellness/i)).toBeInTheDocument();
    expect(screen.getByText(/with our website version/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Seamlessly blending mindfulness and/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/task management/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /our platform offers a comprehensive solution for your daily challenges/i
      )
    ).toBeInTheDocument();
  });
});
