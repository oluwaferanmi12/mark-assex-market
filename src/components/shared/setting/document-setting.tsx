import { DocumentUploadContainer } from "@/components/shared/setting/document-upload-container";
import { useGetKyc } from "@/hooks/queries/useSettings";

export const DocumentSetting = () => {
  const { data } = useGetKyc();
  console.log(data, "Data value here");
  return (
    <>
      <div className="mb-4">
        <p className="font-work-sans-medium text-[#202020] text-base lg:text-lg">
          Address Verification
        </p>
        <p className=" text-[#707070] text-xs lg:text-sm font-work-sans-regular">
          Please upload a clear, colored copy of any of the following documents
          that shows your full name and residential address: Utility Bill, Bank
          Statement, Government-issued document (Issued within the last 3
          months)
        </p>
        <DocumentUploadContainer />
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
        <DocumentUploadContainer />
      </div>
      <div className="mb-4">
        <p className="font-work-sans-medium text-[#202020] text-base lg:text-lg">
          Additional Document
        </p>
        <p className=" text-[#707070] font-work-sans-regular text-xs lg:text-sm ">
          {`Optional: Add any supporting document.`}
        </p>
        <DocumentUploadContainer />
      </div>
    </>
  );
};
