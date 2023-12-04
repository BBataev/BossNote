"use client";

import { useUser, SignOutButton } from "@clerk/clerk-react";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export const UserItem = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div
          className="flex items-center text-sm p-4 w-full cursor-default"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-7 w-7">
              <AvatarImage className="rounded-full" src={user?.imageUrl} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.fullName}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
        <div role="button" className="absolute bottom-4 left-4 text-sm">
            <SignOutButton>
                Log out
            </SignOutButton>
        </div>
    </DropdownMenu>
  );
};
