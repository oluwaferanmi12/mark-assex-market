import { useState } from "react";
import squareCheckIcon from "@/assets/svgs/checked-square.svg";
import Image from "next/image";
import { Button } from "@/components/ui/buttons/button";
import unCheckedSquareIcon from "@/assets/svgs/unchecked-square.svg";

export const NotificationSetting = () => {
  return (
    <>
      <div className="bg-white rounded-lg p-4 mb-4">
        <p className="text-[#707070] font-work-sans-regular text-sm mb-4">
          {`Choose the type of notification you'd like to recieve by checking or unchecking the options below. when you're done, click the "Save Changes" button to apply your preferences.`}
        </p>
        <p className="text-[#707070] font-work-sans-regular text-sm mb-4">
          {`For SMS alerts, please ensure your phone number is verified`}
        </p>
        <p className="text-[#707070] font-work-sans-regular text-sm mb-4">
          {`Changes may take up to 24 hours to fully reflect`}
        </p>
        <div className="py-4">
          <NotificationTexts text="Trading Activity" />
          <NotificationTexts text="Account Updates" />
          <NotificationTexts text="Promotions & Offers" />
          <NotificationTexts text="Market Insights" />
          <NotificationTexts text="System & Maintenance" />
        </div>
      </div>
      <Button
        action={() => {}}
        loading={false}
        text="Save Changes"
        variant="green-bg"
      />
    </>
  );
};

export const NotificationTexts = ({ text }: { text: string }) => {
  const [active, setActive] = useState(true);
  return (
    <div
      onClick={() => {
        setActive((prev) => !prev);
      }}
      className="flex items-center gap-3 cursor-pointer mb-6"
    >
      <span>
        <Image className="w-[16px] h-[16px]" src={active ? squareCheckIcon : unCheckedSquareIcon} alt="" />
      </span>
      <p className="text-[#111111] font-work-sans-regular">{text}</p>
    </div>
  );
};
