"use client";

import { TodoResponse } from "@/lib/types";
import React, { useTransition } from "react";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { Checkbox } from "./ui/checkbox";
import { Loader2, Trash } from "lucide-react";
import {
  deleteTodoAction,
  toggleCompleteTodoAction,
} from "@/lib/server-actions";
import toast from "react-hot-toast";
import AddNoteForm from "./AddNoteForm";
import NoteList from "./NoteList";

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
    <Card className={`${todo.isDone ? "bg-accent" : ""}`}>
      <CardContent className={`flex items-center px-4 py-1 `}>
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
          <p className={`${todo.isDone ? "line-through" : ""} font-medium`}>
            {todo.todo}
          </p>
          <p className="text-gray-500 text-xs">
            {format(todo.updatedAt, "dd/MM/yyyy hh:mm")}
          </p>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <AddNoteForm todoId={todo.id} />
            {todo.notes.length > 0 && (
              <div className="absolute right-0 -top-2 bg-primary text-white w-[18px] h-[18px] flex justify-center items-center p-[2px] rounded-full text-xs">
                {todo.notes.length}
              </div>
            )}
          </div>
          {pending ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-destructive" />
          ) : (
            <Trash
              className="h-5 w-5 mr-2 text-destructive hover:cursor-pointer"
              onClick={handleDeleteTodo}
            />
          )}
        </div>
      </CardContent>

      <div className="px-4 ">
        <NoteList notes={todo.notes} />
      </div>
    </Card>
  );
}
