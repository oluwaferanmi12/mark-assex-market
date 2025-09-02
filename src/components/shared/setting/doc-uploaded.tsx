import docOutline from "@/assets/svgs/doc-outline.svg";
import { Button } from "@/components/ui/buttons/button";
import { KycStatus } from "@/components/ui/status/kyc-status";
import Image from "next/image";
import eyeIcon from "@/assets/svgs/tabler-icon-eye-unslash.svg";
import Link from "next/link";
import { KycStatusType } from "@/types";
import { useCallback, useMemo, useState } from "react";
import { useSaveKyc } from "@/hooks/queries/useSettings";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type DocUploadedBoxProps = {
  /** For single-file boxes */
  fileUrl?: string;
  /** For "others": existing files from backend to preview */
  otherFileUrls?: string[];
  documentType: string;
  documentStatus?: KycStatusType;
  boxType: "address" | "identification" | "others";
};

export const DocUploadedBox = ({
  fileUrl,
  otherFileUrls = [],
  documentType,
  documentStatus,
  boxType,
}: DocUploadedBoxProps) => {
  const queryClient = useQueryClient();

  // state for new selections
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
  const [docUploadedName, setDocUploadedName] = useState("");

  const kycMutate = useSaveKyc(() => {
    toast.success("Document saved successfully");
    queryClient.invalidateQueries({ queryKey: ["getKyc"] });
    setSingleFile(null);
    setMultipleFiles([]);
    setDocUploadedName("");
  });

  // --- Helpers --------------------------------------------------------------

  const cleanUrlForExt = (url?: string) =>
    url ? url.split(/[?#]/)[0] : undefined;

  const getExt = (url?: string) => {
    if (!url) return undefined;
    const noQuery = cleanUrlForExt(url);
    const parts = noQuery?.split(".");
    return parts && parts.length > 1
      ? parts[parts.length - 1].toLowerCase()
      : undefined;
  };

  const isImageExt = (ext?: string) =>
    !!ext && ["png", "jpeg", "jpg", "gif", "webp", "bmp", "svg"].includes(ext);

  const isPdfExt = (ext?: string) => ext === "pdf";

  // for single-file boxes
  const singleFileType = useMemo(() => getExt(fileUrl), [fileUrl]);

  const onPickFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      if (boxType === "others") {
        // store *all* selected
        const arr = Array.from(files);
        setMultipleFiles(arr);
        setDocUploadedName(`${arr.length} file(s) selected`);
      } else {
        // store only one
        const one = files[0];
        setSingleFile(one);
        setDocUploadedName(one?.name ?? "");
      }
    },
    [boxType]
  );

  const handleSubmitDoc = async () => {
    const formdata = new FormData();

    if (boxType === "address") {
      if (!singleFile) {
        toast.error("Please choose a file");
        return;
      }
      formdata.append("addressDocument", singleFile);
    } else if (boxType === "identification") {
      if (!singleFile) {
        toast.error("Please choose a file");
        return;
      }
      formdata.append("identityDocument", singleFile);
    } else if (boxType === "others") {
      if (multipleFiles.length === 0) {
        toast.error("Please choose one or more files");
        return;
      }
      // append each file; use the field name your backend expects:
      // e.g. "otherDocs" or "otherDocs[]"
      multipleFiles.forEach((f) => formdata.append("otherDocs", f));
    }

    kycMutate.mutate(formdata);
  };

  // --- UI fragments ---------------------------------------------------------

  const ImagePreview = ({ url }: { url: string }) => (
    <div className="relative h-[160px] w-full">
      <Image src={url} alt="" fill className="object-cover rounded-t-lg" />
    </div>
  );

  const PdfPreview = ({ url }: { url: string }) => (
    <div className="h-[160px] rounded-t-lg bg-[#E1E8E859]">
      <embed
        src={url}
        type="application/pdf"
        width="100%"
        height="100%"
        className="rounded-t-lg"
      />
    </div>
  );

  // For "others": build a unified list from existing + newly picked (in-memory) files
  const othersList = useMemo(() => {
    const existing = otherFileUrls.map((url) => ({
      id: `existing:${url}`,
      name: decodeURIComponent(url.split("/").pop() || "Document"),
      url,
      ext: getExt(url),
      isNew: false,
    }));

    const newlyPicked = multipleFiles.map((f, idx) => ({
      id: `new:${idx}:${f.name}`,
      name: f.name,
      url: URL.createObjectURL(f), // preview only
      ext: getExt(f.name),
      isNew: true,
    }));

    return [...newlyPicked, ...existing];
  }, [otherFileUrls, multipleFiles]);

  // --- Render ---------------------------------------------------------------

  return (
    <div className="bg-white p-4 rounded-lg lg:mb-0 mb-4">
      {/* PREVIEW AREA */}
      {boxType !== "others" ? (
        <Link href={fileUrl || "#"} target="_blank">
          <div className="rounded-t-lg bg-[#E1E8E859]">
            {isImageExt(singleFileType) && fileUrl ? (
              <ImagePreview url={fileUrl} />
            ) : isPdfExt(singleFileType) && fileUrl ? (
              <PdfPreview url={fileUrl} />
            ) : (
              <div className="h-[160px] rounded-t-lg flex items-center justify-center text-xs text-gray-500">
                No preview available
              </div>
            )}
          </div>
        </Link>
      ) : (
        // Grid of previews for "others"
        <div className="rounded-t-lg bg-[#E1E8E859] p-3">
          {othersList.length === 0 ? (
            <div className="h-[120px] rounded-lg flex items-center justify-center text-xs text-gray-500">
              No files yet
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {othersList.map((item) => (
                <Link key={item.id} href={item.url} target="_blank">
                  <div className="border rounded-lg overflow-hidden bg-white">
                    {isImageExt(item.ext) ? (
                      <div className="relative h-28 w-full">
                        <Image
                          src={item.url}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : isPdfExt(item.ext) ? (
                      <div className="h-28">
                        <embed
                          src={item.url}
                          type="application/pdf"
                          width="100%"
                          height="100%"
                        />
                      </div>
                    ) : (
                      <div className="h-28 flex items-center justify-center text-[10px] text-gray-500">
                        No preview
                      </div>
                    )}
                    <div className="p-2">
                      <p className="text-[11px] line-clamp-2">
                        {item.name}
                        {item.isNew ? " (new)" : ""}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* HEADER */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src={docOutline} alt="" />
          <p className="text-[#202020] font-work-sans-medium">{documentType}</p>
        </div>
        <KycStatus smaller status={documentStatus ?? "AWAITING"} />
      </div>

      {/* META */}
      <div className="mt-1 mb-3">
        <p className="text-[#404040] text-xs font-work-sans-regular">
          Uploaded: Aug 24, 2025.
        </p>
        {docUploadedName && (
          <p className="text-black text-xs font-work-sans-regular mt-2">
            {docUploadedName}
          </p>
        )}
      </div>

      {/* ACTIONS */}
      {boxType !== "others" && fileUrl ? (
        <Link href={fileUrl} target="_blank">
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
              className="absolute w-[120px] h-[40px] opacity-0 cursor-pointer"
              type="file"
              multiple={boxType === "others"}
              onChange={onPickFiles}
              accept={
                boxType === "others"
                  ? undefined
                  : ".png,.jpg,.jpeg,.webp,.pdf" // tweak as needed
              }
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

          {(docUploadedName || (boxType === "others" && multipleFiles.length)) && (
            <Button
              buttonSmaller
              action={handleSubmitDoc}
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
