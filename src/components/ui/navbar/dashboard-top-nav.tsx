"use client";

import Image from "next/image";
import eyeIcon from "@/assets/svgs/top-nav-eye-icon.svg";
import wallet from "@/assets/svgs/top-nav-wallet.svg";
import notificationIcon from "@/assets/svgs/icon-notification.svg";
import dailyIcon from "@/assets/svgs/icon-24-hours.svg";
import profilePlaceholder from "@/assets/svgs/profile-placeholder.svg";
import arrowDown from "@/assets/svgs/filled-arrow-down.svg";
import smallLogo from "@/assets/svgs/nav-logo.svg";
import hamburgerIcon from "@/assets/svgs/hamburger-icon.svg";
import { useEffect, useRef, useState } from "react";
import { DashboardSideNav } from "@/components/ui/navbar/dashboard-side-nav";
import { AnimatePresence, motion } from "framer-motion";
import { SideDrawerWrapper } from "@/components/shared/side-drawer/side-drawer";
import { ModalHeader } from "@/components/shared/modal-wrapper/modal-header";
import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";
import { ModalBody } from "@/components/shared/modal-wrapper/modal-body";
import { NotificationWrapper } from "@/components/shared/wrappers/notification-wrapper";
import { NotificationWithImage } from "@/components/shared/wrappers/notification-with-wrapper";
import { useRouter } from "next/navigation";
import { Dropdown, MenuProps } from "antd";
import { CustomDropDown } from "@/components/ui/drop-down/custom-dropdown";
import accountSetting from "@/assets/svgs/profile-setting-icon.svg";
import supportIcon from "@/assets/svgs/support-chat-icon.svg";
import headphoneIcon from "@/assets/svgs/head-phone-icon.svg";
import logoutIcon from "@/assets/svgs/logout-icon-red.svg";
import modalLogoutIcon from "@/assets/svgs/modal-logout-icon.svg";
import { ModalFooter } from "@/components/shared/modal-wrapper/modal-footer";
import { Button } from "@/components/ui/buttons/button";
import successIcon from "@/assets/svgs/success-icon.svg";
import twoFAIcon from "@/assets/svgs/two-fa-icon.svg";
import phoneEmptyIcono from "@/assets/svgs/phone-empty-icon.svg";
import { OTPInput } from "@/components/ui/inputs/otp-input";
import { CountDown } from "@/components/shared/timer/count-down";
import { useGenerate2FA, useVerify2FA } from "@/hooks/queries/useSettings";
import { Get2FA } from "@/types";
import copyIcon from "@/assets/svgs/copyIconGreen.svg";
import { toast } from "sonner";
import { getStoredUser } from "@/utils/auth-helper";

