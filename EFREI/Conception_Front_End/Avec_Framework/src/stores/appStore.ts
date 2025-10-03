import { create } from 'zustand';

interface AppState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  currentFilter: 'all' | 'completed' | 'pending';
  setCurrentFilter: (filter: 'all' | 'completed' | 'pending') => void;

  error: string | null;
  setError: (error: string | null) => void;
  success: string | null;
  setSuccess: (success: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  currentFilter: 'all',
  setCurrentFilter: (filter) => set({ currentFilter: filter }),

  error: null,
  setError: (error) => set({ error }),
  success: null,
  setSuccess: (success) => set({ success }),
}));
