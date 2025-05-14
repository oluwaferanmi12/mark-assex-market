import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

export const ModalContainer = ({
  active,
  handleClose,
  children,
  width = "medium",
  greyBg,
  addPadding
}: {
  active: boolean;
  handleClose: () => void;
  children: ReactNode;
  width?: "small" | "medium" | "large";
  greyBg?: boolean;
  addPadding ?: boolean;
}) => {
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
          onClick={() => handleClose()}
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
          className="fixed inset-0 z-40 flex justify-center items-center bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={` ${greyBg ? "bg-[#FAFAFA]" : "bg-white"} rounded-xl ${
              addPadding && "p-4"
            }`}
            style={{ width: width === "medium" ? "500px" : "400px" }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
