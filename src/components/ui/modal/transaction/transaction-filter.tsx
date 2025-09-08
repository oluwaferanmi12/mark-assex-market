import { ModalBody } from "@/components/shared/modal-wrapper/modal-body";
import { ModalHeader } from "@/components/shared/modal-wrapper/modal-header";
import { ModalContainer } from "@/components/shared/modal-wrapper/modal-wrapper";

export const TransactionFilter = ({
  showModal,
  handleClose,
}: {
  showModal: boolean;
  handleClose: () => void;
}) => {
  return (
    <ModalContainer active={showModal} handleClose={handleClose}>
      <ModalBody>
        <div>
          <p className="text-[#202020] font-work-sans-medium text-base">
            Filters
          </p>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};
