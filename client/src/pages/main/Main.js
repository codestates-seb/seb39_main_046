import React from "react";
import Banner from "../../components/common/Banner";
import BestProdct from "../../components/bestProduct/BestProdct";
import RecomendProduct from "../../components/bestProduct/RecomendProduct";
import BestReview from "../../components/bestProduct/BestReview";

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
