"use client";
import { HOME } from "@/app/setting/routes";
import { Products } from "@/types/product";
import { usePost } from "@/zustand/store";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

type Props = {
  post: Products;
};

const Cards: FC<Props> = ({ post }) => {
  const [hovered, setHovered] = useState(false);
  const { push } = useRouter();
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  const savePost = usePost((state) => state.savePost);

  return (
    <Card
      className={`mt-4 transition-all duration-500 transform ${
        hovered ? "scale-105 shadow-2xl" : "shadow-lg"
      } hover:cursor-pointer hover:scale-105 hover:shadow-2xl`}
      title={post.title}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        push(`${HOME}${post.id}`);
        savePost(post);
      }}
    >
      <CardMedia
        component="img"
        className="h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
        image={post.images[0]}
        alt={post.title}
      />
      <CardContent>
        <Tooltip title={post.title} arrow>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="text-ellipsis overflow-hidden whitespace-nowrap transition-opacity duration-500 ease-in-out"
          >
            {post.title.length > 25
              ? `${post.title.substring(0, 25)}...`
              : post.title}
          </Typography>
        </Tooltip>
        <Typography
          variant="body2"
          color="text.secondary"
          className="flex gap-x-3"
        >
          <span className="font-semibold text-lg">Price:</span>
          <span className="text-base opacity-50">{`${post.price}$`}</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Cards;
