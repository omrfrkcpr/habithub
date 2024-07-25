import * as React from "react";
import Popover from "@mui/material/Popover";
// import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import useTaskCalls from "../../hooks/useTaskCalls";
import toastNotify from "../../helpers/toastNotify";

const NewTagBtn = () => {
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const { createTaskData } = useTaskCalls();
  const [name, setName] = React.useState<string>("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleCreateTag = () => {
    if (name) {
      createTaskData("tags", { name }, true);
      setName("");
      handleClose();
    } else {
      toastNotify("info", "Please provide a tag name");
    }
  };

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          backgroundColor: darkMode ? "#ca87f4" : "#c679f5",
          "&:hover": {
            backgroundColor: darkMode ? "#d3aeeb" : "#cb93f0",
          },
        }}
      >
        New Tag
      </Button>
      <Popover
        id={id}
        sx={{ marginTop: 1 }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography
          sx={{
            padding: 1,
            paddingBottom: 0,
            fontSize: 13,
            color: "#5b5b5b",
          }}
        >
          Create tags like "Work", "Personal" and "Daily" to stay organized and
          <br />
          boost productivity. It's simple and effective!
        </Typography>
        <Box sx={{ display: "flex", padding: 1, gap: 1 }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter tag name"
            className="border border-gray-400 px-2 h-[30px] text-[10px] md:text-[14px] rounded-md outline-none"
          />
          <Button
            onClick={handleCreateTag}
            sx={{ p: 1, fontSize: 12, height: "30px" }}
            variant="outlined"
          >
            Create
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default NewTagBtn;
