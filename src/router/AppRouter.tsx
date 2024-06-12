import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Main from "../pages/Main";
import PrivateRouter from "./PrivateRouter";
import NotFound from "../pages/NotFound";
import Footer from "../layouts/Footer";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

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
          <Route path="" element={<PrivateRouter />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default AppRouter;
