import React from "react";
import ellipse1 from "../../assets/Ellipse-1195.png";
import ellipse2 from "../../assets/Ellipse-1196.png";
import ellipse3 from "../../assets/Ellipse-1197.png";
import line from "../../assets/Line-8.png";
import image1 from "../../assets/image-1.png";

const MainBg = () => {
  return (
    <div className="flex">
      <img
        src={ellipse2}
        alt="ellipse-1195"
        className="absolute top-[30px] w-[230px] md:w-[550px] h-[550px] -z-10"
      />
      <img
        src={ellipse1}
        alt="ellipse-1195"
        className="absolute top-[60px] md:top-[50px] w-[300px] md:w-[550px] left-[50px] md:left-[180px] -z-30"
      />
      <img
        src={line}
        alt="line-8"
        className="absolute top-[350px] w-[94vw] h-[500px] rotate-[5deg] -z-50"
      />
      <img
        src={image1}
        alt="line-8"
        className="hidden xl:block absolute top-[50px] right-10 w-[500px]"
      />
      <img
        src={ellipse3}
        alt="line-8"
        className="hidden xl:block absolute top-[50px] right-16 -rotate-[8deg] w-[520px]"
      />
    </div>
  );
};

export default MainBg;
