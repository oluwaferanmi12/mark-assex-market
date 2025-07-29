"use client";

import { PageGoBack } from "@/components/shared/page-go-back/page-go-back";
import { PageHeader } from "@/components/ui/text/page-header";
import { Col, Row } from "antd";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import bidirectionalIcon from "@/assets/svgs/nav-transfer-active.svg";
import { OTPInput } from "@/components/ui/inputs/otp-input";
import { Button } from "@/components/ui/buttons/button";
import arrowRightMultiple from "@/assets/svgs/chevron-right-white.svg";
import checkCircle from "@/assets/svgs/check-circle.svg";
import { TransferInput } from "@/components/ui/inputs/transfer-input";
import { PasswordValidateText } from "@/components/ui/text/password-validate-text";
import { useCreateTradeAccount } from "@/hooks/queries/useAccount";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateAccount = () => {
  const [activeAccount, setActiveAccount] = useState<"live" | "demo">("live");
  const liveRef = useRef<HTMLParagraphElement>(null);
  const router = useRouter();
  const demoRef = useRef<HTMLParagraphElement>(null);
  const mutateCreate = useCreateTradeAccount(() => {
    toast.success("Account created successfully");
    router.push("/account");
  });

  const [highlightStyles, setHighlightStyles] = useState({
    left: 0,
    width: 0,
  });
  useEffect(() => {
    const targetRef = activeAccount === "live" ? liveRef : demoRef;
    if (targetRef.current) {
      const { offsetLeft, offsetWidth } = targetRef.current;
      setHighlightStyles({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeAccount]);
  return (
    <>
      <PageGoBack />
      <div className="mt-3">
        <PageHeader text="Open Account" />
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
        <div className="bg-white p-4 rounded-lg mt-6">
          <div>
            {/* <Row gutter={28} className="mb-4">
              <Col lg={12} xs={24}>
                <div>
                  <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                    Currency
                  </p>
                  <select
                    style={{
                      boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                    }}
                    className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                  >
                    <option>NGN</option>
                  </select>
                </div>
              </Col>
            </Row> */}
            <Row gutter={28} className="mb-4">
              {/* <Col lg={12} xs={24}>
                <TransferInput greyBg label="Nickname" />
              </Col> */}
              <Col lg={12} xs={24}>
                <div>
                  <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                    Max Leverage
                  </p>
                  <select
                    style={{
                      boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                    }}
                    className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                  >
                    <option>500</option>
                  </select>
                </div>
              </Col>
            </Row>
            <Row gutter={28} className="mb-4">
              <Col lg={12} xs={24}>
                <div>
                  <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                    Trading Platform
                  </p>
                  <select
                    style={{
                      boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                    }}
                    className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                  >
                    <option>MT5</option>
                  </select>
                </div>
              </Col>
              <Col lg={12} xs={24}>
                <TransferInput greyBg label="Trading Password" />
                <div className="my-3">
                  <PasswordValidateText
                    validated
                    text="At least 8 characters"
                  />
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
              </Col>
            </Row>
            <Row>
              <Col xs={24}>
                <div className="my-4">
                  <Button
                    action={() => {
                      mutateCreate.mutate({ accountGroupId: "id" });
                    }}
                    loading={mutateCreate.isPending}
                    text="Create Account"
                    variant="green-bg"
                    icon={arrowRightMultiple}
                    iconPosition="right"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
