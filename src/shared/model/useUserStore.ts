import { create } from 'zustand'
import type { User } from "../types/user";


interface StoreUser {
  user: User | null
  coin:number
  setCoin: ( coin: number ) => void
  setUser: ( user: User ) => void
}

export const useStoreUser = create<StoreUser>(set => ({
  user: null,
  setUser: user => set({ user }),
  coin: 0,
  setCoin: ( coin: number ) => set({ coin }),
}))
