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

const UserSettings = () => {
  const { logout } = useAuthCalls();
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
  return (
    <div className="flex absolute top-5 right-5">
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
