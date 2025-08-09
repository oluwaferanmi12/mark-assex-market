import { useGetKyc, useGetUserProfile } from "@/hooks/queries/useSettings";
import {
  ModuleVerifiedStatus,
  VerificationIdtype,
} from "@/interfaces/ui-interfac";
import { UserProfileInterface } from "@/types";
import { useEffect, useState } from "react";

export const useAccountVerification = () => {
  const [activeState, setActiveState] = useState<VerificationIdtype>("loading");

  const [verifyRequirements, setVerifyRequirements] = useState<
    { text: string; status: ModuleVerifiedStatus; id: VerificationIdtype }[]
  >([
    { text: "Verify Email Address", status: "verified", id: "email" },
    { text: "Verify Phone Number", status: "verifying", id: "phone" },
    {
      text: "Personal Information",
      status: "not-verified",
      id: "personal-info",
    },
    {
      text: "Personal Finance Info",
      status: "not-verified",
      id: "personal-finance",
    },
    { text: "Document Verification", status: "not-verified", id: "document" },
  ]);

  const resolveNextState = (currentState: typeof activeState) => {
    // now what should be done here is to see the next content that is not-verified and then set it to verifying and resolve every toher state
    const clonedObject = [...verifyRequirements];
    const objectFound = clonedObject.find((item) => item.id === currentState)!;
    objectFound.status = "verified";
    const nextObject = clonedObject.find((item) => {
      return item.status === "not-verified";
    })!;
    nextObject.status = "verifying";
    setActiveState(nextObject.id);
    setVerifyRequirements(clonedObject);
  };

  const { data: kycDetails } = useGetKyc();

  useEffect(() => {
    if (kycDetails) {
      if (!kycDetails.phoneStatus || kycDetails.phoneStatus === "PENDING") {
        setActiveState("phone");
      } else if (kycDetails.phoneStatus === "APPROVED") {
        setActiveState("personal-info");
      }
      const payload = verifyRequirements.map((item) => ({ ...item }));
      payload[1].status =
        kycDetails.phoneStatus === "APPROVED"
          ? "verified"
          : kycDetails.phoneStatus === "REJECTED"
          ? "not-verified"
          : "verifying";
      payload[1].status =
        kycDetails.phoneStatus === "APPROVED"
          ? "verified"
          : kycDetails.phoneStatus === "REJECTED"
          ? "not-verified"
          : "verifying";
      setVerifyRequirements(payload);
    }
  }, [kycDetails]);

  return {
    activeState,
    setActiveState,
    verifyRequirements,
    setVerifyRequirements,
    resolveNextState,
    kycDetails,
  };
};
