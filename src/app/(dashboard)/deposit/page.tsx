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
import arrowRightMultiple from "@/assets/svgs/chevron-right-white.svg"

const Deposit = () => {
  const [statusSelected, setStatusSelected] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const statusDropDownList: DropDownListInterface[] = [
    { text: "All", id: "" },
    { text: "Successful", id: "" },
    { text: "Pending", id: "" },
    { text: "Failed", id: "" },
  ];

  const depositObject = [
    { text: "Crypto Chilll", icon: crypto },
    { text: "Korahq", icon: koraHq },
    { text: "Paystack", icon: paystack },
  ];

  return (
    <React.Fragment>
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
      <div className="mt-8 flex gap-4">
        {depositObject.map((item, index) => {
          return (
            <DepositWrapper
              setActiveIndex={setActiveIndex}
              index={index}
              text={item.text}
              active={index === activeIndex}
              icon={item.icon}
            />
          );
        })}
      </div>
      <div className="bg-white rounded-lg mt-6 p-4">
        <div className="bg-[#EE95071A] p-4 flex items-center gap-3 rounded-lg">
          <Image src={cautionIcon} alt="" />
          <div>
            <span className="font-work-sans-medium text-sm">
              Important Information:{" "}
            </span>
            <span className="font-work-sans-regular text-sm">
              Depositing with Crypto Chill? Here’s What You Need to Know
            </span>
          </div>
        </div>
        <div className="my-6 text-base">
          <span className="font-work-sans-medium">Note:</span>{" "}
          <span className="font-work-sans-regular">
            AssexMarkets Global Limited does not impose or charge any fees for
            deposits. However, you are solely responsible for any applicable
            network or blockchain processing fees.
          </span>
        </div>
        <div className="mb-4 text-base">
          <p className="font-work-sans-medium">
            1. Use the Correct Wallet Address:
          </p>
          <p className="font-work-sans-regular">
            {`Always double-check that you’re using the correct wallet address. Sending funds to an incorrect address may result in permanent loss.`}
          </p>
        </div>
        <div className="mb-4 text-base">
          <p className="font-work-sans-medium">
            {"2. "}Ensure Network Compatibility:
          </p>
          <p className="font-work-sans-regular">
            {`Only send Crypto from platforms or wallets
      that support Crypto transactions. Unsupported networks may lead to failed
      or lost deposits`}
          </p>
        </div>
        <div className="mb-4 text-base">
          <p className="font-work-sans-medium">
            3. Verify the Minimum Deposit Amount:
          </p>
          <p className="font-work-sans-regular">
            {`Make sure your deposit meets the
      platform’s required minimum. Some exchanges may enforce specific limits
      for Crypto deposits.`}
          </p>
        </div>

        <div className="mb-4 text-base">
          <p className="font-work-sans-medium">
            4. Track Transaction Confirmations:
          </p>
          <p className="font-work-sans-regular">
            After initiating your deposit, monitor the blockchain for
            confirmation. Confirmation times can vary based on network activity
            and congestion.
          </p>
        </div>

        <div className="mb-4 text-base">
          <p className="font-work-sans-medium">
            5. Keep a Record of Your Transaction:
          </p>
          <p className="font-work-sans-regular">
            {`Save details such as the wallet
      address, transaction ID, amount, and timestamp. These records are vital
      for tracking your deposit and resolving any issues that may arise.`}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <Button
        iconPosition="right"
        icon={arrowRightMultiple}
          loading={false}
          action={() => {}}
          text="Proceed"
          variant="green-bg"
        />
      </div>
    </React.Fragment>
  );
};

export default Deposit;
