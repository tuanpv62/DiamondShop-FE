"use client";
import axios from "axios";
import React, { useEffect } from "react";

const AuctionList = () => {
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:5000/api/v1/auctions"
          "https://diamondshopapi.azurewebsites.net/api/v1/auctions"
        );
        console.log(response.data.message);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div>
      <h1>Auction List</h1>
    </div>
  );
};

export default AuctionList;
