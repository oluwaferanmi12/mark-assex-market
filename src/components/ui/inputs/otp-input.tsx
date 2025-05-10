"use client";

import { useEffect, useRef, useState } from "react";

export const OTPInput = () => {
  const [arrayInput, setArrayInput] = useState(["", "", "", "" , "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const backSpaceRef = useRef<boolean>(false);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    indexVal: number
  ) => {
    if (e.key === "Backspace") {
      backSpaceRef.current = indexVal === 0 ? false : true;
      if (indexVal >= 1 && !arrayInput[indexVal]) {
        inputRefs.current[indexVal - 1]?.focus();
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputIndex: number
  ) => {
    const arrayLength = arrayInput.length;
    const nextIndex = inputIndex + 1;
    // handle the update for the input that is passed into the active input

    if (backSpaceRef.current) {
      backSpaceRef.current = false;
      // Now, what should happen here is to update the index, then return so that the other parts don't get updated
      if (arrayInput[inputIndex]) {
        const spreadArray = [...arrayInput];
        spreadArray[inputIndex] = "";
        console.log(spreadArray, "The spread array value");
        setArrayInput([...spreadArray]);
      }
    } else {
      const newArrayInput = [...arrayInput];
      newArrayInput[inputIndex] = e.target.value.slice(-1);
      setArrayInput([...newArrayInput]);
      if (nextIndex <= arrayLength - 1) {
        inputRefs.current[inputIndex + 1]?.focus();
      } else if (nextIndex > arrayLength - 1) {
        // Then Do not move to the next input field
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData
      .getData("text")
      .slice(0, arrayInput.length);
    if (/^\d+$/.test(pasteData)) {
      const newArrayInput = pasteData
        .split("")
        .concat(Array(arrayInput.length).fill(""))
        .slice(0, arrayInput.length);
      setArrayInput(newArrayInput);
      const nextEmptyIndex = newArrayInput.findIndex((val) => val === "");
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[arrayInput.length - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {arrayInput.map((item, index) => {
        return (
          <input
            onPaste={handlePaste}
            onKeyDown={(e) => {
              handleKeyDown(e, index);
            }}
            value={arrayInput[index]}
            onChange={(e) => {
              handleInputChange(e, index);
            }}
            key={index}
            ref={(el) => {
              if (inputRefs.current) {
                inputRefs.current[index] = el;
              }
            }}
            className="bg-[#F1F2F3] text-center outline-none border-none rounded-lg w-[48px] h-[54px] lg:h-[60px] lg:w-[60px]"
          />
        );
      })}
    </div>
  );
};
