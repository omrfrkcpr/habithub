import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import useTaskCalls from "../hooks/useTaskCalls";
import NewTask from "./NewTask";
import { resetNewTask } from "../features/newTaskSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { CircleLoader } from "react-spinners";
import { setEditTaskId } from "../features/taskSlice";

const SingleTask = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { getSingleTaskData } = useTaskCalls();
  const newTask = useSelector((state: RootState) => state.newTask);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { backgroundLocation } = location.state as {
    backgroundLocation?: Location;
    selectedDate: string;
  };

  console.log(taskId);

  // const { editTaskId } = useSelector((state: RootState) => state.task);

  useEffect(() => {
    if (taskId) {
      getSingleTaskData(taskId);
      dispatch(setEditTaskId(taskId));
    }
  }, [taskId]);

  // console.log(editTaskId);

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(-1);
    dispatch(resetNewTask());
    dispatch(setEditTaskId(""));
  };

  return (
    <>
      {backgroundLocation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <button
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></button>
          <div className="bg-white dark:bg-[#3c2148] rounded-lg z-10 max-w-lg w-full mx-4 relative">
            <button
              className="absolute top-1 right-2 z-50 text-black dark:text-habit-white dark:hover:text-white/60 hover:text-gray-700"
              onClick={closeModal}
            >
              <IoCloseOutline size={20} />
            </button>
            <div className="py-1 px-5 h-[575px] md:h-[620px] lg:h-[665px]">
              {newTask.name ? (
                <NewTask />
              ) : (
                <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                  <CircleLoader
                    size={32}
                    className="text-black dark:text-white"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleTask;
