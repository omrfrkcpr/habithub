import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

const ActionBtn: React.FC<ActionBtnProps> = ({
  onClick,
  loading,
  icon,
  label,
  color,
  hoverColor,
}) => {
  return (
    <div
      className={`${color} hover:${hoverColor} text-white hover:text-white/90 rounded-lg cursor-pointer`}
    >
      <LoadingButton
        onClick={onClick}
        sx={{
          padding: {
            xs: "4px 10px",
            sm: "8px 14px",
          },
          borderRadius: "5px",
          color: "white",
          fontSize: {
            xs: "14px",
            sm: "16px",
          },
        }}
        loading={loading}
        loadingPosition="start"
        startIcon={icon}
      >
        {label}
      </LoadingButton>
    </div>
  );
};

export default ActionBtn;
