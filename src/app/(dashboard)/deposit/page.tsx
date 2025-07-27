"use client";

import { DepositWrapper } from "@/components/shared/wrappers/deposit-wrapper";
import { DropDownTextWrapper } from "@/components/shared/wrappers/drop-down-text";
import { DropDownList } from "@/components/ui/drop-down/dropdown-list";
import { PageHeader } from "@/components/ui/text/page-header";
import { DropDownListInterface } from "@/interfaces/ui-interfac";
import { Col, Row } from "antd";
import React, { useState } from "react";
import koraHq from "@/assets/svgs/korahq.svg";
import paystack from "@/assets/svgs/paystack.svg";
import crypto from "@/assets/svgs/deposit-crypto.svg";
import cautionIcon from "@/assets/svgs/caution-icon.svg";
import Image from "next/image";
import { Button } from "@/components/ui/buttons/button";
import arrowRightMultiple from "@/assets/svgs/chevron-right-white.svg";
import dollarGreen from "@/assets/svgs/dollar-green.svg";
import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";
import bigXIcon from "@/assets/svgs/moda-big-x-icon.svg";
import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import internalTransferIcon from "@/assets/svgs/internal-transfer-icon.svg";
import bankIcon from "@/assets/svgs/bank-icon.svg";
import tether1 from "@/assets/svgs/tether-1.svg";
import tether2 from "@/assets/svgs/tether-2.svg";
import { useGetPaymentMethods } from "@/hooks/queries/usePayment";

const Deposit = () => {
  const [statusSelected, setStatusSelected] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [verificationModal, setVerificationModal] = useState(false);
  const { data } = useGetPaymentMethods();
  const statusDropDownList: DropDownListInterface[] = [
    { text: "All", id: "" },
    { text: "Successful", id: "" },
    { text: "Pending", id: "" },
    { text: "Failed", id: "" },
  ];

  const depositObject = [
    { text: "Internal Bank Transfer", icon: internalTransferIcon },
    { text: "Bank Card", icon: bankIcon },
    { text: "Crypto Chilll", icon: crypto },
    { text: "Korahq", icon: koraHq },
    { text: "Paystack", icon: paystack },
    { text: "Tether (USDT ERC20)", icon: tether1 },
    { text: "Tether (USDT TRC20)", icon: tether2 },
  ];

  return (
    <React.Fragment>
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
      <div className="mt-4">
        <Row>
          <Col xs={4}>
            <p className="text-[#707070] text-xs font-work-sans-regular mb-1">
              My Account
            </p>
            <DropDownList
              dropDownList={statusDropDownList}
              selected={statusSelected}
              setSelected={setStatusSelected}
            >
              <div>
                <DropDownTextWrapper filterSelected={statusSelected} />
              </div>
            </DropDownList>
          </Col>
        </Row>
      </div>
      <Row gutter={16} className="mt-8">
        {data &&
          data.map((item, index) => {
            return (
              <Col key={index} xs={24} lg={12} className="mb-4">
                <DepositWrapper
                  method={item}
                  setActiveIndex={setActiveIndex}
                  index={index}
                  active={index === activeIndex}
                />
              </Col>
            );
          })}
      </Row>
    </React.Fragment>
  );
};

export default Deposit;
