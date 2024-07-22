import useAxios from "./useAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  fetchStart,
  fetchFail,
  setSuccess,
  setTagTasks,
  setTodayTasks,
  setSingleTask,
} from "../features/taskSlice";
import {
  getTaskUpdateSuccessMessage,
  singularizeAndCapitalize,
} from "../helpers/functions";
import showSwal from "../helpers/showSwal";

const useTaskCalls = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  // const { currentUser } = useSelector((state: RootState) => state.auth);
  const { date } = useSelector((state: RootState) => state.date);

  const getTaskData = async (url: string, search: string = "") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`${url}${search}`);
      // console.log(data);
      dispatch(setSuccess({ data: data?.data, url }));

      if (
        url === "tasks" &&
        new Date(date).getDate() === new Date().getDate()
      ) {
        dispatch(setTodayTasks({ data }));
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const getSingleTaskData = async (id: string = "") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`tasks/${id}`);
      // console.log(data);
      dispatch(setSingleTask({ data: data?.data }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const getTagTaskData = async (tagId: string) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`tags/${tagId}/tasks`);
      console.log(data);
      dispatch(setTagTasks({ data: data?.data }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const getTodayTasksData = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(
        `tasks?date=${new Date().toISOString()}`
      );
      console.log(data);
      dispatch(setTodayTasks({ data: data?.data }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
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
      } catch (error: any) {
        console.log(error);
        await showSwal({
          title: "Error!",
          text: error.response.data.message,
          icon: "error",
        });
        dispatch(fetchFail());
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
    } catch (error: any) {
      console.log(error);
      await showSwal({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
      });
      dispatch(fetchFail());
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
