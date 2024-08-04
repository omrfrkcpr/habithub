import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import useAuthCalls from "../hooks/useAuthCalls";
import SignUp from "../pages/SignUp";
import "@testing-library/jest-dom";
import SignUpForm from "../components/forms/SignUpForm";

jest.mock("../hooks/useAuthCalls");

const mockStore = configureStore<InitialAuthState>([]);

describe("SignUp Component", () => {
  let store: MockStoreEnhanced<InitialAuthState, any>;
  const mockRegister = jest.fn();

  beforeEach(() => {
    store = mockStore({
      currentUser: null,
      loading: false,
      error: false,
      accessToken: null,
      refreshToken: null,
      remainingTime: 0,
    });

    // Mock useAuthCalls to return the mock register function
    (useAuthCalls as jest.Mock).mockReturnValue({
      register: mockRegister,
    });

    jest.clearAllMocks();
  });

  it("renders SignUp component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByText(/Get started with your account/i)
    ).toBeInTheDocument();
  });

  it("displays validation errors for empty fields", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Get Started!/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Please provide your firstname/i)
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Please provide your lastname/i)
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  it("calls register function with correct values", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUpForm />
        </BrowserRouter>
      </Provider>
    );

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText(/Firstname/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Lastname/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getAllByPlaceholderText(/Password/i)[0], {
      target: { value: "Password123!" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), {
      target: { value: "Password123!" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Get Started!/i }));

    // Verify that register was called with the correct values
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledTimes(1);
    });

    expect(mockRegister).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "Password123!",
    });
  });
});
