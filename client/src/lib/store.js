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
    isCategoryTab: 13,
    setCategoryTab(index) {
        set((state) => ({ isCategoryTab: index }));
    },
    isCurrentPage: 1,
    isJJimProductsCurrentPage: 1,
    ismyReviewsCurrentPage: 1,
    ismyLikeReives: 1,
    isProductDetail: 1,
    isSortNum: 1,
    isTestNum: 0,
    isKeyword: "",
    setKeyword(index) {
        set((state) => ({ isKeyword: index }));
    },
    isSerchItem: {},
    isCategoryPage: 1,
}));

export default useStore;
