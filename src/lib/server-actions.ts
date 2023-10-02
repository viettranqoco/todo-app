"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { CreateNoteRequest, CreateTodoRequest, TodoResponse } from "./types";
import { createNoteSchema, createTodoSchema } from "./schemas";
import { ZodError } from "zod";

// TODOS
export async function createTodoAction(data: CreateTodoRequest): Promise<any> {
  try {
    // validate in server side
    const validate = createTodoSchema.safeParse(data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }

    await prisma.todo.create({
      data,
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

export async function getTodosAction(): Promise<TodoResponse[]> {
  try {
    const todos: TodoResponse[] = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        notes: true,
      },
    });

    return todos;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

export async function deleteTodoAction(id: string): Promise<void> {
  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}

export async function toggleCompleteTodoAction(
  id: string,
  isDone: boolean
): Promise<void> {
  try {
    await prisma.todo.update({
      where: {
        id,
      },
      data: {
        isDone,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

// NOTES
export async function createNoteAction(data: CreateNoteRequest): Promise<void> {
  try {
    // validate in server side
    const validate = createNoteSchema.safeParse(data);

    if (!validate.success) {
      throw new Error(validate.error.message);
    }

    const todo = await prisma.todo.findUnique({
      where: {
        id: data.todoId,
      },
    });

    if (!todo) {
      throw new Error("Todo not found");
    }

    await prisma.note.create({
      data,
    });
    revalidatePath("/");
  } catch (error) {
    return Promise.reject(error);
  }
}
