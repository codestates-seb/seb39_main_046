import React from "react";
import Banner from "../../Components/Common/Banner";
import BestProdct from "../../Components/BestProduct/BestProdct";
import RecomendProduct from "../../Components/BestProduct/RecomendProduct";
import BestReview from "../../Components/BestProduct/BestReview";
import NearStore from "../../Components/BestProduct/NearStore";
import TextInput from "../../Components/common/TextInput";

const Main = () => {
  return (
    <div>
      <Banner />
      <BestProdct />
      <RecomendProduct />
      <BestReview />
      <TextInput />

      {/* <NearStore/> */}
    </div>
  );
};

export default Main;
