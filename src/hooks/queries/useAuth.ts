import { register } from "@/services/auth.service";
import { RegisterUserInterface } from "@/types";
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
