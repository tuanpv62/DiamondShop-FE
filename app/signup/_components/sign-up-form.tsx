"use client";

import { DateTimePicker } from "@/components/date-time-picker/date-time-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { number, z } from "zod";

const SignUpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const RegisterSchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .max(255, { message: "Email must be at most 255 characters long" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Za-z]/, {
        message: "Password must contain at least one letter",
      })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    name: z
      .string()
      .max(255, { message: "Name must be at most 255 characters long" }),
    address: z
      .string()
      .max(255, { message: "Address must be at most 255 characters long" }),
    phone: z.string().regex(/^0\d{10}$/, {
      message: "Phone number must start with 0 and have 11 digits",
    }),
    dob: z.date().refine((date) => date < new Date(2006, 0, 1), {
      message: "Date of birth must be before 2006",
    }),
  });

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      address: "",
      phone: "",
      dob: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      const dobFormat = values.dob
        ? new Date(values.dob).toISOString()
        : undefined;

      const formData = {
        ...values,
        phone: values.phone?.toString() ?? "",
        dob: dobFormat,
      };
      console.log("fomr", formData);
      console.log("date", formData.dob);

      await axios
        .post("https://diamondshopapi.azurewebsites.net/api/v1", formData)
        .then((response) => {
          toast.success("Đăng ký thành công");
          console.log(response.data);

          form.reset();
          router.push("/signin");
        })
        .catch((error) => {
          console.error("Đăng ký thất bại");
          console.error(error);
          toast.error("Có lỗi xảy ra rồi");
        });
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      toast.error("Có lỗi xảy ra rồi");
    }
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="text-bgray-800 text-base border focus-visible:ring-0  focus-visible:ring-offset-0 border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                  placeholder="Nhập Email..."
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative mb-6">
                  <Input
                    className="text-bgray-800 focus-visible:ring-0  focus-visible:ring-offset-0 text-base border border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                    placeholder="Nhập mật khẩu..."
                    disabled={isLoading}
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <button
                    aria-label="none"
                    className="absolute top-4 right-4 bottom-4"
                    type="button"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 12a5 5 0 019.9-1"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="text-bgray-800 text-base border focus-visible:ring-0  focus-visible:ring-offset-0 border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                  placeholder="Nhập họ tên..."
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="text-bgray-800 text-base border focus-visible:ring-0  focus-visible:ring-offset-0 border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                  placeholder="Nhập số điện thoại..."
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="text-bgray-800 text-base border focus-visible:ring-0  focus-visible:ring-offset-0 border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                  placeholder="Nhập địa chỉ..."
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="dob">Nhập năm sinh</FormLabel>
              <FormControl>
                <DateTimePicker
                  granularity="day"
                  jsDate={field.value ? new Date(field.value) : null}
                  onJsDateChange={field.onChange}
                  aria-label="Time Field"
                  // isDisabled={
                  //   field.value && new Date(field.value) < new Date()
                  // }
                />
              </FormControl>
              <FormMessage className="dark:text-yellow-300" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          variant="action"
          className="py-3.5 flex items-center justify-center text-white font-bold bg-success-300 hover:bg-success-400 transition-all rounded-lg w-full"
        >
          Đăng Kí
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
