import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";
import { Modal } from "antd";
import { Dispatch, ReactNode, SetStateAction } from "react";

export const PlainModalWrapper = ({
  children,
  active,
  handleClose,
}: {
  children: ReactNode;
  handleClose: () => void;
  active: boolean;
}) => {
  return (
    <ModalContainer active={active} handleClose={handleClose}>
      <div className="p-4 bg-white rounded-lg w-full">{children}</div>
    </ModalContainer>
  );
};
