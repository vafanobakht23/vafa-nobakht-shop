import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import NoProduct from "@/assets/images/no-data.svg";
import Image from "next/image";

type Props = {
  setSearch: (search: string) => void;
};

const NoProductsFound: FC<Props> = ({ setSearch }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-6 max-w-md w-full">
        <Image src={NoProduct} alt="No product" />
        <Typography
          variant="h4"
          component="h1"
          className="text-gray-700 font-semibold"
        >
          No Products Found
        </Typography>
        <Typography variant="body1" className="text-gray-500">
          Sorry, we couldnt find any products that match your search. Please try
          again with a different search term.
        </Typography>
        <Button
          color="primary"
          size="large"
          className="w-full sm:w-auto !bg-blue-500 !text-white"
          onClick={() => setSearch("")}
        >
          Clear Search
        </Button>
      </div>
    </div>
  );
};

export default NoProductsFound;
