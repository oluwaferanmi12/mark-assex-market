"use client";
import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import { Col, Row } from "antd";
import arrowRightMultiple from "@/assets/svgs/chevron-right-white.svg";
import dollarGreen from "@/assets/svgs/dollar-green.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/buttons/button";
import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";
import bigXIcon from "@/assets/svgs/moda-big-x-icon.svg";
import { PageHeader } from "@/components/ui/text/page-header";
import { TransferInput } from "@/components/ui/inputs/transfer-input";
import bidirectionalIcon from "@/assets/svgs/nav-transfer-active.svg";
import checkCircle from "@/assets/svgs/check-circle.svg";
import { SuccessModal } from "@/components/shared/response-modal/success-modal";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import exclamationIcon from "@/assets/svgs/exclamationIcon.svg";
import masterCardIcon from "@/assets/svgs/mastercardIcon.svg";
import dollarIcon from "@/assets/svgs/dollar-green.svg";
import securityIcon from "@/assets/svgs/security-icon.svg";
import {
  useDepositPayment,
  useGetPaymentMethodDetails,
  useGetPaymentMethods,
} from "@/hooks/queries/usePayment";
import { toast } from "sonner";
import { ModalHeader } from "@/components/shared/modal-wrapper/modal-header";
import { ModalBody } from "@/components/shared/modal-wrapper/modal-body";
import { MoneyFormat } from "@/utils/money-format";
import { QRCodeCanvas } from "qrcode.react";
import { Copy } from "@/components/shared/copier/copy";
import { useGetAccount } from "@/hooks/queries/useAccount";

