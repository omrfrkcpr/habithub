import React from "react";
import gmail from "../../assets/gmail.png";
import twitter from "../../assets/twitter.png";
import github from "../../assets/github.png";
import line from "../../assets/straight-line.png";
import useAuthCalls from "../../hooks/useAuthCalls";

interface SocialBtn {
  platform: string;
  image: string;
  handleClick: (authType: string) => void;
}

const SocialAuthButton: React.FC<SocialBtn> = ({
  platform,
  image,
  handleClick,
}) => (
  <div
    className="p-2 bg-white hover:bg-gray-200 rounded-full hover:cursor-pointer"
    onClick={() => handleClick(platform)}
  >
    <img
      src={image}
      alt={platform}
      className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
    />
  </div>
);

const AuthBtns = () => {
  const { signInWithSocial } = useAuthCalls();

  const handleAuthClick = (authType: string) => {
    signInWithSocial(authType);
  };

  return (
    <>
      <div className="flex justify-center items-center mt-5">
        <img src={line} alt="" className="w-[60px] md:w-[100px] opacity-50" />
        <p className="text-xs">or sign up with</p>
        <img src={line} alt="" className="w-[60px] md:w-[100px] opacity-50" />
      </div>
      <div className="flex gap-2 md:gap-5 justify-center items-center mt-2">
        <SocialAuthButton
          platform="google"
          image={gmail}
          handleClick={handleAuthClick}
        />
        <SocialAuthButton
          platform="twitter"
          image={twitter}
          handleClick={handleAuthClick}
        />
        <SocialAuthButton
          platform="github"
          image={github}
          handleClick={handleAuthClick}
        />
      </div>
    </>
  );
};

export default AuthBtns;
