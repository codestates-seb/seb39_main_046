import create from "zustand";

const useStore = create((set) => ({
  currentTab: 0,
  setcurrentTab(index) {
    set((state) => ({ currentTab: index }));
  },
  productsTab: 0,
  setProductsTab(index) {
    set((state) => ({ productsCurrentTab: index }));
  },
  categoryTab: 0,
  setCategoryTab(index) {
    set((state) => ({ categoryTab: index }));
  },
}));

export default useStore;
