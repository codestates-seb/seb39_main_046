import React from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "./components/layout/Layout";
import Main from "./pages/main/Main";
import FindStore from "./pages/findStore/FindStore";
import FootTest from "./pages/foodTest/FootTest";
import FoodTestHome from "./components/foodTest/FoodTestHome";
import FoodTestQuestion from "./components/foodTest/FoodTestQuestion";
import FoodTestResult from "./components/foodTest/FoodTestResult";
import Login from "./pages/member/LoginPage";
import SingUp from "./pages/member/SingUp";
import Mypage from "./pages/mypage/Mypage";
import DetailProduct from "./pages/detailProducts/DetailProduct";
import Products from "./pages/product/Products";
import ProductBasket from "./pages/mypage/ProductBasket";
import ManagerPage from "./pages/mypage/ManagerPage";
import MProductModal from "./components/manager/MProductModal";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />}></Route>
                    <Route path="/findstore" element={<FindStore />}></Route>
                    <Route path="/foodtest" element={<FootTest />}>
                        <Route index element={<FoodTestHome />}></Route>
                        <Route path="question" element={<FoodTestQuestion />}></Route>
                        <Route path="result" element={<FoodTestResult />}></Route>
                    </Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/singup" element={<SingUp />}></Route>
                    <Route path="/mypage" element={<Mypage />}></Route>
                    <Route path="/productbasket" element={<ProductBasket />}></Route>
                    <Route path="/products" element={<Products />}></Route>
                    <Route path="/product/:id" element={<DetailProduct />}></Route>
                    <Route path="/manager" element={<ManagerPage />}>
                        <Route path=":id" element={<MProductModal />}></Route>
                    </Route>
                    <Route path="*" element={<div>NotFound</div>} />
                </Route>
            </Routes>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
}

export default App;
