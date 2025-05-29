"use client";

import { FadeIn } from "@/animation/fade-in";
import { AccounVerificationPending } from "@/components/shared/container/account-verifitcation-pending";
import { AccountSetting } from "@/components/shared/setting/account-setting";
import { AgreementSetting } from "@/components/shared/setting/agreement-setting";
import { DocumentSetting } from "@/components/shared/setting/document-setting";
import { NotificationSetting } from "@/components/shared/setting/notification-setting";
import { SecuritySetting } from "@/components/shared/setting/security-setting";
import { SettingsTab } from "@/components/shared/setting/settings-tab";
import { PageHeader } from "@/components/ui/text/page-header";
import { SettingsIdType, SettingsTabInterface } from "@/interfaces/ui-interfac";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsIdType>("account");

  return (
    <>
      <AccounVerificationPending />
      <div className="my-6">
        <PageHeader text="Account Settings" />
        <p className="text-[#707070] font-work-sans-regular ">
          Keep your information accurate and up to date.
        </p>
      </div>
      <SettingsTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="py-6">
        <AnimatePresence>
          {activeTab === "account" && (
            <FadeIn>
              <AccountSetting />
            </FadeIn>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeTab === "documents" && (
            <FadeIn>
              <DocumentSetting />
            </FadeIn>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeTab === "security" && (
            <FadeIn>
              <SecuritySetting />
            </FadeIn>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeTab === "notification" && (
            <FadeIn>
              <NotificationSetting />
            </FadeIn>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeTab === "agreement" && (
            <FadeIn>
              <AgreementSetting />
            </FadeIn>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Settings;
