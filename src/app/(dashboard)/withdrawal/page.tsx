"use client";
import { PageHeader } from "@/components/ui/text/page-header";
import { Col, Row } from "antd";
import React, { useState } from "react";

import internalTransferIcon from "@/assets/svgs/internal-transfer-icon.svg";
import koraHq from "@/assets/svgs/korahq.svg";
import paystack from "@/assets/svgs/paystack.svg";
import crypto from "@/assets/svgs/deposit-crypto.svg";
import { DepositWrapper } from "@/components/shared/wrappers/deposit-wrapper";
import bitcoinIcon from "@/assets/svgs/bitcoin.svg";
import { useGetPaymentMethods } from "@/hooks/queries/usePayment";
import { CardGroupLoader } from "@/components/loaders/card-loader";

const Withdrawal = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, isPending } = useGetPaymentMethods(true);

  return (
    <>
      <PageHeader text="Withdrawal" />

      <Row gutter={16} className="mt-8">
        {isPending ? (
          <CardGroupLoader />
        ) : (
          data &&
          data.map((item, index) => {
            return (
              <Col key={item.name} xs={24} lg={12} className="mb-4">
                <DepositWrapper
                  enterUrl={"/withdrawal/details"}
                  setActiveIndex={setActiveIndex}
                  index={index}
                  active={index === activeIndex}
                  method={item}
                />
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
};

export default Withdrawal;
