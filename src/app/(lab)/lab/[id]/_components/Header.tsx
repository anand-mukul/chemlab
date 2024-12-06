"use client";
import { FlaskConical, User2 } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SaveStatus from "./saveStatus";
import WorkspaceNameInput from "./WorkspaceNameInput";
import { useAuth } from "@/contexts/authContext";

export default function Header() {
  const { user } = useAuth();
  return (
    <header className="pb-1 top-0 z-50 w-full bg-black/95">
      <div className="p-1 container h-[5vh] flex items-center justify-between gap-4 bg-black/95">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="ml-2 flex items-center justify-center h-9 rounded-lg"
          >
            <FlaskConical className="mr-2" size={24} /> ChemLAB
          </Link>

          {/* Filename */}
          <div className="h-9 px-3 flex items-center rounded-lg">
            <WorkspaceNameInput workspaceId="" />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* File status */}
          <div className="h-9 px-3 flex items-center rounded-lg text-sm">
            <SaveStatus />
          </div>

          {/* User avatar */}
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.avatar} alt={user?.username} />
            <AvatarFallback>
              <User2 className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
