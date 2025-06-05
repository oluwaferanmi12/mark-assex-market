import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";
import checkedIcon from "@/assets/svgs/check-circle-icon.svg";
import successIcon from "@/assets/svgs/success-icon.svg";
import Image from "next/image";
import { Button } from "@/components/ui/buttons/button";
import React from "react";

export const SuccessModal = ({
  mainText,
  subText,
  closeAction,
  buttonText,
  active,
  buttonAction,
}: {
  mainText: string;
  subText: string;
  closeAction: () => void;
  buttonText: string;
  active: boolean;
  buttonAction?: () => void;
}) => {
  return (
    <ModalContainer
      active={active}
      handleClose={() => closeAction()}
      addPadding
    >
      <div className="flex flex-col">
        <div className="flex justify-center">
          <span>
            <Image src={successIcon} alt="" />
          </span>
        </div>

        <div className="mb-3">
          <p className="text-[#202020] text-lg text-center font-work-sans-semi-bold">{mainText}</p>
          <p className="text-[#707070] text-center text-sm">{subText}</p>
        </div>
        <div>
          <Button
            variant="green-bg"
            action={() => {
              if (buttonAction) {
                buttonAction();
                return;
              }
              closeAction();
            }}
            loading={false}
            text={buttonText}
            fullWidth
          />
        </div>
      </div>
    </ModalContainer>
  );
};
