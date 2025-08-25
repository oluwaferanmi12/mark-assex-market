import moment from "moment";

export const DateViewer = ({ date }: { date: string }) => {
  return (
    <div className="">
      <p className="text-[#111111] font-work-sans-regular">
        {moment(date).format("DD MMM, YYYY")}
      </p>
      <p className="text-[#F40E0ECC] text-xs text-right font-work-sans-regular">
        {moment(date).format("HH:mm")}
      </p>
    </div>
  );
};
