import { ConversionResult } from "@/types";
import { MoneyFormat } from "@/utils/money-format";

export const CurrencyConverted = ({
  payload,
}: {
  payload?: ConversionResult;
}) => {
  return (
    <div className="flex items-center justify-end mt-1">
      <p className="text-[#007BFF] font-work-sans-medium text-xs">
        1 USD = {`${MoneyFormat(+(payload?.rate ?? 0))} ${payload?.target}`}
      </p>
    </div>
  );
};
