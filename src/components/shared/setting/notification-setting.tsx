import { useEffect, useState } from "react";
import squareCheckIcon from "@/assets/svgs/checked-square.svg";
import Image from "next/image";
import { Button } from "@/components/ui/buttons/button";
import unCheckedSquareIcon from "@/assets/svgs/unchecked-square.svg";
import {
  useGetNoficationPreference,
  useGetNotification,
  useSaveNotificationSetting,
} from "@/hooks/queries/useSettings";
import { NotificationPreference } from "@/types";
import { toast } from "sonner";

export const NotificationSetting = () => {
  const { data: notifData } = useGetNoficationPreference();
  const { isPending, mutate } = useSaveNotificationSetting(() => {
    toast.success("Setting save");
  });
  const [payloadData, setPayloadData] = useState(notifData);
  const handleUpdateData = (val: string) => {
    if (payloadData) {
      const data = {
        ...payloadData,
        [val]: !payloadData[val as keyof NotificationPreference],
      };
      if (data) {
        setPayloadData(data);
      }
    }
  };
  useEffect(() => {
    if (notifData) {
      setPayloadData(notifData);
    }
  }, [notifData]);

  return (
    <>
      <div className="bg-white rounded-lg p-4 mb-4">
        <p className="text-[#707070] text-xs lg:text-sm font-work-sans-regular  mb-4">
          {`Choose the type of notification you'd like to recieve by checking or unchecking the options below. when you're done, click the "Save Changes" button to apply your preferences.`}
        </p>
        <p className="text-[#707070] font-work-sans-regular text-xs lg:text-sm mb-4">
          {`For SMS alerts, please ensure your phone number is verified`}
        </p>
        <p className="text-[#707070] font-work-sans-regular text-xs lg:text-sm mb-4">
          {`Changes may take up to 24 hours to fully reflect`}
        </p>
        <div className="py-4">
          {payloadData &&
            Object.entries(payloadData).map(([item, val]) => {
              return (
                <NotificationTexts
                  handleChangeStatus={handleUpdateData}
                  key={item}
                  text={item}
                  checked={Boolean(val)}
                />
              );
            })}
        </div>
      </div>
      <Button
        action={() => {
          if (payloadData) {
            mutate(payloadData);
          }
        }}
        loading={isPending}
        text="Save Changes"
        variant="green-bg"
      />
    </>
  );
};

export const NotificationTexts = ({
  text,
  checked,
  handleChangeStatus,
}: {
  text: string;
  checked: boolean;
  handleChangeStatus: (val: string) => void;
}) => {
  return (
    <div
      onClick={() => {
        // setActive((prev) => !prev);
        handleChangeStatus(text);
      }}
      className="flex items-center gap-3 cursor-pointer mb-6"
    >
      <span>
        <Image
          className="w-[16px] h-[16px]"
          src={checked ? squareCheckIcon : unCheckedSquareIcon}
          alt=""
        />
      </span>
      <p className="text-[#111111] font-work-sans-regular lg:text-sm text-xs">
        {text}
      </p>
    </div>
  );
};
