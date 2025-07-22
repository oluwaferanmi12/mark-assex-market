import { settingsData } from "@/data/settings-data";
import { SettingsIdType } from "@/interfaces/ui-interfac";

export const SettingsTab = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: SettingsIdType;
  setActiveTab: (val: SettingsIdType) => void;
}) => {
  return (
    <div className=" flex hide-scrollbar overflow-x-scroll">
      {settingsData.map((item) => {
        return (
          <button
            key={item.id}
            className={`font-work-sans-regular whitespace-nowrap text-xs lg:text-sm  px-4 pb-2 cursor-pointer border-b-2   ${
              activeTab === item.id ? "border-[#0DAE94]" : "border-[#A4A9AE26]"
            } ${activeTab === item.id ? "text-[#0DAE94]" : "text-[#707070]"}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.text}
          </button>
        );
      })}
    </div>
  );
};
