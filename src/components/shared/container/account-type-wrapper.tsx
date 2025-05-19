import priceIconWrap from "@/assets/svgs/price-icon-wrap.svg";
import { Button } from "@/components/ui/buttons/button";
import checkIcon from "@/assets/svgs/tabler-icon-checkbox.svg";
import Image from "next/image";
import { CreateAccountInterface } from "@/interfaces/ui-interfac";

export const AccountTypeWrapper = ({
  item,
}: {
  item: CreateAccountInterface;
}) => {
  return (
    <>
      <div
        className="p-8 rounded-lg min-h-[500px]  bg-white"
        style={{
          boxShadow: item.active
            ? `0px 16px 48px 0px rgba(0, 204, 177, 0.12),
    0px 4px 12px 0px rgba(10, 124, 255, 0.24),
    0px 0px 0px 4px #00CCB1`
            : "0px 0px 1px 0px rgba(36, 38, 41, 0.24), 0px 1px 2px 0px rgba(36, 38, 41, 0.08)",
        }}
      >
        <div className="flex justify-between  items-center">
          <span className="bg-[#00CCB11F] border border-[#00CCB11F] text-[#0DAE94] rounded-lg text-xs px-4 py-2 font-work-sans-medium ">
            {item.title}
          </span>

          <span>
            <Image src={item.icon} alt="" />
          </span>
        </div>
        <div>
          <p className="text-base font-work-sans-regular leading-7">
            {item.description}
          </p>
        </div>
        <div className="my-4">
          <Button
            text="Create Account"
            variant="green-bg"
            action={() => {}}
            loading={false}
            fullRounded
            fullWidth
          />
        </div>
        <div>
          {item.benefitList.map((item, index) => {
            return (
              <div className="flex items-center gap-2 mb-2">
                <span>
                  <Image src={checkIcon} alt="" />
                </span>
                <p className={` text-[#404040]  font-work-sans-regular`}>
                  {item}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
