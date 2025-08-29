"use client";

import Image from "next/image";
import smallLogo from "@/assets/svgs/nav-logo.svg";
import activeWallet from "@/assets/svgs/nav-account-active.svg";
import inactiveWallet from "@/assets/svgs/nav-account-inactive.svg";
import activeDollarIcon from "@/assets/svgs/currency-dollar-active.svg";
import inactiveDollarIcon from "@/assets/svgs/currency-dollar-inactive.svg";
import activeDeposit from "@/assets/svgs/nav-deposit-active.svg";
import inactiveDeposit from "@/assets/svgs/nav-deposit-inactive.svg";
import activeTransfer from "@/assets/svgs/nav-transfer-active.svg";
import inactiveTransfer from "@/assets/svgs/nav-transfer-inactive.svg";
import withdrawActive from "@/assets/svgs/nav-withdrawal-active.svg";
import withdrawInactive from "@/assets/svgs/nav-withdrawal-inactive.svg";
import partnershipActive from "@/assets/svgs/nav-partnership-active.svg";
import partnershipInactive from "@/assets/svgs/nav-partnership-inactive.svg";
import bonusActive from "@/assets/svgs/nav-bonus-active.svg";
import bonusInactive from "@/assets/svgs/nav-bonus-inactive.svg";
import activeSetting from "@/assets/svgs/nav-setting-active.svg";
import inactiveSetting from "@/assets/svgs/nav-settings-inactive.svg";
import logOutIcon from "@/assets/svgs/nav-logout.svg";
import dailyIcon from "@/assets/svgs/icon-24-hours.svg";
import { DashboardNavWrapper } from "@/components/shared/container/dashboar-side-nav-wrapper";
import { DashboardUserDetails } from "@/components/shared/container/dashboar-user-detail";
import notificationIcon from "@/assets/svgs/icon-notification.svg";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { UserProfileInterface } from "@/types";
import headPhoneIcon from "@/assets/svgs/head-phone-icon.svg";
import headPhoneIconActive from "@/assets/svgs/headphone-icon-active.svg";
import scrollTextIcon from "@/assets/svgs/scroll-text.svg";
import dataBricksIcon from "@/assets/svgs/data-bricks-icon.svg";

export const DashboardSideNav = ({
  handleCloseAsModal,
  userProfile,
}: {
  handleCloseAsModal?: () => void;
  userProfile?: UserProfileInterface;
}) => {
  //Slug used here basically implies the folder name and is usually the expected path name that would be on the url tab
  const [showInsightDropDown, setShowInsightDropdown] = useState(false);
  const [showPartnershipDropDown, setShowPartnershipDropDown] = useState(false);
  const pathName = usePathname();

  const prevPath = useRef(pathName);
  const navObject = [
    {
      text: "Wallet",
      activeIcon: activeDollarIcon,
      inactiveIcon: inactiveDollarIcon,
      clickAction: () => {},
      slug: "wallet",
    },
    {
      text: "My Accounts",
      activeIcon: activeWallet,
      inactiveIcon: inactiveWallet,
      clickAction: () => {},
      slug: "account",
    },
    {
      text: "Deposit",
      activeIcon: activeDeposit,
      inactiveIcon: inactiveDeposit,
      clickAction: () => {},
      slug: "deposit",
    },
    {
      text: "Withdrawal",
      activeIcon: withdrawActive,
      inactiveIcon: withdrawInactive,
      clickAction: () => {},
      slug: "withdrawal",
    },
    {
      text: "Internal Transfer",
      activeIcon: activeTransfer,
      inactiveIcon: inactiveTransfer,
      clickAction: () => {},
      slug: "internal-transfer",
    },
    {
      text: "Transaction History",
      activeIcon: scrollTextIcon,
      inactiveIcon: scrollTextIcon,
      clickAction: () => {},
      slug: "transaction",
    },
    {
      text: "Analytics",
      activeIcon: dataBricksIcon,
      inactiveIcon: dataBricksIcon,
      clickAction: () => {},
      slug: "analytics",
    },

    {
      text: "Partnership",
      activeIcon: partnershipActive,
      inactiveIcon: partnershipInactive,
      clickAction: () => {
        setShowPartnershipDropDown((prev) => !prev);
      },
      slug: "partnership",
      activeState: showPartnershipDropDown,
      sub: [
        { text: "Accounts", slug: "account", clickAction: () => {} },
        { text: "Referral Link", slug: "referral", clickAction: () => {} },
        { text: "Clients", slug: "clients", clickAction: () => {} },
        { text: "IB Program", slug: "ib-program", clickAction: () => {} },
        { text: "Reports", slug: "reports", clickAction: () => {} },
      ],
    },
    {
      text: "Bonuses",
      activeIcon: bonusActive,
      inactiveIcon: bonusInactive,
      clickAction: () => {},
      slug: "bonus",
    },
  ];

  const mobileObject = [
    {
      text: "Notification",
      activeIcon: notificationIcon,
      inactiveIcon: notificationIcon,
      clickAction: () => {},
      slug: "partnership",
    },
    {
      text: "Support",
      activeIcon: dailyIcon,
      inactiveIcon: dailyIcon,
      clickAction: () => {},
      slug: "bonus",
    },
  ];

  const nav2object = [
    {
      text: "Support",
      activeIcon: headPhoneIconActive,
      inactiveIcon: headPhoneIcon,
      clickAction: () => {},
      slug: "support",
    },
    {
      text: "Account Settings",
      activeIcon: activeSetting,
      inactiveIcon: inactiveSetting,
      clickAction: () => {},
      slug: "settings",
    },
    {
      text: "Logout",
      activeIcon: logOutIcon,
      inactiveIcon: logOutIcon,
      clickAction: () => {},
      slug: "logout",
    },
  ];

  useEffect(() => {
    if (prevPath.current !== pathName) {
      prevPath.current = pathName;
      handleCloseAsModal && handleCloseAsModal();
    }
  }, [pathName]);

  return (
    <div className="bg-white border w-4/5 lg:w-auto fixed lg:static border-[#BEBEBE80] py-8 h-screen max-h-screen min-h-screen px-6 z-50 top-0 flex flex-col overflow-hidden">
      {/* Scroll container */}
      <div className="flex-1 min-h-0 overflow-y-auto hide-scrollbar flex flex-col">
        {/* Desktop logo (sticky optional) */}
        <div className="hidden lg:block sticky top-0 bg-white z-20 pb-2">
          <Image src={smallLogo} alt="" />
        </div>

        {/* Mobile wallet header — stays on top */}
        <div className="lg:hidden sticky top-0 bg-white z-20 border-b pb-4 border-[#BEBEBE] flex justify-between items-center">
          {/* ...wallet header content... */}
        </div>

        {/* Fill remaining height; push bottom section down */}
        <div className="flex-1 min-h-0 flex flex-col justify-between">
          {/* TOP: main nav */}
          <div className="lg:mt-6">
            {navObject.map((item, index) => (
              <DashboardNavWrapper key={index} item={item} />
            ))}
          </div>

          {/* BOTTOM: settings/logout & user details (stick to bottom) */}
          <div className="mt-6 shrink-0">
            <div className="hidden lg:block">
              {nav2object.map((item, index) => (
                <DashboardNavWrapper key={index} item={item} />
              ))}
            </div>

            <div className="lg:hidden">
              {mobileObject.map((item, index) => (
                <DashboardNavWrapper key={index} item={item} />
              ))}
            </div>

            <DashboardUserDetails userProfile={userProfile} />

            <div className="lg:hidden">
              {nav2object.map((item, index) => (
                <DashboardNavWrapper key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
