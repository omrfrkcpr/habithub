import React from "react";
import Navbar from "../layouts/Navbar";
// import Footer from "../layouts/Footer";
import SignUpForm from "../components/forms/SignUpForm";

const SignUp = () => {
  return (
    <div className="h-screen relative max-w-[1800px] mx-auto">
      <Navbar />
      <div className="absolute bottom-0 -z-10">
        <img
          loading="lazy"
          src={`
            ${process.env.REACT_APP_AWS_S3_BASE_URL}authBg.png`}
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
