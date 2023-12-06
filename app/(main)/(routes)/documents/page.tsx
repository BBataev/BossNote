"use client";

import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const DocumentPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const onCreate = () => {
    const promise = create({
      title: "Untitled",
    }).then((documentId) => router.push(`/documents/${documentId}`))

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create new note",
    })
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.svg"
        height="200"
        width="200"
        alt="empty"
        className="dark:hidden"
      />
      <Image
        src="/emptyDark.svg"
        height="200"
        width="200"
        alt="empty"
        className="hidden dark:block "
      />
      <h2 className="font-medium text-xl">
        {user?.firstName}, welcome to your BossNote
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Creact a note
      </Button>
    </div>
  );
};

export default DocumentPage;
