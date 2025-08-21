"use client";
import { Dropdown, MenuProps } from "antd";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import checkedIcon from "@/assets/svgs/drop-down-check-icon.svg";
import unCheckedIcon from "@/assets/svgs/drop-down-unchecked.svg";
import Image from "next/image";
import { DropDownListInterface } from "@/interfaces/ui-interfac";

export const DropDownList = ({
  children,
  dropDownList,
  selected,
  setSelected,
  setSelectedId,
}: {
  children: ReactNode;
  dropDownList: DropDownListInterface[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  setSelectedId?: Dispatch<SetStateAction<string>>;
}) => {
  const items: MenuProps["items"] = dropDownList.map((item, index) => {
    return {
      key: index,
      label: (
        <div
          onClick={() => {
            setSelected(item.text);
            if (setSelectedId) {
              setSelectedId(item.id);
            }
            item.clickAction && item.clickAction();
          }}
          className="flex items-center gap-2"
        >
          <Image
            src={selected === item.text ? checkedIcon : unCheckedIcon}
            alt=""
          />
          <p className="text-sm font-work-sans-regular">{item.text}</p>
        </div>
      ),
    };
  });

  return (
    <>
      <Dropdown className="cursor-pointer" trigger={["click"]} menu={{ items }}>
        {children}
      </Dropdown>
    </>
  );
};
