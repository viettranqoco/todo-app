import { NodeResponse } from "@/lib/types";
import { format } from "date-fns";
import React from "react";

type Props = {
  notes: NodeResponse[];
};

export default function NoteList({ notes }: Props) {
  if (notes.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 border-t py-4">
      {notes.map((note) => (
        <p key={note.id} className="text-[14px]">
          -{" "}
          <span className="text-gray-500 text-[13px]">
            [{format(note.createdAt, "dd/MM/yyyy hh:mm")}]
          </span>
          : {note.note}
        </p>
      ))}
    </div>
  );
}
