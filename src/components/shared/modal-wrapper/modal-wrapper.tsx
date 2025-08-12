import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

export const ModalContainer = ({
  active,
  handleClose,
  children,
  width = "medium",
  greyBg,
  addPadding,
  contentKey, // <-- NEW: tell the modal when content changes
}: {
  active: boolean;
  handleClose: () => void;
  children: ReactNode;
  width?: "small" | "medium" | "large";
  greyBg?: boolean;
  addPadding?: boolean;
  contentKey?: string | number; // e.g. current step/view
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
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-xs"
        >
          <motion.div
            key="modal"
            // Animate size/position when content changes
            layout="position"
            // Separate timing for layout tween (size) vs enter/exit (opacity/transform)
            transition={{ layout: { duration: 0.3, ease: "easeOut" } }}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`${greyBg ? "bg-[#FAFAFA]" : "bg-white"} rounded-xl ${
              addPadding ? "p-4" : ""
            } lg:w-[500px] w-[90%]`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Swap animations for the actual content */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={contentKey ?? "static"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
