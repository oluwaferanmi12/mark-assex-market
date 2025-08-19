import placeholder from "@/assets/svgs/profile-placeholder.svg";
import { getStoredUser } from "@/utils/auth-helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar } from "../avatar/avatar";
import { UserProfileInterface } from "@/types";

export const DashboardUserDetails = ({
  userProfile,
}: {
  userProfile?: UserProfileInterface;
}) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setUserName(`${user.user.firstName ?? ""}`);
      setEmail(user.user.email);
    }
  }, []);
  return (
    <>
  <div className="flex w-full items-center gap-2 mt-4 border  overflow-hidden">
    <span className="shrink-0">
      <Avatar avatar={userProfile?.picture!} />
    </span>
    <div className="min-w-0 flex-1">
      <p className="text-[#202020] font-work-sans-medium">
        {userProfile?.firstName ?? "User"}
      </p>
      <p className="text-xs font-work-sans-light truncate">
        {userProfile?.email ?? ""}
      </p>
    </div>
  </div>
</>

  );
};
