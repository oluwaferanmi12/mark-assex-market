import { ReactNode } from "react";

export const ModalFooter = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white border-t p-4 py-2 rounded-b-xl border-[#BEBEBE59]">
      {children}
    </div>
  );
};
