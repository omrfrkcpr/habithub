import PasswordChecklist from "react-password-checklist";
import { FaCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { FaCircleInfo } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

const PasswordCheckList: React.FC<PasswordCheckListProps> = ({
  password,
  confirmPassword,
  setShowChecklist,
}) => {
  return (
    <div className="relative">
      <IoIosClose
        onClick={() => setShowChecklist(false)}
        className="absolute top-1 right-1 cursor-pointer w-5 h-5 text-habit-purple hover:text-habit-light-purple"
      />
      <div className="p-3">
        <p className="text-[9px] md:text-[10px]">
          To ensure your account's security, your password must meet the
          following requirements. And for the best security, make sure your
          password strength bar is at the maximum level.
        </p>
        <p className="text-[9px] md:text-[10px] font-light mb-3">
          (Example valid password: StrongPass@3000)
        </p>
        <PasswordChecklist
          rules={[
            "minLength",
            "specialChar",
            "number",
            "capital",
            "match",
            "lowercase",
          ]}
          className="text-[9px] md:text-[10px]"
          minLength={6}
          validTextColor={"#2bc76f"}
          invalidTextColor={password || confirmPassword ? "#dc1c42" : "#6d7177"}
          iconComponents={{
            ValidIcon: <FaCheck className="text-green-400 me-2 w-4 h-4" />,
            InvalidIcon:
              password || confirmPassword ? (
                <IoIosCloseCircle className="text-red-500 me-2 w-4 h-4" />
              ) : (
                <FaCircleInfo className="text-gray-400 me-2 w-4 h-4" />
              ),
          }}
          specialCharsRegex={/[@!#$%]/}
          value={password}
          valueAgain={confirmPassword}
          onChange={(isValid) => {}}
          messages={{
            minLength: "Password must be at least 6 characters",
            specialChar:
              "Password must contain at least one special character (@,!,#,$,%)",
            number: "Password must contain at least one number",
            capital: "Password must contain at least one uppercase letter",
            lowercase: "Password must contain at least one lowercase letter",
            match: "Passwords must match",
          }}
        />
      </div>
    </div>
  );
};

export default PasswordCheckList;
