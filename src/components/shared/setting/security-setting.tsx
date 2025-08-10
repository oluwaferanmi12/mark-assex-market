import { Button } from "@/components/ui/buttons/button";
import {
  useGetUserProfile,
} from "@/hooks/queries/useSettings";
import { ChangePassword } from "../modals/change-password";
import { useState } from "react";

export const SecuritySetting = () => {
  const { data } = useGetUserProfile();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  return (
    <>
      <ChangePassword
        modalActive={showPasswordModal}
        setModalActive={setShowPasswordModal}
      />
      <div className="mb-4">
        <div>
          <p className="font-work-sans-medium text-[#202020] text-base lg:text-lg">
            Password Change
          </p>
          <p className=" text-[#707070] text-xs lg:text-sm font-work-sans-regular">
            {`Secure your account by updating your password. A strong, unique password helps protect your personal information`}
          </p>
        </div>
        <div className="mt-2 bg-white border border-[#BEBEBE59] py-4 rounded-lg px-4 flex items-center justify-between">
          <p className=" text-[#202020] lg:text-sm text-xs">{data?.email}</p>
          <Button
            action={() => {
              setShowPasswordModal(true);
            }}
            loading={false}
            text="Change Password"
            variant="green-bg"
          />
        </div>
      </div>
      <div className="mb-4">
        <div>
          <p className="font-work-sans-medium text-[#202020] text-base lg:text-lg">
            Two Factor Authentication
          </p>
          <p className=" text-[#707070] font-work-sans-regular text-xs lg:text-sm ">
            {`2-step verification adds an extra layer of security to help keep your account safe. We strongly recommend enabling it.`}
          </p>
        </div>
        <div className="mt-2 bg-white border border-[#BEBEBE59] py-4 rounded-lg px-4 flex items-center justify-between">
          <div>
            <p className=" text-[#202020] text-xs lg:text-sm ">
              +234 81****1233
            </p>
            <p className=" text-[#707070] text-xs lg:text-sm  font-work-sans-regular">
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
          <p className="font-work-sans-medium text-[#202020] text-base lg:text-lg">
            Logout from all Sessions
          </p>
          <p className=" text-[#707070] text-xs lg:text-sm  font-work-sans-regular">
            {`Log out your account from all other active devices and sessions for better security.`}
          </p>
        </div>
        <div className="mt-2 bg-white border border-[#BEBEBE59] py-4 rounded-lg px-4 flex items-center justify-between">
          <p className=" text-[#202020] text-xs lg:text-sm">My Devices</p>

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
