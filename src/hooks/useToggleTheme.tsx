import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { RootState } from "../app/store";

const useToggleTheme = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const handleToggle = () => {
    dispatch(toggleTheme());
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return { darkMode, handleToggle };
};

export default useToggleTheme;
