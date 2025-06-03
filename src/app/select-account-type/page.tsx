"use client";

import { AuthNav } from "@/components/ui/navbar/auth-nav";
import { Col, Row } from "antd";
import demoAccountIcon from "@/assets/svgs/demo-account-icon.svg";
import liveAccountIcon from "@/assets/svgs/live-account-icon.svg";
import Image from "next/image";
import { Button } from "@/components/ui/buttons/button";
import checkedGreen from "@/assets/svgs/tabler-icon-checkbox.svg";
import checkedRed from "@/assets/svgs/tabler-icon-checked-red.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SelectAccountType = () => {
  const router = useRouter();
  return (
    <>
      <AuthNav />
      <Row className="w-full min-h-screen" justify={"center"} align={"middle"}>
        <Col lg={14} xs={22}>
          <div>
            <div className="flex justify-center gap-2 mb-12 flex-col items-center">
              <p className="lg:text-3xl text-xl font-work-sans-semi-bold">
                Select a trading account
              </p>
              <p className="w-1/2 mx-auto text-center text-[#606060] font-work-sans-regular text-xs lg:text-sm">
                Experience the market on your terms test or trade live.
              </p>
            </div>
            <div className="flex lg:flex-row flex-col items-center gap-4 my-4 ">
              <div className="rounded-xl w-full p-4 border min-h-[480px] border-[#BEBEBE59]">
                <div className="flex items-center gap-3">
                  <span>
                    <Image src={demoAccountIcon} alt="" />
                  </span>
                  <div>
                    <p className="text-[#6F6C90] text-sm lg:text-base font-work-sans-medium">
                      Trading account
                    </p>
                    <p className=" text-xl lg:text-2xl font-work-sans-semi-bold">
                      Demo Account
                    </p>
                  </div>
                </div>
                <div className="flex  gap-3 items-center my-6">
                  <p className="font-work-sans-bold text-2xl  lg:text-4xl">
                    $10,000
                  </p>
                  <p className="lg:text-sm text-xs font-work-sans-light">
                    Virtual Balance
                  </p>
                </div>
                <div>
                  <Button
                    action={() => {
                      router.push("/select-account-type/demo")
                    }}
                    loading={false}
                    variant="blue-bg"
                    text="Try Demo Account"
                    fullWidth
                  />
                </div>
                <div className="bg-[#004DEF05] p-4 rounded-lg mt-4">
                  <p className="font-work-sans-medium mb-4">Demo Features</p>
                  <div className="flex items-center gap-2 mb-4">
                    <Image src={checkedGreen} alt="" />
                    <p className="text-[#404040] text:xs lg:text-sm font-work-sans-regular">
                      $10,000 Virtual Balance
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Image src={checkedGreen} alt="" />
                    <p className="text-[#404040] text-xs lg:text-sm font-work-sans-regular">
                      Access to all trading Features
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Image src={checkedRed} alt="" />
                    <p className="text-[#F40E0E] text-xs lg:text-sm font-work-sans-regular">
                      No withdrawals
                    </p>
                  </div>
                </div>
              </div>
              <div className=" p-4 w-full h-full rounded-xl min-h-[480px] border border-[#0DAE94]">
                <div className="flex items-center gap-3">
                  <span>
                    <Image src={liveAccountIcon} alt="" />
                  </span>
                  <div>
                    <p className="text-[#6F6C90] text-sm lg:text-base font-work-sans-medium">
                      Trading account
                    </p>
                    <p className="lg:text-2xl text-xl font-work-sans-semi-bold">
                      Real Account
                    </p>
                  </div>
                </div>
                <div className="flex  gap-3 items-center my-6">
                  <p className="font-work-sans-bold text-4xl">Live</p>
                  <p className="text-xs lg:text-sm font-work-sans-light">
                    Real Profit and Live Trading
                  </p>
                </div>
                <div>
                  <Button
                    action={() => {
                      router.push("/select-account-type/live");
                    }}
                    loading={false}
                    variant="green-bg"
                    text="Real Account"
                    fullWidth
                  />
                </div>
                <div className="bg-[#004DEF05] p-4 rounded-lg mt-4">
                  <p className="font-work-sans-medium mb-4">
                    Real Account Features
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <Image src={checkedGreen} alt="" />
                    <p className="text-[#404040] text-xs lg:text-sm font-work-sans-regular">
                      Live market access with real funds
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Image src={checkedGreen} alt="" />
                    <p className="text-[#404040] text-xs lg:text-sm font-work-sans-regular">
                      Full feature access, including realtime execution
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Image src={checkedGreen} alt="" />
                    <p className="text-[#404040] text-xs lg:text-sm font-work-sans-regular">
                      Instant withdrawals, no delays.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-[#111] font-work-sans-regular">
              Not ready to choose a trading account ?
            </p>
            <p className="text-[#606060]">
              {`That's okay you can`}{" "}
              <Link href={"/account"}>
                {" "}
                <span>Skip this step</span>{" "}
              </Link>{" "}
              and set it up later
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SelectAccountType;
