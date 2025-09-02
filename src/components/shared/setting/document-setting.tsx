import { DocumentUploadContainer } from "@/components/shared/setting/document-upload-container";
import { Button } from "@/components/ui/buttons/button";
import { useGetKyc, useSaveKyc } from "@/hooks/queries/useSettings";
import { Col, Row } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import { DocUploadedBox } from "./doc-uploaded";

export const DocumentSetting = () => {
  const [addressDoc, setAddressDoc] = useState<File | null>(null);
  const [identityDoc, setIdentityDoc] = useState<File | null>(null);
  const [otherDocs, setOtherDocs] = useState<FileList | null>(null);
  const { data } = useGetKyc();

  const kycMutate = useSaveKyc(() => {
    toast.success("Document saved successfully");
  });
  const handleAddressUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const doc = e.target.files?.[0];
    if (doc) {
      setAddressDoc(doc);
    }
  };
  const handleIdentityDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const doc = e.target.files?.[0];
    if (doc) {
      setIdentityDoc(doc);
    }
  };
  const handleUploadOtherDocument = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const docs = e.target.files;
    if (docs && docs.length) {
      setOtherDocs(docs);
    }
  };

  const handleSubmitDoc = async () => {
    const formdata = new FormData();
    formdata.append("addressDocument", addressDoc!);
    formdata.append("identityDocument", identityDoc!);
    if (otherDocs) {
      Array.from(otherDocs).forEach((doc, index) => {
        formdata.append("otherDocs", doc); // the key must match what your backend expects
      });
    }
    kycMutate.mutate(formdata);
  };
  return (
    <>
      {data?.addressDocumentUrl || data?.identityDocumentUrl || otherDocs ? (
        <Row justify={"center"} gutter={12}>
          <Col xs={24} lg={8}>
            <DocUploadedBox
              boxType="address"
              documentType="Address Verifications"
              fileUrl={data?.addressDocumentUrl!}
              documentStatus={data?.addressStatus}
            />
          </Col>
          <Col xs={24} lg={8}>
            <DocUploadedBox
              boxType="identification"
              documentType="Identity Verification"
              fileUrl={data?.identityDocumentUrl!}
              documentStatus={data?.identityStatus}
            />
          </Col>
          <Col xs={24} lg={8}>
            <DocUploadedBox
              boxType="others"
              documentType="Additional Document"
              fileUrl={data?.otherDocumentUrl!}
              documentStatus={data?.otherStatus}
            />
          </Col>
        </Row>
      ) : (
        <>
          <div className="mb-4">
            <p className="font-work-sans-medium text-[#202020] text-base lg:text-lg">
              Address Verification
            </p>
            <p className=" text-[#707070] text-xs lg:text-sm font-work-sans-regular">
              Please upload a clear, colored copy of any of the following
              documents that shows your full name and residential address:
              Utility Bill, Bank Statement, Government-issued document (Issued
              within the last 3 months)
            </p>
            <DocumentUploadContainer
              docName={addressDoc?.name}
              uploadFunc={handleAddressUpload}
              file={data?.addressDocumentUrl}
            />
          </div>
          <div className="mb-4">
            <p className="font-work-sans-medium text-[#202020] text-base lg:text-lg">
              Identity Verification
            </p>
            <p className=" text-[#707070] text-xs lg:text-sm  font-work-sans-regular">
              {`Proof of Identification (POI) – Upload a clear color copy of your
          international passport. If unavailable, a valid government-issued ID
          (e.g., national ID or driver’s license) is acceptable. The document
          must show your full name, photo, signature, date of birth, issue and
          expiry dates, and document number. Required to open a real trading
          account.`}
            </p>
            <DocumentUploadContainer
              file={data?.identityDocumentUrl}
              docName={identityDoc?.name}
              uploadFunc={handleIdentityDocument}
            />
          </div>
          <div className="mb-4">
            <p className="font-work-sans-medium text-[#202020] text-base lg:text-lg">
              Additional Document
            </p>
            <p className=" text-[#707070] font-work-sans-regular text-xs lg:text-sm ">
              {`Optional: Add any supporting document.`}
            </p>
            <DocumentUploadContainer
              multiple
              uploadFunc={handleUploadOtherDocument}
              // @ts-ignore
              docName={otherDocs?.item(0)?.name}
            />
          </div>
          <div className="flex items-center justify-end">
            <Button
              action={() => {
                handleSubmitDoc();
              }}
              loading={kycMutate.isPending}
              text="Upload"
              variant="green-bg"
            />
          </div>
        </>
      )}
    </>
  );
};
