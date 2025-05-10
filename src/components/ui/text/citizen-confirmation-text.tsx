import { Dispatch, SetStateAction } from "react";

export const CitizenConfirmation = ({checkVal , setCheckVal}:{checkVal: boolean , setCheckVal: Dispatch<SetStateAction<boolean>>}) => {
    return (
      <div className="flex items-center gap-2">
        <input
          checked={checkVal}
          onChange={(e) => setCheckVal(e.target.checked)}
          type="checkbox"
        />
        <p className="font-work-sans-regular text-[#333333]">
          I confirm that I am not a citizen or tax resident of the United
          States.
        </p>
      </div>
    );
}