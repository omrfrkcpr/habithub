import React, { useState } from "react";
import useAuthCalls from "../../hooks/useAuthCalls";

interface SocialBtn {
  id?: number;
  platform: string;
  image: string;
  handleClick: (authType: string) => void;
}

const AuthBtns = () => {
  const { signInWithSocial } = useAuthCalls();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAuthClick = (authType: string) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      signInWithSocial(authType).finally(() => {
        setIsSubmitting(false);
      });
    }
  };

  const authBtns = [
    {
      id: 1,
      platform: "google",
      image: `
            ${process.env.REACT_APP_AWS_S3_BASE_URL}gmail.png`,
      handleClick: handleAuthClick,
    },
    {
      id: 2,
      platform: "twitter",
      image: `
            ${process.env.REACT_APP_AWS_S3_BASE_URL}twitter.png`,
      handleClick: handleAuthClick,
    },
    {
      id: 3,
      platform: "github",
      image: `
            ${process.env.REACT_APP_AWS_S3_BASE_URL}github.png`,
      handleClick: handleAuthClick,
    },
  ];

  return (
    <>
      <div className="flex justify-center items-center mt-5">
        <img
          loading="lazy"
          src={`
          ${process.env.REACT_APP_AWS_S3_BASE_URL}straight-line.png`}
          alt=""
          className="w-[60px] md:w-[100px] opacity-50"
        />
        <p className="text-xs">or sign up with</p>
        <img
          loading="lazy"
          src={`
          ${process.env.REACT_APP_AWS_S3_BASE_URL}straight-line.png`}
          alt=""
          className="w-[60px] md:w-[100px] opacity-50"
        />
      </div>
      <div className="flex gap-2 md:gap-5 justify-center items-center mt-2">
        {authBtns.map((authBtn: SocialBtn) => {
          const { id, platform, image, handleClick } = authBtn;
          return (
            <SocialAuthButton
              platform={platform}
              key={id}
              image={image}
              handleClick={handleClick}
            />
          );
        })}
      </div>
    </>
  );
};

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
      loading="lazy"
      src={image}
      alt={platform}
      className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
    />
  </div>
);

export default AuthBtns;
