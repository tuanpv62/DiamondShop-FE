// UI ĐỊNH GIÁ SẢN PHẨM TỪ CUSTOMER

"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductV2 } from "@/lib/v2/actions-v2";
import ImageUpload from "@/components/image-cloudinary-upload/image-upload";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { createAuctionV2 } from "@/lib/v2/actions-v2/auction-v2";

// {
//   "productName": "string",
//   "title": "string",
//   "description": "string",
//   "quantity": 2147483647,
//   "productImageRequests": [
//     {
//       "imageUrl": "string",
//       "imageCode": "string"
//     }

const imageSchema = z.object({
  imageUrl: z.string(),
  imageCode: z.string(),
});

const formSchema = z.object({
  productName: z.string(),
  title: z.string(),
  description: z.string(),
  quantity: z.coerce.number(),
  productImageRequests: z.array(imageSchema),
});
const EvaluateCustomerPage = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      description: "",
      title: "",
      quantity: 0,
      productImageRequests: [],
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    
    try {
      await createAuctionV2(value);
      toast.success("Đăng kí định giá thành công");
      form.reset()
    } catch (error) {
      toast.error("Định giá thất bại");
      console.error(error);
    }
  };

  const isLoading = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 space-x-8 mt-4"
      >
        <div className="px-6 flex">
          <div className="w-1/3 pr-4 space-y-8">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"></FormLabel>
                  <FormControl>
                    <div className="w-full h-12 relative flex rounded-xl">
                      <input
                        disabled={isLoading}
                        className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
                        id="Name"
                        type="text"
                        {...field}
                        placeholder="Nhập tên sản phẩm"
                      />
                      <label
                        className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                        htmlFor="Name"
                      >
                        Tên sản phẩm
                      </label>
                    </div>
                    {/* <Input
                      disabled={isLoading}
                      type="text"
                      className="bg-zinc-300/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Nhập tên sản phẩm"
                      {...field}
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"></FormLabel>
                  <FormControl>
                    {/* <Input
                      disabled={isLoading}
                      type="text"
                      className="bg-zinc-300/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Tên tiêu đề buổi đấu giá"
                      {...field}
                    /> */}

                    <div className="w-full h-12 relative flex rounded-xl">
                      <input
                        disabled={isLoading}
                        className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
                        id="Name"
                        type="text"
                        {...field}
                        placeholder="Nhập tiêu đề"
                      />
                      <label
                        className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                        htmlFor="Name"
                      >
                        Tên tiêu đề buổi đấu giá
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"></FormLabel>
                  <FormControl>
                    {/* <Input
                      disabled={isLoading}
                      type="number"
                      className="bg-zinc-300/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Nhập số lượng"
                      {...field}
                    /> */}

                    <div className="w-full h-12 relative flex rounded-xl">
                      <input
                        disabled={isLoading}
                        className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
                        id="Name"
                        type="text"
                        {...field}
                        placeholder="số lượng"
                      />
                      <label
                        className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                        htmlFor="Name"
                      >
                        Số lượng
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-2/3 pl-4 space-y-8">
            {/* //bug */}

            <FormField
              control={form.control}
              name="productImageRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hình ảnh</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((item) => item.imageUrl)}
                      disabled={isLoading}
                      onChange={(imageUrl, imageCode) =>
                        field.onChange([
                          ...field.value,
                          { imageUrl, imageCode },
                        ])
                      }
                      onRemove={(imageUrl) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.imageUrl !== imageUrl
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage className="dark:text-yellow-300" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"></FormLabel>
                  <FormControl>
                    {/* <Textarea
                      disabled={isLoading}
                      className="bg-zinc-300/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                      placeholder="Nhập mô tả..."
                      {...field}
                    /> */}

                    <div className="w-full h-40  relative flex rounded-xl">
                      <input
                        disabled={isLoading}
                        className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#4070f4] focus:shadow-md"
                        id="Name"
                        type="text"
                        {...field}
                        placeholder="nhập mô tả"
                      />
                      <label
                        className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                        htmlFor="Name"
                      >
                        Nhập mô tả
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center text-center"></div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button variant="primary" disabled={isLoading} type="submit">
            Định giá
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EvaluateCustomerPage;
