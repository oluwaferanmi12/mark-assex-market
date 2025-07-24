import uploadIcon from "@/assets/svgs/upload-cloud-icon-green.svg";
import { Button } from "@/components/ui/buttons/button";
import Image from "next/image";

export const DocumentUploadContainer = ({
  uploadFunc,
}: {
  uploadFunc: () => void;
}) => {
  return (
    <div className="my-3 border border-[] border-dashed bg-[#0DAE9405] border-[#0DAE94] p-4 flex-col rounded-lg min-h-[200px] flex justify-center items-center">
      <div className="mb-3">
        <Image src={uploadIcon} alt="" />
      </div>
      <div className="mb-2">
        <p className="text-center text-[#0DAE94] font-work-sans-regular">
          + Drag and drop picture file to upload
        </p>
        <p className="text-[#707070] text-xs font-work-sans-regular text-center">
          Or click to browse (10mb Max)
        </p>
      </div>
      <div>
        <Button
          action={() => {}}
          loading={false}
          text="Browse Files"
          variant="green-bg"
          buttonSmaller
        />
      </div>
    </div>
  );
};
