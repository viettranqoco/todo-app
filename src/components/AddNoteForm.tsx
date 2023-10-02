"use client";

import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2, MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { CreateNoteRequest } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNoteSchema } from "@/lib/schemas";
import { Input } from "./ui/input";

type Props = {
  todoId: string;
};

export default function AddNoteForm({ todoId }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<CreateNoteRequest>({
    mode: "onBlur",
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      note: "",
      todoId,
    },
  });

  function onSubmit(data: CreateNoteRequest) {
    startTransition(async () => {
      try {
        console.log("submit", data);
        // await createTodoAction(data);

        // toast.success("Add todo success");
        // form.reset();
      } catch (error) {
        // toast.error("Something went wrong");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <MessageCircle className="h-5 w-5 mr-2 text-gray-500 hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add note </DialogTitle>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Note */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Type your note here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <DialogFooter className="!space-x-4">
              <Button
                variant={"secondary"}
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button variant={"default"} disabled={pending}>
                {pending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
