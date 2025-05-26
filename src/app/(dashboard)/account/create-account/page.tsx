"use client";

import { AccountTypeWrapper } from "@/components/shared/container/account-type-wrapper";
import { PageGoBack } from "@/components/shared/page-go-back/page-go-back";
import { AccountToggle } from "@/components/shared/toggle/live-toggle";
import { Col, Row } from "antd";
import React, { useState } from "react";
import priceIconWrap from "@/assets/svgs/price-icon-wrap.svg";
import priceIconWrap2 from "@/assets/svgs/second-price-wrap.svg";
import priceIconWrap3 from "@/assets/svgs/price-icon-wrap3.svg";

const CreateAccount = () => {
  const [activeAccount, setActiveAccount] = useState<"live" | "demo">("live");
  const liveAccountObject = [
    {
      active: false,
      title: "Standard",
      description:
        "Experience instant execution with low spreads and zero commission,perfect for all trading styles.",
      icon: priceIconWrap,
      benefitList: ["Maximum Deposit $1", "Spread from 0.20", "No Commission"],
    },
    {
      active: true,
      title: "Raw Spread",
      description:
        "Access ultra-tight spreads starting from 0.0 pips. Trade fast with no hidden markups or commissions.",
      icon: priceIconWrap2,
      benefitList: ["Maximum Deposit $50", "Spread From 0.00", "Commission $3"],
    },
    {
      active: false,
      title: "Leverage Plus",
      description:
        "Enjoy the lowest spreads with fixed commissions per lot. Designed for precision with market execution.",
      icon: priceIconWrap3,
      benefitList: [
        "Unlimited Leverage",
        "Maximum Deposit $1",
        "Spread From 0.15",
        "No Commission",
      ],
    },
  ];

  const demoAccountObject = [
    {
      active: false,
      title: "Standard",
      description:
        "Test strategies, learn the ropes, and explore our platform using virtual funds, no pressure, all potential.",
      icon: priceIconWrap,
      benefitList: ["Maximum Deposit $1", "Spread from 0.20", "No Commission"],
    },
    {
      active: true,
      title: "Raw Spread",
      description:
        "Test strategies, learn the ropes, and explore our platform using virtual funds, no pressure, all potential.",
      icon: priceIconWrap2,
      benefitList: ["Maximum Deposit $50", "Spread From 0.00", "Commission $3"],
    },
  ];
  return (
    <div>
      <PageGoBack />
      <p className="text-2xl font-work-sans-semi-bold mt-4">Account Type</p>
      <AccountToggle activeAccount={activeAccount} setActiveAccount={setActiveAccount} />
      <div className="mt-4">
        <Row justify={"center"} gutter={24}>
          {activeAccount === "live" ? liveAccountObject.map((item) => {
            return (
              <Col xs={24} lg={8}>
                <AccountTypeWrapper item={item} />
              </Col>
            );
          }) : demoAccountObject.map((item , index) => {
            return (
              <Col xs={24} lg={8}>
                <AccountTypeWrapper item={item} />
              </Col>
            );
          }) }
        </Row>
      </div>
    </div>
  );
};

export default CreateAccount;
