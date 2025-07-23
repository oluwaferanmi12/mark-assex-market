import { getUserProfile } from "@/services/setting.service";
import { UserProfileInterface } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUserProfile = () => {
  return useQuery<UserProfileInterface>({
    queryKey: ["test"],
    queryFn: getUserProfile,
  });
};
