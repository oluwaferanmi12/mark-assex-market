"use client";
import { NavObjectInterface } from "@/interfaces/ui-interfac";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import arrowUpGreen from "@/assets/svgs/arrow-outline-green-up.svg";
import arrowDown from "@/assets/svgs/arrow-down-black.svg";
import { FadeIn } from "@/animation/fade-in";

export const DashboardNavWrapper = ({ item }: { item: NavObjectInterface }) => {
  const [active, setActive] = useState(false);
  const [activeSubSection, setActiveSubSection] = useState(false);
  const location = usePathname();

  useEffect(() => {
    setActive(location.includes(item.slug));
  }, [location]);
  return item.sub ? (
    <>
      <div
        className="flex items-center justify-between"
        onClick={() => {
          item.clickAction();
        }}
      >
        <motion.div
          initial={false}
          animate={{
            backgroundColor: active ? "#E7F7F4" : "#FFFFFF",
            color: active ? "#0DAE94" : "#202020",
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={`flex cursor-pointer items-center gap-3 justify-between w-full  rounded-2xl my-1 p-3`}
        >
          <div className="flex items-center gap-3">
            <span>
              <Image
                src={active ? item.activeIcon : item.inactiveIcon}
                alt=""
              />
            </span>
            <p className={`font-work-sans-regular lg:text-sm text-xs`}>
              {item.text}
            </p>
          </div>
          <span className="cursor-pointer">
            <Image src={item.activeState ? arrowUpGreen : arrowDown} alt="" />
          </span>
        </motion.div>
      </div>
      <AnimatePresence>
        {item.activeState && (
          <FadeIn>
            <div className="">
              {item.sub.map((innerItem) => {
                return (
                  <Link href={`/${item.slug}/${innerItem.slug}`}>
                    <div className={` ml-4 p-4 ${location.includes(innerItem.slug) && location.includes(item.slug) && "bg-[#F1F1F1] rounded-lg"}`}>
                      <p className="text-xs cursor-pointer text-[#404040] font-work-sans-regular">
                        {innerItem.text}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </FadeIn>
        )}
      </AnimatePresence>
    </>
  ) : (
    <Link href={`/${item.slug}`}>
      <motion.div
        initial={false}
        animate={{
          backgroundColor: active ? "#E7F7F4" : "#FFFFFF",
          color: active ? "#0DAE94" : "#202020",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={`flex cursor-pointer items-center gap-3  rounded-2xl my-1 p-3`}
      >
        <span>
          <Image src={active ? item.activeIcon : item.inactiveIcon} alt="" />
        </span>
        <p className={`font-work-sans-regular lg:text-sm text-xs`}>
          {item.text}
        </p>
      </motion.div>
    </Link>
  );
};
