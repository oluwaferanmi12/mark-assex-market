import { ReactNode } from "react";

export const VisibleOnMobile = ({ children }: { children: ReactNode }) => {
  return <div className="lg:hidden">{children}</div>;
};
