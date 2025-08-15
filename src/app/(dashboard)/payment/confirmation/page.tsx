"use client";

import { ModalBody } from "@/components/shared/modal-wrapper/modal-body";
import { ModalHeader } from "@/components/shared/modal-wrapper/modal-header";
import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";
import { useVerifyPayment } from "@/hooks/queries/usePayment";
import { PaymentVerifyInterface } from "@/types";
import { useEffect, useState } from "react";
import transactionSuccess from "@/assets/svgs/transaction-success-icon.svg";
import Image from "next/image";
import { MoneyFormat } from "@/utils/money-format";
import { ModalFooter } from "@/components/shared/modal-wrapper/modal-footer";
import { Button } from "@/components/ui/buttons/button";
import { useRouter } from "next/navigation";


export default function ConfirmationPage() {
  const [id, setId] = useState("");
  const [method, setMethod] = useState("");
  const verifyPayment = useVerifyPayment(id, false);
  const [verifyData, setVerifyData] = useState<PaymentVerifyInterface>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (verifyPayment.data) {
      setShowSuccessModal(true);
      setVerifyData(verifyPayment?.data?.data?.data?.data);
    }
  }, [verifyPayment.data]);
  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);
    const urlMethod = urlParam.get("method");
    setMethod(urlMethod ?? "");
    const urlReference = urlParam.get("reference");
    setId(urlReference ?? "");
  }, []);
  return (
    <>
      <ModalContainer
        active={showSuccessModal}
        handleClose={() => setShowSuccessModal(false)}
      >
        <ModalHeader
          headText="Confirm Payment"
          handleCancel={() => setShowSuccessModal(false)}
        />
        <ModalBody>
          <div className="flex flex-col items-center justify-center">
            <Image src={transactionSuccess} alt="" />
            <p className="text-xl my-3 font-work-sans-medium">
              Payment Successful
            </p>
            <p className="text-[#707070] mb-3 font-work-sans-regular">
              Your payment of NGN{MoneyFormat(verifyData?.amount ?? 0)} has been
              received and confirmed.
            </p>
            <span className="bg-[#34C6591A] rounded-full px-4 py-2">
              <p className="text-[#34C659] font-work-sans-regular text-sm">
                Reference ID: {id}
              </p>
            </span>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            action={() => {
              router.push("/wallet");
            }}
            text="Back to wallet"
            variant="green-bg"
            fullWidth
            loading={false}
          />
        </ModalFooter>
      </ModalContainer>
    </>
  );
}
