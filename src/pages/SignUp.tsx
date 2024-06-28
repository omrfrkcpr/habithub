import React from "react";
import Navbar from "../layouts/Navbar";
import authBg from "../assets/authBg.png";
// import Footer from "../layouts/Footer";
import SignUpForm from "../components/forms/SignUpForm";

const SignUp = () => {
  return (
    <div className="h-screen relative max-w-[1800px] mx-auto">
      <Navbar />
      <div className="absolute bottom-0 -z-10">
        <img
          src={authBg}
          alt="auth-bg"
          className="xl:w-[1700px] xl:h-[600px]"
        />
      </div>
      <SignUpForm />
      {/* <Footer /> */}
    </div>
  );
};

export default SignUp;
