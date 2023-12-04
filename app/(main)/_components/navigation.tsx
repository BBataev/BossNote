"use client";

import React from "react";

import { useMediaQuery } from "usehooks-ts";
import { usePathname } from "next/navigation";

import { toast } from "sonner";

import { MenuIcon, ChevronsLeft, PlusCircle, Menu, Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserItem } from "./UserItem";
import { Item } from "./Item";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DocumentList } from "./DocumentList";

const Navigation = () => {
  const pathName = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const create = useMutation(api.documents.create);

  const isResizing = React.useRef(false);
  const sidebar = React.useRef<React.ElementRef<"aside">>(null);
  const navbar = React.useRef<React.ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(isMobile);

  React.useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  React.useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathName, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebar.current && navbar.current) {
      sidebar.current.style.width = `${newWidth}px`;
      navbar.current.style.setProperty("left", `${newWidth}px`);
      navbar.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebar.current && navbar.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebar.current.style.width = isMobile ? "100%" : "240px";
      navbar.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbar.current.style.setProperty("left", isMobile ? "100%" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebar.current && navbar.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebar.current.style.width = "0";
      navbar.current.style.setProperty("width", "100%");
      navbar.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCreate = () => {
    const promise = create({
      title: "Untitled"
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create new note",
    });
  };

  return (
    <>
      <aside
        ref={sidebar}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-500",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          onClick={collapse}
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-4 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <Item label="Search" icon={Search} isSearch onClick={() => {}} />
          <Item label="Settings" icon={Settings} onClick={() => {}} />
          <Item onClick={handleCreate} label="New note" icon={PlusCircle} />
        </div>
        <div className="mt-4">
            <DocumentList />
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbar}
        className={cn(
          "absolute top-0 z-500 left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-trasperent px-3 py-4 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
