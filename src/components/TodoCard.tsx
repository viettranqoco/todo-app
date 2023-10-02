"use client";

import { TodoResponse } from "@/lib/types";
import React, { useTransition } from "react";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Loader2, Trash } from "lucide-react";
import { deleteTodoAction } from "@/lib/server-actions";
import toast from "react-hot-toast";

type Props = {
  todo: TodoResponse;
};

export default function TodoCard({ todo }: Props) {
  const [pending, startTransition] = useTransition();

  function handleDeleteTodo() {
    startTransition(async () => {
      try {
        await deleteTodoAction(todo.id);
        toast.success("Delete todo success");
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <Card className="flex items-center px-4 py-1">
      <Checkbox checked={todo.isDone} />

      <div className="py-1 px-4 flex-1">
        <p>{todo.todo}</p>
        <p className="text-gray-500 text-xs">
          {format(todo.updatedAt, "dd/MM/yyyy hh:mm")}
        </p>
      </div>

      {pending ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-destructive" />
      ) : (
        <Trash
          className="h-4 w-4 mr-2 text-destructive hover:cursor-pointer"
          onClick={handleDeleteTodo}
        />
      )}
    </Card>
  );
}
