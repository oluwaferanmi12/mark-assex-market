import { Col, Row } from "antd";

export const AuthToggle = ({ active }: { active: "login" | "register" }) => {
  return (
    <>
      <div className="flex justify-center my-6">
        <div className="bg-[#F1F5F9] rounded-lg flex items-center border p-1 border-[#BEBEBE59]">
          <div
            className={`py-2 ${
              active === "login"
                ? "bg-[#0DAE94] text-white font-semibold"
                : "text-[#404040]"
            } px-8 rounded-lg cursor-pointer`}
          >
            <p className="font-work-sans-regular">Sign in</p>
          </div>
          <div
            className={`py-2 ${
              active === "register"
                ? "bg-[#0DAE94] text-white font-semibold "
                : "text-[#404040]"
            } px-8 rounded-lg cursor-pointer`}
          >
            <p className="font-work-sans-regular">Register</p>
          </div>
        </div>
      </div>
    </>
  );
};
