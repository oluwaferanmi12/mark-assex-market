"use client";

import { AccounVerificationPending } from "@/components/shared/container/account-verifitcation-pending";
import { Button } from "@/components/ui/buttons/button";
import React, { useEffect, useRef, useState } from "react";
import plusIcon from "@/assets/svgs/table-icon-plus.svg";
import { motion } from "framer-motion";
import { DashboardCardWrapper } from "@/components/shared/wrappers/dashboard-card-wrapper";
import smallCardIcon from "@/assets/svgs/dashboard-card-icon.svg";
import Image from "next/image";
import eyeOff from "@/assets/svgs/top-nav-eye-icon.svg";
import infoIcon from "@/assets/svgs/info-icon.svg";
import arrowDown from "@/assets/svgs/filled-arrow-down.svg";
import { DropDownListInterface } from "@/interfaces/ui-interfac";
import { DropDownList } from "@/components/ui/drop-down/dropdown-list";
import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";
import padlockIcon from "@/assets/svgs/padlockIcon.svg";
import { GInput } from "@/components/ui/inputs/general-input";
import { PasswordValidateText } from "@/components/ui/text/password-validate-text";
import { ModalHeader } from "@/components/shared/modal-wrapper/modal-header";
import { ModalBody } from "@/components/shared/modal-wrapper/modal-body";
import { ModalFooter } from "@/components/shared/modal-wrapper/modal-footer";
import checkCircle from "@/assets/svgs/check-circle-icon.svg";
import { TradeContainer } from "@/components/shared/wrappers/trade-container";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetAccount } from "@/hooks/queries/useAccount";