const Proceed = () => {
  const [verificationModal, setVerificationModal] = useState(false);
  const [showDepositDetails, setShowDepositDetails] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { data: paymentMethods } = useGetPaymentMethods();
  const [amountToDeposit, setAmountToDeposit] = useState(0);
  const [countDown, setCountDown] = useState(5);
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const [activeState, setActiveState] = useState(params.get("val"));
  const [walletAddress, setWalletAddress] = useState("");
  const { data: paymentMethodDetails } = useGetPaymentMethodDetails(
    activeState!
  );
  const { data: accounts } = useGetAccount();
  const [startTimer, setStartTimer] = useState(false);
  const checkoutUrl = useRef("");
  const mutateDepositInstance = useDepositPayment((data) => {
    setWalletAddress(data.address!);
  });
  const mutateDeposit = useDepositPayment((data) => {
    checkoutUrl.current = data.checkout_url;
    setShowRedirectModal(true);
    toast.success("Deposit initiated successfully");
  });

  const handleDeposit = () => {
    mutateDeposit.mutate({
      amount: amountToDeposit,
      methodSlug: activeState!,
      chargeHash: "",
      toAccount: "",
    });
  };

  const handleChangePaymentMethod = (val: string) => {
    setActiveState(val);
    router.push(`/deposit/proceed?val=${val}`);
  };

  useEffect(() => {
    if (activeState) {
      if (
        activeState.includes("tether") ||
        activeState.includes("btc") ||
        activeState.includes("eth")
      ) {
        mutateDepositInstance.mutate({
          amount: 1000,
          chargeHash: "",
          methodSlug: activeState,
          toAccount: "",
        });
        console.log("Got something heree");
      }
    }
  }, [activeState]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (startTimer) {
      timer = setInterval(() => {
        setCountDown((prev) => {
          if (prev === 0) {
            clearTimeout(timer);
            setShowRedirectModal(false);
            window.open(checkoutUrl.current, "_blank");
            setStartTimer(false);
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [startTimer]);

  return (
    <>
      <ModalContainer
        active={showRedirectModal}
        handleClose={() => setShowRedirectModal(true)}
      >
        <ModalHeader
          headText="Redirecting..."
          handleCancel={() => setShowRedirectModal(true)}
        />
        <ModalBody>
          <p className="text-3xl flex items-center justify-center font-work-sans-bold">
            {countDown}
          </p>
        </ModalBody>
      </ModalContainer>
      <SuccessModal
        active={showSuccessModal}
        closeAction={() => {
          setShowSuccessModal(false);
        }}
        buttonText="Close"
        mainText="Funds Deposited Successfully"
        subText="Your trading account has been funded with $4,000 successfully"
      />
      <ModalContainer
        active={verificationModal}
        handleClose={() => {
          setVerificationModal(false);
        }}
      >
        <div className="flex flex-col items-center py-4 px-8 justify-center">
          <div>
            <Image src={bigXIcon} alt="" />
          </div>
          <p className="text-[#202020] font-work-sans-semi-bold text-xl mb-3">
            Verification required
          </p>
          <p className="text-center text-[#707070] mb-4 font-work-sans-regular">
            To make a deposit, your account needs to be verified Please complete
            the verification process to proceed.
          </p>
          <Button
            action={() => {}}
            loading={false}
            text="Verify Account"
            variant="green-bg"
            fullWidth
          />
        </div>
      </ModalContainer>
      <PageHeader text="Deposit" />
      <div className="bg-white p-4 rounded-lg mt-6">
        {activeState?.toLowerCase().includes("tether") ||
        activeState?.toLowerCase().includes("btc") ||
        activeState?.toLowerCase().includes("eth") ? (
          <div className="mt-6 bg-white p-4 rounde">
            <Row className="mb-4">
              <Col lg={12} xs={24}>
                <div>
                  <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                    Payment Method
                  </p>
                  <select
                    onChange={(e) => {
                      handleChangePaymentMethod(e.target.value);
                    }}
                    value={activeState}
                    style={{
                      boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                    }}
                    className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                  >
                    {paymentMethods?.map((item) => {
                      return (
                        <option key={item.slug} value={item.slug}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="bg-[#F40E0E1A] p-3 rounded-lg my-3 flex items-center gap-2">
                  <Image src={exclamationIcon} alt="" />
                  <p className="text-[#202020] font-work-sans-regular text-sm">
                    Only USDT on the Ethereum (ERC20) Network is accepted for
                    this transaction.
                  </p>
                </div>
                <div className="my-3">
                  <p className="text-[#101010] font-work-sans-medium text-lg">
                    Deposit Instructions
                  </p>
                  <div className="my-1">
                    <div className="text-[#404040] font-work-sans-regular">
                      <p>
                        To add funds, transfer the selected crypto to the
                        address below. You can either:
                      </p>
                      <div>
                        <p>
                          <li>Copy the wallet address manually, or</li>
                        </p>
                      </div>
                      <div>
                        <p>
                          <li>
                            Scan the QR code using your crypto wallet app.
                          </li>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-8">
                  <div>
                    <p className="text-[#202020] mb-1 font-work-sans-regular">
                      Your unique deposit address:
                    </p>
                    <div
                      className="p-2 rounded-lg flex justify-between items-center"
                      style={{ border: "0.5px solid #BEBEBE80" }}
                    >
                      <p className="font-work-sans-regular text-[#111111]">
                        {walletAddress ?? "No wallet address available"}
                      </p>
                      <Copy value={walletAddress ?? ""}>
                        <Button
                          loading={false}
                          text="Copy"
                          variant="green-bg-faded"
                          action={() => {}}
                        />
                      </Copy>
                    </div>
                  </div>

                  <div>
                    <QRCodeCanvas
                      value={walletAddress}
                      size={300} // size in px
                      level={"H"} // error correction level
                      includeMargin={true}
                    />
                    {/* <Image src={qrCode} alt="" /> */}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="border border-[#BEBEBE80] rounded-lg p-4">
                <div className="flex items-center gap-4 mb-4 text-lg font-work-sans-regular">
                  <p className="text-[#404040]">Commission:</p>
                  <p className="text-[#111111]">From $0.00 to $01.00</p>
                </div>
                <div className="flex items-center gap-4 mb-4 text-lg font-work-sans-regular">
                  <p className="text-[#404040]">Deposit Time:</p>
                  <p className="text-[#111111]">Instant</p>
                </div>
              </Col>
            </Row>
          </div>
        ) : activeState?.toLowerCase().includes("bank card") ? (
          <Row>
            <Col sm={12} xs={24}>
              <div>
                <div>
                  <p className="text-[#707070] font-work-sans-regular text-xs sm:text-sm mb-1">
                    Card Information{" "}
                  </p>
                  <div>
                    <div className="relative mb-3">
                      <span className="absolute right-2 top-3">
                        <Image src={masterCardIcon} className="" alt="" />
                      </span>
                      <input
                        placeholder="1234 1234 1234"
                        className="border-[0.5px] w-full border-[#BEBEBE80] p-3"
                      />
                      <div className="flex items-center ">
                        <input
                          placeholder="MM/YY"
                          className="border-[0.5px] w-full border-[#BEBEBE80] p-3"
                        />
                        <input
                          placeholder="CVC"
                          className="border-[0.5px] w-full border-[#BEBEBE80] p-3"
                        />
                      </div>
                    </div>
                    <div className="relative mb-3">
                      <p className="text-[#707070] font-work-sans-regular text-xs sm:text-sm mb-1">
                        Cardholder Name
                      </p>
                      <div>
                        <input
                          placeholder="Enter Name on card"
                          className="border-[0.5px] w-full border-[#BEBEBE80] p-3"
                        />
                      </div>
                    </div>
                    <div className="relative mb-3">
                      <p className="text-[#707070] font-work-sans-regular text-xs sm:text-sm mb-1">
                        To account
                      </p>
                      <div>
                        <input
                          placeholder="8197834"
                          className="border-[0.5px] w-full border-[#BEBEBE80] p-3"
                        />
                      </div>
                    </div>
                    <div>
                      <TransferInput label="Amount" icon={dollarIcon} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2  py-2">
                        <p className="text-[#404040] font-work-sans-regular">
                          To be deposited:
                        </p>
                        <p className="text-[#111111]  font-work-sans-semi-bold">
                          $10.00
                        </p>
                      </div>
                    </div>
                    <div className="my-4">
                      <Button
                        action={() => {
                          setVerificationModal(true);
                        }}
                        loading={false}
                        text="Proceed"
                        variant="green-bg"
                        icon={arrowRightMultiple}
                        iconPosition="right"
                      />
                    </div>
                    <div className="bg-[#E7F7F4] p-4 rounded-lg flex items-center gap-4">
                      <Image src={securityIcon} alt="" />
                      <p>
                        <span className="text-sm text-[#1F0D3F] font-work-sans-medium">
                          Notice:{" "}
                        </span>
                        <span className="font-work-sans-regular">
                          All data is securely encrypted and protected in
                          accordance with industry standards.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <>
            {showDepositDetails ? (
              <div>
                <p className="font-work-sans-regular text-[#707070]">
                  Payment Method
                </p>
                <Row>
                  <Col xs={12}>
                    <div
                      style={{ border: "0.2px solid #0DAE94" }}
                      className=" rounded-lg p-4 flex items-center gap-3 mt-2"
                    >
                      <Image src={bidirectionalIcon} alt="" />
                      <p className="text-[#202020] font-work-sans-regular">
                        Instant Bank Transfer
                      </p>
                    </div>
                    <div className="mt-4">
                      <div
                        style={{
                          borderBottom: "0.5px solid #BEBEBE80",
                          borderStyle: "dashed",
                        }}
                        className="flex items-center justify-between py-2"
                      >
                        <p className="text-[#707070] font-work-sans-regular">
                          Amount
                        </p>
                        <p className="text-[#111111] font-work-sans-regular">
                          ₦7,820
                        </p>
                      </div>

                      <div
                        style={{
                          borderBottom: "0.5px solid #BEBEBE80",
                          borderStyle: "dashed",
                        }}
                        className="flex items-center justify-between py-2"
                      >
                        <p className="text-[#707070] font-work-sans-regular">
                          Commission
                        </p>
                        <p className="text-[#111111] font-work-sans-regular">
                          No Commission
                        </p>
                      </div>
                      <div
                        style={{
                          borderBottom: "0.5px solid #BEBEBE80",
                          borderStyle: "dashed",
                        }}
                        className="flex items-center justify-between py-2"
                      >
                        <p className="text-[#707070] font-work-sans-regular">
                          Conversion Rate
                        </p>
                        <p className="text-[#111111] font-work-sans-regular">
                          1 USD = 780.022 NGN
                        </p>
                      </div>
                      <div
                        style={{
                          borderBottom: "0.5px solid #BEBEBE80",
                          borderStyle: "dashed",
                        }}
                        className="flex items-center justify-between py-2"
                      >
                        <p className="text-[#707070] font-work-sans-regular">
                          To account
                        </p>
                        <p className="text-[#111111] font-work-sans-regular">
                          1232321
                        </p>
                      </div>

                      <div className="flex items-center gap-2  py-2">
                        <p className="text-[#404040] font-work-sans-regular">
                          To be deposited:
                        </p>
                        <p className="text-[#111111]  font-work-sans-semi-bold">
                          $10.00
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24}>
                    <div className="bg-[#E7F7F4] p-4 rounded-lg flex items-center gap-4">
                      <Image src={checkCircle} alt="" />
                      <p>
                        <span className="text-sm text-[#1F0D3F] font-work-sans-medium">
                          Important Information:{" "}
                        </span>
                        <span className="font-work-sans-regular">
                          This is an estimated amount. The final value may vary
                          slightly due to currency conversion rate fluctuations.
                        </span>
                      </p>
                    </div>
                    <div className="my-4">
                      <Button
                        action={() => {
                          setVerificationModal(true);
                        }}
                        loading={false}
                        text="Proceed"
                        variant="green-bg"
                        icon={arrowRightMultiple}
                        iconPosition="right"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            ) : (
              <div>
                <Row className="mb-4">
                  <Col lg={12} xs={24}>
                    <div>
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        Payment Method
                      </p>
                      <select
                        onChange={(e) => {
                          handleChangePaymentMethod(e.target.value);
                        }}
                        value={activeState!}
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                      >
                        {paymentMethods?.map((item) => {
                          return (
                            <option key={item.slug} value={item.slug}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col lg={12} xs={24}>
                    <div>
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        To account
                      </p>
                      <select
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                      >
                        {accounts &&
                          accounts.map((item) => {
                            return (
                              <option>
                                {item.accountGroup.name}{" "}
                                {item.accountGroup.description}
                              </option>
                            );
                          })}
                        <option>Wallet</option>
                      </select>
                    </div>
                  </Col>
                </Row>
                <Row gutter={28}>
                  <Col xs={24} lg={12}>
                    <div>
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        Amount
                      </p>
                      <div>
                        <span className="absolute flex items-center justify-center top-8 right-4 bg-[#E7F7F4] rounded-lg border border-#0DAE94[] py-1 px-2">
                          <Image src={dollarGreen} alt="" />
                        </span>

                        <input
                          onChange={(e) => {
                            setAmountToDeposit(+e.target.value);
                          }}
                          value={amountToDeposit}
                          placeholder="Enter amount"
                          style={{
                            boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                          }}
                          className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} lg={12}>
                    <div>
                      <TransferInput greyBg label="Amount to be Deposited" />
                    </div>
                  </Col>
                </Row>
                <div className="my-4 ">
                  <Button
                    action={() => {
                      // setShowDepositDetails(true);
                      setStartTimer(true);
                      handleDeposit();
                    }}
                    loading={mutateDeposit.isPending}
                    text="Proceed"
                    variant="green-bg"
                    icon={arrowRightMultiple}
                    iconPosition="right"
                  />
                </div>
                <VisibleOnDesktop>
                  <div className="bg-white border border-[#BEBEBE80] p-4 rounded-sm">
                    {paymentMethodDetails && (
                      <Row>
                        <Col xs={12}>
                          <div className="flex items-center gap-4 mb-4 text-lg font-work-sans-regular">
                            <p className="text-[#404040]">Min Deposit:</p>
                            <p className="text-[#111111]">
                              ${MoneyFormat(paymentMethodDetails?.minAmount!)}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 mb-4 text-lg font-work-sans-regular">
                            <p className="text-[#404040]">Max Deposit:</p>
                            <p className="text-[#111111]">
                              ${MoneyFormat(paymentMethodDetails?.maxAmount!)}
                            </p>
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="flex items-center gap-4 mb-4 text-lg font-work-sans-regular">
                            <p className="text-[#404040]">Commission:</p>
                            <p className="text-[#111111]">From </p>
                          </div>
                          <div className="flex items-center gap-4 mb-4 text-lg font-work-sans-regular">
                            <p className="text-[#404040]">Deposit Time:</p>
                            <p className="text-[#111111]">
                              {paymentMethodDetails.time}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    )}
                  </div>
                </VisibleOnDesktop>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Proceed;
