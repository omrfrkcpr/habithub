import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const axiosWithPublic = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const useAxios = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const axiosWithToken = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return axiosWithToken;
};

export default useAxios;
