import { setDate } from "../features/dateSlice";
import { useDispatch } from "react-redux";

const useDate = () => {
  const dispatch = useDispatch();
  // Update date in Redux when selectedDate changes
  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      dispatch(setDate(selectedDate.toISOString()));
    }
  };

  return handleDateChange;
};

export default useDate;
