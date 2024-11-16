import { InputAdornment, IconButton, Input } from "@mui/material";
import { Search } from "@mui/icons-material";
import React, { FC } from "react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

const SearchBox: FC<Props> = ({ search, setSearch }) => {
  return (
    <div className="flex justify-center mt-8 mb-4">
      <div className="relative w-full sm:max-w-md max-w-lg mx-9">
        <Input
          placeholder="Search"
          className="w-full sm:w-64 md:w-full py-3 px-4 rounded-lg border-2 !border-gray-300 focus:border-blue-500 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
    </div>
  );
};

export default SearchBox;
