import AddTodoForm from "@/components/AddTodoForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto shadow min-h-screen p-4">
      <AddTodoForm />
    </main>
  );
}
