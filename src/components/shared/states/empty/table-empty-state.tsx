import Image from "next/image";

export const TableEmptyState = ({
  icon,
  tableText,
}: {
  icon: string;
  tableText: string;
}) => {
  return (
    <div className="min-h-[300px] rounded-lg flex justify-center items-center bg-white">
      <div>
        <div className="flex justify-center">
          <Image src={icon} alt="" />
        </div>
        <p className="my-4 text-[#404040] font-work-sans-regular text-base">
          {tableText}
        </p>
      </div>
    </div>
  );
};
