import { axiosInstance } from "@/api/axios";
import { UpdateUserInterface, UserProfileInterface } from "@/types";

export const getUserProfile = async (): Promise<UserProfileInterface> => {
  const result = await axiosInstance.get("/users/me");
  return result.data.data;
};

export const saveUserProfile = async (payload: UpdateUserInterface) => {
  const { data } = await axiosInstance.patch("/users", payload);
  return data;
};
