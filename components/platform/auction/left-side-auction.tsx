"use client";

import EmblaCarousel from "@/components/carousel/thumb-carousel";
import React, { useState, useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import ContentLoader from "react-content-loader";

interface LeftSideAuctionProps {
  productId: number;
}

const LeftSideAuction = ({ productId }: LeftSideAuctionProps) => {
  const OPTIONS: EmblaOptionsType = {};

  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState(true);

  // mốt mà có   "productImageIds": null, thì call api mà làm như cũ

  // này ko có hình nên t fake

  // lấy code cũ trên git mà tham khảo

  // Fake product data including image URLs

  const fakeProduct = {
    id: productId,
    name: "Fake Auction Item",
    description: "This is a fake auction item for demonstration purposes.",
    startingPrice: 100,
    currentBid: 150,
    productImages: [
      {
        id: 1,
        image_url:
          "https://plus.unsplash.com/premium_photo-1673931249523-69dcbace086b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3JjaGlkfGVufDB8fDB8fHww",
      },
      {
        id: 2,
        image_url:
          "https://plus.unsplash.com/premium_photo-1673931249523-69dcbace086b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3JjaGlkfGVufDB8fDB8fHww",
      },
      {
        id: 3,
        image_url:
          "https://plus.unsplash.com/premium_photo-1673931249523-69dcbace086b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3JjaGlkfGVufDB8fDB8fHww",
      },
      {
        id: 4,
        image_url:
          "https://plus.unsplash.com/premium_photo-1673931249523-69dcbace086b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3JjaGlkfGVufDB8fDB8fHww",
      },
      {
        id: 5,
        image_url:
          "https://plus.unsplash.com/premium_photo-1673931249523-69dcbace086b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3JjaGlkfGVufDB8fDB8fHww",
      },
    ],
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setProduct(fakeProduct);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [productId]);

  if (loading) {
    return <ContentLoader className="w-full md:w-2/3" />;
  }

  return (
    <div className="w-full lg:w-2/3">
      <EmblaCarousel
        slides={Array.from(Array(product.productImages.length).keys())}
        options={OPTIONS}
        product={product}
      />
    </div>
  );
};

export default LeftSideAuction;
