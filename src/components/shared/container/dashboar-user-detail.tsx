import placeholder from "@/assets/svgs/profile-placeholder.svg";
import { getStoredUser } from "@/utils/auth-helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar } from "../avatar/avatar";
import { UserProfileInterface } from "@/types";
import selector from "@/assets/svgs/table-icon-selector.svg";
import { AnimatePresence, motion } from "framer-motion";
import { CopyWrapper } from "../wrappers/copy-wrapper";
import copyBlueIcon from "@/assets/svgs/copy-blue-icon.svg";
import accountSetting from "@/assets/svgs/profile-setting-icon.svg";
import logoutIcon from "@/assets/svgs/logout-icon-red.svg";
import { useRouter } from "next/navigation";
import headphoneIcon from "@/assets/svgs/head-phone-icon.svg";

export const DashboardUserDetails = ({
  userProfile,
}: {
  userProfile?: UserProfileInterface;
}) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [showCustomDropDown, setShowCustomDropdown] = useState(false);
  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setUserName(`${user.user.firstName ?? ""}`);
      setEmail(user.user.email);
    }
  }, []);
  return (
    <div className="flex items-center relative">
      <AnimatePresence>
        {showCustomDropDown && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 bottom-16 mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg z-50 p-4"
          >
        
            <div
              style={{ border: "0.5px solid #BEBEBE59" }}
              className="p-2 rounded-lg flex items-center justify-between"
            >
              <p className="font-work-sans-medium text-[#202020]">
                {" "}
                <span className="text-[#404040] font-work-sans-regular ">
                  User ID
                </span>{" "}
                : {userProfile?.assexId}
              </p>
              <CopyWrapper value={userProfile?.assexId ?? ""}>
                <span>
                  <Image src={copyBlueIcon} alt="" />
                </span>
              </CopyWrapper>
            </div>
            <div className="my-4 cursor-pointer">
              <div
                onClick={() => {
                  router.push("/settings");
                }}
                className="flex items-center gap-2"
              >
                <Image src={accountSetting} alt="" />
                <p className="text-[#202020] font-work-sans-medium">
                  Account Settings
                </p>
              </div>
            </div>
            <div className="my-4 cursor-pointer">
              <div
                onClick={() => {
                  router.push("/support");
                }}
                className="flex items-center gap-2"
              >
                <Image src={headphoneIcon} alt="" />
                <p className="text-[#202020] font-work-sans-medium">Support</p>
              </div>
            </div>

            <div
              className="my-4 cursor-pointer border-t border-[#BEBEBE80] pt-4"
              onClick={() => {}}
            >
              <div className="flex items-center gap-2">
                <Image src={logoutIcon} alt="" />
                <p className="text-[#D80027] font-work-sans-medium">Log out</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex w-full items-center gap-2 mt-4 overflow-hidden">
        <span className="shrink-0">
          <Avatar avatar={userProfile?.picture!} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[#202020] font-work-sans-medium truncate">
            {userProfile?.firstName ?? "User"}
          </p>
          <p className="text-xs font-work-sans-light truncate">
            {userProfile?.email ?? ""}
          </p>
        </div>
      </div>
      <div className="cursor-pointer">
        <Image
          onClick={() => {
            setShowCustomDropdown((prev) => !prev);
          }}
          src={selector}
          alt=""
        />
      </div>
    </div>
  );
};
