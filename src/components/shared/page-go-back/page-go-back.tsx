"use client";

import { useRouter } from "next/navigation";
import chevronRight from "@/assets/svgs/chevron-right.svg";
import Image from "next/image";

export const PageGoBack = ({ action }: { action?: () => void }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center gap-1 cursor-pointer">
        <Image src={chevronRight} alt="" />
        <p
          className="text-[#0DAE94] underline text-xs"
          onClick={() => {
            if (action) {
              action();
              return;
            }
            router.back();
          }}
        >
          Go Back
        </p>
      </div>
    </>
  );
};
