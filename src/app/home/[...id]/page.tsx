import React from "react";
import dynamic from "next/dynamic";
import Loading from "../components/Loading";

const ProductDescription = dynamic(
  () => import("@/app/home/[...id]/components/ProductDescription"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);
const page = () => {
  return <ProductDescription />;
};

export default page;
