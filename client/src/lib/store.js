import create from 'zustand'

const useStore = create((set) => ({
    logInfo: sessionStorage.getItem('token'),
}));

export default useStore;