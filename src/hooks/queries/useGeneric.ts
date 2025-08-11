import { sendGenericOtp, verifyGenericOtp } from "@/services";
import {
  GenericVerifyOtpInterface,
  SendGenericOtp,
  VerifyOtpInterface,
} from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSendGenericOtp = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: SendGenericOtp) => {
      return sendGenericOtp(payload);
    },
    onSuccess: (data) => {
      toast.success("Otp sent");
      sc(data);
    },
  });
};

export const useVerifyGenericOtp = (sc: (val: any) => void) => {
  return useMutation({
    mutationFn: (payload: GenericVerifyOtpInterface) => {
      return verifyGenericOtp(payload);
    },
    onSuccess: (data) => {
      toast.success("Otp sent");
      sc(data);
    },
  });
};
