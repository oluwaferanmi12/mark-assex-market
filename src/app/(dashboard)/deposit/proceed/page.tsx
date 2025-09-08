"use client";
import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import { Col, Dropdown, MenuProps, Row } from "antd";
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
  useConvertRate,
  useDepositPayment,
  useGetCurrency,
  useGetPaymentMethodDetails,
  useGetPaymentMethods,
  useVerifyPayment,
} from "@/hooks/queries/usePayment";
import { toast } from "sonner";
import { ModalHeader } from "@/components/shared/modal-wrapper/modal-header";
import { ModalBody } from "@/components/shared/modal-wrapper/modal-body";
import { MoneyFormat } from "@/utils/money-format";
import { QRCodeCanvas } from "qrcode.react";
import { Copy } from "@/components/shared/copier/copy";
import { useGetAccount } from "@/hooks/queries/useAccount";
import shieldCheck from "@/assets/svgs/shield-check.svg";
import instantTransferIcon from "@/assets/svgs/instantTransferIcon.svg";
import cautionIcon from "@/assets/svgs/caution-icon-blue.svg";
import { ModalFooter } from "@/components/shared/modal-wrapper/modal-footer";
import navLogo from "@/assets/svgs/nav-logo.svg";
import copyIcon from "@/assets/svgs/copy-blue-icon.svg";
import arrowLeft from "@/assets/svgs/arrow-left.svg";
import timerYellow from "@/assets/svgs/timer-yellow.svg";
import { ConversionResult, DepositBankTransferResponse } from "@/types";
import { CopyWrapper } from "@/components/shared/wrappers/copy-wrapper";
import paymentLoading from "@/assets/svgs/confirm-payment.svg";
import { Spinner } from "@/components/spinner/spinner";
import { data } from "framer-motion/client";
import { debounce } from "lodash";
import { CountDownTimer } from "@/components/ui/timer/countdown-timer";
import { CurrencyConverted } from "@/components/text/currency-converted";

