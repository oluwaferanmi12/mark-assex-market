import { ReactNode } from "react";

export const DashboardCardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white w-full min-h-[80px] lg:min-h-[150px] px-4 py-4  lg:py-8 border flex relative items-center border-[#BEBEBE59] rounded-2xl">
      {children}
    </div>
  );
};
