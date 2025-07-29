import React from "react";
import { toast } from "sonner";

type CopyProps = {
  value: string;
  children: React.ReactNode;
};

export const Copy: React.FC<CopyProps> = ({ value, children }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied"); // You can replace this with a toast
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <span onClick={handleCopy} style={{ cursor: "pointer" }}>
      {children}
    </span>
  );
};