const Proceed = () => {
  const [amountToDepositObject, setAmountToDepositObject] =
    useState<ConversionResult>();
  const [verificationModal, setVerificationModal] = useState(false);
  const rateConversion = useConvertRate((data) => {
    setAmountToDepositObject(data);
  });
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
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { data: accounts } = useGetAccount();
  const [startTimer, setStartTimer] = useState(false);
  const checkoutUrl = useRef("");
  const [showInstantTransferModal, setShowInstantTransferModal] =
    useState(false);
  const mutateDepositInstance = useDepositPayment((data) => {
    setWalletAddress(data.address!);
  });
  const [activeDepositId, setActiveDepositId] = useState("");
  const [showGeneratedBankDetails, setShowGeneratedBankDetails] =
    useState(false);

  const mutateDeposit = useDepositPayment((data) => {
    checkoutUrl.current = data.checkout_url;
    setShowRedirectModal(true);
    toast.success("Deposit initiated successfully");
  });
  const [showDepositLoading, setShowDepositLoading] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [bankTransferDetails, setBankTransferDetails] =
    useState<DepositBankTransferResponse>();
  const [startPolling, setStartPolling] = useState(false);
  const { data: verifyData } = useVerifyPayment(activeDepositId!, startPolling);

  const mutateDepositForBankTransfer = useDepositPayment((data) => {
    setBankTransferDetails(data);
    setStartPolling(true);
    setActiveDepositId(data.reference);
    setShowInstantTransferModal(true);
  });
  const { data: currencies } = useGetCurrency(activeState!);
  const [currencySelected, setCurrencySelected] = useState("");
  const mutateRef = useRef(rateConversion.mutate);
  useEffect(() => {
    mutateRef.current = rateConversion.mutate;
  }, [rateConversion.mutate]);

  const debouncedConvertRef = useRef(
    debounce((currency: string, amount: number) => {
      if (currency) {
        mutateRef.current({ currency, amount });
      }
    }, 1000)
  );

  const handleDeposit = () => {
    mutateDeposit.mutate({
      amount: amountToDeposit,
      methodSlug: activeState!,
      chargeHash: "",
      toAccount: selectedAccountId,
      currency: currencySelected,
    });
  };

  const handleChangePaymentMethod = (val: string) => {
    setActiveState(val);
    router.push(`/deposit/proceed?val=${val}`);
  };

  const getMethodName = () => {
    const result = paymentMethods?.find((item) => item.slug === activeState);
    return result?.name;
  };

  const customMethods: MenuProps["items"] = paymentMethods?.map(
    (item, index) => {
      return {
        key: index,
        label: (
          <div
            onClick={() => {
              handleChangePaymentMethod(item.slug);
              setActiveState(item.slug);
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image src={item.image} width={18} height={18} alt="" />
            <div>
              <p className="font-work-sans-regular">{item.name}</p>
            </div>
          </div>
        ),
      };
    }
  );

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
          currency: "USD",
        });
        console.log("Got something heree");
      }
    }
  }, [activeState]);

  useEffect(() => {
    if (verifyData) {
      console.log(verifyData.data.status);
      if (verifyData.data.status === "SUCCESS") {
        toast.success("Deposit made successfully");
        setShowDepositLoading(false);
        setShowInstantTransferModal(false);
        setShowDepositLoading(false);
        setShowGeneratedBankDetails(false);
        setActiveDepositId("");
        setStartPolling(false);
        router.push("/wallet");
      }
    }
  }, [verifyData]);

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
        active={showInstantTransferModal}
        handleClose={() => {
          setShowInstantTransferModal(false);
        }}
      >
        {showDepositLoading ? (
          <div className="flex flex-col py-4  items-center">
            <Image src={paymentLoading} alt="" />
            <p className="text-[#202020] font-work-sans-medium text-2xl">
              Confirming Payment
            </p>
            <p className="text-[#404040] font-work-sans-regular mt-1">
              We're verifying your payment. This usually takes a few seconds.
            </p>
            <Spinner />
          </div>
        ) : (
          <>
            <ModalHeader
              headText="Instant bank deposit"
              handleCancel={() => {
                setShowInstantTransferModal(false);
              }}
            />
            <ModalBody>
              <>
                {showGeneratedBankDetails ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <Image src={navLogo} alt="" />
                      <div>
                        <p className="text-[#404040] font-work-sans-regular text-xs text-end">
                          {bankTransferDetails?.customer.email}
                        </p>
                        <p className="font-work-sans-medium text-base">
                          PAY NGN{" "}
                          {MoneyFormat(
                            (bankTransferDetails?.amount ?? 0) +
                              (bankTransferDetails?.fee ?? 0) +
                              (bankTransferDetails?.vat ?? 0)
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="my-3">
                      <p className="text-[#202020] font-work-sans-medium">
                        Transfer NGN{" "}
                        {MoneyFormat(
                          (bankTransferDetails?.amount ?? 0) +
                            (bankTransferDetails?.fee ?? 0) +
                            (bankTransferDetails?.vat ?? 0)
                        )}{" "}
                        to {bankTransferDetails?.bank_account.bank_name}{" "}
                        Checkout
                      </p>
                    </div>

                    <div>
                      <div className="mb-3 bg-[#456EFE0D] p-4 rounded-lg">
                        <p className="text-[#404040] font-work-sans-regular text-xs">
                          Bank name
                        </p>
                        <p className="text-[#1F0D3F] mt-1 font-work-sans-medium">
                          {bankTransferDetails?.bank_account.bank_name}
                        </p>
                      </div>
                      <div className="mb-3 bg-[#456EFE0D] p-4 rounded-lg">
                        <p className="text-[#404040] font-work-sans-regular text-xs">
                          Account name
                        </p>
                        <p className="text-[#1F0D3F] mt-1 font-work-sans-medium">
                          {bankTransferDetails?.bank_account.account_name}
                        </p>
                      </div>
                      <div className="mb-3 bg-[#456EFE0D] flex items-center justify-between p-4 rounded-lg">
                        <div>
                          <p className="text-[#404040] font-work-sans-regular text-xs">
                            Account number
                          </p>
                          <p className="text-[#1F0D3F] mt-1 font-work-sans-medium">
                            {bankTransferDetails?.bank_account.account_number}
                          </p>
                        </div>
                        <CopyWrapper
                          value={
                            bankTransferDetails?.bank_account.account_number ??
                            ""
                          }
                        >
                          <div className="flex items-center gap-2 cursor-pointer">
                            <p className="text-xs font-work-sans-regular text-[#007BFF]">
                              Copy
                            </p>
                            <Image src={copyIcon} alt="" />
                          </div>
                        </CopyWrapper>
                      </div>
                      <div className="mb-3 bg-[#456EFE0D] flex items-center justify-between p-4 rounded-lg">
                        <div>
                          <p className="text-[#404040] font-work-sans-regular text-xs">
                            Amount
                          </p>
                          <p className="text-[#1F0D3F] mt-1 font-work-sans-medium">
                            NGN{" "}
                            {MoneyFormat(
                              (bankTransferDetails?.amount ?? 0) +
                                (bankTransferDetails?.fee ?? 0) +
                                (bankTransferDetails?.vat ?? 0)
                            )}
                          </p>
                        </div>
                        <CopyWrapper
                          value={String(
                            (bankTransferDetails?.amount ?? 0) +
                              (bankTransferDetails?.fee ?? 0) +
                              (bankTransferDetails?.vat ?? 0)
                          )}
                        >
                          <div className="flex items-center gap-2 cursor-pointer">
                            <p className="text-xs font-work-sans-regular text-[#007BFF]">
                              Copy
                            </p>
                            <Image src={copyIcon} alt="" />
                          </div>
                        </CopyWrapper>
                      </div>
                      <div className="bg-[#EE95071A] p-4 flex items-center gap-2 rounded-lg">
                        <Image src={timerYellow} alt="" />
                        <p className="text-xs text-[#1F0D3F] font-work-sans-regular">
                          This account is for this transaction only and expires
                          in{" "}
                          <CountDownTimer
                            minutes={30}
                            running={showInstantTransferModal}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center my-4">
                    <div className="bg-[#34C6591A] px-4 py-3 rounded-full flex items-center gap-1">
                      <Image src={shieldCheck} alt="" />
                      <p className="text-[#34C659] font-work-sans-regular text-xs">
                        Secured by AssexMarkets
                      </p>
                    </div>
                    <div className="my-2">
                      <Image src={instantTransferIcon} alt="" />
                    </div>
                    <div>
                      <p className="text-[#1F0D3F] text-center font-work-sans-semi-bold text-2xl">
                        PAY NGN 
                        {MoneyFormat(
                          (bankTransferDetails?.amount ?? 0) +
                            (bankTransferDetails?.fee ?? 0) +
                            (bankTransferDetails?.vat ?? 0)
                        )}
                      </p>
                      <p className="text-[#404040] font-work-sans-regular text-center">
                        Tap on copy to copy amount & account no.
                      </p>
                    </div>
                    <div className="my-4 flex flex-col items-start w-full">
                      <p className="text-[#202020] text-base font-work-sans-medium">
                        Before you make this transaction
                      </p>
                      <p className=" text-[#404040] font-work-sans-regular ">
                        Please read these instructions carefully before
                        proceeding
                      </p>
                    </div>
                    <div className="bg-[#F5F7FF80] p-4 rounded-lg border-[0.5px] border-[#004DEF59] w-full flex  gap-3">
                      <div>
                        <Image src={cautionIcon} alt="" />
                      </div>
                      <div>
                        <div className="mb-2">
                          <p className="text-[#202020] font-work-sans-medium">
                            Transfer Exact Amount Only
                          </p>
                          <p className="mt-1 text-xs font-work-sans-regular text-[#707070]">
                            Send exactly NGN 
                            {MoneyFormat(
                              (bankTransferDetails?.amount ?? 0) +
                                (bankTransferDetails?.fee ?? 0) +
                                (bankTransferDetails?.vat ?? 0)
                            )}
                             - incorrect amounts will cause payment failure
                          </p>
                        </div>
                        <div className="mb-2">
                          <p className="text-[#202020] font-work-sans-medium">
                            Single-Use Account
                          </p>
                          <p className="mt-1 text-xs font-work-sans-regular text-[#707070]">
                            Don't save this account - it only accepts one
                            transfer and cannot be reused
                          </p>
                        </div>
                        <div className="mb-2">
                          <p className="text-[#202020] font-work-sans-medium">
                            Time-Limited Account
                          </p>
                          <p className="mt-1 text-xs font-work-sans-regular text-[#707070]">
                            This account expires automatically after 30 minutes
                            for security
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-4 w-full rounded-lg shadow-[0_2px_8px_0_rgba(0,0,0,0.1)] flex items-center gap-2">
                      <input
                        onChange={(e) => {
                          setAgreedToTerms(e.target.checked);
                        }}
                        type="checkbox"
                        className="accent-[#0DAE94]"
                      />
                      <p className="font-work-sans-regular text-[#1F0D3F]">
                        {" "}
                        I have read and understood all the transfer guidelines
                        above
                      </p>
                    </div>
                  </div>
                )}
              </>
            </ModalBody>
            <ModalFooter>
              {showGeneratedBankDetails ? (
                <div className="flex gap-2 flex-col">
                  <Button
                    variant="green-bg"
                    fullWidth
                    loading={false}
                    action={() => {
                      // verifyPayment.mutate("")
                      setShowDepositLoading(true);
                    }}
                    text="I Have Sent the Money"
                  />
                  <Button
                    variant="transparent"
                    fullWidth
                    icon={arrowLeft}
                    iconPosition="left"
                    loading={false}
                    action={() => {}}
                    text="Change payment method"
                  />
                </div>
              ) : (
                <Button
                  variant="green-bg"
                  fullWidth
                  loading={false}
                  action={() => {
                    setShowGeneratedBankDetails(true);
                  }}
                  text={
                    agreedToTerms
                      ? "Continue"
                      : "Please confirm your understanding"
                  }
                  buttonDisabled={!agreedToTerms}
                />
              )}
            </ModalFooter>
          </>
        )}
      </ModalContainer>
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
      <div className="rounded-lg mt-6">
        {activeState?.toLowerCase().includes("tether") ||
        activeState?.toLowerCase().includes("btc") ||
        activeState?.toLowerCase().includes("eth") ? (
          <div className="mt-6 bg-white p-4 ">
            <Row className="mb-4">
              <Col lg={12} xs={24}>
                <div>
                  <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                    Payment Method
                  </p>
                  <Dropdown menu={{ items: customMethods }}>
                    <div
                      style={{
                        boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                      }}
                      className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                    >
                      {getMethodName()}
                    </div>
                  </Dropdown>
                </div>
                <div className="bg-[#F40E0E1A] p-3 rounded-lg my-3 flex items-center gap-2">
                  <Image src={exclamationIcon} alt="" />
                  <p className="text-[#202020] font-work-sans-regular text-sm">
                    Only USDT on the {activeState.toUpperCase()} Network is
                    accepted for this transaction.
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
                      <div>
                        <p>
                          <li>
                            Use this deposit address only once. Do not send funds to it again after your first deposit.
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
                      className="p-2 rounded-lg flex lg:flex-row flex-col justify-between items-center"
                      style={{ border: "0.5px solid #BEBEBE80" }}
                    >
                      <p className="font-work-sans-regular mb-2 lg:mb-2 text-[#111111]">
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
              <Col xs={24} lg={12} className="border border-[#BEBEBE80] rounded-lg p-4">
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
                    <div>
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
              <div className="bg-white rounded-lg">
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
              <Row gutter={24}>
                <Col xs={24} lg={14}>
                  <div className="bg-white p-4 rounded-lg">
                    <Row gutter={24} className="mb-6">
                      <Col lg={12} xs={24}>
                        <div>
                          <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                            Payment Method
                          </p>

                          <Dropdown menu={{ items: customMethods }}>
                            <div
                              style={{
                                boxShadow:
                                  "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                              }}
                              className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                            >
                              {getMethodName()}
                            </div>
                          </Dropdown>
                        </div>
                      </Col>
                      <Col lg={12} xs={24}>
                        <div>
                          <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                            Currency
                          </p>
                          <select
                            style={{
                              boxShadow:
                                "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                            }}
                            className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                            onChange={(e) => {
                              setCurrencySelected(e.target.value);
                              debouncedConvertRef.current(
                                e.target.value,
                                amountToDeposit
                              );
                            }}
                          >
                            <option value={""}>Select Currency</option>
                            {currencies?.map((item) => {
                              return (
                                <option
                                  key={item.currency}
                                  value={item.currency}
                                >
                                  {item.currency}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={24} className="mb-4">
                      <Col xs={24}>
                        <div>
                          <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                            To account
                          </p>
                          <select
                            style={{
                              boxShadow:
                                "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                            }}
                            onChange={(e) => {
                              setSelectedAccountId(e.target.value);
                            }}
                            className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                          >
                            {accounts &&
                              accounts.map((item) => {
                                return (
                                  <option value={item.id}>
                                    {item.accountGroup.name} (#{item.mt5Id})
                                  </option>
                                );
                              })}
                            <option value={""}>Wallet</option>
                          </select>
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-6" gutter={28}>
                      <Col xs={24}>
                        <TransferInput
                          placeholder="Enter amount"
                          handleInput={(e) => {
                            debouncedConvertRef.current(currencySelected, +e);
                            setAmountToDeposit(+e);
                          }}
                          inputVal={String(amountToDeposit)}
                          label="Amount(USD)"
                          showUsd
                        />
                        {/* <div>
                          <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                            Amount
                          </p>
                          <div>
                            <span className="absolute flex items-center justify-center top-8 right-4 bg-[#E7F7F4] rounded-lg border border-#0DAE94[] py-1 px-2">
                              <Image src={dollarGreen} alt="" />
                            </span>

                            <input
                              onChange={(e) => {
                                debouncedConvertRef.current(
                                  currencySelected,
                                  +e.target.value
                                );
                                setAmountToDeposit(+e.target.value);
                              }}
                              value={amountToDeposit}
                              placeholder="Enter amount"
                              style={{
                                boxShadow:
                                  "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                              }}
                              className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                            />
                          </div>
                        </div> */}
                      </Col>
                      <Col xs={24} className="mt-6">
                        <div className="mt-6 lg:mt-0">
                          <TransferInput
                            borderBlue
                            disabled
                            greyBg
                            label="Amount to be Deposited"
                            inputVal={MoneyFormat(
                              amountToDepositObject?.amountInCurrency ?? 0
                            )}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Col xs={24} className="mt-2">
                      {amountToDepositObject && (
                        <CurrencyConverted payload={amountToDepositObject} />
                      )}
                    </Col>
                    <div className="my-4">
                      <Button
                        action={() => {
                          // setShowDepositDetails(true);
                          if (activeState === "internal-bank-transfer") {
                            mutateDepositForBankTransfer.mutate({
                              amount: amountToDeposit,
                              chargeHash: "",
                              methodSlug: activeState!,
                              toAccount: selectedAccountId,
                              currency: currencySelected,
                            });

                            return;
                          }
                          setStartTimer(true);
                          handleDeposit();
                        }}
                        loading={
                          mutateDeposit.isPending ||
                          mutateDepositForBankTransfer.isPending
                        }
                        text="Proceed"
                        variant="green-bg"
                        icon={arrowRightMultiple}
                        iconPosition="right"
                      />
                    </div>
                  </div>
                </Col>
                <Col xs={24} lg={10} className="lg:mt-0 mt-4">
                  <div className="border-[0.35px] bg-white rounded-2xl border-[#BEBEBE59] p-4">
                    <p className="text-[#202020] mb-4 text-lg font-work-sans-semi-bold">
                      Transaction Details
                    </p>
                    <div>
                      <div className="flex items-center justify-between my-4">
                        <p className="text-[#404040] font-work-sans-regular text-base">
                          Min Withdrawal:
                        </p>
                        <p className="font-work-sans-medium text-base">
                          ${MoneyFormat(paymentMethodDetails?.minAmount ?? 0)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between my-4">
                        <p className="text-[#404040] font-work-sans-regular text-base">
                          Max Withdrawal:
                        </p>
                        <p className="font-work-sans-medium text-base">
                          ${MoneyFormat(paymentMethodDetails?.maxAmount ?? 0)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between my-4">
                        <p className="text-[#404040] font-work-sans-regular text-base">
                          Fee:
                        </p>
                        <p className="font-work-sans-medium text-base text-[#0DAE94]">
                          $0
                        </p>
                      </div>
                      <div className="flex items-center justify-between my-4">
                        <p className="text-[#404040] font-work-sans-regular text-base">
                          Avg. Payment Time
                        </p>
                        <p className="font-work-sans-medium text-base">
                          {paymentMethodDetails?.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Proceed;
