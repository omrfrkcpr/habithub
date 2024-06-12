import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Main from "../pages/Main";
import PrivateRouter from "./PrivateRouter";
import NotFound from "../pages/NotFound";
import Footer from "../layouts/Footer";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Outlet />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="" element={<PrivateRouter />}>
            {/* <Route path="write" element={<Write />} /> */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default AppRouter;
