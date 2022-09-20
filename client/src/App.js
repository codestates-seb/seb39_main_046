import { Route, Routes } from "react-router-dom";
import Layout from './Components/layout/Layout';
import FindStore from "./Pages/FindStore/FindStore";
import Main from "./Pages/Main/Main";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />}></Route>
          <Route path='/findstore' element={<FindStore/>}></Route>
          <Route path="*" element={<div>NotFound</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
