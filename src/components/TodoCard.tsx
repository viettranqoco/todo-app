import { TodoResponse } from "@/lib/types";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

type Props = {
  todo: TodoResponse;
};

export default function TodoCard({ todo }: Props) {
  return (
    <Card className="flex items-center px-4 py-1">
      <div>
        <Checkbox checked={todo.isDone} />
      </div>
      <div className="py-1 px-4 flex-1">
        <p>{todo.todo}</p>
        <p className="text-gray-500 text-xs">
          {format(todo.updatedAt, "dd/MM/yyyy hh:mm")}
        </p>
      </div>

      <Trash className="h-4 w-4 mr-2 text-destructive hover:cursor-pointer" />
    </Card>
  );
}
