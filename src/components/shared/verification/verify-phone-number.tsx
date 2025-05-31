import { SettingsInput } from "@/components/ui/inputs/settings-input";
import { InputErrorText } from "@/components/ui/text/input-error-text";
import { Col, Row } from "antd";
import arrowRightMultiple from "@/assets/svgs/chevron-right-white.svg";
import { Button } from "@/components/ui/buttons/button";
import { useState } from "react";
import Otp from "@/app/(auth)/otp/page";
import { OTPInput } from "@/components/ui/inputs/otp-input";
import { VerificationIdtype } from "@/interfaces/ui-interfac";

export const VerifyPhoneNumber = ({
  id,
  resolveNextStatus,
}: {
  id: VerificationIdtype;
  resolveNextStatus: (val: VerificationIdtype) => void;
}) => {
  const [showOtp, setShowOtp] = useState(false);
  return (
    <>
      <Row>
        <Col className="p-4 rounded-lg bg-white" xs={14}>
          <p className="text-[#202020] font-work-sans-medium text-base">
            {showOtp ? "Verify Phone Number" : "Enter Phone Number"}
          </p>
          <p className="mt-1 text-[#707070] font-work-sans-regular">
            {showOtp
              ? "Enter the code sent to +234 903 432 1111"
              : "This helps confirm your identity and authorize future transactions on your account"}
          </p>
          <div className="mt-4">
            {showOtp ? (
              <>
                <div className="flex justify-start">
                  <OTPInput />
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
                    loading={false}
                    action={() => {
                      resolveNextStatus(id);
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
                <SettingsInput
                  readOnly={false}
                  label="Phone Number"
                  placeholder="+234"
                />
                <InputErrorText text="A verification code will be sent to this number" />
                <div className="mt-8 flex justify-end">
                  <Button
                    loading={false}
                    action={() => {
                      setShowOtp(true);
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
