export const TableStatus = ({
  variant,
  text,
}: {
  text: string;
  variant: "Success" | "Pending" | "Cancelled";
}) => {
  return (
    <div className="flex justify-center">
      <span
        className={`${
          variant === "Success"
            ? "border border-[#34C659] text-[#34C659] px-4 rounded-full bg-[#34C6591A]"
            : variant === "Cancelled"
            ? "border border-[#F40E0E] text-[#F40E0E] px-4 rounded-full bg-[#F40E0E1A]"
            : "border border-[#ED9507] text-[#ED9507] px-4 rounded-full bg-[#ED95071A]"
        } font-work-sans-regular text-xs py-1`}
      >
        {text}
      </span>
    </div>
  );
};