export const DashboardTopNav = () => {
  const [showSideNav, setShowSideNav] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [activeNotificationTab, setActiveNotificationTab] = useState(0);
  const [showCustomDropDown, setShowCustomDropDown] = useState(false);
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLoggedOutModal, setShowLoggedOutModal] = useState(false);
  const [show2fa, setShow2fa] = useState(true);
  const [showVerifyOtp, setShowVerifyOtp] = useState(false);
  const [countDownDone, setCountDownDone] = useState(false);
  const userDetails = getStoredUser();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showOTPInstruction, setShowOTPInstruction] = useState(false);
  const [generated2FA, setGenerated2FA] = useState<Get2FA>();
  const [otp, setOtp] = useState("");
  const two2Fa = useGenerate2FA((data: Get2FA) => {
    setShowOTPInstruction(true);
    setShow2fa(false);
    setGenerated2FA(data);
  });
  const verifyMutate = useVerify2FA((sc) => {
    toast.success("2FA Enabled");
  });
  useEffect(() => {
    if (showSideNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [showSideNav]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCustomDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowCustomDropDown]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="border border-[#BEBEBE59] rounded-lg p-4">
          1st menu item
        </div>
      ),
    },
  ];
  return (
    <>
      <ModalContainer
        active={showOTPInstruction}
        handleClose={() => {
          setShowOTPInstruction(false);
        }}
      >
        <ModalHeader
          handleCancel={() => {
            setShowOTPInstruction(false);
          }}
          headText="Setup Authenticator App"
        />
        <ModalBody>
          <>
            <div className="flex gap-4 mb-3">
              <p className="text-[#1F0D3F] font-work-sans-semi-bold whitespace-nowrap">
                Step 1:
              </p>
              <p className="font-work-sans-regular text-[#404040]">
                Download and open any trusted authenticator app of your choice
                on your mobile phone.We recommend using{" "}
                <span className="text-[#202020] font-work-sans-medium">
                  Google Authenticator
                </span>{" "}
                for a smooth experience.
              </p>
            </div>

            <div className="flex gap-4 mb-3">
              <p className="text-[#1F0D3F] font-work-sans-semi-bold whitespace-nowrap">
                Step 2:
              </p>
              <p className="font-work-sans-regular text-[#404040]">
                Scan the QR code below using the app, or manually enter the code
                if you're unable to scan.
              </p>
            </div>

            <div className="my-4 flex justify-center items-center">
              {generated2FA?.image && (
                <Image
                  width={150}
                  height={150}
                  alt=""
                  src={generated2FA?.image}
                />
              )}
            </div>
            <div>
              <p className="font-work-sans-regular text-[#404040]">
                Can’t Scan? Enter Code Manually:
              </p>
              <div
                style={{ border: "0.1px solid #BEBEBE80" }}
                className="mt-2 p-4 rounded-lg  flex items-center justify-between"
              >
                <p className="font-work-sans-medium">{generated2FA?.secret}</p>
                <div className="flex cursor-pointer items-center gap-2">
                  <p className="font-work-sans-regular text-[#0DAE94]">Copy</p>
                  <Image src={copyIcon} alt="" />
                </div>
              </div>
            </div>
            <div className="flex gap-4 my-3">
              <p className="text-[#1F0D3F] font-work-sans-semi-bold whitespace-nowrap">
                Step 3:
              </p>
              <p className="font-work-sans-regular text-[#404040]">
                Once you receive the 6-digit code from your authenticator app,
                click Proceed below and enter the code to complete the setup.
              </p>
            </div>
          </>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end gap-2">
            <Button
              action={() => {
                setShow2fa(false);
              }}
              loading={false}
              text="Cancel"
              variant="grey-bg"
            />
            <Button
              action={() => {
                // setShowVerifyOtp(true);
                // setShow2fa(false);
                // two2Fa.mutate();
                setShowOTPInstruction(false);
                setShowVerifyOtp(true);
              }}
              loading={two2Fa.isPending}
              text="Proceed"
              variant="green-bg"
            />
          </div>
        </ModalFooter>
      </ModalContainer>
      <ModalContainer
        active={showVerifyOtp}
        handleClose={() => setShowVerifyOtp(false)}
      >
        <ModalBody>
          <div className="flex flex-col items-center justify-center">
            <div>
              <Image src={twoFAIcon} alt="" />
            </div>
            <p className="text-base font-work-sans-semi-bold">Verify OTP</p>
            <div className="w-4/5">
              <p className="font-work-sans-regular mx-auto text-center text-[#707070] my-2">
                Enter Verification code generated by your authenticator app
              </p>
              <div>
                <OTPInput setOtpValue={setOtp} />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end gap-2">
            <Button
              action={() => {
                verifyMutate.mutate({ code: otp });
                setShowVerifyOtp(false);
              }}
              loading={false}
              text="Verify & Enable 2FA"
              variant="green-bg"
              fullWidth
            />
          </div>
        </ModalFooter>
      </ModalContainer>
      <ModalContainer active={show2fa} handleClose={() => setShow2fa(false)}>
        <ModalBody>
          <div className="flex flex-col items-center justify-center">
            <div>
              <Image src={twoFAIcon} alt="" />
            </div>
            <p className="text-base font-work-sans-semi-bold">
              Secure Your account with 2FA
            </p>
            <div className="w-4/5">
              <p className="font-work-sans-regular mx-auto text-center text-[#707070] my-2">
                Add an extra layer of protection by enabling two-step
                verification using your mobile number.
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end gap-2">
            <Button
              action={() => {
                setShow2fa(false);
              }}
              loading={false}
              text="Cancel"
              variant="grey-bg"
            />
            <Button
              action={() => {
                // setShowVerifyOtp(true);
                // setShow2fa(false);
                two2Fa.mutate();
              }}
              loading={two2Fa.isPending}
              text="Proceed"
              variant="green-bg"
            />
          </div>
        </ModalFooter>
      </ModalContainer>
      <ModalContainer
        active={showLogoutModal}
        handleClose={() => {
          setShowLogoutModal(false);
        }}
      >
        <ModalHeader
          handleCancel={() => {
            setShowLogoutModal(false);
          }}
          headText={modalLogoutIcon}
          iconType
        />
        <ModalBody>
          <div>
            <p className="font-work-sans-medium text-base">
              Logout from all sessions
            </p>
            <p className="font-work-sans-regular mt-2 text-xs">
              This will log you out from all devices currently signed into your
              account, except this one
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex items-center gap-2 justify-end">
            <Button
              action={() => {
                setShowLogoutModal(false);
              }}
              loading={false}
              variant="grey-bg"
              text="Cancel"
            />
            <Button
              action={() => {
                setShowLogoutModal(false);
                setShowLoggedOutModal(true);
              }}
              loading={false}
              variant="red-bg"
              text="Yes, Log out"
            />
          </div>
        </ModalFooter>
      </ModalContainer>
      <ModalContainer
        active={showLoggedOutModal}
        handleClose={() => setShowLoggedOutModal(false)}
      >
        <ModalBody>
          <div className="flex items-center flex-col justify-center">
            <div>
              <Image src={successIcon} alt="" />
            </div>
            <div className="flex items-center justify-center flex-col mb-2">
              <p className="text-base mb-2 font-work-sans-medium">
                Logged Out from all devices
              </p>
              <p className="text-sm text-center text-[#707070] mb-2 font-work-sans-regular">
                You’ve been successfully logged out from all active sessions
                except this one.
              </p>
            </div>
            <div className="w-full">
              <Button
                variant="green-bg"
                action={() => {
                  setShowLoggedOutModal(false);
                }}
                loading={false}
                text="Close"
                fullWidth
              />
            </div>
          </div>
        </ModalBody>
      </ModalContainer>
      <SideDrawerWrapper
        fullHeight
        active={showNotification}
        handleClose={() => {
          setShowNotification(false);
        }}
      >
        <div className="flex h-full flex-col">
          <ModalHeader
            headText="Notifications"
            handleCancel={() => {
              setShowNotification(false);
            }}
          />
          <ModalBody>
            <div>
              <div className="bg-[#F1F1F1] mb-3 p-1 rounded-lg flex justify-between">
                <div
                  onClick={() => {
                    setActiveNotificationTab(0);
                  }}
                  className={`flex items-center gap-2 ${
                    activeNotificationTab === 0 && "bg-white "
                  } px-4 py-2 rounded-lg cursor-pointer`}
                >
                  <p
                    className={`text-xs font-work-sans-regular ${
                      activeNotificationTab === 0 ? "text-[#0DAE94]" : "#202020"
                    } `}
                  >
                    View all{" "}
                  </p>
                  <div
                    className={`${
                      activeNotificationTab === 0
                        ? "bg-[#E7F7F4]"
                        : "bg-[#7070701A]"
                    } p-1 px-2 rounded-sm`}
                  >
                    <p
                      className={`${
                        activeNotificationTab === 0
                          ? "text-[#0DAE94]"
                          : "#202020"
                      } text-xs font-work-sans-regular`}
                    >
                      7
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => {
                    setActiveNotificationTab(1);
                  }}
                  className={`flex items-center gap-2 ${
                    activeNotificationTab === 1 && "bg-white "
                  } px-4 py-2 rounded-lg cursor-pointer`}
                >
                  <p
                    className={`text-xs font-work-sans-regular ${
                      activeNotificationTab === 1 ? "text-[#0DAE94]" : "#202020"
                    } `}
                  >
                    Unread
                  </p>
                  <div
                    className={`${
                      activeNotificationTab === 1
                        ? "bg-[#E7F7F4]"
                        : "bg-[#7070701A]"
                    } p-1 px-2 rounded-sm`}
                  >
                    <p
                      className={`${
                        activeNotificationTab === 1
                          ? "text-[#0DAE94]"
                          : "#202020"
                      } text-xs font-work-sans-regular`}
                    >
                      7
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => {
                    setActiveNotificationTab(2);
                  }}
                  className={`flex items-center gap-2 ${
                    activeNotificationTab === 2 && "bg-white "
                  } px-4 py-2 rounded-lg cursor-pointer`}
                >
                  <p
                    className={`text-xs font-work-sans-regular ${
                      activeNotificationTab === 2 ? "text-[#0DAE94]" : "#202020"
                    } `}
                  >
                    System
                  </p>
                  <div
                    className={`${
                      activeNotificationTab === 2
                        ? "bg-[#E7F7F4]"
                        : "bg-[#7070701A]"
                    } p-1 px-2 rounded-sm`}
                  >
                    <p
                      className={`${
                        activeNotificationTab === 2
                          ? "text-[#0DAE94]"
                          : "#202020"
                      } text-xs font-work-sans-regular`}
                    >
                      2
                    </p>
                  </div>
                </div>
              </div>

              <NotificationWrapper />
              <NotificationWithImage />
              <NotificationWrapper />
              <NotificationWrapper />
              <NotificationWrapper />
              <NotificationWrapper />
            </div>
          </ModalBody>
        </div>
      </SideDrawerWrapper>
      <AnimatePresence>
        {showSideNav && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-4/5 bg-white z-50 shadow-lg"
            >
              <DashboardSideNav
                handleCloseAsModal={() => setShowSideNav(false)}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setShowSideNav(false)} // closes the side nav on click
            />
          </>
        )}
      </AnimatePresence>

      <div className="lg:hidden flex w-full border-b border-[#BEBEBE59] bg-white z-30  fixed top-0  items-center justify-center py-6">
        <span
          className="absolute left-4 cursor-pointer "
          onClick={() => {
            setShowSideNav(true);
          }}
        >
          <Image src={hamburgerIcon} alt="" />
        </span>
        <div className="flex items-center">
          <span>
            <Image width={36} height={36} src={smallLogo} alt="" />
          </span>
          <p className="flex items-center font-work-sans-medium gap-1">
            <span className="text-[#0DAE94]">Assex</span> <span>Markets</span>
          </p>
        </div>
      </div>
      <div className="absolute hidden lg:flex items-center justify-between bg-[#FFFFFF4D] top-0 border-b px-8 py-4 w-full border-[#BEBEBE80]">
        <div>
          <p className="text-[#111111] text-lg font-work-sans-medium">
            Hello,{userDetails?.user?.firstName}
          </p>
          <p className="text-xs text-[#666666] font-work-sans-regular">
            Welcome back! The market awaits.
          </p>
        </div>
        <div className="flex items-end gap-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs font-work-sans-regular text-[#707070] ">
                Wallet balance
              </p>
              <span>
                <Image src={eyeIcon} alt="" />
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <span>
                <Image src={wallet} alt="" />
              </span>
              <p className="text-[#202020] text-base font-work-sans-semi-bold">
                $0
              </p>
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setShowNotification(true);
            }}
          >
            <Image src={notificationIcon} alt="" />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              router.push("/support");
            }}
          >
            <Image src={headphoneIcon} alt="" />
          </div>

          <div className="relative " ref={dropdownRef}>
            <div
              onClick={() => {
                setShowCustomDropDown((prev) => !prev);
              }}
              className="flex cursor-pointer items-center gap-2"
            >
              <Image
                src={profilePlaceholder}
                className="w-[30px] h-[30px]"
                alt=""
              />
              <Image src={arrowDown} alt="" />
            </div>
            <AnimatePresence>
              {showCustomDropDown && (
                <motion.div
                  key="dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 mt-2 w-[300px] rounded-md border border-gray-300 bg-white shadow-lg z-50 p-4"
                >
                  <div className="p-2 rounded-lg border border-[#BEBEBE59] flex items-center gap-2">
                    <Image
                      alt=""
                      src={profilePlaceholder}
                      className="w-[50px] h-[50px]"
                    />
                    <div>
                      <p className="text-[#202020] text-base font-work-sans-medium">
                        User
                      </p>
                      <p className="text-[#707070] text-sm font-work-sans-regular">
                        user@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="my-4 cursor-pointer">
                    <div
                      onClick={() => {
                        router.push("/settings");
                      }}
                      className="flex items-center gap-2"
                    >
                      <Image src={accountSetting} alt="" />
                      <p className="text-[#202020] font-work-sans-medium">
                        Account Settings
                      </p>
                    </div>
                  </div>
                  <div className="my-4 cursor-pointer">
                    <div
                      onClick={() => {
                        router.push("/support");
                      }}
                      className="flex items-center gap-2"
                    >
                      <Image src={headphoneIcon} alt="" />
                      <p className="text-[#202020] font-work-sans-medium">
                        Support
                      </p>
                    </div>
                  </div>

                  <div
                    className="my-4 cursor-pointer border-t border-[#BEBEBE80] pt-4"
                    onClick={() => {
                      setShowCustomDropDown(false);
                      setShowLogoutModal(true);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Image src={logoutIcon} alt="" />
                      <p className="text-[#D80027] font-work-sans-medium">
                        Log out
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};
