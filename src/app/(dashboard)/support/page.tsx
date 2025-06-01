"use client";

import { Button } from "@/components/ui/buttons/button";
import { SettingsInput } from "@/components/ui/inputs/settings-input";
import { PageHeader } from "@/components/ui/text/page-header";
import { Col, Row } from "antd";
import messageIcon from "@/assets/svgs/message-icon.svg"

const Support = () => {
  return (
    <>
      <PageHeader text="Need Support" />
      <p className="text-[#707070] font-work-sans-regular">
        Your go-to place for support. Search answers, resolve issues, and
        discover useful tips.
      </p>
      <div
        style={{ border: "0.5px solid #BEBEBE80" }}
        className="p-4 mt-3 rounded-lg bg-white"
      >
        <p className="text-base font-work-sans-medium">
          How can we assist you ?
        </p>
        <p className="text-[#707070] font-work-sans-regular">
          Type a question or keyword to find quick answers or reach our team.
        </p>
        <div className="mt-3">
          <SettingsInput
            placeholder="Enter your question here"
            readOnly={false}
            label=""
          />
          <div className="mt-2 flex justify-end">
            <Button
              loading={false}
              action={() => {}}
              text="Send"
              variant="green-bg"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 ">
        <p className="font-work-sans-medium text-base">Contact us</p>
        <p className="font-work-sans-regular">
          Reach out anytime, we’re here to help with anything you need.
        </p>
      </div>
      <Row
        style={{ border: "0.5px solid #BEBEBE80" }}
        className="bg-white mt-4 p-4 rounded-lg"
      >
        <Col xs={12}>
          <div>
            <p className="font-work-sans-regular text-base">Speak Directly</p>
            <p className="font-work-sans-regular  text-[#707070]">
              Prefer to talk? Reach our support team directly at
            </p>
            <p className="font-work-sans-regular underline ">
              +234 800 123 5346.
            </p>
          </div>
        </Col>
        <Col xs={12}>
          <div>
            <p className="font-work-sans-regular text-base">Live Chat</p>
            <p className="font-work-sans-regular  text-[#707070]">
              Chat with us now for immediate assistance.
            </p>
            <div className="mt-4">
              <Button
                loading={false}
                action={() => {}}
                text="Start Conversation"
                variant="green-bg"
                icon={messageIcon}
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Support;
