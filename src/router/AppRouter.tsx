import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Main from "../pages/Main";
import PrivateRouter from "./PrivateRouter";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../layouts/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Contract from "../pages/Contract";
import Setup from "../pages/Setup";
import Verify from "../pages/Verify";
import Forgot from "../pages/Forgot";
import Reset from "../pages/Reset";
import AuthSuccess from "../pages/AuthSuccess";
import AuthFail from "../pages/AuthFail";
import HomeWithModal from "../pages/HomeWithModal";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Outlet />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email/:token" element={<Verify />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/reset-password/:token" element={<Reset />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
          <Route path="/auth/failure" element={<AuthFail />} />
          <Route path="" element={<PrivateRouter />}>
            <Route path="/setup" element={<Setup />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:taskId" element={<HomeWithModal />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
