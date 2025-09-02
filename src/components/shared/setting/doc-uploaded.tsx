import docOutline from "@/assets/svgs/doc-outline.svg";
import { Button } from "@/components/ui/buttons/button";
import { KycStatus } from "@/components/ui/status/kyc-status";
import Image from "next/image";
import eyeIcon from "@/assets/svgs/tabler-icon-eye-unslash.svg";
import Link from "next/link";
import { KycStatusType } from "@/types";

export const DocUploadedBox = ({
  fileUrl,
  documentType,
  documentStatus,
}: {
  fileUrl: string;
  documentType: string;
  documentStatus?: KycStatusType;
}) => {
  const fileType = fileUrl
    ? fileUrl.split(".")[fileUrl.split(".").length - 1].toLowerCase()
    : null;
  return (
    <div className="bg-white p-4 rounded-lg lg:mb-0 mb-4">
      <Link href={fileUrl ?? ""}>
        <div className="h-[160px] rounded-t-lg flex justify-center bg-[#E1E8E859]">
          {fileType === "png" || fileType === "jpeg" || fileType === "jpg" ? (
            <div className="relative w-4/5">
              <Image fill className="object-cover" src={fileUrl} alt="" />
            </div>
          ) : (
            <embed
              src={fileUrl}
              type="application/pdf"
              width="100px"
              height="100%"
              className=""
            />
          )}
        </div>
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src={docOutline} alt="" />
          <p className="text-[#202020] font-work-sans-medium">{documentType}</p>
        </div>
        <KycStatus smaller status={documentStatus ?? "AWAITING"} />
      </div>
      <div className="mt-1 mb-3">
        <p className="text-[#404040] text-xs font-work-sans-regular">
          Uploaded: Aug 24, 2025.
        </p>
      </div>
      <Link href={fileUrl ?? ""}>
        <Button
          buttonSmaller
          action={() => {}}
          icon={eyeIcon}
          loading={false}
          text="Review"
          variant="bg-white-with-grey-border"
        />
      </Link>
    </div>
  );
};
