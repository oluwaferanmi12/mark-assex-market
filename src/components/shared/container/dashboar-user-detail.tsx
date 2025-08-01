import placeholder from "@/assets/svgs/profile-placeholder.svg";
import { getStoredUser } from "@/utils/auth-helper";
import Image from "next/image";
import { useEffect, useState } from "react";

export const DashboardUserDetails = () => {
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
      <div className="flex items-center gap-2 mt-4">
        <span>
          <Image src={placeholder} alt="" />
        </span>
        <div>
          <p className="text-[#202020] font-work-sans-medium">
            {userName ?? "User"}
          </p>
          <p className="text-xs font-work-sans-light">{email ?? ""}</p>
        </div>
      </div>
    </>
  );
};
