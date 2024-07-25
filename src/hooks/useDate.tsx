import { setDate } from "../features/dateSlice";
import { useDispatch } from "react-redux";

const useDate = (callback: (value: number) => void) => {
  const dispatch = useDispatch();
  // Update date in Redux when selectedDate changes
  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      // console.log(selectedDate);
      dispatch(setDate(selectedDate.toISOString()));
      // if (callback) {
      //   callback(0);
      // }
    }
  };

  return handleDateChange;
};

export default useDate;
