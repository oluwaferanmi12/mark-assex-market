"use client";

import { useEffect, useRef, useState } from "react";

export const OTPInput = ({
  setOtpValue,
}: {
  setOtpValue?: (val: string) => void;
}) => {
  const [arrayInput, setArrayInput] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const backSpaceRef = useRef<boolean>(false);

  const DIGIT = /^[0-9]$/;

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (setOtpValue) {
      setOtpValue(arrayInput.join(""));
    }
  }, [arrayInput, setOtpValue]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    indexVal: number
  ) => {
    const key = e.key;

    // Allow control/navigation keys
    const allowed =
      key === "Backspace" ||
      key === "Tab" ||
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      key === "Home" ||
      key === "End";

    // Block non-digit printable keys
    if (key.length === 1 && !DIGIT.test(key)) {
      e.preventDefault();
      return;
    }

    if (key === "Backspace") {
      backSpaceRef.current = indexVal !== 0;
      if (indexVal >= 1 && !arrayInput[indexVal]) {
        inputRefs.current[indexVal - 1]?.focus();
      }
      return;
    }

    if (!allowed) return;

    // Optional: quick left/right navigation
    if (key === "ArrowLeft" && indexVal > 0) {
      e.preventDefault();
      inputRefs.current[indexVal - 1]?.focus();
    } else if (key === "ArrowRight" && indexVal < arrayInput.length - 1) {
      e.preventDefault();
      inputRefs.current[indexVal + 1]?.focus();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputIndex: number
  ) => {
    const raw = e.target.value;
    const val = raw.replace(/\D/g, ""); // keep digits only

    if (backSpaceRef.current) {
      backSpaceRef.current = false;
      if (arrayInput[inputIndex]) {
        const spreadArray = [...arrayInput];
        spreadArray[inputIndex] = "";
        setArrayInput(spreadArray);
      }
      return;
    }

    if (!val) {
      // user typed non-digit (sanitized to empty) or cleared input
      const spreadArray = [...arrayInput];
      spreadArray[inputIndex] = "";
      setArrayInput(spreadArray);
      return;
    }

    // Take only the last digit typed for this box
    const nextDigit = val.slice(-1);
    const newArrayInput = [...arrayInput];
    newArrayInput[inputIndex] = nextDigit;
    setArrayInput(newArrayInput);

    const nextIndex = inputIndex + 1;
    if (nextIndex < arrayInput.length) {
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    startIndex: number
  ) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasteData) return;

    const newArray = [...arrayInput];
    let j = 0;
    for (let i = startIndex; i < newArray.length && j < pasteData.length; i++) {
      newArray[i] = pasteData[j++];
    }
    setArrayInput(newArray);

    // focus next empty or last
    const nextEmpty = newArray.findIndex((v) => v === "");
    if (nextEmpty !== -1) inputRefs.current[nextEmpty]?.focus();
    else inputRefs.current[newArray.length - 1]?.focus();
  };

  return (
    <div className="flex justify-center gap-2">
      {arrayInput.map((item, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          value={arrayInput[index]}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onChange={(e) => handleInputChange(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          // Mobile numeric keypad + restrict to 1 char
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          // Keep type=text to avoid spinners and preserve control
          type="text"
          onFocus={(e) => e.currentTarget.select()}
          className="bg-[#F1F2F3] text-center outline-none border-none rounded-lg w-[48px] h-[54px] lg:h-[60px] lg:w-[60px]"
        />
      ))}
    </div>
  );
};
