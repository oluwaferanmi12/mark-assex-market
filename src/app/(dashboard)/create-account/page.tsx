"use client";

import { PageGoBack } from "@/components/shared/page-go-back/page-go-back";
import { PageHeader } from "@/components/ui/text/page-header";
import { Col, Row } from "antd";
import { motion, useTime } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import bidirectionalIcon from "@/assets/svgs/nav-transfer-active.svg";
import { OTPInput } from "@/components/ui/inputs/otp-input";
import { Button } from "@/components/ui/buttons/button";
import arrowRightMultiple from "@/assets/svgs/chevron-right-white.svg";
import checkCircle from "@/assets/svgs/check-circle.svg";
import { TransferInput } from "@/components/ui/inputs/transfer-input";
import { PasswordValidateText } from "@/components/ui/text/password-validate-text";
import {
  useCreateTradeAccount,
  useGetAccountGroups,
  useGetOneAccountGroup,
} from "@/hooks/queries/useAccount";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MoneyFormat } from "@/utils/money-format";
import { AccountGroupInterface } from "@/types";
import { InputErrorText } from "@/components/ui/text/input-error-text";

const CreateAccount = () => {
  const [activeAccount, setActiveAccount] = useState<"live" | "demo">("live");
  const [passwordError, setPasswordError] = useState("");
  const liveRef = useRef<HTMLParagraphElement>(null);
  const [activeId, setActiveId] = useState("");
  const [nickName, setNickName] = useState("");
  const [leverage, setLeverage] = useState("");
  const [platform, setPlatform] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState(0);
  const [currencyError, setCurrencyError] = useState("");
  const [leverageError, setLeverageError] = useState("");
  const [platformError, setPlatformError] = useState("");

  const router = useRouter();
  const demoRef = useRef<HTMLParagraphElement>(null);

  const mutateCreate = useCreateTradeAccount(() => {
    toast.success("Account created successfully");
    router.push("/account");
  });

  const [password, setPassword] = useState("");
  const { data: accountGroupDetails } = useGetOneAccountGroup(activeId);
  const { data: accountGroups } = useGetAccountGroups();

  const [filteredAccounts, setFilteredAccounts] = useState<
    AccountGroupInterface[]
  >([]);

  const [highlightStyles, setHighlightStyles] = useState({
    left: 0,
    width: 0,
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
    }

    if (!currency) {
      setCurrencyError("Kindly select a currency");
      validated = false;
    }

    if (!leverage) {
      setLeverageError("Leverage is required");
      validated = false;
    }

    return validated;
  };

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);
    const accountId = urlParam.get("id");
    if (accountId) {
      setActiveId(accountId);
    }
    const targetRef = activeAccount === "live" ? liveRef : demoRef;
    if (targetRef.current) {
      const { offsetLeft, offsetWidth } = targetRef.current;
      setHighlightStyles({ left: offsetLeft, width: offsetWidth });
    }
  }, []);

  useEffect(() => {
    if (activeId && accountGroups) {
      const activeAccount = accountGroups.find((item) => item.id === activeId);
      if (activeAccount?.type === "DEMO") {
        const targetRef = demoRef;
        if (targetRef.current) {
          const { offsetLeft, offsetWidth } = targetRef.current;
          setHighlightStyles({ left: offsetLeft, width: offsetWidth });
        }
        setActiveAccount("demo");
      } else {
        const targetRef = liveRef;
        if (targetRef.current) {
          const { offsetLeft, offsetWidth } = targetRef.current;
          setHighlightStyles({ left: offsetLeft, width: offsetWidth });
        }
        setActiveAccount("live");
      }
    }
  }, [activeId, accountGroups]);

  useEffect(() => {
    if (activeAccount && accountGroups) {
      const result = accountGroups.filter(
        (item) => item.type.toLowerCase() === activeAccount
      );
      setFilteredAccounts(result);
    }
  }, [activeAccount, accountGroups]);

  const handleCreateAccount = () => {
    const validated = validateData();
    if (!validated) {
      return;
    }
    mutateCreate.mutate({
      accountGroupId: activeId,
      password: password,
      amount: +amount,
      leverage: leverage,
      nickname: nickName,
      platform: platform,
    });
  };

  return (
    <>
      <PageGoBack />
      <div className="mt-3">
        <PageHeader text="Open Account" />
        <Row gutter={24}>
          <Col xs={24} lg={12}>
            <div className="mt-4  flex justify-between items-center">
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
                    const targetRef = liveRef;
                    if (targetRef.current) {
                      const { offsetLeft, offsetWidth } = targetRef.current;
                      setHighlightStyles({
                        left: offsetLeft,
                        width: offsetWidth,
                      });
                    }
                    setActiveAccount("live");
                  }}
                  className={`relative z-10 font-work-sans-medium cursor-pointer p-2 lg:text-sm text-xs rounded-sm ${
                    activeAccount === "live"
                      ? "text-[#111111]"
                      : "text-[#707070]"
                  }`}
                >
                  Live Account
                </p>
                <p
                  ref={demoRef}
                  onClick={() => {
                    const targetRef = demoRef;
                    if (targetRef.current) {
                      const { offsetLeft, offsetWidth } = targetRef.current;
                      setHighlightStyles({
                        left: offsetLeft,
                        width: offsetWidth,
                      });
                    }
                    setActiveAccount("demo");
                  }}
                  className={`relative z-10 font-work-sans-medium cursor-pointer p-2 lg:text-sm text-xs rounded-sm ${
                    activeAccount === "demo"
                      ? "text-[#111111]"
                      : "text-[#707070]"
                  }`}
                >
                  Demo Account
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg mt-6">
              <div>
                <Row gutter={28}>
                  <Col xs={24}>
                    <div className="mb-4">
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        Account Group
                      </p>
                      <select
                        value={activeId}
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        onChange={(e) => {
                          setActiveId(e.target.value);
                          router.push(`/create-account?id=${e.target.value}`);
                        }}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                      >
                        {filteredAccounts?.map((item) => {
                          return <option value={item.id}>{item.name}</option>;
                        })}
                      </select>
                    </div>
                  </Col>
                </Row>
                <Row gutter={28}>
                  <Col xs={24}>
                    <div className="mb-4">
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        Currency
                      </p>
                      <select
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                      >
                        <option value="">Select currency</option>
                        <option value={"USD"}>USD</option>
                      </select>
                    </div>
                    {currencyError && <InputErrorText text={currencyError} />}
                  </Col>
                </Row>
                <Row gutter={28}>
                  {/* <Col lg={12} xs={24}>
                <TransferInput greyBg label="Nickname" />
              </Col> */}
                  <Col xs={24}>
                    <div className="mb-4">
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        Leverage
                      </p>
                      <select
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        onChange={(e) => {
                          setLeverage(e.target.value);
                        }}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                      >
                        <option value={""}>Select leverage</option>
                        <option value={2}>1:2</option>
                        <option value={20}>1:20</option>
                        <option value={50}>1:50</option>
                        <option value={100}>1:100</option>
                        <option value={200}>1:200</option>
                        <option value={400}>1:400</option>
                        <option value={500}>1:500</option>
                        <option value={600}>1:600</option>
                        <option value={800}>1:800</option>
                        <option value={1000}>1:1000</option>
                        <option value={2000}>1:2000</option>
                      </select>
                    </div>
                    {leverageError && <InputErrorText text={leverageError} />}
                  </Col>
                  {activeAccount === "demo" && (
                    <Col xs={24}>
                      <div className="mb-4">
                        <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                          Amount
                        </p>
                        <input
                          placeholder="Enter amount(only applies to demo accounts)"
                          style={{
                            boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                          }}
                          onChange={(e) => {
                            setAmount(+e.target.value);
                          }}
                          className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                        />
                      </div>
                    </Col>
                  )}
                </Row>
                <Row gutter={28}>
                  {/* <Col lg={12} xs={24}>
                <TransferInput greyBg label="Nickname" />
              </Col> */}

                  <Col xs={24}>
                    <div className="mb-4">
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        Nickname
                      </p>
                      <input
                        placeholder="Enter preferred nickname"
                        onChange={(e) => {
                          setNickName(e.target.value);
                        }}
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                      />
                    </div>
                  </Col>
                  <Col xs={24}>
                    <div className="mb-4">
                      <p className="text-[#707070]  text-sm font-work-sans-regular ">
                        Trading Platform
                      </p>
                      <select
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                        onChange={(e) => {
                          setPlatform(e.target.value);
                        }}
                      >
                        <option value={""}>Select platform</option>
                        <option value={"MT5"}>MT5</option>
                      </select>
                    </div>
                  </Col>
                </Row>
                <Row gutter={28} className="mb-4">
                  <Col xs={24}>
                    <TransferInput
                      handleInput={(e) => {
                        setPassword(e);
                      }}
                      greyBg
                      label="Trading Password"
                    />
                    {!!password.length && (
                      <div className="my-3">
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
                  </Col>
                </Row>
                <Row>
                  <Col xs={24}>
                    <div className="my-4">
                      <Button
                        action={() => {
                          handleCreateAccount();
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
          </Col>
          <Col xs={24} lg={12} className="flex justify-center ">
            <div className="flex items-center justify-center">
              <div className="border-l border-[#BEBEBE]  p-8">
                <p className="font-work-sans-medium text-xl">
                  {accountGroupDetails?.name}
                </p>
                <div className="mt-3">
                  <p className="text-[#707070] font-work-sans-regular ">
                    Max leverage
                  </p>
                  <p className="font-work-sans-medium text-lg text-[#202020]">
                    1: {accountGroupDetails?.leverage}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-[#707070] font-work-sans-regular ">
                    Maximum Deposit
                  </p>
                  <p className="font-work-sans-medium text-lg text-[#202020]">
                    ${MoneyFormat(Number(accountGroupDetails?.maxDeposit ?? 0))}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-[#707070] font-work-sans-regular ">
                    Min Spread
                  </p>
                  <p className="font-work-sans-medium text-lg text-[#202020]">
                    {accountGroupDetails?.spread}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-[#707070] font-work-sans-regular ">
                    Commission
                  </p>
                  <p className="font-work-sans-medium text-lg text-[#202020]">
                    {accountGroupDetails?.commission ?? "No Commission"}
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CreateAccount;
