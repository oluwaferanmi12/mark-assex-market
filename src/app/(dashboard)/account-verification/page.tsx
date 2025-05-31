"use client";

import { FadeIn } from "@/animation/fade-in";
import { DocumentVerification } from "@/components/shared/verification/document-verification";
import { VerifyPersonalDetails } from "@/components/shared/verification/personal-details";
import { PersonalFinanceVerification } from "@/components/shared/verification/personal-finance";
import { VerifyPhoneNumber } from "@/components/shared/verification/verify-phone-number";
import { ModuleVerified } from "@/components/shared/wrappers/account-verified-module";
import { PageHeader } from "@/components/ui/text/page-header";
import {
  ModuleVerifiedStatus,
  VerificationIdtype,
} from "@/interfaces/ui-interfac";
import { Col, Row } from "antd";
import { AnimatePresence } from "framer-motion";
import { resolve } from "path";
import React, { useState } from "react";

const AccountVerification = () => {
  const [activeState, setActiveState] = useState<VerificationIdtype>("phone");

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

  return (
    <>
      <PageHeader text="Account Verification" />
      <p className="text-[#707070] font-work-sans-regular">
        Verify your account so you can do more.
      </p>
      <div className="my-8">
        <Row gutter={40}>
          <Col xs={4}>
            <div>
              {verifyRequirements.map((item, index) => {
                return (
                  <ModuleVerified
                    status={item.id === activeState ? "verifying" : item.status}
                    text={item.text}
                  />
                );
              })}
            </div>
          </Col>
          <Col xs={20}>
            <AnimatePresence>
              {activeState === "phone" && (
                <FadeIn>
                  <VerifyPhoneNumber
                    resolveNextStatus={resolveNextState}
                    id="phone"
                  />
                </FadeIn>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {activeState === "personal-info" && (
                <FadeIn>
                  <VerifyPersonalDetails
                    id="personal-info"
                    resolveNextStatus={resolveNextState}
                  />
                </FadeIn>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {activeState === "personal-finance" && (
                <FadeIn>
                  <PersonalFinanceVerification
                    id="personal-finance"
                    resolveNextStatus={resolveNextState}
                  />
                </FadeIn>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {activeState === "document" && (
                <FadeIn>
                  <DocumentVerification
                    id={"document"}
                    resolveNextStatus={resolveNextState}
                  />
                </FadeIn>
              )}
            </AnimatePresence>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AccountVerification;
