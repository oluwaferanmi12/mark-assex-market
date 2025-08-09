import {
  generate2FA,
  getKyc,
  getNotification,
  getNotificationPreference,
  getUserProfile,
  phoneRequest,
  phoneVerify,
  saveFinanceInfo,
  saveNotificationPreference,
  saveUserProfile,
  submitKyc,
  verify2FA,
} from "@/services/setting.service";
import { UpdateUserInterface, UserProfileInterface } from "@/types";
import {
  CreateKycFinance,
  Get2FA,
  GetKycResponse,
  NotificationPreference,
  PhoneRequest,
  PhoneVerify,
  SubmitKycInterface,
  Verify2fa,
} from "@/types/settings.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetUserProfile = () => {
  return useQuery<UserProfileInterface>({
    queryKey: ["user-profile"],
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

export const useGetNotification = () => {
  return useQuery({
    queryFn: getNotification,
    queryKey: ["get-notification"],
  });
};

export const useGetNoficationPreference = () => {
  return useQuery<NotificationPreference>({
    queryFn: getNotificationPreference,
    queryKey: ["get-notification-preference"],
  });
};

export const useSaveNotificationSetting = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: NotificationPreference) => {
      return saveNotificationPreference(payload);
    },
    onSuccess: (data) => {
      sc(data);
    },
  });
};

export const useGenerate2FA = (sc: (data: Get2FA) => void) => {
  return useMutation<Get2FA>({
    mutationKey: ["get-2fa"],
    mutationFn: () => {
      return generate2FA();
    },
    onSuccess: (data) => {
      sc(data);
    },
  });
};

export const useVerify2FA = (sc: (data: any) => void) => {
  return useMutation({
    mutationFn: (payload: Verify2fa) => {
      return verify2FA(payload);
    },
    onSuccess: (data) => {
      sc(data);
    },
  });
};

export const usePhoneRequest = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: PhoneRequest) => {
      return phoneRequest(payload);
    },
    onSuccess: (data: any) => {
      sc(data);
    },
  });
};

export const usePhoneRequestVerify = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: PhoneVerify) => {
      return phoneVerify(payload);
    },
    onSuccess: (data: any) => {
      sc(data);
    },
  });
};

export const useSaveFinanceInfo = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: CreateKycFinance) => {
      return saveFinanceInfo(payload);
    },
    onSuccess: (data) => {
      sc(data);
    },
  });
};
