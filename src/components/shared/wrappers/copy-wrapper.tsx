import { ReactNode } from "react";
import { toast } from "sonner";

export const CopyWrapper = ({
  children,
  value,
}: {
  children: ReactNode;
  value: string ;
}) => {
  const handleCopyText = () => {
    try {
      navigator.clipboard.writeText(value);
      toast.success("Copied");
    } catch (e) {
      toast.error("Unable to copy");
    }
  };
  return (
    <div
      onClick={() => {
        handleCopyText();
      }}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
};
