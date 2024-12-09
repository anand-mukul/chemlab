"use client";
import { FlaskConical } from "lucide-react";
import Link from "next/link";
import SaveStatus from "./saveStatus";
import WorkspaceNameInput from "./WorkspaceNameInput";
import { useAuth } from "@/contexts/authContext";

export default function Header() {
  const { user } = useAuth();
  return (
      <div className="container flex items-center justify-between gap-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="ml-2 flex items-center justify-center h-9"
          >
            <FlaskConical className="mr-2" size={24} /> ChemLAB
          </Link>

          {/* Filename */}
          <div className="px-3 flex items-center">
            <WorkspaceNameInput workspaceId="" />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* File status */}
          <div className="h-9 px-3 flex items-center rounded-lg text-sm">
            <SaveStatus />
          </div>
        </div>
      </div>
  );
}
