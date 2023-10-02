import { TodoResponse } from "@/lib/types";
import React from "react";
import TodoCard from "./TodoCard";

type Props = {
  todos: TodoResponse[];
};

export default function TodoList({ todos }: Props) {
  return (
    <div className="flex flex-col mt-4 gap-4">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
