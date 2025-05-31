import { DocumentSetting } from "@/components/shared/setting/document-setting";
import { VerificationIdtype } from "@/interfaces/ui-interfac";

export const DocumentVerification = ({
  id,
  resolveNextStatus,
}: {
  id: VerificationIdtype;
  resolveNextStatus: (val: VerificationIdtype) => void;
}) => {
  return <DocumentSetting />;
};
