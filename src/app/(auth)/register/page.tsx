"use client";

import { AuthHeaderWrapper } from "@/components/shared/container/auth-header-wrapper";
import { AuthToggle } from "@/components/shared/container/auth-toggle";
import { Button } from "@/components/ui/buttons/button";
import { GInput } from "@/components/ui/inputs/general-input";
import { CitizenConfirmation } from "@/components/ui/text/citizen-confirmation-text";
import { PasswordValidateText } from "@/components/ui/text/password-validate-text";
import React, { useState } from "react";
import googleIcon from "@/assets/svgs/google-icon.svg";
import arrowUp from "@/assets/svgs/chevron-arrow-up.svg";
import arrowDown from "@/assets/svgs/chevron-arrow-down.svg";
import Image from "next/image";
import addIcon from "@/assets/svgs/add-icon.svg";
import { AnimatePresence } from "framer-motion";
import { FadeIn } from "@/animation/fade-in";
import { useRouter } from "next/navigation";

const Register = () => {
  const [email, setEmail] = useState("");
  const [citizenChecked, setCitizenChecked] = useState(true);
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [showPartnerCode, setShowPartnerCode] = useState(false);
  const router = useRouter();
  return (
    <div>
      <AuthHeaderWrapper text="Create your account" />
      <AuthToggle active="register" />
      <form>
        <GInput
          inputValue={email}
          setInputValue={setEmail}
          label="Email Address"
          placeholder="Enter email address"
        />
        <GInput
          inputValue={email}
          setInputValue={setEmail}
          placeholder="Select country"
          label="Country / Region Of Residence"
        />
        <GInput
          inputValue={email}
          setInputValue={setEmail}
          label="Password"
          placeholder="Enter email address"
          type="password"
        />
        <GInput
          inputValue={email}
          setInputValue={setEmail}
          label="Confirm password"
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

        <div
          onClick={() => {
            setShowPartnerCode((prev) => !prev);
          }}
          className="cursor-pointer my-2 flex items-center gap-1 text-sm"
        >
          <span>
            <Image src={addIcon} alt="" />
          </span>
          <p className="text-xs text-[#004DF4] font-work-sans-regular">
            Add a Partner Code (optional)
          </p>
          <span className="flex items-center">
            <Image src={showPartnerCode ? arrowUp : arrowDown} alt="" />
          </span>
        </div>
        <AnimatePresence>
          {showPartnerCode && (
            <FadeIn>
              <GInput
                inputValue={email}
                setInputValue={setEmail}
                label="Partner code"
                placeholder="Enter partner code"
              />
            </FadeIn>
          )}
        </AnimatePresence>

        <div
          onClick={() => {
            setShowPromoCode((prev) => !prev);
          }}
          className="cursor-pointer my-2 flex items-center gap-1 text-sm"
        >
          <span>
            <Image src={addIcon} alt="" />
          </span>
          <p className="text-xs text-[#004DF4] font-work-sans-regular">
            Add a Promo Code (optional)
          </p>
          <span className="flex items-center">
            <Image src={showPromoCode ? arrowUp : arrowDown} alt="" />
          </span>
        </div>
        <AnimatePresence>
          {showPromoCode && (
            <FadeIn>
              <GInput
                inputValue={email}
                setInputValue={setEmail}
                label="Promo code"
                placeholder="Enter promo code"
              />
            </FadeIn>
          )}
        </AnimatePresence>

        <CitizenConfirmation
          checkVal={citizenChecked}
          setCheckVal={setCitizenChecked}
        />
        <div className="mt-4">
          <Button
            text="Register"
            fullWidth
            action={() => {
              router.push("/register/otp");
            }}
            loading={false}
            variant="green-bg"
          />
        </div>
        <div className="flex my-4 justify-center items-center">
          <div
            style={{ border: "0.5px solid #BEBEBE " }}
            className=" w-full "
          ></div>
          <p className="text-xs font-work-sans-light min-w-[100px] text-center">
            or register with
          </p>
          <div
            style={{ border: "0.5px solid #BEBEBE " }}
            className=" w-full "
          ></div>
        </div>

        <div className="mt-4">
          <Button
            text="Google"
            fullWidth
            action={() => {}}
            loading={false}
            icon={googleIcon}
            variant="grey-bg"
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
