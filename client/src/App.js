import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Main from "./pages/main/Main";
import FindStore from "./pages/findStore/FindStore";
import FootTest from "./pages/foodTest/FootTest";
import FoodTestHome from "./components/foodTest/FoodTestHome";
import FoodTestQuestion from "./components/foodTest/FoodTestQuestion";
import FoodTestResult from "./components/foodTest/FoodTestResult";
import Loading from "./components/common/Loading";
import Login from "./pages/member/LoginPage";
import SingUp from "./pages/member/SingUp";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
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
          <Route path="*" element={<div>NotFound</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
