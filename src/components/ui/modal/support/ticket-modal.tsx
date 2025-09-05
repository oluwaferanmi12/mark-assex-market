import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ModalBody } from "@/components/shared/modal-wrapper/modal-body";
import { ModalHeader } from "@/components/shared/modal-wrapper/modal-header";
import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";
import { TransferInput } from "../../inputs/transfer-input";
import multiUploadIcon from "@/assets/svgs/multi-upload-icon.svg";
import Image from "next/image";
import { ModalFooter } from "@/components/shared/modal-wrapper/modal-footer";
import { Button } from "../../buttons/button";
import { useCreateTicket } from "@/hooks/queries/useSupport";
import { toast } from "sonner";

type CreateTicketModalProps = {
  showTicketModal: boolean;
  handleClose: () => void;
  // Optional: get selected images in parent
  onImagesChange?: (files: File[]) => void;
};

type Preview = { file: File; url: string };

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const CreateTicketModal = ({
  showTicketModal,
  handleClose,
  onImagesChange,
}: CreateTicketModalProps) => {
  const [description, setDescription] = useState("");
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  const createTicket = useCreateTicket((data) => {
    toast.success("Ticket created successfully");
    console.log(data);
  });

  const files = useMemo(() => previews.map((p) => p.file), [previews]);

  useEffect(() => {
    onImagesChange?.(files);
  }, [files, onImagesChange]);

  const validateAndPrepare = useCallback((selected: FileList | File[]) => {
    const accepted: Preview[] = [];
    const issues: string[] = [];

    Array.from(selected).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        issues.push(`"${file.name}" is not an image.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        issues.push(`"${file.name}" exceeds 50MB.`);
        return;
      }
      const url = URL.createObjectURL(file);
      accepted.push({ file, url });
    });

    if (issues.length) setError(issues.join(" "));
    else setError(null);

    // Avoid duplicate files by name+size (simple heuristic)
    setPreviews((prev) => {
      const existingKeys = new Set(
        prev.map((p) => `${p.file.name}-${p.file.size}`)
      );
      const deduped = accepted.filter(
        (p) => !existingKeys.has(`${p.file.name}-${p.file.size}`)
      );
      return [...prev, ...deduped];
    });
  }, []);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length) {
        validateAndPrepare(e.target.files);
        // reset so selecting same file again still triggers change
        e.target.value = "";
      }
    },
    [validateAndPrepare]
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      const dtFiles = e.dataTransfer.files;
      if (dtFiles && dtFiles.length) validateAndPrepare(dtFiles);
    },
    [validateAndPrepare]
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const removePreview = useCallback((idx: number) => {
    setPreviews((prev) => {
      const copy = [...prev];
      const [removed] = copy.splice(idx, 1);
      if (removed) URL.revokeObjectURL(removed.url);
      return copy;
    });
  }, []);

  const openFileDialog = useCallback(() => inputRef.current?.click(), []);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <ModalContainer handleClose={handleClose} active={showTicketModal}>
      <ModalHeader headText="Create New Ticket" handleCancel={handleClose} />
      <ModalBody>
        <TransferInput
          handleInput={(e) => {
            setTitle(e);
          }}
          placeholder="Enter title"
          label="Title"
          greenBorder
        />
        {/* Description */}
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <p className="text-[#707070] font-work-sans-regular text-xs lg:text-sm mb-1">
              Description
            </p>
            <p className="text-[#707070] font-work-sans-regular text-xs lg:text-sm mb-1">
              {description.length}/1000
            </p>
          </div>
          <textarea
            className="bg-[#F2F4F799] border-[0.5px] border-[#BEBEBE59] w-full rounded-lg min-h-[80px] p-2 outline-none"
            maxLength={1000}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue..."
          />
        </div>

        {/* Upload */}
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <p className="text-[#707070] font-work-sans-regular text-xs lg:text-sm mb-1">
              Upload Image
            </p>
          </div>

          {/* Hidden input */}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onInputChange}
          />

          {/* Drop zone */}
          <div
            role="button"
            tabIndex={0}
            onClick={openFileDialog}
            onKeyDown={(e) =>
              e.key === "Enter" || e.key === " " ? openFileDialog() : null
            }
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={[
              "h-[150px] rounded-lg border border-dashed gap-1 flex items-center flex-col justify-center cursor-pointer transition",
              isDragOver
                ? "bg-[#d9fff6] border-[#0DAE94]"
                : "bg-[#E7F7F459] border-[#0DAE94]",
            ].join(" ")}
            aria-label="Drop images here or browse to upload"
            aria-describedby="upload-help"
          >
            <Image src={multiUploadIcon} alt="" />
            <div>
              <p className="text-[#202020] text-base font-work-sans-medium">
                Drop picture files here or{" "}
                <span className="text-[#0DAE94] underline">browse</span>
              </p>
            </div>
            <p className="text-[#707070] font-work-sans-regular">
              Maximum size: 50MB
            </p>
          </div>

          <p
            id="upload-help"
            className="font-work-sans-regular text-xs mt-1 text-[#707070]"
          >
            Upload any extra screenshots, files or images that could help us
            solve your issue.
          </p>

          {error && <p className="text-red-600 text-xs mt-2">{error}</p>}

          {/* Thumbnails */}
          {previews.length > 0 && (
            <div className="mt-3">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {previews.map((p, idx) => (
                  <div
                    key={`${p.file.name}-${p.file.size}-${idx}`}
                    className="relative group"
                  >
                    <div className="relative w-full h-24 bg-white border border-[#BEBEBE59] rounded-md overflow-hidden">
                      {/* Using <img> for blob URLs to avoid Next Image domain config */}
                      <img
                        src={p.url}
                        alt={p.file.name}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePreview(idx);
                      }}
                      className="absolute -top-2 -right-2 bg-black/70 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                      aria-label={`Remove ${p.file.name}`}
                    >
                      ✕
                    </button>
                    <p className="mt-1 text-[10px] text-[#707070] line-clamp-1">
                      {p.file.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="flex justify-end gap-2">
          <Button
            action={() => {
              handleClose();
            }}
            loading={false}
            text="Cancel"
            buttonSmaller
            variant="grey-bg"
          />
          <Button
            action={async () => {
              const attachment = await fileToBase64(previews[0].file);
              const attachmenet_ = attachment.split(",")[1];
              createTicket.mutate({
                attachment: attachmenet_,
                description: description,
                issue: title,
              });
            }}
            loading={createTicket.isPending}
            text="Send"
            variant="green-bg"
            buttonSmaller
          />
        </div>
      </ModalFooter>
    </ModalContainer>
  );
};
