import { z } from "zod";
import { createNoteSchema, createTodoSchema } from "./schemas";
import { Todo, Note } from "@prisma/client";

export type CreateTodoRequest = z.infer<typeof createTodoSchema>;
export type CreateNoteRequest = z.infer<typeof createNoteSchema>;

export type TodoResponse = Todo & {
  notes: Note[];
};

export type NodeResponse = Note;
