import Image from "next/image";
import cancelIcon from "@/assets/svgs/faded-cancel-icon.svg";
import { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { FadeIn } from "@/animation/fade-in";

export const TransactionErrorWrapper = ({
  children,
  active,
}: {
  children: ReactNode;
  active: boolean;
}) => {
  return (
    <>
      <AnimatePresence>
        {active && (
          <FadeIn>
            <div className="bg-[#F40E0E24] p-4 rounded-lg  flex gap-3 items-center ">
              <Image src={cancelIcon} alt="" />
              <div>{children}</div>
            </div>
          </FadeIn>
        )}
      </AnimatePresence>
    </>
  );
};
