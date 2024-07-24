// UI ĐỊNH GIÁ SẢN PHẨM TỪ CUSTOMER

"use client";

import * as React from "react";

import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
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
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../image-cloudinary-upload/image-upload";
import { createProductV2 } from "@/lib/v2/actions-v2";

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

export const EstimateProductModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();
  const { data: session } = useSession();
  const isOpenModal = isOpen && type === "estimateProduct";

  const [isApiLoading, setIsApiLoading] = useState(false);

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
    setIsApiLoading(true);

    try {
      await createProductV2(value);
      toast.success("Đăng kí định giá thành công");
      onClose();
    } catch (error) {
      toast.error("Định giá thất bại");
      console.error(error);
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent
        className="bg-white text-black p-0 max-w-[800px] "
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Hãy nhập sản phẩm đấu giá của bạn
          </DialogTitle>
          <DialogDescription className="text-zinc-500 text-center">
            Hãy cung cấp thông tin chi tiết về sản phẩm đấu giá của bạn. Đây là
            cơ hội biến đồ cũ thành tiền!
          </DialogDescription>
        </DialogHeader>
        {/* form  */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="px-6 flex">
              <div className="w-1/3 pr-4 space-y-8">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Tên sản phẩm
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="text"
                          className="bg-zinc-300/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Nhập tên sản phẩm"
                          {...field}
                        />
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
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Tên tiêu đề buổi đấu giá
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="text"
                          className="bg-zinc-300/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Tên tiêu đề buổi đấu giá"
                          {...field}
                        />
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
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Số lượng
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="number"
                          className="bg-zinc-300/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Nhập số lượng"
                          {...field}
                        />
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
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Nhập mô tả
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          className="bg-zinc-300/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Nhập mô tả..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center items-center text-center"></div>
              </div>
            </div>
            <DialogFooter className="bg-gray-100 py-6 px-4">
              <Button variant="primary" disabled={isLoading} type="submit">
                Định giá
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
