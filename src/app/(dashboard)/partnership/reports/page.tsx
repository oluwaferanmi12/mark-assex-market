"use client";

import { Button } from "@/components/ui/buttons/button";
import { PageHeader } from "@/components/ui/text/page-header";
import { Col, Row } from "antd";
import React, { useState } from "react";
import arrowRight from "@/assets/svgs/chevron-right-white.svg";
import { motion } from "framer-motion";
import documentIcon from "@/assets/svgs/document-icon.svg";
import downloadIcon from "@/assets/svgs/download-button.svg";
import Image from "next/image";
import reportPlaceholderImage from "@/assets/svgs/report-placholder-image.svg";

function Reports() {
  const [activeState, setActiveState] = useState<
    "order" | "periodic" | "saved"
  >("order");
  return (
    <>
      <PageHeader text="Reports" />
      <div>
        <p className="text-[#707070]">Easily generate detailed reports</p>
      </div>
      <Row className="mt-4" gutter={36}>
        <Col xs={4}>
          <div>
            <div
              onClick={() => setActiveState("order")}
              className={`border-b ${
                activeState === "order"
                  ? "border-[#0DAE94]"
                  : "border-[#BEBEBE]"
              }  py-3 cursor-pointer`}
            >
              <p
                className={`${
                  activeState === "order" ? "text-[#0DAE94] " : "text-[#202020]"
                } font-work-sans-regular`}
              >
                Order a report
              </p>
            </div>
            <div
              onClick={() => setActiveState("periodic")}
              className={`border-b ${
                activeState === "periodic"
                  ? "border-[#0DAE94]"
                  : "border-[#BEBEBE]"
              }  py-3 cursor-pointer`}
            >
              <p
                className={`${
                  activeState === "periodic"
                    ? "text-[#0DAE94] "
                    : "text-[#202020]"
                } font-work-sans-regular`}
              >
                Set report periodically
              </p>
            </div>
            <div
              onClick={() => setActiveState("saved")}
              className={`border-b ${
                activeState === "saved"
                  ? "border-[#0DAE94]"
                  : "border-[#BEBEBE]"
              }  py-3 cursor-pointer`}
            >
              <p
                className={`${
                  activeState === "saved" ? "text-[#0DAE94] " : "text-[#202020]"
                } font-work-sans-regular`}
              >
                Saved Reports
              </p>
            </div>
          </div>
        </Col>
        <Col xs={20}>
          {activeState === "order" && (
            <div className="bg-white rounded-lg p-4">
              <motion.div>
                <Row gutter={16}>
                  <Col xs={24}>
                    <div className="mb-4">
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        Report Type
                      </p>
                      <select
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                      >
                        <option>Select</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={12} xs={24}>
                    <div className="mb-4">
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        Account
                      </p>
                      <select
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                      >
                        <option>Select partner account</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={12} xs={24}>
                    <div className="mb-4">
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        Filter Date
                      </p>
                      <select
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                      >
                        <option>Select Date</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={12} xs={24}>
                    <div className="mb-4">
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        Output Format
                      </p>
                      <select
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                      >
                        <option>Select </option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={12} xs={24}>
                    <div className="mb-4">
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        Delivery Method
                      </p>
                      <select
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                      >
                        <option>Select </option>
                      </select>
                    </div>
                  </Col>
                </Row>
                <div className="flex justify-end">
                  <Button
                    icon={arrowRight}
                    iconPosition="right"
                    variant="green-bg"
                    loading={false}
                    action={() => {}}
                    text="Proceed"
                  />
                </div>
              </motion.div>
            </div>
          )}
          {activeState === "periodic" && (
            <div className="bg-white rounded-lg p-4">
              <motion.div>
                <Row gutter={16}>
                  <Col xs={24}>
                    <div className="mb-4">
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        Report Type
                      </p>
                      <select
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                      >
                        <option>Select</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={12} xs={24}>
                    <div className="mb-4">
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        Account
                      </p>
                      <select
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                      >
                        <option>Select partner account</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={12} xs={24}>
                    <div className="mb-4">
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        Time Frequency
                      </p>
                      <select
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                      >
                        <option>Select Date</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={12} xs={24}>
                    <div className="mb-4">
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        Output Format
                      </p>
                      <select
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                      >
                        <option>Select </option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={12} xs={24}>
                    <div className="mb-4">
                      <p className="text-[#707070] text-sm font-work-sans-regular mb-1">
                        Delivery Method
                      </p>
                      <select
                        style={{
                          boxShadow: "0px 2px 5px 0px rgba(68, 68, 68, 0.1)",
                        }}
                        className="w-full p-4 focus:outline-none rounded-lg text-[#707070] font-work-sans-regular"
                      >
                        <option>Select </option>
                      </select>
                    </div>
                  </Col>
                </Row>
                <div className="flex justify-end">
                  <Button
                    iconPosition="right"
                    variant="green-bg"
                    loading={false}
                    action={() => {}}
                    text="Set"
                  />
                </div>
              </motion.div>
            </div>
          )}
          {activeState === "saved" && (
            <Row gutter={16}>
              <Col xs={8}>
                <div className="p-2 mb-4 rounded-lg w-full bg-white">
                  <div>
                    <Image
                      className="w-full"
                      src={reportPlaceholderImage}
                      alt=""
                    />
                  </div>
                  <div className="my-4 flex w-full justify-between  items-center">
                    <div className="flex items-center gap-2">
                      <Image src={documentIcon} alt="" />
                      <p className="text-[#404040] font-work-sans-regular">
                        Partners summary
                      </p>
                    </div>
                    <div>
                      <Image src={downloadIcon} alt="" />
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={8}>
                <div className="p-2 rounded-lg mb-4 w-full bg-white">
                  <div>
                    <Image
                      className="w-full"
                      src={reportPlaceholderImage}
                      alt=""
                    />
                  </div>
                  <div className="my-4 flex w-full justify-between  items-center">
                    <div className="flex items-center gap-2">
                      <Image src={documentIcon} alt="" />
                      <p className="text-[#404040] font-work-sans-regular">
                        Partners summary
                      </p>
                    </div>
                    <div>
                      <Image src={downloadIcon} alt="" />
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={8}>
                <div className="p-2 mb-4 rounded-lg w-full bg-white">
                  <div>
                    <Image
                      className="w-full"
                      src={reportPlaceholderImage}
                      alt=""
                    />
                  </div>
                  <div className="my-4 flex w-full justify-between  items-center">
                    <div className="flex items-center gap-2">
                      <Image src={documentIcon} alt="" />
                      <p className="text-[#404040] font-work-sans-regular">
                        Partners summary
                      </p>
                    </div>
                    <div>
                      <Image src={downloadIcon} alt="" />
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={8}>
                <div className="p-2 mb-4 rounded-lg w-full bg-white">
                  <div>
                    <Image
                      className="w-full"
                      src={reportPlaceholderImage}
                      alt=""
                    />
                  </div>
                  <div className="my-4 flex w-full justify-between  items-center">
                    <div className="flex items-center gap-2">
                      <Image src={documentIcon} alt="" />
                      <p className="text-[#404040] font-work-sans-regular">
                        Partners summary
                      </p>
                    </div>
                    <div>
                      <Image src={downloadIcon} alt="" />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
}

export default Reports;
