import { Route, Routes } from "react-router-dom";
import Layout from "./Components/layout/Layout";
import Main from "./Pages/Main/Main";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
