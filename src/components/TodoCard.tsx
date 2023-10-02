"use client";

import { TodoResponse } from "@/lib/types";
import React, { useTransition } from "react";
import { Card } from "./ui/card";
import { format } from "date-fns";
import { Checkbox } from "./ui/checkbox";
import { Loader2, MessageCircle, Trash } from "lucide-react";
import {
  deleteTodoAction,
  toggleCompleteTodoAction,
} from "@/lib/server-actions";
import toast from "react-hot-toast";
import AddNoteForm from "./AddNoteForm";

type Props = {
  todo: TodoResponse;
};

export default function TodoCard({ todo }: Props) {
  const [pending, startTransition] = useTransition();

  function handleToggleCompleteTodo() {
    startTransition(async () => {
      try {
        await toggleCompleteTodoAction(todo.id, !todo.isDone);
        toast.success("Update todo success");
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  }

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
    <Card
      className={`flex items-center px-4 py-1 ${
        todo.isDone ? "bg-accent" : ""
      }`}
    >
      {pending ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Checkbox
          checked={todo.isDone}
          onClick={handleToggleCompleteTodo}
          className="w-5 h-5"
        />
      )}

      <div className="py-1 px-4 flex-1">
        <p className={`${todo.isDone ? "line-through" : ""} `}>{todo.todo}</p>
        <p className="text-gray-500 text-xs">
          {format(todo.updatedAt, "dd/MM/yyyy hh:mm")}
        </p>
      </div>

      <div className="flex gap-2">
        <AddNoteForm todoId={todo.id} />
        {pending ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin text-destructive" />
        ) : (
          <Trash
            className="h-5 w-5 mr-2 text-destructive hover:cursor-pointer"
            onClick={handleDeleteTodo}
          />
        )}
      </div>
    </Card>
  );
}
