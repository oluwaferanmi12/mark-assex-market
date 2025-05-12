"use client";
import { NavObjectInterface } from "@/interfaces/ui-interfac";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const DashboardNavWrapper = ({ item }: { item: NavObjectInterface }) => {
  const [active, setActive] = useState(false);
  const location = usePathname();

  useEffect(() => {
    setActive(location.includes(item.slug));
  }, [location]);
  return (
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
        className={`flex cursor-pointer items-center gap-3  rounded-2xl my-1 p-4`}
      >
        <span>
          <Image src={active ? item.activeIcon : item.inactiveIcon} alt="" />
        </span>
        <p
          className={`font-work-sans-regular text-sm`}
        >
          {item.text}
        </p>
      </motion.div>
    </Link>
  );
};
