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
import { isValidEmail } from "@/utils/email-validate";
import { useRegister } from "@/hooks/queries/useAuth";
import { SelectInput } from "@/components/ui/inputs/select-input";
import { countryList } from "@/utils/country-list";
import { GSelect } from "@/components/ui/inputs/general-select";
import { localStorageSetter } from "@/utils/localstorage-setter";

const Register = () => {
  const [email, setEmail] = useState("");
  const [citizenChecked, setCitizenChecked] = useState(true);
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [showPartnerCode, setShowPartnerCode] = useState(false);
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const router = useRouter();
  const registerMutate = useRegister(() => {
    setRegisterLoading(false);
    localStorage.setItem("otp-email", email);
    router.replace("/register/otp");
  });

  const validateData = () => {
    let validated = true;
    if (!country) {
      validated = false;
      setCountryError("Country is required");
    }
    if (!email) {
      validated = false;
      setEmailError("Email is required");
    } else if (!isValidEmail(email)) {
      validated = false;
      setEmailError("A valid email type is required");
    }

    if (!password) {
      validated = false;
      setPasswordError("Password is required");
    } else if (
      !(password.length >= 8) ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      setPasswordError("Criteria for password does not match");
    } else if (password !== confirmPassword) {
      validated = false;
      setPasswordError("Password mismatch");
    }

    return validated;
  };

  const handleRegister = () => {
    setRegisterLoading(true);
    if (!validateData()) {
      setRegisterLoading(false);
      return;
    }
    registerMutate.mutate({
      email,
      country,
      password,
      confirmPassword,
      partnerCode,
      promoCode,
    });
  };

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
          errorState={emailError}
        />
        <GSelect
          label="Country/ Region of Residence"
          inputValue={country}
          setInputValue={(val) => setCountry(val)}
          errorState={countryError}
        >
          <option value={""}>Select Country</option>
          {countryList.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </GSelect>

        <GInput
          inputValue={password}
          setInputValue={setPassword}
          label="Password"
          placeholder="Enter Password"
          errorState={passwordError}
          type="password"
        />
        <GInput
          inputValue={confirmPassword}
          setInputValue={setConfirmPassword}
          label="Confirm password"
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
                inputValue={partnerCode}
                setInputValue={setPartnerCode}
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
                inputValue={promoCode}
                setInputValue={setPromoCode}
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
            buttonDisabled={!citizenChecked}
            text="Register"
            fullWidth
            action={() => {
              // router.push("/register/otp");
              handleRegister();
            }}
            loading={registerLoading}
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