const Account = () => {
  const [activeAccount, setActiveAccount] = useState<"live" | "demo">("live");
  const liveRef = useRef<HTMLParagraphElement>(null);
  const demoRef = useRef<HTMLParagraphElement>(null);
  const [highlightStyles, setHighlightStyles] = useState({
    left: 0,
    width: 0,
  });
  const [liveAccountSelected, setLiveAccountSelected] = useState("");
  const [filterSelected, setFilterSelected] = useState("Newest");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showCustomiseNameModal, setShowCustomiseNameModal] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");
  const [showAccountReadyModal, setShowAccountReadyModal] = useState(false);
  const { data: accounts } = useGetAccount();
  const router = useRouter();
  useEffect(() => {
    const targetRef = activeAccount === "live" ? liveRef : demoRef;
    if (targetRef.current) {
      const { offsetLeft, offsetWidth } = targetRef.current;
      setHighlightStyles({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeAccount]);

  const filterDropDownList: DropDownListInterface[] = [
    { text: "All", id: "" },
    { text: "Newest", id: "" },
    { text: "Oldest", id: "" },
  ];
  function setShowModal(arg0: boolean) {
    throw new Error("Function not implemented.");
  }

  useEffect(() => {
    setTimeout(() => {
      setShowAccountReadyModal(true);
    }, 3000);
  }, []);

  return (
    <>
      <ModalContainer
        addPadding
        active={showAccountReadyModal}
        handleClose={() => {
          setShowAccountReadyModal(false);
        }}
      >
        <div className="flex justify-center items-center flex-col  px-2">
          <span>
            <Image src={checkCircle} alt="" />
          </span>
          <p className="text-xl font-work-sans-medium my-1">
            Your account is ready
          </p>
          <p className="text-xs text-[#707070] font-work-sans-regular">
            Your demo account has been created successfully!
          </p>
          <div className="mt-6 w-full">
            <Button
              text="Continue"
              fullWidth
              action={() => {
                setShowAccountReadyModal(false);
              }}
              variant="blue-bg"
              loading={false}
            />
          </div>
        </div>
      </ModalContainer>
      <ModalContainer
        active={showPasswordModal}
        handleClose={() => {
          setShowPasswordModal(false);
        }}
        addPadding
      >
        <div className="mb-4">
          <span>
            <Image src={padlockIcon} alt="" />
          </span>
        </div>
        <div>
          <p className="text-[#111111]  font-work-sans-medium text-xl">
            Change Password
          </p>
          <p className="text-[#707070] font-work-sans-regular">
            Please fill in the fields below
          </p>
          <form className="mt-4">
            <GInput
              label="New password"
              inputValue={password}
              setInputValue={setPassword}
              placeholder="New password"
              type="password"
            />
            <GInput
              label="Confirm Password"
              inputValue={password}
              setInputValue={setPassword}
              placeholder="Confirm password"
              type="password"
            />
            <div className="mb-3">
              <PasswordValidateText validated text="At least 8 characters" />
              <PasswordValidateText
                validated
                text="At least one uppercase letter (A–Z)"
              />
              <PasswordValidateText
                validated={false}
                text="At least 8 characters"
              />
              <PasswordValidateText
                validated={false}
                text="At least one special character (e.g. !, @, #, $)"
              />
            </div>
            <Button
              text="Continue"
              action={() => {}}
              variant="green-bg"
              loading={false}
              fullWidth
            />
          </form>
        </div>
      </ModalContainer>
      <ModalContainer
        active={showCustomiseNameModal}
        handleClose={() => {
          setShowCustomiseNameModal(false);
        }}
        greyBg
      >
        <ModalHeader
          headText="Customize account name"
          handleCancel={() => {
            setShowCustomiseNameModal(false);
          }}
        />
        <ModalBody>
          <div>
            <p className="font-work-sans-regular text-[#202020]">
              Live Account #81978 (Raw Spread){" "}
            </p>
            <p className="text-[#707070] text-xs font-work-sans-regular mt-1">
              Naming your accounts can make it easier to tell them apart if you
              manage more than one.
            </p>
            <form className="mt-4">
              <div className="relative">
                <GInput
                  label="New Account Name"
                  placeholder="Enter new account name"
                  inputValue={newAccountName}
                  setInputValue={setNewAccountName}
                />
                <span className="absolute bottom-[-20] right-0">
                  <p className="text-xs text-[#0DAE94] font-work-sans-regular">
                    1/24
                  </p>
                </span>
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end gap-2">
            <Button
              action={() => {
                setShowCustomiseNameModal(false);
              }}
              loading={false}
              text="Cancel"
              variant="grey-bg"
            />
            <Button
              action={() => {}}
              loading={false}
              text="Continue"
              variant="green-bg"
            />
          </div>
        </ModalFooter>
      </ModalContainer>
      <div>
        <AccounVerificationPending />
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p className="lg:text-2xl text-lg font-work-sans-medium  lg:font-work-sans-semi-bold">
              My Accounts
            </p>

            <Button
              variant="green-bg"
              action={() => {
                router.push("/account/create-account");
              }}
              loading={false}
              text="Open Live Account"
              icon={plusIcon}
              buttonSmaller
              textBolder
            />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="relative bg-[#F1F5F9] gap-2 flex items-center p-2 rounded-sm">
              {/* Animated background slider */}
              <motion.div
                className="absolute top-2 bottom-2 rounded-sm bg-white shadow"
                animate={{
                  left: highlightStyles.left,
                  width: highlightStyles.width,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              {/* Tabs */}
              <p
                ref={liveRef}
                onClick={() => {
                  setActiveAccount("live");
                  setShowModal(true);
                }}
                className={`relative z-10 font-work-sans-medium cursor-pointer p-2 lg:text-sm text-xs rounded-sm ${
                  activeAccount === "live" ? "text-[#111111]" : "text-[#707070]"
                }`}
              >
                Live Account
              </p>
              <p
                ref={demoRef}
                onClick={() => setActiveAccount("demo")}
                className={`relative z-10 font-work-sans-medium cursor-pointer p-2 lg:text-sm text-xs rounded-sm ${
                  activeAccount === "demo" ? "text-[#111111]" : "text-[#707070]"
                }`}
              >
                Demo Account
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col lg:flex-row items-center gap-2">
            <DashboardCardWrapper>
              <div className="flex items-center gap-3">
                <span>
                  <Image src={smallCardIcon} alt="" />
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 ">
                    <p className="text-[#404040] text-xs font-work-sans-medium">
                      Wallet balance
                    </p>
                    <span>
                      <Image src={eyeOff} alt="" />
                    </span>
                  </div>
                  <p className="text-[#111111] text-base lg:text-[20px] font-work-sans-semi-bold">
                    $ 0
                  </p>
                </div>
              </div>
            </DashboardCardWrapper>
            <DashboardCardWrapper>
              <div className="flex items-center gap-3">
                <span>
                  <Image src={smallCardIcon} alt="" />
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 ">
                    <p className="text-[#404040] text-xs font-work-sans-medium">
                      Total Revenue{" "}
                      <span className="text-[#707070] font-work-sans-regular">
                        (Live account)
                      </span>
                    </p>
                    <span>
                      <Image src={eyeOff} alt="" />
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-[#111111] font-work-sans-semi-bold text-base lg:text-[20px] ">
                      $ 0
                    </p>
                    <p className="text-[#34C659] text-xs font-work-sans-semi-bold">
                      +0%
                    </p>
                  </div>
                </div>
              </div>
            </DashboardCardWrapper>
            <DashboardCardWrapper>
              <div className="flex items-center gap-3">
                <span>
                  <Image src={smallCardIcon} alt="" />
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 ">
                    <p className="text-[#404040] text-xs font-work-sans-medium">
                      No. of trades
                    </p>
                    <span>
                      <Image src={eyeOff} alt="" />
                    </span>
                  </div>
                  <p className="text-[#111111] text-base lg:text-[20px]  font-work-sans-semi-bold">
                    0
                  </p>
                  <p className="text-[#34C659] text-xs font-work-sans-semi-bold">
                    Active: 5 I Closed: 2,018{" "}
                  </p>
                </div>
              </div>
            </DashboardCardWrapper>
            <DashboardCardWrapper>
              <span className="absolute cursor-pointer top-4 right-4">
                <Image src={infoIcon} alt="" />
              </span>
              <div className="flex items-center gap-4 ">
                <span>
                  <Image src={smallCardIcon} alt="" />
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 ">
                    <p className="text-[#404040] text-xs font-work-sans-medium">
                      Most Profitable Trade
                    </p>
                    <span>
                      <Image src={eyeOff} alt="" />
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-[#111111] text-base lg:text-[20px]  font-work-sans-semi-bold">
                      +$0
                    </p>
                    <p className="text-[#34C659] text-xs font-work-sans-semi-bold">
                      XAUUSD
                    </p>
                  </div>
                </div>
              </div>
            </DashboardCardWrapper>
          </div>
          <div className="mt-8">
            <div className="flex">
              <DropDownList
                dropDownList={filterDropDownList}
                selected={filterSelected}
                setSelected={setFilterSelected}
              >
                <div
                  style={{ boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)" }}
                  className="border border-[#BEBEBE80] justify-between min-w-[200px] flex bg-white rounded-lg px-4 py-2"
                >
                  <p className="font-work-sans-medium lg:text-sm text-xs">
                    {filterSelected}
                  </p>
                  <Image src={arrowDown} alt="" />
                </div>
              </DropDownList>
            </div>
            {accounts?.length ? (
              accounts.map((item) => {
                return (
                  <Link href={"/account/details"}>
                    <TradeContainer account={item} />
                  </Link>
                );
              })
            ) : (
              <div className="my-4 flex items-center w-full justify-center font-work-sans-medium">
                No accounts created
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
