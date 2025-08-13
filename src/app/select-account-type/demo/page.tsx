"use client";

import rod from "@/assets/svgs/select-rod.svg";
import Image from "next/image";
import priceIconWrap from "@/assets/svgs/price-icon-wrap.svg";
import priceIconWrap2 from "@/assets/svgs/second-price-wrap.svg";
import priceIconWrap3 from "@/assets/svgs/price-icon-wrap3.svg";
import { Col, Row } from "antd";
import { AccountTypeWrapper } from "@/components/shared/container/account-type-wrapper";
import { useGetAccountGroups } from "@/hooks/queries/useAccount";

const DemoAccount = () => {
  const { data } = useGetAccountGroups();
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
    <>
      <div className="min-h-screen mt-8 items-center flex justify-center flex-col">
        <p className="lg:text-4xl text-2xl font-work-sans-semi-bold">
          Demo <span className="text-[#0DAE94]"> Trading</span> Account
        </p>
        <p className="lg:w-1/2 w-4/5 text-center my-4 text-[#676D79] font-work-sans-regular">
          Practice without the risk, simulate real market conditions, refine
          your strategies, and get hands-on experience using virtual funds.
        </p>
        <div className="flex items-center justify-center">
          <Image src={rod} alt="" />
        </div>
        <div className="mt-16">
          <Row justify={"center"}>
            <Col lg={18} xs={22}>
              <Row justify={"center"} gutter={24}>
                {data?.map((item) => {
                  return (
                    <Col key={item.id} xs={24} lg={8}>
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

export default DemoAccount;
