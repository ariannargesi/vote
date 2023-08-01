import {create} from 'zustand'
import { persist } from 'zustand/middleware'

interface GlobalState {
    feedLocation: string | null 
}

export const useBoundStore = create(
    persist<GlobalState>(
      (set, get) => ({
        feedLocation: null,
        updateFeedLocation: (value: string) => set({ feedLocation: value }),
      }),
      {
        name: 'global',
        partialize: state => ({ feedLocation: state.feedLocation }),
      }
    )
  )