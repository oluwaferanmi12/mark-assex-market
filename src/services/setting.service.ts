import { axiosInstance } from "@/api/axios";
import { UserProfileInterface } from "@/types";

export const getUserProfile = async (): Promise<UserProfileInterface> => {
  const result = await axiosInstance.get("/users/me");
  return result.data.data;
};
