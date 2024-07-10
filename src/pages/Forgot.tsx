import { useState } from "react";
import axios from "axios";
import toastNotify from "../helpers/toastNotify";
import ActionBtn from "../components/buttons/ActionBtn";
import NearMeIcon from "@mui/icons-material/NearMe";
import Footer from "../layouts/Footer";
import authBg from "../assets/auth-Bg.jpg";
import Navbar from "../layouts/Navbar";

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
      setEmail("");
    }
  };

  return (
    <div
      className="w-screen h-screen z-50 relative bg-habit-light-gray"
      style={{
        backgroundImage: `url(${authBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <div className="absolute w-full top-[30%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center">
        <form className="flex flex-col justify-between text-center w-[320px] md:w-[500px] p-5 h-auto md:h-[300px] rounded-xl">
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
              Forgot Password
            </h2>
            <p className="text-xs md:text-md lg:text-[14px] mt-2 mb-3 font-light md:font-normal">
              Please enter your email address to reset your password. You will
              receive a link to create a new password via email.
            </p>
          </div>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            className="my-4 px-2 py-1 outline-none rounded-md md:mx-4 text-[13px] md:text-[16px]"
            autoComplete="off"
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
      <Footer />
    </div>
  );
};

export default Forgot;
