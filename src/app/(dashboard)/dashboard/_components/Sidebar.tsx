"use client";
import React from "react";
import { Navbar } from "./Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";
import { useAuth } from "@/contexts/authContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div>
      <aside className="w-64 p-6 border-r hidden md:block">
        <div className="flex items-center gap-2 font-semibold text-lg mb-6">
          <div className="w-8 h-8 rounded-full bg-primary">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.avatar} alt={user?.username} />
              <AvatarFallback>
                <User2 className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
          {user?.fullName}
        </div>
        <Navbar />
      </aside>
    </div>
  );
};

export default Sidebar;
