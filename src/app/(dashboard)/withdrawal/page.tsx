"use client";
import { PageHeader } from "@/components/ui/text/page-header";
import { Col, Row } from "antd";
import React, { useState } from "react";

import internalTransferIcon from "@/assets/svgs/internal-transfer-icon.svg";
import koraHq from "@/assets/svgs/korahq.svg";
import paystack from "@/assets/svgs/paystack.svg";
import crypto from "@/assets/svgs/deposit-crypto.svg";
import { DepositWrapper } from "@/components/shared/wrappers/deposit-wrapper";
import bitcoinIcon from "@/assets/svgs/bitcoin.svg"

const Withdrawal = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const depositObject = [
    { text: "Internal Transfer", icon: internalTransferIcon },
    { text: "Bitcoin", icon: bitcoinIcon },
    { text: "Korahq", icon: koraHq },
    { text: "Paystack", icon: paystack },
  ];

  return (
    <>
      <PageHeader text="Withdrawal" />

      <Row gutter={16} className="mt-8">
        {depositObject.map((item, index) => {
          return (
            <Col xs={24} lg={12} className="mb-4">
              <DepositWrapper
                enterUrl={"/withdrawal/details"}
                setActiveIndex={setActiveIndex}
                index={index}
                text={item.text}
                active={index === activeIndex}
                icon={item.icon}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Withdrawal;
