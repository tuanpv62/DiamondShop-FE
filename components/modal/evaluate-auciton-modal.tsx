"use client";

import * as React from "react";
import { useSession } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { updateEvaluate } from "@/lib/actions";

export const ViewEvaluateModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { data: session } = useSession();
  const isOpenModal = isOpen && type === "evaluateModal";


  const EvaluateSchema = z.object({
    valuation: z.coerce.number(),
    duration: z.coerce.number(),
    depositPrice: z.coerce.number().min(10000, {message: "giá deposit nên lớn hơn 10000Đ"}),
    startPrice: z.coerce.number(),
  });

  
  const form = useForm<z.infer<typeof EvaluateSchema>>({
    resolver: zodResolver(EvaluateSchema),
    defaultValues: {
      valuation: 0,
      duration: 0,
      depositPrice: 0,
      startPrice: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof EvaluateSchema>) => {
    // todo

    React.startTransition(() => {
      toast.promise(
        updateEvaluate({
          id: data.auction?.auctionId,

          values: values,
        }),
        {
          loading: "Update...",
          success: () => "Auction update successfully.",
          error: () => "Dellete error",
        }
      );
    });

    form.reset();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isLoading = form.formState.isLoading;

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span>Định giá sản phẩm </span>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid  space-y-4">
       
              <FormField
                control={form.control}
                name="depositPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                      Nhập giá gửi
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-bgray-800 text-base border focus-visible:ring-0  focus-visible:ring-offset-0 border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                        placeholder="Nhập depositPrice"
                        disabled={isLoading}
                        {...field}
                        type="number"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                      Nhập khoảng thời gian
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-bgray-800 text-base border focus-visible:ring-0  focus-visible:ring-offset-0 border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                        placeholder="Nhập duration"
                        disabled={isLoading}
                        {...field}
                        type="number"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                      Nhập giá bắt đầu
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-bgray-800 text-base border focus-visible:ring-0  focus-visible:ring-offset-0 border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                        placeholder="Nhập startPrice"
                        disabled={isLoading}
                        {...field}
                        type="number"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="valuation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                      Nhập định giá
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-bgray-800 text-base border focus-visible:ring-0  focus-visible:ring-offset-0 border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                        placeholder="Nhập valuation"
                        disabled={isLoading}
                        {...field}
                        type="number"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button type="button" variant="primary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            Xác nhận
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
