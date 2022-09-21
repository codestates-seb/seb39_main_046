import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/layout/Layout";
import Main from "./Pages/Main/Main";
import FindStore from "./Pages/FindStore/FindStore";
import FootTest from "./Pages/FoodTest/FootTest";
import FoodTestHome from "./Components/foodTest/FoodTestHome";
import FoodTestQuestion from "./Components/foodTest/FoodTestQuestion";
import FoodTestResult from "./Components/foodTest/FoodTestResult";
import Loading from "./Components/common/Loading";

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
          <Route path="*" element={<div>NotFound</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
