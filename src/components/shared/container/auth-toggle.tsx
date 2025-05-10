import { Col, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const AuthToggle = ({ active }: { active: "login" | "register" }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-center my-4">
        <div className="bg-[#F1F5F9] rounded-lg flex items-center border p-1 border-[#BEBEBE59]">
          <Link href={"/login"}>
            <div
              className={`py-2 ${
                active === "login"
                  ? "bg-[#0DAE94] text-white font-semibold"
                  : "text-[#404040]"
              } px-8 rounded-lg cursor-pointer`}
            >
              <p className="font-work-sans-regular">Sign in</p>
            </div>
          </Link>
          <Link href={"/register"}>
            <div
              onClick={() => router.push("/register")}
              className={`py-2 ${
                active === "register"
                  ? "bg-[#0DAE94] text-white font-semibold "
                  : "text-[#404040]"
              } px-8 rounded-lg cursor-pointer`}
            >
              <p className="font-work-sans-regular">Register</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
