import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { RootState } from "../app/store";
import { useEffect } from "react";

const useToggleTheme = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return { darkMode, handleToggle };
};

export default useToggleTheme;
