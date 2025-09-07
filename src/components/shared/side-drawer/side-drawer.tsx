"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

// ...imports unchanged...

export const SideDrawerWrapper = ({
  active,
  handleClose,
  children,
  fullHeight,
}: {
  active: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  fullHeight?: boolean;
}) => {
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          className="fixed inset-0 z-40 flex items-center justify-end bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.25, ease: "easeIn" }}
            onClick={(e) => e.stopPropagation()}
            className={`${
              fullHeight ? "min-h-[95vh] h-[95vh]" : "min-h-[80vh] h-[80vh]"
            } bg-[#FAFAFA] lg:w-[500px] w-[90%] rounded-lg mr-4 flex flex-col`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
