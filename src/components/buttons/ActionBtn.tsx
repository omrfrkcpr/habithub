import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

const ActionBtn: React.FC<ActionBtnProps> = ({
  onClick,
  loading,
  icon,
  label,
  color,
  disabled,
  edit,
}) => {
  return (
    <div className="rounded-lg cursor-pointer">
      <LoadingButton
        onClick={onClick}
        disabled={disabled || false}
        sx={{
          padding: {
            xs: edit ? "3px 8px" : "4px 10px",
            sm: edit ? "6px 12px" : "8px 14px",
          },
          backgroundColor:
            color === "orange"
              ? "#f89233"
              : color === "green"
              ? "#11a91d"
              : "#a439e7",
          borderRadius: "5px",
          color: "white",
          fontSize: {
            xs: "10px",
            sm: "12px",
          },
          "&:hover": {
            backgroundColor:
              color === "orange"
                ? "#ffbe80"
                : color === "green"
                ? "#3ddb4a"
                : "#ca87f4",
          },
        }}
        loading={loading}
        loadingPosition="start"
        startIcon={icon}
      >
        {edit && color === "green" ? "Update" : label}
      </LoadingButton>
    </div>
  );
};

export default ActionBtn;
