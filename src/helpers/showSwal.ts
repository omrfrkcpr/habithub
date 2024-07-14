import Swal from "sweetalert2";

interface SwalValues {
  title: string;
  text: string;
  icon: "success" | "error" | "info" | "warning" | "question";
  confirmButtonText?: string;
  confirmButtonColor?: string; // hex color
}

const showSwal = async ({
  title,
  text,
  icon,
  confirmButtonText,
  confirmButtonColor = "#37901e",
}: SwalValues) => {
  return await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: confirmButtonText ? true : false,
    showConfirmButton: confirmButtonText ? true : false,
    confirmButtonColor,
    cancelButtonColor: "#d33",
    confirmButtonText,
  });
};

export default showSwal;
