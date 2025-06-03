"use client"

import rod from "@/assets/svgs/select-rod.svg";
import Image from "next/image";
import priceIconWrap from "@/assets/svgs/price-icon-wrap.svg";
import priceIconWrap2 from "@/assets/svgs/second-price-wrap.svg";
import priceIconWrap3 from "@/assets/svgs/price-icon-wrap3.svg";
import { Col, Row } from "antd";
import { AccountTypeWrapper } from "@/components/shared/container/account-type-wrapper";

const LiveAccount = () => {
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

  return (
    <>
      <div className="min-h-screen mt-8 items-center flex justify-center flex-col">
        <p className="lg:text-4xl text-2xl font-work-sans-semi-bold">
          Live <span className="text-[#0DAE94]"> Trading</span> Account
        </p>
        <p className="lg:w-1/2 w-4/5 text-center my-4 text-[#676D79] font-work-sans-regular">
          From zero-commission standard accounts to ultra-tight spreads and
          high-leverage options, trade your way with flexibility and control.
        </p>
        <div className="flex items-center justify-center">
          <Image src={rod} alt="" />
        </div>
        <div className="mt-16">
          <Row justify={"center"}>
            <Col lg={18} xs={22}>
              <Row justify={"center"} gutter={24}>
                {liveAccountObject.map((item) => {
                  return (
                    <Col key={item.title} xs={24} lg={8}>
                      <AccountTypeWrapper item={item} />
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default LiveAccount;
