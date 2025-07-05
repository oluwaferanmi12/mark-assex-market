import { useEffect, useRef, useState } from "react";

export const CountDown = ({
  maxTime,
  setCountDownDone,
}: {
  maxTime: number;
  setCountDownDone: (val: boolean) => void;
}) => {
  const [countDown, setCountDown] = useState(0);
  useEffect(() => {
    const intervalVal = setInterval(() => {
      setCountDown((prev) => {
        if (prev + 1 === maxTime) {
          setCountDownDone(true);
          clearInterval(intervalVal);
        }
        return prev + 1;
      });
    }, 1000);
    return () => {
      clearInterval(intervalVal);
    };
  }, []);
  return (
    <>
      <span>{maxTime - countDown}</span>
    </>
  );
};
