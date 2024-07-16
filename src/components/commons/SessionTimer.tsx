import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decrementTime } from "../../features/authSlice";
import { RootState } from "../../app/store";
import useAuthCalls from "../../hooks/useAuthCalls";
import toastNotify from "../../helpers/toastNotify";
import showSwal from "../../helpers/showSwal";

const SessionTimer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { remainingTime } = useSelector((state: RootState) => state.auth);
  const { refresh, logout } = useAuthCalls();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (remainingTime > 0) {
      interval = setInterval(() => {
        dispatch(decrementTime());
      }, 1000); // Dispatch decrementTime every second
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [remainingTime, dispatch]);

  useEffect(() => {
    const handleSessionExpiration = async () => {
      if (remainingTime === 30) {
        // Open modal that tells user to extend session
        const result = await showSwal({
          title: "Session reminder",
          text: "Your session time is about to expire. It will be terminated within 30 seconds. Do you want to extend your session duration?",
          icon: "question",
          confirmButtonText: "Yes, extend it!",
          confirmButtonColor: "#1098e8",
        });

        if (result.isConfirmed) {
          await refresh();
          toastNotify(
            "success",
            "Your session has been successfully extended by 45 minutes!"
          );
        }
      } else if (remainingTime === 0) {
        await logout(false);
        navigate("/signin"); // Session expired, redirect user to login page
        toastNotify(
          "info",
          "Your session has been terminated. Please log in again!"
        );
      }
    };

    if (remainingTime === 30 || remainingTime === 0) {
      handleSessionExpiration();
    }
  }, [remainingTime, navigate, refresh, logout]);

  return null;
};

export default SessionTimer;
