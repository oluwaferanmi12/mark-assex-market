import { Button } from "@/components/ui/buttons/button";
import { useEffect, useRef, useState } from "react";
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
import arrowDown from "@/assets/svgs/filled-arrow-down.svg";
import { ModalFooter } from "@/components/shared/modal-wrapper/modal-footer";
import { ModalHeader } from "@/components/shared/modal-wrapper/modal-header";
import { ModalBody } from "@/components/shared/modal-wrapper/modal-body";
import tradeActive from "@/assets/svgs/trade-active-icon.svg";
import depositIcon from "@/assets/svgs/deposit-icon.svg";
import withdrawIcon from "@/assets/svgs/withdraw-icon.svg";
import mobileEllipsis from "@/assets/svgs/mobile-ellipsis-icon.svg";
import mobileEditIcon from "@/assets/svgs/mobile-edit-icon.svg";
import minusIcon from "@/assets/svgs/minus-button.svg";
import plusIcon from "@/assets/svgs/plus-button.svg";
import redCaution from "@/assets/svgs/red-caution.svg";
import { useRouter } from "next/navigation";
import { Account } from "@/types";
import { MoneyFormat } from "@/utils/money-format";
import { Col, Row } from "antd";
import horizontalDashes from "@/assets/svgs/dashed-lines.svg";
import Link from "next/link";
import copyBlueIcon from "@/assets/svgs/copy-blue-icon.svg";
import { CopyWrapper } from "./copy-wrapper";
import keyIcon from "@/assets/svgs/key-icon.svg";
import {
  useArchiveAccount,
  useChangeAccountLeverage,
  useChangeAccountPassword,
  useUnArchiveAccount,
} from "@/hooks/queries/useAccount";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const TradeContainer = ({
  account,
  tradeLink,
}: {
  account: Account;
  tradeLink: string;
}) => {
  const queryClient = useQueryClient();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [liveAccountSelected, setLiveAccountSelected] = useState("");
  const [showCustomiseNameModal, setShowCustomiseNameModal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newAccountName, setNewAccountName] = useState("");
  const [showLeverageModal, setShowLeverageModal] = useState(false);
  const [customLeverage, setCustomLeverage] = useState("");
  const router = useRouter();
  const [manualLeverage, setManualLeverage] = useState("Custom");
  const archiveAccount = useArchiveAccount(() => {
    toast.success("Account Archived");
    queryClient.invalidateQueries({ queryKey: ["get-account"] });
  });
  const unArchiveAccount = useUnArchiveAccount(() => {
    toast.success("Account Active");
    queryClient.invalidateQueries({ queryKey: ["get-account"] });
  });
  const leverageDropDown: DropDownListInterface[] = [
    { text: "Custom", id: "custom" },
    { text: "1:2", id: "2" },
    { text: "1:20", id: "20" },
    { text: "1:50", id: "50" },
    { text: "1:100", id: "100" },
    { text: "1:200", id: "200" },
    { text: "1:300", id: "300" },
    { text: "1:400", id: "400" },
    { text: "1:500", id: "500" },
    { text: "1:600", id: "600" },
    { text: "1:800", id: "800" },
    { text: "1:1000", id: "1000" },
    { text: "1:2000", id: "2000" },
    { text: "1:Unlimited", id: "Unlimited" },
  ];
  const liveAccountDropDownList: DropDownListInterface[] = [
    { text: "Deposit Funds", id: "" },
    {
      text: "Change Password",
      id: "",
      clickAction: () => {
        setShowPasswordModal(true);
      },
    },
    {
      text:
        account.status === "ACTIVE" ? "Archive Account" : "UnArchive Account",
      id: "",
      clickAction: () => {
        if (account.status === "ACTIVE") {
          archiveAccount.mutate(account.id);
        } else {
          unArchiveAccount.mutate(account.id);
        }
      },
    },
  ];

  const changePasswordMutate = useChangeAccountPassword(() => {
    setPassword("");
    setConfirmPassword("");
    setShowPasswordModal(false);
    toast.success("Password Changed");
  });
  const changeLeverageMutate = useChangeAccountLeverage(() => {
    queryClient.invalidateQueries({ queryKey: ["get-account"] });
    setShowLeverageModal(false);
    toast.success("Leverage updated");
  });

  const validateData = () => {
    let validated = true;
    if (!password) {
      validated = false;
      setPasswordError("Password is required");
    } else if (
      !(password.length >= 8) ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      setPasswordError("Criteria for password does not match");
    } else if (password !== confirmPassword) {
      validated = false;
      setPasswordError("Password mismatch");
    }
    return validated;
  };

  const handleChangePassword = () => {
    if (validateData()) {
      changePasswordMutate.mutate({ id: account.id, password: password });
    }
  };

  useEffect(() => {
    if (account) {
      // now find the account leverage and then determine the default value
      const leverageFound = leverageDropDown.find(
        (item) => +item.id === account.leverage
      );
      if (leverageFound) {
        setManualLeverage(`1:${account.leverage}`);
      } else {
        setCustomLeverage(String(account.leverage));
        setManualLeverage("Custom");
      }
    }
  }, [account]);
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
        active={showLeverageModal}
        handleClose={() => {
          setShowLeverageModal(false);
        }}
        greyBg
      >
        <ModalHeader
          handleCancel={() => setShowLeverageModal(false)}
          headText="Change Leverage"
        />
        <ModalBody>
          <div className="my-3">
            <p className="mb-2 font-work-sans-regular text-[#202020]">
              Change Max Leverage{" "}
              <span className="text-xs text-[#707070]">
                (Account #{account.mt5Id})
              </span>
            </p>
            <DropDownList
              dropDownList={leverageDropDown}
              selected={manualLeverage}
              setSelected={setManualLeverage}
            >
              <div
                style={{ boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)" }}
                className="border border-[#BEBEBE80] justify-between min-w-[200px] flex bg-white rounded-lg px-4 py-3"
              >
                <p className="font-work-sans-regular  text-xs">
                  {manualLeverage}
                </p>
                <Image src={arrowDown} alt="" />
              </div>
            </DropDownList>
            {manualLeverage === "Custom" && (
              <div className="mt-2">
                <GInput
                  errorState="Range: 1:2 - 1:2000000000"
                  placeholder="Value"
                  label="Value"
                  inputValue={customLeverage}
                  setInputValue={setCustomLeverage}
                />
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="my-3">
            <Button
              fullWidth
              variant="green-bg"
              text="Change"
              loading={changeLeverageMutate.isPending}
              action={() => {
                // handle if it is manual leverage or whatnot
                let leverage: number;
                if (manualLeverage === "Custom" && customLeverage) {
                  leverage = +customLeverage;
                } else {
                  const split = manualLeverage.split(":");
                  leverage = +split[1];
                }

                changeLeverageMutate.mutate({
                  id: account.id,
                  leverage: leverage,
                });
              }}
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
              errorState={passwordError}
            />
            <GInput
              label="Confirm Password"
              inputValue={confirmPassword}
              setInputValue={setConfirmPassword}
              placeholder="Confirm password"
              type="password"
            />
            {!!password.length && (
              <div className="mb-3">
                <PasswordValidateText
                  validated={password.length >= 8}
                  text="At least 8 characters"
                />
                <PasswordValidateText
                  validated={/[A-Z]/.test(password)}
                  text="At least one uppercase letter (A–Z)"
                />
                <PasswordValidateText
                  validated={/[0-9]/.test(password)}
                  text="At least one number (0–9)"
                />
                <PasswordValidateText
                  validated={/[^A-Za-z0-9]/.test(password)}
                  text="At least one special character (e.g. !, @, #, $)"
                />
              </div>
            )}

            <Button
              text="Continue"
              action={() => {
                handleChangePassword();
              }}
              variant="green-bg"
              loading={changePasswordMutate.isPending}
              fullWidth
            />
          </form>
        </div>
      </ModalContainer>
      <div
        style={{ border: "0.5px solid #BEBEBE59 " }}
        className="my-4 hidden lg:block  bg-white   rounded-lg"
      >
        <div
          style={{ borderBottom: "0.5px solid #BEBEBE " }}
          className="flex p-6 border-b  justify-between items-stretch"
        >
          <div className="flex flex-col gap-4 ">
            <div className="flex items-center gap-3">
              <span className="bg-[#34C65933]  rounded-full text-xs text-[#34C659] px-2 py-1 font-work-sans-regular">
                {account.accountGroup.type}
              </span>
              <span className="bg-[#1F0D3F1A] rounded-full text-xs text-[#1F0D3F] px-2 py-1 font-work-sans-regular">
                {account.accountGroup.name}
              </span>
              <span className="bg-[#F1F5F9] rounded-full text-xs text-black px-2 py-1 font-work-sans-regular">
                Account {account.mt5Id}
              </span>
            </div>
            <p className="text-3xl font-work-sans-semi-bold text-black">
              ${MoneyFormat(account.balance)} USD
            </p>
          </div>

          <div className="flex flex-col gap-4 ">
            <div className="flex justify-end">
              <Link href={tradeLink}>
                <Button
                  icon={iconTransaction}
                  variant="green-bg"
                  buttonSmaller
                  text="Trade"
                  loading={false}
                  action={() => {}}
                  textBolder
                />
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button
                icon={arrowDownLeft}
                variant="green-bg-faded"
                buttonSmaller
                text="Deposit"
                loading={false}
                action={() => {
                  router.push("/deposit");
                }}
                textBolder
                fullRounded
              />
              <Button
                icon={arrowUpRight}
                variant="green-bg-faded"
                buttonSmaller
                text="Withdraw"
                loading={false}
                action={() => {
                  router.push("/withdrawal");
                }}
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

        <div className="px-6 pt-6">
          <Row gutter={48}>
            <Col xs={12}>
              <div className="flex items-center gap-2 mb-4 ">
                <p className="text-[#707070] font-work-sans-regular text-base">
                  Balance
                </p>
                <div className="w-full ">
                  <Image className="w-full " src={horizontalDashes} alt="" />
                </div>
                <p className="text-[#202020] font-work-sans-regular text-base">
                  ${MoneyFormat(account.balance)}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-4 ">
                <p className="text-[#707070] font-work-sans-regular text-base">
                  Equity
                </p>
                <div className="w-full ">
                  <Image className="w-full " src={horizontalDashes} alt="" />
                </div>
                <p className="text-[#202020] font-work-sans-regular text-base">
                  ${MoneyFormat(account.equity)}
                </p>
              </div>
            </Col>
            <Col xs={12}>
              <div className="flex items-center gap-2 mb-4 ">
                <p className="text-[#707070] font-work-sans-regular whitespace-nowrap text-base">
                  Actual Leverage
                </p>
                <div className="w-full ">
                  <Image src={horizontalDashes} alt="" className="w-full" />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[#202020] font-work-sans-regular text-base">
                    1:{account.leverage}
                  </p>
                  <Image
                    className="cursor-pointer"
                    onClick={() => {
                      setShowLeverageModal(true);
                    }}
                    src={editIconBlack}
                    alt=""
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4 ">
                <p className="text-[#707070] font-work-sans-regular whitespace-nowrap text-base">
                  Available to withdraw
                </p>
                <div className="w-full ">
                  <Image className="w-full" src={horizontalDashes} alt="" />
                </div>
                <p className="text-[#202020] whitespace-nowrap font-work-sans-regular text-base">
                  ${MoneyFormat(account.balance)}
                </p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="bg-[#F8F7F8] px-6  py-4 rounded-bl-lg rounded-br-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <p className="text-[#707070]">Login:</p>
              <p className="text-[#1F0D3F] font-work-sans-medium">
                {account.mt5Id}
              </p>
              <span>
                <CopyWrapper value={account.mt5Id}>
                  <Image src={copyBlueIcon} alt="" />
                </CopyWrapper>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-[#707070]">Platform:</p>
              <p className="text-[#1F0D3F] font-work-sans-medium">
                {account.server}
              </p>
              <span>
                <CopyWrapper value={account.server}>
                  <Image src={copyBlueIcon} alt="" />
                </CopyWrapper>
              </span>
            </div>
          </div>
          <div>
            <Button
              action={() => {
                setShowPasswordModal(true);
              }}
              loading={false}
              icon={keyIcon}
              variant="bg-with-black-text"
              text="Change Password"
              buttonSmaller
            />
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
        <p className="font-work-sans-medium my-4 text-lg text-black">
          $ {MoneyFormat(account.balance)} USD
        </p>
        <div className="flex items-start justify-between">
          <Link href={tradeLink}>
            <div className="flex items-center flex-col justify-center gap-2">
              <span>
                <Image src={tradeActive} alt="" />
              </span>
              <p className="text-[#202020] font-work-sans-regular">Trade</p>
            </div>
          </Link>

          <div
            onClick={() => {
              router.push("/deposit");
            }}
            className="flex items-center flex-col justify-center gap-2"
          >
            <span>
              <Image src={depositIcon} alt="" />
            </span>
            <p className="text-[#0DAE94] font-work-sans-regular">Deposit</p>
          </div>
          <div
            onClick={() => {
              router.push("/withdrawal");
            }}
            className="flex items-center flex-col justify-center gap-2"
          >
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
              ${MoneyFormat(account.balance)}
            </p>
          </div>
          <div className="flex items-center py-4 justify-between border-b border-[#BEBEBE80]">
            <p className="font-work-sans-regular text-[#707070] text-xs">
              Actual leverage
            </p>
            <div className="flex items-center gap-2">
              <p className="font-work-sans-regular text-[#404040] text-xs">
                1:{account.leverage}
              </p>
              <span
                onClick={() => {
                  setShowLeverageModal(true);
                }}
                className="cursor-pointer "
              >
                <Image src={mobileEditIcon} alt="" />
              </span>
            </div>
          </div>
          <div className="flex items-center py-4 justify-between border-b border-[#BEBEBE80]">
            <p className="font-work-sans-regular text-[#707070] text-xs">
              Equity
            </p>
            <p className="font-work-sans-regular text-[#404040] text-xs">
              ${MoneyFormat(account.equity)}
            </p>
          </div>
          <div className="flex items-center py-4 justify-between border-b border-[#BEBEBE80]">
            <p className="font-work-sans-regular text-[#707070] text-xs">
              Available to withdraw
            </p>
            <p className="font-work-sans-regular text-[#404040] text-xs">
              ${account.balance}
            </p>
          </div>
          <div className="flex items-center py-4 justify-between border-b border-[#BEBEBE80]">
            <p className="font-work-sans-regular text-[#707070] text-xs">
              MT5 Login
            </p>
            <p className="font-work-sans-regular text-[#404040] text-xs">
              {account.mt5Id}
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
            setShowPasswordModal(true);
          }}
          loading={false}
          fullWidth
        />
      </div>
    </>
  );
};
