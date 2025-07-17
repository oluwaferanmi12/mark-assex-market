import { login, register, verify } from "@/services/auth.service";
import {
  CreateLoginInterface,
  LoginInterface,
  RegisterUserInterface,
  VerifyOtpInterface,
} from "@/types";
import { useMutation } from "@tanstack/react-query";
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
