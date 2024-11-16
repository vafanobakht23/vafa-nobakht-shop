"use client";
import { fetchData } from "@/api/useApi";
import { Products } from "@/types/product";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import SearchBox from "./Search";
import { PRODUCTS_API } from "@/api/routes";
import NoProductsFound from "@/components/NoProductFound";
import Loading from "./Loading";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { useRouter } from "next/navigation";
import { HOME } from "@/app/setting/routes";
import { Button } from "@mui/material";

const Home = () => {
  const [posts, setPosts] = useState<Products[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9); // Number of posts per page
  const { push } = useRouter();

  useEffect(() => {
    const initPosts = async () => {
      setLoading(true);
      try {
        const res = await fetchData(PRODUCTS_API);
        setPosts(res.products);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    initPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }
    if (filteredPosts.length === 0) {
      return <NoProductsFound setSearch={setSearch} />;
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-10 gap-x-20 gap-y-4 mb-10">
          {currentPosts.map((post) => (
            <div key={post.id} className="col-span-1">
              <Cards post={post} />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8 mb-8">
          <Button
            className="px-5 py-2 mx-2 !bg-gray-400 !text-gray-900 !rounded-md disabled:!bg-gray-200"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="flex items-center justify-center px-4 py-2 mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            className="px-5 py-2 mx-2 !bg-gray-400 !text-gray-900 !rounded-md disabled:!bg-gray-200"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      <header className="grid sm:grid-cols-3 grid-cols-1">
        <Image
          src={logo}
          alt="logo"
          className="!w-20 !h-20 rounded-full ml-8 mr-6 mt-4 hover:cursor-pointer"
          onClick={() => push(HOME)}
        />
        <SearchBox setSearch={setSearch} search={search} />
      </header>
      {renderContent()}
    </>
  );
};

export default Home;
