import { z } from "zod";

export const RegistrationFormSchema = z.object({
  fullname: z.string().min(3, { message: "Please enter a valid name!" }),
  email: z.string().email({ message: "Please provide a valid email!" }),
  password: z
    .string()
    .min(8, { message: "Password must contain more than 8 characters!" }),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email!" }),
  password: z.string().min(1, { message: "Password can not be empty!" }),
});
