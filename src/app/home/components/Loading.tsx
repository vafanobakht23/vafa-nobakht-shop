import Image from "next/image";
import React from "react";
import loading from "@/assets/gif/loading-gif.gif";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Image src={loading} alt="Loading" className="!m-auto !w-28 !h-28" />
    </div>
  );
};

export default Loading;
