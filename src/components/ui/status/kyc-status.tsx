import { KycStatusType } from "@/types";
import infoBlue from "@/assets/svgs/info-blue.svg";
import infoGreen from "@/assets/svgs/info-green.svg";
import infoRed from "@/assets/svgs/info-red.svg";
import infoYellow from "@/assets/svgs/info-yellow.svg";
import kycGrey from "@/assets/svgs/grey-kyc-status.svg";
import kycYellow from "@/assets/svgs/yellow-kyc-status.svg";
import kycGreen from "@/assets/svgs/green-kyc-status.svg";
import kycRed from "@/assets/svgs/red-kyc-status.svg";
import { useEffect } from "react";
import Image from "next/image";
import { small } from "framer-motion/client";

export const KycStatus = ({
  status,
  smaller,
}: {
  status: KycStatusType;
  smaller?: boolean;
}) => {
  return (
    <div
      className={`border-[0.5px] flex gap-2 items-center  ${
        smaller ? "px-2 py-1 rounded-full" : "py-2 px-4 rounded-lg"
      }  ${
        status === "APPROVED"
          ? " text-[#25A969] border-[#34C65980] bg-[#34C6590A]"
          : status === "AWAITING"
          ? "text-[#9E9E9E] border-[#9E9E9E] bg-[#9E9E9E0A]"
          : status === "PENDING"
          ? "text-[#ED9507] border-[#EE9507] bg-[#ED95070A]"
          : status === "REJECTED"
          ? "text-[#D92D20] border-[#D8002780] bg-[#D800270A]"
          : ""
      }`}
    >
      <span>
        <Image
          src={
            status === "APPROVED"
              ? kycGreen
              : status === "AWAITING"
              ? kycGrey
              : status === "PENDING"
              ? kycYellow
              : status === "REJECTED"
              ? kycRed
              : ""
          }
          alt=""
        />
      </span>
      <p
        className={`${
          status === "APPROVED"
            ? "text-[#25A969]"
            : status === "AWAITING"
            ? "text-[#9E9E9E]"
            : status === "PENDING"
            ? "text-[#EE9507]"
            : status === "REJECTED"
            ? "text-[#D92D20]"
            : ""
        }`}
      >
        {status === "APPROVED"
          ? "Approved"
          : status === "AWAITING"
          ? "Awaiting"
          : status === "PENDING"
          ? "Pending"
          : status === "REJECTED"
          ? "Rejected"
          : ""}
      </p>
      {!smaller && (
        <span>
          <Image
            src={
              status === "APPROVED"
                ? infoGreen
                : status === "AWAITING"
                ? infoBlue
                : status === "PENDING"
                ? infoYellow
                : status === "REJECTED"
                ? infoRed
                : ""
            }
            alt=""
          />
        </span>
      )}
    </div>
  );
};
