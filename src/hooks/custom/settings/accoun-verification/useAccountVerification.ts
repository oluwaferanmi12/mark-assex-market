import { useGetKyc, useGetUserProfile } from "@/hooks/queries/useSettings";
import {
  ModuleVerifiedStatus,
  VerificationIdtype,
} from "@/interfaces/ui-interfac";
import { UserProfileInterface } from "@/types";
import { data } from "framer-motion/client";
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
  const { data: userProfile } = useGetUserProfile();

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
    if (kycDetails && userProfile) {
      const payload = verifyRequirements.map((item) => ({ ...item }));
      if (kycDetails.phoneStatus && kycDetails.phoneStatus === "APPROVED") {
        payload[1].status = "verified";
        if (userProfile?.firstName) {
          payload[2].status = "verified";
          if (
            kycDetails.accountPurpose ||
            kycDetails.annualIncome ||
            kycDetails.businessNature ||
            kycDetails.currentWork ||
            kycDetails.educationLevel ||
            kycDetails.annualInvestment ||
            kycDetails.financialObligation ||
            kycDetails.fundsSource ||
            kycDetails.netCapital
          ) {
            payload[3].status = "verified";
            setActiveState("document");
          } else {
            payload[3].status = "verifying";
            setActiveState("personal-finance");
          }
        } else {
          payload[2].status = "verifying";
          setActiveState("personal-info");
        }
      } else {
        payload[1].status = "verifying";
        setActiveState("phone");
      }

      //   payload[1].status =
      //     kycDetails.phoneStatus === "APPROVED"
      //       ? "verified"
      //       : kycDetails.phoneStatus === "REJECTED"
      //       ? "not-verified"
      //       : "verifying";
      payload[2].status =
        kycDetails.phoneStatus === "APPROVED"
          ? "verified"
          : kycDetails.phoneStatus === "REJECTED"
          ? "not-verified"
          : "verifying";

      setVerifyRequirements(payload);
    }
  }, [kycDetails, userProfile]);

  return {
    activeState,
    setActiveState,
    verifyRequirements,
    setVerifyRequirements,
    resolveNextState,
    kycDetails,
  };
};
