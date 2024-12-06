"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useWorkspaceStore } from "@/hooks/workspaceStore";

const SaveStatus = () => {
  const { items } = useWorkspaceStore();
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (status === "saving") return;
      const saveWorkspace = async () => {
        setStatus("saving");
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workspace/save-workspace`, { workspace: items });
          setStatus("saved");
        } catch (error) {
          console.error("Error saving workspace:", error);
          setStatus("error");
        } finally {
          setTimeout(() => setStatus("idle"), 2000);
        }
      };
      saveWorkspace();
    }, 1000); // Debounce duration

    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div className="save-status">
      {status === "saving" && <p>Saving...</p>}
      {status === "saved" && <p>Workspace saved!</p>}
      {status === "error" && <p>Error saving workspace.</p>}
    </div>
  );
};

export default SaveStatus;
