"use client";

import React from "react";

import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";

import { useQuery, useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

import { toast } from "sonner";
import { Spinner } from "@/components/spinner";
import { Search, Trash, Undo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";

export const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = React.useState("");

  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();

    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note Restored!",
      error: "Failed to restore note.",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }

    if (documents === undefined) {
      return (
        <div className="h-full flex items-center justify-center p-4">
          <Spinner size="lg" />
        </div>
      );
    }
  };

  const deleteOne = (documentId: Id<"documents">) => {
    remove({ id: documentId });

    if (params.documentId === documentId) {
      router.push("/documents");
    }

    if (documents === undefined) {
      return (
        <div className="h-full flex items-center justify-center p-4">
          <Spinner size="lg" />
        </div>
      );
    }
  };

  const deleteAll = () => {
    documents?.map((document) => {
      deleteOne(document._id);
    });

    toast.success("All elements deleted!");
  };

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="px-1 pb-1">
        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                className="rounded-sm p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                role="button"
                onClick={(e) => onRestore(e, document._id)}
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  className="rounded-sm p-2 hover:bg-neutral-300  dark:hover:bg-neutral-600"
                  role="button"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
        {(documents?.length === 0 || documents?.length === undefined) ? (
          <p className="text-xs text-center text-muted-foreground p-2">
            There is no deleted documents.
          </p>
        ) : (
          <div className="flex gap-x-4">
            <ConfirmModal onConfirm={deleteAll}>
              <Button
                className="text-xs px-2 h-7 text-muted-foreground"
                variant="ghost"
              >
                Delete all
              </Button>
            </ConfirmModal>
          </div>
        )}
      </div>
    </div>
  );
};
