"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTodoSchema } from "@/lib/schemas";
import { CreateTodoRequest } from "@/lib/types";
import { Loader2, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { createTodoAction } from "@/lib/server-actions";
import toast from "react-hot-toast";

export default function AddTodoForm() {
  const [pending, startTransition] = useTransition();

  const form = useForm<CreateTodoRequest>({
    mode: "onBlur",
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      todo: "",
    },
  });

  async function onSubmit(data: CreateTodoRequest) {
    startTransition(async () => {
      try {
        console.log("submit", data);
        await createTodoAction(data);

        toast.success("Add todo success");
        form.reset();
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new Todo</CardTitle>
        <CardDescription>Get ready for a new feeling</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="todo"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Type what you want todo..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={!form.formState.isValid || pending}>
                {pending ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <PlusCircle size={18} className="mr-2" />
                )}
                <span>Add</span>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
