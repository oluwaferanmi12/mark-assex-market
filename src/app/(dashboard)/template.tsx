"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const Template = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default Template;
