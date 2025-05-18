import { Button } from "@/components/ui/buttons/button";
import { useState } from "react";
import iconTransaction from "@/assets/svgs/icon-transaction.svg";
import arrowUpRight from "@/assets/svgs/arrow-up-right.svg";
import arrowDownLeft from "@/assets/svgs/arrow-down-left.svg";
import ellipsis from "@/assets/svgs/ellipsis.svg";
import editIconBlack from "@/assets/svgs/edit-icon-dark.svg";
import editIconWhite from "@/assets/svgs/edit-icon-white.svg";
import { DropDownList } from "@/components/ui/drop-down/dropdown-list";
import { DropDownListInterface } from "@/interfaces/ui-interfac";
import Image from "next/image";
import padlockIcon from "@/assets/svgs/padlockIcon.svg";
import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";
import { GInput } from "@/components/ui/inputs/general-input";
import { PasswordValidateText } from "@/components/ui/text/password-validate-text";
import { ModalFooter } from "@/components/shared/modal-wrapper/modal-footer";
import { ModalHeader } from "@/components/shared/modal-wrapper/modal-header";
import { ModalBody } from "@/components/shared/modal-wrapper/modal-body";
import tradeActive from "@/assets/svgs/trade-active-icon.svg";
import depositIcon from "@/assets/svgs/deposit-icon.svg";
import withdrawIcon from "@/assets/svgs/withdraw-icon.svg";
import mobileEllipsis from "@/assets/svgs/mobile-ellipsis-icon.svg";
import mobileEditIcon from "@/assets/svgs/mobile-edit-icon.svg";

