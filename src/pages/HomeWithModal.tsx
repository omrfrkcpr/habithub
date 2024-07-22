import React, { memo } from "react";
import { useLocation } from "react-router-dom";
import Home from "../layouts/Home";
import SingleTask from "../layouts/SingleTask";

const HomeWithModal = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Home />
      {state?.backgroundLocation && <SingleTask />}
    </>
  );
};

export default memo(HomeWithModal);
