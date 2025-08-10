import { Button } from "@/components/ui/buttons/button";
import { ModalContainer } from "../modal-wrapper/modal-wrapper";
import padlockIcon from "@/assets/svgs/padlockIcon.svg";
import { GInput } from "@/components/ui/inputs/general-input";
import { PasswordValidateText } from "@/components/ui/text/password-validate-text";
import Image from "next/image";
import { useState } from "react";
import { useChangeUserPassword } from "@/hooks/queries/useSettings";
import { toast } from "sonner";

export const ChangePassword = ({
  modalActive,
  setModalActive,
}: {
  modalActive: boolean;
  setModalActive: (val: boolean) => void;
}) => {
  const mutateChangePassword = useChangeUserPassword(() => {
    toast.success("Password updated");
    setModalActive(false);
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (!password) {
      toast.error("Password is required");
      return;
    } else if (password !== confirmPassword) {
      toast.error("Password mismatch");
      return;
    }
    mutateChangePassword.mutate({ password, confirmPassword });
  };
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
            inputValue={confirmPassword}
            setInputValue={setConfirmPassword}
            placeholder="Confirm password"
            type="password"
          />
          {!!password.length && (
            <div className="mb-3">
              <PasswordValidateText
                validated={password.length >= 8}
                text="At least 8 characters"
              />
              <PasswordValidateText
                validated={/[A-Z]/.test(password)}
                text="At least one uppercase letter (A–Z)"
              />
              <PasswordValidateText
                validated={/[0-9]/.test(password)}
                text="At least one number (0–9)"
              />
              <PasswordValidateText
                validated={/[^A-Za-z0-9]/.test(password)}
                text="At least one special character (e.g. !, @, #, $)"
              />
            </div>
          )}

          <Button
            text="Continue"
            action={() => {
              handleSubmit();
            }}
            variant="green-bg"
            loading={mutateChangePassword.isPending}
            fullWidth
          />
        </form>
      </div>
    </ModalContainer>
  );
};
