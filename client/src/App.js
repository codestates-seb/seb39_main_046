import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Main from "./Pages/Main/Main";
import FindStore from "./Pages/FindStore/FindStore";
import FootTestLayout from "./Pages/FoodTest/FootTestLayout";
import FoodTestHome from "./Pages/FoodTest/Contents/FoodTestHome";
import FoodTestQuestion from "./Pages/FoodTest/Contents/FoodTestQuestion";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />}></Route>
          <Route path="/findstore" element={<FindStore />}></Route>
          <Route path="/foodtest" element={<FootTestLayout />}>
            <Route index element={<FoodTestHome />}></Route>
            <Route path="question" element={<FoodTestQuestion />}></Route>
          </Route>
          <Route path="*" element={<div>NotFound</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
