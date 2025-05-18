import { TableTextInterface } from "@/interfaces/ui-interfac";

export const TableText = ({ text, variant }: TableTextInterface) => {
  return (
    <p
      
      className={`${
        variant === "header"
          ? "text-xs font-work-sans-regular "
          : variant === "body"
          ? "font-work-sans-regular text-sm  py-4"
          : "font-work-sans-regular "
      } text-center`}
    >
      {text}
    </p>
  );
};
