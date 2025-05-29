export const SettingsInput = ({
  label,
  placeholder,
  value,
  readOnly = true,
  setValue,
  name,
}: {
  label: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  setValue?: (val: string, name: string) => void;
  name?: string;
}) => {
  return (
    <div>
      <p className="text-[#606060] mb-1 font-work-sans-regular">{label}</p>
      <div>
        <input
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue && setValue(e.target.value, name ?? "");
          }}
          className={`w-full ${
            !readOnly && "bg-[#F2F4F7]"
          } text-[#202020] font-work-sans-regular px-4 py-2 rounded-lg border border-[#BEBEBE59] outline-none`}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};
