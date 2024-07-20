import React, { useEffect, useState, ReactElement } from "react";
import ThemeSwitcher from "../components/commons/ThemeSwitcher";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import useAuthCalls from "../hooks/useAuthCalls";
import { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { formatTime } from "../helpers/functions";
import showSwal from "../helpers/showSwal";
import { decrementTime } from "../features/authSlice";
import toastNotify from "../helpers/toastNotify";
import { useNavigate } from "react-router-dom";
import Modal from "../components/commons/Modal";
import UserSettings from "../components/userSettings/UserSettings";
import { IoSettingsOutline } from "react-icons/io5";
import { BsListTask } from "react-icons/bs";
import { MdPlaylistAddCheck } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const UserMenu = ({
  setValue,
}: {
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { refresh, logout } = useAuthCalls();
  const { remainingTime, currentUser } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedModalChild, setSelectedModalChild] = useState<ReactElement>();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const settings = [
    {
      icon: <BsListTask />,
      value: "My Tasks",
      onClick: () => {
        setValue(0);
        handleCloseUserMenu();
      },
    },
    {
      icon: <MdPlaylistAddCheck />,
      value: "Lists",
      onClick: () => {
        setValue(1);
        handleCloseUserMenu();
      },
    },
    {
      icon: <IoSettingsOutline />,
      value: "Settings",
      onClick: () => {
        setSelectedModalChild(<UserSettings />);
        openModal();
        handleCloseUserMenu();
      },
    },
    {
      icon: <MdLogout />,
      value: "Logout",
      onClick: () => {
        logout(true);
        handleCloseUserMenu();
      },
    },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // console.log(remainingTime);

  const handleSpanClick = async () => {
    const result = await showSwal({
      title: "Session Reminder",
      text: `Your remaining session time is ${formatTime(
        remainingTime
      )}. Do you want to reset your session duration?`,
      icon: "question",
      confirmButtonText: "Yes, reset it!",
      confirmButtonColor: "#FDBA74",
      cancelButtonText: "No, keep it as is",
    });

    if (result.isConfirmed) {
      await refresh(false);
      await showSwal({
        title: "Extended!",
        text: "Your session duration has been reset to 45 minutes!",
        icon: "success",
      });
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (remainingTime > 0) {
      interval = setInterval(() => {
        dispatch(decrementTime());
      }, 1000); // Dispatch decrementTime every second
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [remainingTime, dispatch]);

  useEffect(() => {
    const handleSessionExpiration = async () => {
      if (remainingTime === 30) {
        // Open modal that tells user to extend session
        const result = await showSwal({
          title: "Session reminder",
          text: "Your session time is about to expire. It will be terminated within 30 seconds. Do you want to extend your session duration?",
          icon: "question",
          confirmButtonText: "Yes, extend it!",
          confirmButtonColor: "#1098e8",
          cancelButtonText: "No, keep it as is",
        });

        if (result.isConfirmed) {
          refresh(true);
        }
      } else if (remainingTime === 0) {
        logout(false);
        navigate("/signin"); // Session expired, redirect user to login page
        toastNotify(
          "info",
          "Your session has been terminated. Please log in again!"
        );
      }
    };

    if (remainingTime === 30 || remainingTime === 0) {
      handleSessionExpiration();
    }
  }, [remainingTime]);

  const avatarSrc = currentUser?.avatar?.includes("/uploads/")
    ? `http://127.0.0.1:8000${currentUser?.avatar}`
    : currentUser?.avatar ||
      "https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg";

  return (
    <>
      <div className="flex absolute top-5 right-5">
        <span
          className="grid place-content-center place-items-center px-3 mx-2 border border-black dark:border-white dark:text-white cursor-pointer hover:border-black/60 hover:text-black/60 dark:hover:text-white/60 dark:hover:border-white/60"
          onClick={handleSpanClick}
        >
          {formatTime(remainingTime)}
        </span>
        <ThemeSwitcher />
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                src={avatarSrc}
                alt={currentUser?.firstName || currentUser?.username}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map(
              ({
                onClick,
                value,
                icon,
              }: {
                onClick: () => void;
                value: string;
                icon: ReactElement;
              }) => (
                <MenuItem
                  key={value}
                  onClick={onClick}
                  sx={{
                    borderTop: value === "Logout" ? 1 : 0,
                    borderColor: "#cecece",
                    paddingTop: value === "Logout" ? "8px" : "4px",
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      marginRight: "20px",
                    }}
                  >
                    {icon} {value} <span></span>
                  </Typography>
                </MenuItem>
              )
            )}
          </Menu>
        </Box>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedModalChild}
      </Modal>
    </>
  );
};

export default UserMenu;
