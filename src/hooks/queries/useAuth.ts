import {
  confirmOtp,
  login,
  refreshToken,
  register,
  resetComplete,
  resetPasswordRequest,
  verify,
} from "@/services/auth.service";
import {
  CreateLoginInterface,
  CreateNewPasswordInterface,
  LoginInterface,
  RefreshTokenInterface,
  RegisterUserInterface,
  VerifyOtpInterface,
} from "@/types";
import { useMutation } from "@tanstack/react-query";
import { data } from "framer-motion/client";
import { toast } from "sonner";

export const useRegister = (succesCallback: () => void) => {
  return useMutation({
    mutationFn: (payload: RegisterUserInterface) => {
      return register(payload);
    },
    mutationKey: ["register"],
    onSuccess: (data) => {
      toast.success("Registration successful");
      console.log(data);
      succesCallback();
    },
  });
};

export const useVerifyOTP = (successCallback: () => void) => {
  return useMutation({
    mutationFn: (payload: VerifyOtpInterface) => {
      return verify(payload);
    },
    onSuccess: (data) => {
      successCallback();
    },
    mutationKey: ["verifyOtp"],
  });
};

export const useLogin = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: CreateLoginInterface) => {
      return login(payload);
    },
    onSuccess: (data) => {
      sc(data);
    },
    mutationKey: ["login"],
  });
};

export const useSendResetLink = (sc: () => void) => {
  return useMutation({
    mutationFn: (payload: string) => {
      return resetPasswordRequest(payload);
    },
    mutationKey: ["resetPasswordLink"],
    onSuccess: (data) => {
      sc();
    },
  });
};

export const useConfirmOtp = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: VerifyOtpInterface) => {
      return confirmOtp(payload);
    },
    mutationKey: ["confirmOtp"],
    onSuccess: (data) => {
      sc(data);
    },
  });
};

export const useCreateNewPassword = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: CreateNewPasswordInterface) => {
      return resetComplete(payload);
    },
    mutationKey: ["createNewPassword"],
    onSuccess: (data) => {
      sc(data);
    },
  });
};

export const useRefreshToken = (
  sc: (val: any) => void,
  ec: (val: any) => void
) => {
  return useMutation({
    mutationFn: (payload: RefreshTokenInterface) => {
      return refreshToken(payload);
    },
    mutationKey: ["refreshToken"],
    onSuccess: (data) => {
      sc(data);
    },
    onError: (data) => {
      ec(data);
    },
  });
};
