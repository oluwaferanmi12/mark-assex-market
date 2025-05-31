"use client";

import { DropDownTextWrapper } from "@/components/shared/wrappers/drop-down-text";
import { VisibleOnDesktop } from "@/components/shared/wrappers/visible-on-desktop";
import { DropDownList } from "@/components/ui/drop-down/dropdown-list";
import { SearchInput } from "@/components/ui/inputs/search-input";
import { BonusTable } from "@/components/ui/tables/bonus/bonus-table";
import { PageHeader } from "@/components/ui/text/page-header";
import { DropDownListInterface } from "@/interfaces/ui-interfac";
import React, { useState } from "react";

const Bonus = () => {
  const [statusSelected, setStatusSelected] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [typeSelected, setTypeSelected] = useState("All");
  const statusDropDownList: DropDownListInterface[] = [
    { text: "All", id: "" },
    { text: "Successful", id: "" },
    { text: "Pending", id: "" },
    { text: "Failed", id: "" },
  ];

  const typeDropDownList: DropDownListInterface[] = [
    { text: "All", id: "" },
    { text: "Deposit", id: "" },
    { text: "Withdraw", id: "" },
  ];
  return (
    <div>
      <PageHeader text="Bonuses" />
      <div>
        <VisibleOnDesktop>
          <div className="flex justify-between items-end">
            <div>
              <SearchInput />
            </div>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-[#707070] text-xs font-work-sans-regular mb-1">
                  Type
                </p>
                <DropDownList
                  dropDownList={typeDropDownList}
                  selected={typeSelected}
                  setSelected={setTypeSelected}
                >
                  <div>
                    <DropDownTextWrapper filterSelected={statusSelected} />
                  </div>
                </DropDownList>
              </div>
              <div>
                <p className="text-[#707070] text-xs font-work-sans-regular mb-1">
                  Status
                </p>
                <DropDownList
                  dropDownList={statusDropDownList}
                  selected={statusSelected}
                  setSelected={setStatusSelected}
                >
                  <div>
                    <DropDownTextWrapper filterSelected={statusSelected} />
                  </div>
                </DropDownList>
              </div>
            </div>
          </div>
        </VisibleOnDesktop>
      </div>
      <BonusTable />
    </div>
  );
};

export default Bonus;
