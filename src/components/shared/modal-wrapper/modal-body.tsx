import { ReactNode } from "react";

export const ModalBody = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-4 flex-1 overflow-y-auto">
      {children}
    </div>
  );
};
