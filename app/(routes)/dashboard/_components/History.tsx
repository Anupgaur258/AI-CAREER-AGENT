"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
const History = () => {
  const [userHistory, setUserHistory] = useState<string[]>([]); // Optional: add type

  return (
    <div className="mt-5 p-4 border rounded-xl flex items-center justify-center">
      <h2 className="font-bold text-lg">Previous History</h2>
      <p>What you previously worked on, you can find here.</p>

      {userHistory.length === 0 && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 flex-col ">
          <Image src="/idea.png" alt="bulb" width={50} height={50} />
                  <p>No history yet!</p>
                   <Button> Explore AI Tools</Button>
        </div>
      )}      
    </div>
  );
};

export default History;
