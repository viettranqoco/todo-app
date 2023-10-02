"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { CreateTodoRequest } from "./types";
import { createTodoSchema } from "./schemas";

export async function createTodoAction(data: CreateTodoRequest): Promise<any> {
  try {
    // validate in server side
    const validate = createTodoSchema.safeParse(data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    console.log("data", data);
    await prisma.todo.create({
      data,
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
