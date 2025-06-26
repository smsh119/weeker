import { z } from "zod";

export const RegistrationFormSchema = z.object({
  fullname: z.string().trim().min(3, { message: "Please enter a valid name!" }),
  email: z.string().trim().email({ message: "Please provide a valid email!" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must contain more than 8 characters!" }),
});

export const LoginFormSchema = z.object({
  email: z.string().trim().email({ message: "Please provide a valid email!" }),
  password: z.string().trim().min(1, { message: "Password can not be empty!" }),
});

export const AddTaskSchema = z.object({
  taskDescription: z
    .string()
    .trim()
    .min(1, { message: "Please enter the task first." }),
  taskColor: z.string().trim().min(1),
});
