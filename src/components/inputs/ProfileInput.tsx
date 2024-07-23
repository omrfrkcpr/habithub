import React from "react";

const ProfileInput: React.FC<ProfileInputProps> = ({
  label,
  type,
  value,
  onChange,
  name,
}) => {
  return (
    <div className="flex flex-col space-y-2 mt-4 flex-1">
      <label className="font-semibold text-[11px] md:text-[14px]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        autoComplete="off"
        className="p-1 border border-gray-300 rounded-md outline-none text-[10px] md:text-[14px] text-black/60"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default ProfileInput;
