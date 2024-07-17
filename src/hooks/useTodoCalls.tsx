import useAxios from "./useAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  fetchStart,
  fetchFail,
  setSuccess,
  setTagTodos,
  setTodayTodos,
} from "../features/todoSlice";
import {
  getTodoUpdateSuccessMessage,
  singularizeAndCapitalize,
} from "../helpers/functions";
import showSwal from "../helpers/showSwal";

const useTodoCalls = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const { date } = useSelector((state: RootState) => state.date);

  const getTodoData = async (url: string, search: string = "") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`${url}${search}`);
      // console.log(data);
      dispatch(setSuccess({ data: data?.data, url }));
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
      dispatch(setTagTodos({ data: data?.data }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const getTodayTodosData = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(
        `todos?date=${new Date().toISOString()}`
      );
      console.log(data);
      dispatch(setTodayTodos({ data: data?.data }));
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
      } finally {
        getTodoData(url, url === "todos" ? `?date=${date}` : "");
      }
    }
  };

  const updateTodoData = async (url: string, id: string, todoInfo: any) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`${url}/${id}`, todoInfo);
      await showSwal({
        title: "Updated!",
        text: getTodoUpdateSuccessMessage(todoInfo),
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
    } finally {
      getTodoData(url, url === "todos" ? `?date=${date}` : "");
    }
  };

  const createTodoData = async (
    url: string,
    todoInfo: object,
    showNotify: boolean
  ) => {
    if (showNotify) {
      const result = await showSwal({
        title: "Are you sure?",
        text: `New ${singularizeAndCapitalize(url)} will be created`,
        icon: "question",
        confirmButtonText: "Yes, create it!",
        confirmButtonColor: "#af52e9",
      });

      if (!result.isConfirmed) {
        return;
      }
    }

    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(url, todoInfo);
      if (showNotify) {
        await showSwal({
          title: "Created!",
          text: `${singularizeAndCapitalize(
            url
          )} has been created successfully.`,
          icon: "success",
        });
      }
      dispatch(setSuccess({ data: data?.data, url }));
    } catch (error: any) {
      console.log(error);
      if (showNotify) {
        await showSwal({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
      }
      dispatch(fetchFail());
    } finally {
      getTodoData(url, url === "todos" ? `?date=${date}` : "");
    }
  };

  return {
    getTodoData,
    getTagTodoData,
    getTodayTodosData,
    deleteTodoData,
    updateTodoData,
    createTodoData,
  };
};

export default useTodoCalls;
