"use client";

import { AccountTypeWrapper } from "@/components/shared/container/account-type-wrapper";
import { PageGoBack } from "@/components/shared/page-go-back/page-go-back";
import { AccountToggle } from "@/components/shared/toggle/live-toggle";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import priceIconWrap from "@/assets/svgs/price-icon-wrap.svg";
import priceIconWrap2 from "@/assets/svgs/second-price-wrap.svg";
import priceIconWrap3 from "@/assets/svgs/price-icon-wrap3.svg";
import { useGetAccountGroups } from "@/hooks/queries/useAccount";
import { AccountGroupInterface } from "@/types";
import { CardGroupLoader } from "@/components/loaders/card-loader";

const CreateAccount = () => {
  const [activeAccount, setActiveAccount] = useState<"live" | "demo">("live");
  const { data, isPending } = useGetAccountGroups();
  const [liveAccounts, setLiveAccount] = useState<AccountGroupInterface[]>([]);
  const [demoAccounts, setDemoAccounts] = useState<AccountGroupInterface[]>([]);
  const [hovered, setHovered] = useState(1);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search);
    const state_ = param.get("state") as "live" | "demo";

    if (state_) {
      setActiveAccount(state_);
    }
  }, []);

  useEffect(() => {
    if (data?.length) {
      setLiveAccount(data.filter((item) => item.type === "LIVE"));
      setDemoAccounts(data.filter((item) => item.type === "DEMO"));
    }
  }, [data]);
  return (
    <div>
      <PageGoBack />
      <p className="text-2xl font-work-sans-semi-bold mt-4">Account Type</p>
      <AccountToggle
        activeAccount={activeAccount}  
        setActiveAccount={setActiveAccount}
      />
      <div className="mt-4">
        {isPending ? (
          <CardGroupLoader length={3} />
        ) : (
          <Row gutter={24}>
            {activeAccount === "live"
              ? liveAccounts.map((item, index) => {
                  return (
                    <Col key={index} xs={24} lg={8}>
                      <AccountTypeWrapper
                        hovered={hovered}
                        setHovered={setHovered}
                        active={hovered === index}
                        item={item}
                        index={index}
                      />
                    </Col>
                  );
                })
              : demoAccounts.map((item, index) => {
                  return (
                    <Col key={index} xs={24} lg={8}>
                      <AccountTypeWrapper
                        hovered={hovered}
                        setHovered={setHovered}
                        active={hovered === index}
                        item={item}
                        index={index}
                      />
                    </Col>
                  );
                })}
          </Row>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
