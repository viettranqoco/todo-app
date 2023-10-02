import { z } from "zod";

export const createTodoSchema = z.object({
  todo: z
    .string()
    .min(3, "Todo text must be at least 3 characters.")
    .max(100, "Todo text must be less than 100 characters."),
});

export const createNoteSchema = z.object({
  note: z
    .string()
    .min(3, "Note text must be at least 3 characters.")
    .max(100, "Note text must be less than 100 characters."),
  todoId: z.string().length(24),
});
