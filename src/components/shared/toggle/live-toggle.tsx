"use client"

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const AccountToggle = ({activeAccount , setActiveAccount}:{activeAccount: "live" | "demo", setActiveAccount: (val:'live' | "demo") => void}) => {
  const liveRef = useRef<HTMLParagraphElement>(null);
  const [highlightStyles, setHighlightStyles] = useState({
    left: 0,
    width: 0,
  });
  const demoRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const targetRef = activeAccount === "live" ? liveRef : demoRef;
    if (targetRef.current) {
      const { offsetLeft, offsetWidth } = targetRef.current;
      setHighlightStyles({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeAccount]);
  return (
    <>
      <div className="mt-4 flex justify-between items-center">
        <div className="relative bg-[#F1F5F9] gap-2 flex items-center p-2 rounded-sm">
          {/* Animated background slider */}
          <motion.div
            className="absolute top-2 bottom-2 rounded-sm bg-white shadow"
            animate={{
              left: highlightStyles.left,
              width: highlightStyles.width,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          {/* Tabs */}
          <p
            ref={liveRef}
            onClick={() => {
              setActiveAccount("live");
            }}
            className={`relative z-10 font-work-sans-medium cursor-pointer p-2 lg:text-sm text-xs rounded-sm ${
              activeAccount === "live" ? "text-[#111111]" : "text-[#707070]"
            }`}
          >
            Live Account
          </p>
          <p
            ref={demoRef}
            onClick={() => setActiveAccount("demo")}
            className={`relative z-10 font-work-sans-medium cursor-pointer p-2 lg:text-sm text-xs rounded-sm ${
              activeAccount === "demo" ? "text-[#111111]" : "text-[#707070]"
            }`}
          >
            Demo Account
          </p>
        </div>
      </div>
    </>
  );
};
