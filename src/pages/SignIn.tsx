import React from "react";
import Navbar from "../layouts/Navbar";
import authBg from "../assets/authBg.png";
import Footer from "../layouts/Footer";
import SignInForm from "../components/forms/SignInForm";

const SignIn = () => {
  return (
    <div className="h-screen relative max-w-[1800px] mx-auto">
      <Navbar />
      <div className="absolute top-[400px] md:top-[540px] xl:top-24 -z-10">
        <img
          src={authBg}
          alt="auth-bg"
          className="xl:w-[1700px] xl:h-[600px]"
        />
      </div>
      <SignInForm />
      <Footer />
    </div>
  );
};

export default SignIn;
