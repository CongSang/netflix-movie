import create from 'zustand'

export const useStore = create((set) => ({
  currentUser: undefined,
  favoriteList: [],
  loading: false,
  setCurrentUser: (newUser) =>
    set({
      currentUser: newUser,
    }),
  setFavoriteList: (newList) =>
    set({
      favoriteList: newList,
    }),
  setLoading: (newStatus) => set({ loading: newStatus }),
}));