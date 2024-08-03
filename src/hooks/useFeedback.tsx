import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchStart,
  fetchFail,
  resetContactForm,
} from "../features/contactSlice";
import { RootState } from "../app/store";
import toastNotify from "../helpers/toastNotify";

const useFeedback = () => {
  const dispatch = useDispatch();
  const { form } = useSelector((state: RootState) => state.contact);

  const sendFeedback = async () => {
    dispatch(fetchStart());
    console.log("Sending feedback:", form); // Log to check form data

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}users/feedback`,
        form
      );
      toastNotify("info", data.message);
    } catch (error: any) {
      // console.log("Error: ", error);
      dispatch(fetchFail());
      toastNotify(
        "error",
        error?.response?.data?.message || "An error occurred"
      );
    } finally {
      dispatch(resetContactForm());
    }
  };

  return { sendFeedback };
};

export default useFeedback;
