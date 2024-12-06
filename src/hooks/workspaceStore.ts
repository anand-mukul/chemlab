import { create } from "zustand";

type WorkspaceItem = {
  type?: string;
  currentChemicals: never[];
  id: string;
  name: string;
  position: { x: number; y: number };
  size: number;
  color?: string;
  icon?: string;
};

type WorkspaceState = {
  items: WorkspaceItem[];
  setItems: (items: WorkspaceItem[]) => void;
  addItem: (item: WorkspaceItem) => void;
  updateItem: (id: string, updates: Partial<WorkspaceItem>) => void;
  removeItem: (id: string) => void;
  resetWorkspace: () => void;
};

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  items: [],

  // Set the entire items array (required in Workspace component)
  setItems: (items) => set(() => ({ items })),

  // Add a new item to the workspace
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),

  // Update an existing item in the workspace
  updateItem: (id, updates) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),

  // Remove an item from the workspace by ID
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  resetWorkspace: () => set(() => ({ items: [] })),
}));
