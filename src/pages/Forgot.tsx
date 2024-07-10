import { useState } from "react";
import axios from "axios";
import toastNotify from "../helpers/toastNotify";
import ActionBtn from "../components/buttons/ActionBtn";
import NearMeIcon from "@mui/icons-material/NearMe";
import Logo from "../components/commons/Logo";

const Forgot = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleForgotSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/forgot", {
        email,
      });
      if (response.status === 200) {
        toastNotify(
          "success",
          "Password reset instructions have been sent to your email. Please check your mailbox"
        );
      }
    } catch (error) {
      toastNotify("error", "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen z-50 relative bg-habit-light-gray">
      <div className="absolute w-[fit-content] p-4 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center">
        <div className="flex gap-1 justify-center items-center">
          <Logo />
          <h1 className="text-md md:text-xl lg:text-2xl font-bold">HabitHUB</h1>
        </div>
        <h2 className="text-lg md:text-xl lg:text-2xl">Forgot Password</h2>
        <form>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            className="my-4"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <ActionBtn
            onClick={handleForgotSubmit}
            loading={loading}
            label="Send"
            color="purple"
            icon={<NearMeIcon sx={{ color: "white" }} />}
          />
        </form>
      </div>
    </div>
  );
};

export default Forgot;
