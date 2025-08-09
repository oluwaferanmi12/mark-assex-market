"use client";

import { FadeIn } from "@/animation/fade-in";
import { DocumentVerification } from "@/components/shared/verification/document-verification";
import { VerifyPersonalDetails } from "@/components/shared/verification/personal-details";
import { PersonalFinanceVerification } from "@/components/shared/verification/personal-finance";
import { VerifyPhoneNumber } from "@/components/shared/verification/verify-phone-number";
import { ModuleVerified } from "@/components/shared/wrappers/account-verified-module";
import { PageHeader } from "@/components/ui/text/page-header";
import { useAccountVerification } from "@/hooks/custom/settings/accoun-verification/useAccountVerification";
import { Col, Row } from "antd";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const AccountVerification = () => {
  const { activeState, verifyRequirements, resolveNextState } =
    useAccountVerification();

  return (
    <>
      <PageHeader text="Account Verification" />
      <p className="text-[#707070] font-work-sans-regular">
        Verify your account so you can do more.
      </p>

      <div className="flex items-center  hide-scrollbar overflow-x-scroll  lg:hidden">
        {verifyRequirements.map((item, index) => {
          return (
            <ModuleVerified
              status={item.id === activeState ? "verifying" : item.status}
              text={item.text}
            />
          );
        })}
      </div>

      <div className="my-8">
        <Row gutter={{ lg: 40 }}>
          <Col xs={0} lg={4}>
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
          <Col xs={24} lg={20}>
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
