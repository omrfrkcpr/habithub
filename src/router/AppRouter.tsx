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
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Contract from "../pages/Contract";

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
          {/* <Route path="/contract" element={<Contract />} />
          <Route path="/home" element={<Home />} /> */}
          <Route path="" element={<PrivateRouter />}>
            <Route path="/contract" element={<Contract />} />
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
