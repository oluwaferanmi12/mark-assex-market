import { SettingsInput } from "@/components/ui/inputs/settings-input";
import { InputErrorText } from "@/components/ui/text/input-error-text";
import { Col, Row } from "antd";
import arrowRightMultiple from "@/assets/svgs/chevron-right-white.svg";
import { Button } from "@/components/ui/buttons/button";
import { useEffect, useState } from "react";
import Otp from "@/app/(auth)/otp/page";
import { OTPInput } from "@/components/ui/inputs/otp-input";
import { VerificationIdtype } from "@/interfaces/ui-interfac";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countryCodes from "country-codes-list";
import {
  useGetKyc,
  useGetUserProfile,
  usePhoneRequest,
  usePhoneRequestVerify,
} from "@/hooks/queries/useSettings";
import { toast } from "sonner";

export const VerifyPhoneNumber = ({
  id,
  resolveNextStatus,
}: {
  id: VerificationIdtype;
  resolveNextStatus: (val: VerificationIdtype) => void;
}) => {
  const [showOtp, setShowOtp] = useState(false);
  const [countryCallingCode, setCopuntryCallingCode] = useState(
    countryCodes.customList
      ? countryCodes.customList("countryCallingCode")
      : null
  );
  const [selectedCode, setSelectedCode] = useState("234");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpVal, setOtpVal] = useState("");
  //mutations
  const phoneRequestMutate = usePhoneRequest((data) => {
    setShowOtp(true);
  });
  const { data: userProfile } = useGetUserProfile();
  
  const verifyPhoneNumber = usePhoneRequestVerify((data) => {
    toast.success("Phone number verifieid");
    resolveNextStatus(id);
  });

  const handlePhoneRequest = () => {
    phoneRequestMutate.mutate({
      phone: phoneNumber,
      phoneCode: selectedCode,
    });
  };

  useEffect(() => {
    if (userProfile) {
      setSelectedCode(userProfile.phoneCode ? userProfile.phoneCode : "234");
      setPhoneNumber(userProfile.phone ?? "");
    }
  }, [userProfile]);

  return (
    <>
      <Row>
        <Col className="p-4 rounded-lg bg-white" xs={24} lg={14}>
          <p className="text-[#202020] font-work-sans-medium text-sm lg:text-base">
            {showOtp ? "Verify Phone Number" : "Enter Phone Number"}
          </p>
          <p className="mt-1 text-[#707070] text-xs lg:text-sm font-work-sans-regular">
            {showOtp
              ? `Enter the code sent to +${selectedCode} ${phoneNumber}`
              : "This helps confirm your identity and authorize future transactions on your account"}
          </p>
          <div className="mt-4">
            {showOtp ? (
              <>
                <div className="flex justify-start">
                  <OTPInput setOtpValue={setOtpVal} />
                </div>
                <div className="my-4 flex items-center font-work-sans-light">
                  <p className="text-xs">
                    Didn't receive any code?{" "}
                    <span className="text-[#004DEF] cursor-pointer">
                      Resend code
                    </span>
                  </p>
                </div>
                <div className="mt-8 flex justify-end">
                  <Button
                    loading={verifyPhoneNumber.isPending}
                    action={() => {
                      verifyPhoneNumber.mutate({
                        otp: otpVal,
                        phone: phoneNumber,
                        phoneCode: selectedCode,
                      });
                    }}
                    variant="green-bg"
                    text="Proceed"
                    icon={arrowRightMultiple}
                    iconPosition="right"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-[#606060] mb-1 font-work-sans-regular text-xs lg:text-sm">
                    Phone Number
                  </p>
                  <div className="flex items-center ">
                    <select
                      value={selectedCode}
                      onChange={(e) => {
                        setSelectedCode(e.target.value);
                      }}
                      className="border focus:border-none bg-[#F2F4F7] border-[#BEBEBE59] rounded-tl-lg rounded-bl-lg font-work-sans-regular py-[9px]"
                    >
                      {countryCallingCode &&
                        Object.entries(countryCallingCode).map(([key, val]) => {
                          return <option value={key}>+{key}</option>;
                        })}
                    </select>
                    <input
                      placeholder={"9123435433"}
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                      className={`w-full  text-[#202020] font-work-sans-regular px-4 py-2 rounded-tr-lg rounded-br-lg border border-[#BEBEBE59] outline-none`}
                    />
                  </div>
                </div>

                {/* <SettingsInput
                  readOnly={false}
                  label="Phone Number"
                  placeholder="+234"
                /> */}
                {!userProfile?.phone && (
                  <InputErrorText text="A verification code will be sent to this number" />
                )}

                <div className="mt-8 flex justify-end">
                  <Button
                    loading={phoneRequestMutate.isPending}
                    action={() => {
                      handlePhoneRequest();
                    }}
                    variant="green-bg"
                    text="Proceed"
                    icon={arrowRightMultiple}
                    iconPosition="right"
                  />
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};
