"use client";

import { useConvexAuth } from "convex/react";

import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Spinner } from "@/components/spinner";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents & Plans, blah blah etc. Welcome to{" "}
        <span className="underline">BossNote</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
      BossNote is the best workspace where <br />
        u can just fuck yourself.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents" className="flex items-center">
            Enter BossNote <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>Join for free</Button>
        </SignInButton>
      )}
    </div>
  );
};
