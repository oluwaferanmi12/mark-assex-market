'use client'

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
import insightActive from "@/assets/svgs/nav-insight-active.svg";
import insightInactive from "@/assets/svgs/nav-insight-inactive.svg";
import partnershipActive from "@/assets/svgs/nav-partnership-active.svg";
import partnershipInactive from "@/assets/svgs/nav-partnership-inactive.svg";
import bonusActive from "@/assets/svgs/nav-bonus-active.svg";
import bonusInactive from "@/assets/svgs/nav-bonus-inactive.svg";
import { DashboardNavWrapper } from "@/components/shared/container/dashboar-side-nav-wrapper";

export const DashboardSideNav = () => {
    //Slug used here basically implies the folder name and is usually the expected path name that would be on the url tab
  const navObject = [
    {
      text: "Wallet",
      activeIcon: activeDollarIcon,
      inactiveIcon: inactiveDollarIcon,
      clickAction: () => {},
      slug: 'wallet'
    },
    {
      text: "My Accounts",
      activeIcon: activeWallet,
      inactiveIcon: inactiveWallet,
      clickAction: () => {},
      slug: 'account',
    },
    {
      text: "Deposit",
      activeIcon: activeDeposit,
      inactiveIcon: inactiveDeposit,
      clickAction: () => {},
      slug: 'deposit'
    },
    {
      text: "Internal Transfer",
      activeIcon: activeTransfer,
      inactiveIcon: inactiveTransfer,
      clickAction: () => {},
      slug: 'internal-transfer',
    },
    {
      text: "Withdrawal",
      activeIcon: withdrawActive,
      inactiveIcon: withdrawInactive,
      clickAction: () => {},
      slug: 'withdrawal'
    },
    {
      text: "Insights",
      activeIcon: insightActive,
      inactiveIcon: insightInactive,
      clickAction: () => {},
      slug: "insight",
    },
   
    {
      text: "Partnership",
      activeIcon: partnershipActive,
      inactiveIcon: partnershipInactive,
      clickAction: () => {},
      slug: 'partnership'
    },
    {
      text: "Bonuses",
      activeIcon: bonusActive,
      inactiveIcon: bonusInactive,
      clickAction: () => {},
      slug: 'bonus'
    },
  ];
  return (
    <div className="bg-white border border-[#BEBEBE80] py-8 h-screen max-h-screen min-h-screen px-6">
      <div>
        <span>
          <Image src={smallLogo} alt="" />
        </span>
      </div>
      <div className="mt-8">
        {navObject.map((item , index) => {
          return <DashboardNavWrapper  key={index} item={item} />;
        })}
      </div>
    </div>
  );
};
