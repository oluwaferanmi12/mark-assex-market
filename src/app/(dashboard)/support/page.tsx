"use client";

import { Button } from "@/components/ui/buttons/button";
import { SettingsInput } from "@/components/ui/inputs/settings-input";
import { PageHeader } from "@/components/ui/text/page-header";
import { Col, Row } from "antd";
import messageIcon from "@/assets/svgs/message-icon.svg";
import { useState } from "react";
import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";
import { ModalHeader } from "@/components/shared/modal-wrapper/modal-header";
import { ModalBody } from "@/components/shared/modal-wrapper/modal-body";
import { SupportChatWrapper } from "@/components/shared/wrappers/support-chat-wrapper";
import { SupportUserWrapper } from "@/components/shared/wrappers/support-user-wrapper";
import { SideDrawerWrapper } from "@/components/shared/side-drawer/side-drawer";
import plusIcon from "@/assets/svgs/plus-icon.svg";
import searchGreen from "@/assets/svgs/search-green.svg";
import Image from "next/image";
import { TransferInput } from "@/components/ui/inputs/transfer-input";
import { CreateTicketModal } from "@/components/ui/modal/support/ticket-modal";
import { useGetTicketMessage, useGetTickets } from "@/hooks/queries/useSupport";
import { SupportTable } from "@/components/ui/tables/transaction/support-table";

const Support = () => {
  const [showChatModal, setShowChatModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const getTicket = useGetTickets();

  return (
    <>
      {/* <SideDrawerWrapper
        active={showChatModal}
        handleClose={() => {
          setShowChatModal(false);
        }}
      >
        <ModalHeader
          headText="Assex Market Support"
          handleCancel={() => {
            setShowChatModal(false);
          }}
        />
        <ModalBody>
          <>
            <SupportChatWrapper />
            <SupportChatWrapper />
            <SupportUserWrapper />
            <div className="mt-2">
              <textarea
                placeholder="Write a message"
                className="border font-work-sans-regular p-4 border-[#BEBEBE] w-full rounded-lg"
              ></textarea>
              <div className="flex justify-end">
                <Button
                  action={() => {}}
                  loading={false}
                  text="Send"
                  variant="green-bg"
                  buttonSmaller
                />
              </div>
            </div>
          </>
        </ModalBody>
      </SideDrawerWrapper> */}
      <CreateTicketModal
        showTicketModal={showTicketModal}
        handleClose={() => {
          setShowTicketModal(false);
        }}
      />
      <div className="flex items-center justify-between">
        <PageHeader text="Need Support" />
        <Button
          loading={false}
          icon={plusIcon}
          text="New ticket"
          action={() => {
            setShowTicketModal(true);
          }}
          variant="green-bg"
        />
      </div>
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
          <div className="relative">
            <SettingsInput
              placeholder="Enter your question here"
              readOnly={false}
              label=""
            />
            <Image
              src={searchGreen}
              alt=""
              className="absolute w-[30px] h-[30px] right-2 top-1"
            />
          </div>
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
                action={() => {
                  setShowTicketModal(true);
                }}
                text="Start Conversation"
                variant="green-bg"
                icon={messageIcon}
              />
            </div>
          </div>
        </Col>
      </Row>

      <SupportTable data={getTicket.data} loading={getTicket.isPending} />
    </>
  );
};

export default Support;
