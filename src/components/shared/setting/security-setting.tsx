import { Button } from "@/components/ui/buttons/button";

export const SecuritySetting = () => {
  return (
    <>
      <div className="mb-4">
        <div>
          <p className="font-work-sans-medium text-[#202020] text-lg">
            Password Change
          </p>
          <p className=" text-[#707070] font-work-sans-regular">
            {`Secure your account by updating your password. A strong, unique password helps protect your personal information`}
          </p>
        </div>
        <div className="mt-2 bg-white border border-[#BEBEBE59] py-4 rounded-lg px-4 flex items-center justify-between">
          <p className=" text-[#202020]">Sam*****2@Gmail.com</p>
          <Button
            action={() => {}}
            loading={false}
            text="Change Password"
            variant="green-bg"
          />
        </div>
      </div>
      <div className="mb-4">
        <div>
          <p className="font-work-sans-medium text-[#202020] text-lg">
            Two Factor Authentication
          </p>
          <p className=" text-[#707070] font-work-sans-regular">
            {`2-step verification adds an extra layer of security to help keep your account safe. We strongly recommend enabling it.`}
          </p>
        </div>
        <div className="mt-2 bg-white border border-[#BEBEBE59] py-4 rounded-lg px-4 flex items-center justify-between">
          <div>
            <p className=" text-[#202020]">+234 81****1233</p>
            <p className=" text-[#707070] font-work-sans-regular">
              Add an extra layer of protection to your account.
            </p>
          </div>
          <Button
            action={() => {}}
            loading={false}
            text="Enable 2FA"
            variant="green-bg"
          />
        </div>
      </div>
      <div className="mb-4">
        <div>
          <p className="font-work-sans-medium text-[#202020] text-lg">
            Logout from all Sessions
          </p>
          <p className=" text-[#707070] font-work-sans-regular">
            {`Log out your account from all other active devices and sessions for better security.`}
          </p>
        </div>
        <div className="mt-2 bg-white border border-[#BEBEBE59] py-4 rounded-lg px-4 flex items-center justify-between">
         
            <p className=" text-[#202020]">My Devices</p>
            
          <Button
            action={() => {}}
            loading={false}
            text="Log Out"
            variant="green-bg"
          />
        </div>
      </div>
    </>
  );
};
