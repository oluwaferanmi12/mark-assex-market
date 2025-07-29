import korahq from "@/assets/svgs/korahq.svg";
import paystack from "@/assets/svgs/paystack.svg";
import cryptoHill from "@/assets/svgs/deposit-crypto.svg";
import Image from "next/image";
import { TableStatus } from "@/components/ui/status/table-status";

export const TransactionSummary = ({
  paymentMethod,
  transactionType,
  transactionStatus,
  amount,
}: {
  paymentMethod: "paystack" | "korahq" | "crypto";
  transactionType: "Deposit" | "Withdrawal";
  transactionStatus: "success" | "failed" | "pending";
  amount: number;
}) => {
  return (
    <div
      style={{ borderBottom: "0.5px solid #0000001A" }}
      className="flex items-center justify-between my-2  border-b py-4"
    >
      <div className="flex items-center gap-2">
        <span>
          <Image
            className="w-[32px] h-[32px]"
            alt=""
            src={
              paymentMethod === "korahq"
                ? korahq
                : paymentMethod === "paystack"
                ? paystack
                : cryptoHill
            }
          />
        </span>
        <div>
          <p className="text-[#111111] font-work-sans-medium text-lg">
            ${amount.toLocaleString()}
          </p>
          <p className="text-[#777777] text-xs font-work-sans-regular">
            {transactionType}
          </p>
        </div>
      </div>
      <div>
        <TableStatus
          text={
            transactionStatus === "success"
              ? "Success"
              : transactionStatus === "failed"
              ? "Failed"
              : "Pending"
          }
          variant={
            transactionStatus === "success"
              ? "SUCCESS"
              : transactionStatus === "failed"
              ? "FAILED"
              : "PENDING"
          }
        />
      </div>
    </div>
  );
};
