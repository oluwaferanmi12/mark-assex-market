"use client";

import { FadeIn } from "@/animation/fade-in";
import { AccounVerificationPending } from "@/components/shared/container/account-verifitcation-pending";
import { AccountSetting } from "@/components/shared/setting/account-setting";
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
      </div>
    </>
  );
};

export default Settings;
