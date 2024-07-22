import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import useTaskCalls from "../hooks/useTaskCalls";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

const SingleTask = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { getSingleTaskData } = useTaskCalls();
  const { singleTask } = useSelector((state: RootState) => state.task);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  // console.log(taskId);
  // console.log(singleTask);

  useEffect(() => {
    getSingleTaskData(taskId);
  }, []);

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(-1);
  };

  return (
    <>
      {state?.backgroundLocation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <button
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></button>
          <div className="bg-white rounded-lg z-10 max-w-lg w-full mx-4 relative">
            <button
              className="absolute top-1 right-2 z-50 text-black hover:text-gray-700"
              onClick={closeModal}
            >
              <IoCloseOutline size={20} />
            </button>
            <div>Hey</div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleTask;
