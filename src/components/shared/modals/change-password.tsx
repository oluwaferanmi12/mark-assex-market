import { Button } from "@/components/ui/buttons/button";
import { ModalContainer } from "../modal-wrapper/modal-wrapper";
import padlockIcon from "@/assets/svgs/padlockIcon.svg";
import { GInput } from "@/components/ui/inputs/general-input";
import { PasswordValidateText } from "@/components/ui/text/password-validate-text";

import Image from "next/image";
import { useState } from "react";

export const ChangePassword = ({
  modalActive,
  setModalActive,
}: {
  modalActive: boolean;
  setModalActive: (val: boolean) => void;
}) => {
  const [password, setPassword] = useState("");
  return (
    <ModalContainer
      active={modalActive}
      handleClose={() => {
        setModalActive(false);
      }}
      addPadding
    >
      <div className="mb-4">
        <span>
          <Image src={padlockIcon} alt="" />
        </span>
      </div>
      <div>
        <p className="text-[#111111]  font-work-sans-medium text-xl">
          Change Password
        </p>
        <p className="text-[#707070] font-work-sans-regular">
          Please fill in the fields below
        </p>
        <form className="mt-4">
          <GInput
            label="New password"
            inputValue={password}
            setInputValue={setPassword}
            placeholder="New password"
            type="password"
          />
          <GInput
            label="Confirm Password"
            inputValue={password}
            setInputValue={setPassword}
            placeholder="Confirm password"
            type="password"
          />
          <div className="mb-3">
            <PasswordValidateText validated text="At least 8 characters" />
            <PasswordValidateText
              validated
              text="At least one uppercase letter (A–Z)"
            />
            <PasswordValidateText
              validated={false}
              text="At least 8 characters"
            />
            <PasswordValidateText
              validated={false}
              text="At least one special character (e.g. !, @, #, $)"
            />
          </div>
          <Button
            text="Continue"
            action={() => {}}
            variant="green-bg"
            loading={false}
            fullWidth
          />
        </form>
      </div>
    </ModalContainer>
  );
};
