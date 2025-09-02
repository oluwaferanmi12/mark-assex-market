import docOutline from "@/assets/svgs/doc-outline.svg";
import { Button } from "@/components/ui/buttons/button";
import { KycStatus } from "@/components/ui/status/kyc-status";
import Image from "next/image";
import eyeIcon from "@/assets/svgs/tabler-icon-eye-unslash.svg";
import Link from "next/link";
import { KycStatusType } from "@/types";
import { useState } from "react";
import { useSaveKyc } from "@/hooks/queries/useSettings";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const DocUploadedBox = ({
  fileUrl,
  documentType,
  documentStatus,
  boxType,
}: {
  fileUrl: string;
  documentType: string;
  documentStatus?: KycStatusType;
  boxType: "address" | "identification" | "others";
}) => {
  const queryClient = useQueryClient();
  const fileType = fileUrl
    ? fileUrl.split(".")[fileUrl.split(".").length - 1].toLowerCase()
    : null;
  const [activeDocUploaded, setActiveDocUploaded] = useState<any>(null);
  const [docUploadedName, setDocUploadedName] = useState("");

  const kycMutate = useSaveKyc(() => {
    toast.success("Document saved successfully");
    queryClient.invalidateQueries({ queryKey: ["getKyc"] });
  });

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const doc = boxType === "others" ? e.target.files?.[0] : e.target.files;
    setDocUploadedName(
      boxType === "others" ? "Multi file uploaded" : (doc as File)?.name ?? ""
    );
    setActiveDocUploaded(doc!);
  };

  const handleSubmitDoc = async () => {
    const formdata = new FormData();
    if (boxType === "address") {
      formdata.append("addressDocument", activeDocUploaded);
    } else if (boxType === "identification") {
      formdata.append("identityDocument", activeDocUploaded);
    } else if (boxType === "others") {
      const result: File[] = [];
      Array.from(activeDocUploaded as FileList).forEach((doc) => {
        result.push(doc as File);
      });
      formdata.append("otherDocs", result as unknown as string);
    }
    kycMutate.mutate(formdata);
  };
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
        <KycStatus
          smaller
          status={documentStatus ? documentStatus : "AWAITING"}
        />
      </div>
      <div className="mt-1 mb-3">
        <p className="text-[#404040] text-xs font-work-sans-regular">
          Uploaded: Aug 24, 2025.
        </p>
        <p className="text-black text-xs font-work-sans-regular mt-2">
          {docUploadedName}
        </p>
      </div>

      {fileType ? (
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
      ) : (
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              className="absolute w-[120px] h-[40px] opacity-0"
              type="file"
              multiple={boxType === "others"}
              onChange={(e) => {
                //   uploadFunc(e);
                handleDocUpload(e);
              }}
            />

            <Button
              buttonSmaller
              action={() => {}}
              icon={eyeIcon}
              loading={false}
              text="Choose file"
              variant="bg-white-with-grey-border"
            />
          </div>
          {docUploadedName && (
            <Button
              buttonSmaller
              action={() => {
                handleSubmitDoc();
              }}
              loading={kycMutate.isPending}
              text="Upload"
              variant="green-bg"
            />
          )}
        </div>
      )}
    </div>
  );
};
