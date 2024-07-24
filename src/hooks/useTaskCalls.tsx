import useAxios from "./useAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  fetchStart,
  fetchFail,
  setSuccess,
  setTagTasks,
  setTodayTasks,
} from "../features/taskSlice";
import {
  getTaskUpdateSuccessMessage,
  singularizeAndCapitalize,
} from "../helpers/functions";
import showSwal from "../helpers/showSwal";
import { setSingleTask } from "../features/newTaskSlice";
import toastNotify from "../helpers/toastNotify";
import { useNavigate } from "react-router-dom";

const useTaskCalls = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const navigate = useNavigate();
  const { date } = useSelector((state: RootState) => state.date);

  // Common error handling function
  const handleError = async (error: any, showSwalNotify = false) => {
    dispatch(fetchFail());
    const message = error?.response?.data?.message;
    if (showSwalNotify) {
      await showSwal({
        title: "Error!",
        text: message,
        icon: "error",
      });
    } else {
      toastNotify("error", message);
    }
    if (message.includes("No Permission")) {
      navigate("/signin");
    }
  };

  const getTaskData = async (url: string, search = "") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`${url}${search}`);
      dispatch(setSuccess({ data: data, url }));

      if (
        url === "tasks" &&
        new Date(date).getDate() === new Date().getDate()
      ) {
        dispatch(setTodayTasks({ data }));
      }
    } catch (error) {
      handleError(error, false); // use toastNotify
    }
  };

  const getSingleTaskData = async (id = "") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`tasks/${id}`);
      dispatch(setSingleTask({ data: data?.data }));
    } catch (error) {
      handleError(error, false); // use toastNotify
    }
  };

  const getTagTaskData = async (tagId: string) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`tags/${tagId}/tasks`);
      dispatch(setTagTasks({ data: data?.data }));
    } catch (error) {
      handleError(error, false); // use toastNotify
    }
  };

  const getTodayTasksData = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(
        `tasks?date=${new Date().toISOString()}`
      );
      dispatch(setTodayTasks({ data: data?.data }));
    } catch (error) {
      handleError(error, false); // use toastNotify
    }
  };

  const deleteTaskData = async (url: string, id: string) => {
    const result = await showSwal({
      title: "Are you sure?",
      text: `This ${singularizeAndCapitalize(
        url
      )} will be permanently deleted.`,
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#37901e",
      cancelButtonText: "No, keep it!",
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
      } catch (error) {
        handleError(error, true); // use showSwal
      } finally {
        getTaskData(url, url === "tasks" ? `?date=${date}` : "");
      }
    }
  };

  const updateTaskData = async (url: string, id: string, taskInfo: any) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`${url}/${id}`, taskInfo);
      const updateMessage = getTaskUpdateSuccessMessage(taskInfo);
      if (updateMessage) {
        await showSwal({
          title: "Updated!",
          text: updateMessage,
          icon: "success",
        });
      }
    } catch (error) {
      handleError(error, true); // use showSwal
    } finally {
      getTaskData(url, url === "tasks" ? `?date=${date}` : "");
    }
  };

  const createTaskData = async (
    url: string,
    taskInfo: object,
    showNotify: boolean
  ) => {
    if (showNotify) {
      const result = await showSwal({
        title: "Are you sure?",
        text: `New ${singularizeAndCapitalize(url)} will be created`,
        icon: "question",
        confirmButtonText: "Yes, create it!",
        confirmButtonColor: "#af52e9",
        cancelButtonText: "No, keep it!",
      });

      if (!result.isConfirmed) {
        return;
      }
    }

    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(url, taskInfo);
      if (showNotify) {
        await showSwal({
          title: "Created!",
          text: `${singularizeAndCapitalize(
            url
          )} has been created successfully.`,
          icon: "success",
        });
      }
      dispatch(setSuccess({ data: data, url }));
    } catch (error) {
      handleError(error, showNotify); // use selected method (between toastify or sweetalert)
    } finally {
      getTaskData(url, url === "tasks" ? `?date=${date}` : "");
    }
  };

  return {
    getTaskData,
    getTagTaskData,
    getTodayTasksData,
    getSingleTaskData,
    deleteTaskData,
    updateTaskData,
    createTaskData,
  };
};

export default useTaskCalls;
