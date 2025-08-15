import { Button } from "@/components/ui/buttons/button";
import { useDisable2FA, useGetUserProfile } from "@/hooks/queries/useSettings";
import { ChangePassword } from "../modals/change-password";
import { useState } from "react";
import { ModalContainer } from "../modal-wrapper/modal-wrapper";
import { ModalBody } from "../modal-wrapper/modal-body";
import { AuthHeaderWrapper } from "../container/auth-header-wrapper";
import { OTPInput } from "@/components/ui/inputs/otp-input";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { setShow2faFlow } from "@/store/slices/twofaslice";
import { removeUser } from "@/utils/auth-helper";
import { useRouter } from "next/navigation";

export const SecuritySetting = () => {
  const queryClient = useQueryClient();
  const { data } = useGetUserProfile();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [disableOtpVal, setDisableOtpVal] = useState("");
  const [showDisable2fa, setShowDisable2fa] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const disable2fa = useDisable2FA((data) => {
    queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    setShowDisable2fa(true);
    toast.success("2fa disabled");
  });
  return (
    <>
      <ModalContainer
        active={showDisable2fa}
        handleClose={() => {
          setShowDisable2fa(false);
        }}
      >
        <ModalBody>
          <>
            <AuthHeaderWrapper
              jl
              text="Enter OTP on your authenticator app"
              subText={`Go to your google authenticator app and enter the 6 digit code to disable 2fa`}
            />
            <form className="my-4">
              <div className="mb-4">
                <OTPInput setOtpValue={setDisableOtpVal} />
              </div>

              <Button
                variant="green-bg"
                fullWidth
                text="Continue"
                action={() => {
                  disable2fa.mutate(disableOtpVal);
                }}
                loading={disable2fa.isPending}
              />
            </form>
          </>
        </ModalBody>
      </ModalContainer>
      <ChangePassword
        modalActive={showPasswordModal}
        setModalActive={setShowPasswordModal}
      />

      <div className="mb-4">
        <div>
          <p className="font-work-sans-medium text-[#202020] text-base lg:text-lg">
            Password Change
          </p>
          <p className=" text-[#707070] text-xs lg:text-sm font-work-sans-regular">
            {`Secure your account by updating your password. A strong, unique password helps protect your personal information`}
          </p>
        </div>
        <div className="mt-2 bg-white border border-[#BEBEBE59] py-4 rounded-lg px-4 flex items-center justify-between">
          <p className=" text-[#202020] lg:text-sm text-xs">{data?.email}</p>
          <Button
            action={() => {
              setShowPasswordModal(true);
            }}
            loading={false}
            text="Change Password"
            variant="green-bg"
          />
        </div>
      </div>
      <div className="mb-4">
        <div>
          <p className="font-work-sans-medium text-[#202020] text-base lg:text-lg">
            Two Factor Authentication
          </p>
          <p className=" text-[#707070] font-work-sans-regular text-xs lg:text-sm ">
            {`2-step verification adds an extra layer of security to help keep your account safe. We strongly recommend enabling it.`}
          </p>
        </div>
        <div className="mt-2 bg-white border border-[#BEBEBE59] py-4 rounded-lg px-4 flex items-center justify-between">
          <div>
            <p className=" text-[#202020] text-xs lg:text-sm ">
              Setup Two Factor Authentication
            </p>
            <p className=" text-[#707070] text-xs lg:text-sm  font-work-sans-regular">
              Add an extra layer of protection to your account.
            </p>
          </div>
          <Button
            action={() => {
              if (data?.twoFaStatus === "ENABLED") {
                setShowDisable2fa(true);
              } else {
                dispatch(setShow2faFlow(true));
              }
            }}
            loading={false}
            text={
              data?.twoFaStatus === "ENABLED" ? "Disable 2FA" : "Enable 2FA"
            }
            variant="green-bg"
          />
        </div>
      </div>
      <div className="mb-4">
        <div>
          <p className="font-work-sans-medium text-[#202020] text-base lg:text-lg">
            Logout from all Sessions
          </p>
          <p className=" text-[#707070] text-xs lg:text-sm  font-work-sans-regular">
            {`Log out your account from all other active devices and sessions for better security.`}
          </p>
        </div>
        <div className="mt-2 bg-white border border-[#BEBEBE59] py-4 rounded-lg px-4 flex items-center justify-between">
          <p className=" text-[#202020] text-xs lg:text-sm">My Devices</p>

          <Button
            action={() => {
              router.push("/login");
              removeUser();
            }}
            loading={false}
            text="Log Out"
            variant="green-bg"
          />
        </div>
      </div>
    </>
  );
};
