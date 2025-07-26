import {
  getKyc,
  getUserProfile,
  saveUserProfile,
  submitKyc,
} from "@/services/setting.service";
import { UpdateUserInterface, UserProfileInterface } from "@/types";
import { GetKycResponse, SubmitKycInterface } from "@/types/settings.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetUserProfile = () => {
  return useQuery<UserProfileInterface>({
    queryKey: ["test"],
    queryFn: getUserProfile,
  });
};

export const useSaveProfile = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: UpdateUserInterface) => {
      return saveUserProfile(payload);
    },
    onSuccess: (data) => {
      sc(data);
    },
  });
};

export const useGetKyc = () => {
  return useQuery<GetKycResponse>({
    queryFn: getKyc,
    queryKey: ["get-kyc"],
    retry: 0,
    refetchOnWindowFocus: false,
  });
};

export const useSaveKyc = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: FormData) => {
      return submitKyc(payload);
    },
    onSuccess: (data) => {
      sc(data);
    },
  });
};
