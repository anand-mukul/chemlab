import { create } from "zustand";

type Item = {
  id: string;
  name: string;
  position: { x: number; y: number };
  icon?: string;
  color?: string;
};

type HistoryState = {
  history: Item[]; // Current state of items
  undoStack: Item[][]; // Stack of previous states
  redoStack: Item[][]; // Stack of undone states
  addHistory: (items: Item[]) => void; // Add a new state to history
  undo: () => void; // Undo the last action
  redo: () => void; // Redo the last undone action
  resetHistory: () => void; // Clear all history
};

export const useHistoryStore = create<HistoryState>((set) => ({
  history: [], // Initial empty state
  undoStack: [],
  redoStack: [],

  // Add a new state to the history
  addHistory: (items) =>
    set((state) => ({
      history: items,
      undoStack: [...state.undoStack, state.history],
      redoStack: [], // Clear redo stack when new action is added
    })),

  // Undo the last action
  undo: () =>
    set((state) => {
      if (state.undoStack.length === 0) return state; // No actions to undo
      const previousState = state.undoStack[state.undoStack.length - 1];
      return {
        history: previousState,
        undoStack: state.undoStack.slice(0, -1),
        redoStack: [state.history, ...state.redoStack],
      };
    }),

  // Redo the last undone action
  redo: () =>
    set((state) => {
      if (state.redoStack.length === 0) return state; // No actions to redo
      const nextState = state.redoStack[0];
      return {
        history: nextState,
        undoStack: [...state.undoStack, state.history],
        redoStack: state.redoStack.slice(1),
      };
    }),

  // Clear all history (e.g., on workspace reset)
  resetHistory: () =>
    set(() => ({
      history: [],
      undoStack: [],
      redoStack: [],
    })),
}));
