import create from "zustand";

const useStore = create((set) => ({
  logInfo: sessionStorage.getItem("token"),
  isMainTab: "전체 편의점",
  setMainTab(index) {
    set((state) => ({ isMainTab: index }));
  },
  isStoreTab: "전체 편의점",
  setStoreTab(index) {
    set((state) => ({ isStoreTab: index }));
  },
  isCategoryTab: 0,
  setCategoryTab(index) {
    set((state) => ({ isCategoryTab: index }));
  },
  isCurrentPage: 1,
  isSortNum: 1,
  isDetail: 201,
}));

export default useStore;
