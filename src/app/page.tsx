import AddTodoForm from "@/components/AddTodoForm";
import TodoList from "@/components/TodoList";
import { Button } from "@/components/ui/button";
import { getTodosAction } from "@/lib/server-actions";
import Image from "next/image";

export default async function Home() {
  const todos = await getTodosAction();

  return (
    <main className="max-w-4xl mx-auto shadow min-h-screen p-4">
      <AddTodoForm />
      <TodoList todos={todos} />
    </main>
  );
}
