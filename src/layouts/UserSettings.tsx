import React from "react";
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
import { setRemainingTime } from "../features/authSlice";
import showSwal from "../helpers/showSwal";

const UserSettings = () => {
  const { logout } = useAuthCalls();
  const dispatch = useDispatch();
  const { remainingTime } = useSelector((state: RootState) => state.auth);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const settings = [
    {
      value: "My Todos",
      onClick: () => {
        console.log("My Todos clicked");
        handleCloseUserMenu();
      },
    },
    {
      value: "Lists",
      onClick: () => {
        console.log("Lists clicked");
        handleCloseUserMenu();
      },
    },
    {
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

  console.log(remainingTime);

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
      dispatch(setRemainingTime(45 * 60));
      await showSwal({
        title: "Extended!",
        text: "Your session duration has been reset to 45!",
        icon: "success",
      });
    }
  };

  return (
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
            <Avatar alt="Omer" src="" />
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
            ({ onClick, value }: { onClick: () => void; value: string }) => (
              <MenuItem key={value} onClick={onClick}>
                <Typography textAlign="center">{value}</Typography>
              </MenuItem>
            )
          )}
        </Menu>
      </Box>
    </div>
  );
};

export default UserSettings;
