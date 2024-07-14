import useAxios from "./useAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  fetchStart,
  fetchFail,
  getSuccess,
  getTagTodos,
} from "../features/todoSlice";
import Swal from "sweetalert2";
import { singularizeAndCapitalize } from "../helpers/functions";
import showSwal from "../helpers/showSwal";

const useTodoCalls = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const getTodoData = async (url: string, search: string = "") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`${url}${search}`);
      console.log(data);
      dispatch(getSuccess({ data: data?.data, url }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const getTagTodoData = async (tagId: string) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`tags/${tagId}/todos`);
      console.log(data);
      dispatch(getTagTodos({ data: data?.data }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const deleteTodoData = async (url: string, id: string) => {
    const result = await showSwal({
      title: "Are you sure?",
      text: `This ${singularizeAndCapitalize(
        url
      )} will be permanently deleted.`,
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#37901e",
    });

    if (result.isConfirmed) {
      dispatch(fetchStart());
      try {
        await axiosWithToken.delete(`${url}/${id}`);
        await showSwal({
          title: "Deleted!",
          text: `${singularizeAndCapitalize(url)} has been deleted.`,
          icon: "success",
        });
      } catch (error: any) {
        console.log(error);
        await showSwal({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
        dispatch(fetchFail());
      }
    }
  };

  const updateTodoData = async (url: string, id: string, todoInfo: object) => {
    const result = await showSwal({
      title: "Are you sure?",
      text: `${singularizeAndCapitalize(
        url
      )} Informations will be permanently updated`,
      icon: "question",
      confirmButtonText: "Yes, update it!",
      confirmButtonColor: "#FDBA74",
    });

    if (result.isConfirmed) {
      dispatch(fetchStart());
      try {
        await axiosWithToken.put(`${url}/${id}`, todoInfo);
        await showSwal({
          title: "Updated!",
          text: `${singularizeAndCapitalize(
            url
          )} has been updated successfully.`,
          icon: "success",
        });
        // Swal.fire(
        //   "Updated!",
        //   `${singularizeAndCapitalize(url)} has been updated successfully.`,
        //   "success"
        // );
      } catch (error: any) {
        console.log(error);
        await showSwal({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
        dispatch(fetchFail());
      }
    }
  };

  const createTodoData = async (url: string, todoInfo: object) => {
    const result = await showSwal({
      title: "Are you sure?",
      text: `New ${singularizeAndCapitalize(url)} will be created`,
      icon: "question",
      confirmButtonText: "Yes, create it!",
      confirmButtonColor: "#af52e9",
    });

    if (result.isConfirmed) {
      dispatch(fetchStart());
      try {
        const { data } = await axiosWithToken.post(url, todoInfo);
        await showSwal({
          title: "Created!",
          text: `${singularizeAndCapitalize(
            url
          )} has been created successfully.`,
          icon: "success",
        });
        dispatch(getSuccess({ data: data?.data, url }));
      } catch (error: any) {
        console.log(error);
        await showSwal({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
        dispatch(fetchFail());
      }
    }
  };

  return { getTodoData, getTagTodoData, deleteTodoData, updateTodoData };
};

export default useTodoCalls;
