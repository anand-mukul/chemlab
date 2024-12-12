"use client";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useEffect, useState } from "react";

const chemistryNames = [
  "Molecule Lab",
  "Atomic Haven",
  "Quantum Workspace",
  "Isotope Hub",
  "Catalyst Zone",
  "Reaction Room",
  "Electron Cloud",
  "Proton Studio",
  "Neutron Nexus",
  "Chemical Bond",
];

const getRandomChemistryName = () => {
  return chemistryNames[Math.floor(Math.random() * chemistryNames.length)];
};

const WorkspaceNameInput = ({ workspaceId }: { workspaceId: string }) => {
  const [workspaceName, setWorkspaceName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadWorkspaceName = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workspace/${workspaceId}`);
        setWorkspaceName(response.data.workspace.name);
      } catch (error) {
        console.log(
          "No existing workspace name found. Generating a random one.",
          error
        );
        setWorkspaceName(getRandomChemistryName());
      } finally {
        setLoading(false);
      }
    };

    loadWorkspaceName();
  }, [workspaceId]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceName(event.target.value);
  };

  const saveWorkspaceName = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/workspace`, {
        id: workspaceId,
        name: workspaceName,
      });
      console.log("Workspace name saved successfully");
    } catch (error) {
      console.error("Failed to save workspace name", error);
    }
  };

  if (loading) return <p>Loading workspace...</p>;

  return (
    <div>
      <Input
        className="text-sm border-none"
        value={workspaceName}
        onChange={handleNameChange}
        onBlur={saveWorkspaceName}
      />
    </div>
  );
};

export default WorkspaceNameInput;
