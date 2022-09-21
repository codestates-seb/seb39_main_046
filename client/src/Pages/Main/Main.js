import React from "react";
import Banner from "../../Components/common/Banner";
import BestProdct from "../../Components/BestProduct/BestProdct";
import RecomendProduct from "../../Components/BestProduct/RecomendProduct";
import BestReview from "../../Components/BestProduct/BestReview";

const Main = () => {
  return (
    <div>
      <Banner />
      <BestProdct />
      <RecomendProduct />
      <BestReview />
      {/* <NearStore/> */}
    </div>
  );
};

export default Main;
