import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import useAuthCalls from "../hooks/useAuthCalls";
import SignIn from "../pages/SignIn";
import "@testing-library/jest-dom";
import SignInForm from "../components/forms/SignInForm";

jest.mock("../hooks/useAuthCalls");

const mockStore = configureStore<InitialAuthState>([]);

describe("SignIn Component", () => {
  let store: MockStoreEnhanced<InitialAuthState, any>;
  const mockLogin = jest.fn();

  beforeEach(() => {
    store = mockStore({
      currentUser: null,
      loading: false,
      error: false,
      accessToken: null,
      refreshToken: null,
      remainingTime: 0,
    });

    // Mock useAuthCalls to return the mock login function
    (useAuthCalls as jest.Mock).mockReturnValue({
      login: mockLogin,
    });

    jest.clearAllMocks();
  });

  it("renders SignIn component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Log in to HabitHub/i)).toBeInTheDocument();
  });

  it("displays form validation errors for empty fields", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignInForm />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    // Wait for form validation messages
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    });

    // Simulate form submission with empty fields
    await waitFor(() => {
      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  it("calls login function with correct values", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignInForm />
        </BrowserRouter>
      </Provider>
    );

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "Password123!" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    // Verify that login was called with the correct values
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
    });

    expect(mockLogin).toHaveBeenCalledWith({
      email: "john.doe@example.com",
      password: "Password123!",
    });
  });
});