export const TradeContainer = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [liveAccountSelected, setLiveAccountSelected] = useState("");
  const [showCustomiseNameModal, setShowCustomiseNameModal] = useState(false);
  const [password, setPassword] = useState("");
  const [newAccountName, setNewAccountName] = useState("");
  const liveAccountDropDownList: DropDownListInterface[] = [
    { text: "Deposit Funds", id: "" },
    { text: "Account Trade History", id: "" },
    {
      text: "Change Password",
      id: "",
      clickAction: () => {
        setShowPasswordModal(true);
      },
    },
    { text: "Archive Account", id: "" },
    {
      text: "Customize Account Name",
      id: "",
      clickAction: () => {
        setShowCustomiseNameModal(true);
      },
    },
  ];
  return (
    <>
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
      <div
        style={{ border: "0.5px solid #BEBEBE " }}
        className="my-4 hidden lg:block  bg-white  rounded-lg"
      >
        <div
          style={{ borderBottom: "0.5px solid #BEBEBE " }}
          className="flex p-6 border-b   justify-between items-stretch"
        >
          <div className="flex flex-col gap-4 ">
            <div className="flex items-center gap-3">
              <span className="bg-[#34C65933] rounded-sm text-xs text-[#34C659] px-2 py-1 font-work-sans-regular">
                Live
              </span>
              <span className="bg-[#1F0D3F1A] rounded-sm text-xs text-[#1F0D3F] px-2 py-1 font-work-sans-regular">
                Raw Spread
              </span>
              <span className="bg-[#F1F5F9] rounded-sm text-xs text-black px-2 py-1 font-work-sans-regular">
                Account #81978
              </span>
            </div>
            <p className="text-3xl font-work-sans-semi-bold text-black">$50,000 USD</p>
          </div>
          <div className="flex items-center gap-12 ">
            <div className="flex items-center gap-4 flex-col justify-center">
              <p className="text-[#0DAE94]  font-work-sans-regular">Equity</p>
              <p className="text-lg font-work-sans-regular text-black">50,000 USD</p>
            </div>
            <div className="flex gap-4 items-center flex-col justify-center">
              <p className="text-[#0DAE94] font-work-sans-regular">Leverage</p>
              <p className="text-lg font-work-sans-regular text-black">1:500</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 ">
            <div className="flex justify-end">
              <Button
                icon={iconTransaction}
                variant="green-bg"
                buttonSmaller
                text="Trade"
                loading={false}
                action={() => {}}
                textBolder
              />
            </div>
            <div className="flex items-center gap-3">
              <Button
                icon={arrowDownLeft}
                variant="green-bg-faded"
                buttonSmaller
                text="Deposit"
                loading={false}
                action={() => {}}
                textBolder
                fullRounded
              />
              <Button
                icon={arrowUpRight}
                variant="green-bg-faded"
                buttonSmaller
                text="Withdraw"
                loading={false}
                action={() => {}}
                textBolder
                fullRounded
              />
              <DropDownList
                selected={liveAccountSelected}
                setSelected={setLiveAccountSelected}
                dropDownList={liveAccountDropDownList}
              >
                <span>
                  <Image src={ellipsis} alt="" />
                </span>
              </DropDownList>
            </div>
          </div>
        </div>
        <div className="p-6  flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-[#707070] text-lg font-work-sans-regular">
              Balance
            </p>
            <p className="text-[#707070] text-lg font-work-sans-regular">
              Equity
            </p>
            <p className="text-[#707070] text-lg font-work-sans-regular">
              MT5 Login: <span className="text-[#1F0D3F]">81978</span>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-[#707070] flex items-center gap-12 text-lg font-work-sans-regular">
              <p className="text-[#202020]">$ 50,000</p>
              <p>Actual leverage</p>
            </div>
            <div className="text-[#707070] flex items-center gap-12 text-lg font-work-sans-regular">
              <p className="text-[#202020]">$ 50,000</p>
              <p>Available to withdraw</p>
            </div>
            <p className="text-[#707070] text-lg font-work-sans-regular">
              Server: <span className="text-[#1F0D3F]">Assexmarkets MT5</span>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-[#707070] flex items-center gap-1 text-lg font-work-sans-regular justify-end">
              <p className="text-[#202020]">1:200</p>
              <Image src={editIconBlack} alt="" />
            </div>
            <p className="text-[#202020] flex justify-end items-center text-lg font-work-sans-regular">
              $ 49,000
            </p>
            <div>
              <Button
                variant="green-bg"
                action={() => {
                  setShowPasswordModal(true);
                }}
                loading={false}
                text="Change password"
                buttonSmaller
                icon={editIconWhite}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden bg-white rounded-lg p-4 mb-2 mt-2">
        <div className="flex items-center gap-3">
          <span className="bg-[#34C65933] rounded-sm text-xs text-[#34C659] px-2 py-1 font-work-sans-regular">
            Live
          </span>
          <span className="bg-[#1F0D3F1A] rounded-sm text-xs text-[#1F0D3F] px-2 py-1 font-work-sans-regular">
            Raw Spread
          </span>
          <span className="bg-[#F1F5F9] rounded-sm text-xs text-black px-2 py-1 font-work-sans-regular">
            Account #81978
          </span>
        </div>
        <p className="font-work-sans-medium my-4 text-lg">$ 50,000 USD</p>
        <div className="flex items-start justify-between">
          <div className="flex items-center flex-col justify-center gap-2">
            <span>
              <Image src={tradeActive} alt="" />
            </span>
            <p className="text-[#202020] font-work-sans-regular">Trade</p>
          </div>
          <div className="flex items-center flex-col justify-center gap-2">
            <span>
              <Image src={depositIcon} alt="" />
            </span>
            <p className="text-[#0DAE94] font-work-sans-regular">Deposit</p>
          </div>
          <div className="flex items-center flex-col justify-center gap-2">
            <span>
              <Image src={withdrawIcon} alt="" />
            </span>
            <p className="text-[#0DAE94] font-work-sans-regular">Withdraw</p>
          </div>
          <div>
            <span>
              <DropDownList
                selected={liveAccountSelected}
                setSelected={setLiveAccountSelected}
                dropDownList={liveAccountDropDownList}
              >
                <Image src={mobileEllipsis} alt="" />
              </DropDownList>
            </span>
          </div>
        </div>
        <div className="my-3">
          <div className="flex items-center py-4 justify-between border-b border-[#BEBEBE80]">
            <p className="font-work-sans-regular text-[#707070] text-xs">
              Balance
            </p>
            <p className="font-work-sans-regular text-[#404040] text-xs">
              $50,000
            </p>
          </div>
          <div className="flex items-center py-4 justify-between border-b border-[#BEBEBE80]">
            <p className="font-work-sans-regular text-[#707070] text-xs">
              Actual leverage
            </p>
            <div className="flex items-center gap-2">
              <p className="font-work-sans-regular text-[#404040] text-xs">
                1:200
              </p>
              <span>
                <Image src={mobileEditIcon} alt="" />
              </span>
            </div>
          </div>
          <div className="flex items-center py-4 justify-between border-b border-[#BEBEBE80]">
            <p className="font-work-sans-regular text-[#707070] text-xs">
              Equity
            </p>
            <p className="font-work-sans-regular text-[#404040] text-xs">
              $50,000
            </p>
          </div>
          <div className="flex items-center py-4 justify-between border-b border-[#BEBEBE80]">
            <p className="font-work-sans-regular text-[#707070] text-xs">
              Available to withdraw
            </p>
            <p className="font-work-sans-regular text-[#404040] text-xs">
              $50,000
            </p>
          </div>
          <div className="flex items-center py-4 justify-between border-b border-[#BEBEBE80]">
            <p className="font-work-sans-regular text-[#707070] text-xs">
              MT5 Login
            </p>
            <p className="font-work-sans-regular text-[#404040] text-xs">
              81978
            </p>
          </div>
          <div className="flex items-center py-4 justify-between border-b border-[#BEBEBE80]">
            <p className="font-work-sans-regular text-[#707070] text-xs">
              Server
            </p>
            <p className="font-work-sans-medium text-[#404040] text-xs">
              Assexmarkets MT5
            </p>
          </div>
        </div>
        <Button
          variant="green-bg"
          text="Change password"
          action={() => {
            setShowPasswordModal(true)
          }}
          loading={false}
          fullWidth
        />
      </div>
    </>
  );
};
