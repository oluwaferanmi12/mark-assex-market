import { ReactNode } from "react";

export const CustomDropDown = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" bg-[red] min-w-[300px] rounded-lg ">
      {children}
    </div>
  );
};
