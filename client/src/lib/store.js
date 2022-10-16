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
    isCategoryTab: 100,
    setCategoryTab(index) {
        set((state) => ({ isCategoryTab: index }));
    },
    isSortNum: 3,
    isCurrentPage: 1,
    isJJimProductsCurrentPage: 1,
    ismyReviewsCurrentPage: 1,
    ismyLikeReives: 1,
    isProductDetail: 1,
    isTestNum: 0,
    isKeyword: "",
    setKeyword(index) {
        set((state) => ({ isKeyword: index }));
    },
    isSerchItem: {},
    isCategoryPage: 1,
    oqmgp: sessionStorage.getItem("oqmgp"),
}));

export default useStore;