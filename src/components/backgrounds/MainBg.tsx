const MainBg = () => {
  return (
    <div className="flex">
      <img
        src={`
          ${process.env.REACT_APP_AWS_S3_BASE_URL}Ellipse-1196.png`}
        alt="ellipse-1196"
        className="absolute top-[30px] w-[230px] md:w-[550px] h-[550px] -z-10"
      />
      <img
        src={`
          ${process.env.REACT_APP_AWS_S3_BASE_URL}Ellipse-1195.png`}
        alt="ellipse-1195"
        className="absolute top-[60px] md:top-[50px] w-[300px] md:w-[550px] left-[70px] md:left-[180px] -z-30"
      />
      <img
        src={`
          ${process.env.REACT_APP_AWS_S3_BASE_URL}Line-8.png`}
        alt="line-8"
        className="absolute top-[350px] w-[94vw] h-[500px] rotate-[5deg] -z-50"
      />
      <img
        src={`
          ${process.env.REACT_APP_AWS_S3_BASE_URL}image-1.png`}
        alt="line-8"
        className="hidden xl:block absolute top-[50px] right-10 w-[500px]"
      />
      <img
        src={`
          ${process.env.REACT_APP_AWS_S3_BASE_URL}Ellipse-1197.png`}
        alt="line-8"
        className="hidden xl:block absolute top-[50px] right-16 -rotate-[8deg] w-[520px]"
      />
    </div>
  );
};

export default MainBg;
