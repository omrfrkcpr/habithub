import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const NewTagBtn = () => {
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{ backgroundColor: darkMode ? "black" : "blue" }}
      >
        New List
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box sx={{ display: "flex", padding: 1, gap: 1 }}>
          <input
            type="text"
            placeholder="Type list name"
            className="border border-gray-400 px-2 h-[30px] text-[10px] md:text-[14px] rounded-md outline-none"
          />
          <Button
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
