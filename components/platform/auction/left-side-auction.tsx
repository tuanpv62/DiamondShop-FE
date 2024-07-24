"use client";

import EmblaCarousel from "@/components/carousel/thumb-carousel";
import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import ContentLoader from "react-content-loader";
import { api, axiosAuth } from "@/lib/api-interceptor/api";

interface LeftSideAuctionProps {
  productId: number;
}
const LeftSideAuction = ({ productId }: LeftSideAuctionProps) => {
  const OPTIONS: EmblaOptionsType = {};
  // const SLIDE_COUNT = 10;
  // const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await axiosAuth.get(`/auctions/${productId}`);

        setProduct(res.data.payload);
        console.log("test auction", res.data.payload);
        console.log("test auction", product);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, [productId]);

  if (loading) {
    return <ContentLoader className="w-full md:w-2/3" />;
  }

  return (
    <div className="w-full lg:w-2/3">
      <EmblaCarousel
        slides={Array.from(Array(product.ProductImages.length).keys())}
        options={OPTIONS}
        product={product}
      />
    </div>
  );
};

export default LeftSideAuction;
