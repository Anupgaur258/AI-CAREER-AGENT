'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const History = () => {
  const [userHistory, setUserHistory] = useState<any[]>([]);
  const { user } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const token = await getToken();
      const response = await axios.get('/api/history', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  };

  const handleExplore = () => {
    router.push('/dashboard');
  };

  return (
    <div className="mt-5 p-4 border rounded-xl flex flex-col items-center justify-center">
      <h2 className="font-bold text-lg">Previous History</h2>
      <p>What you previously worked on, you can find here.</p>

      {userHistory.length === 0 ? (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 flex-col">
          <Image src="/idea.png" alt="bulb" width={50} height={50} />
          <p>No history yet!</p>
          <Button onClick={handleExplore}>Explore AI Tools</Button>
        </div>
      ) : (
        <div className="mt-4 w-full">
          {userHistory.map((item) => (
            <div key={item.id} className="p-2 border-b">
              <p>Record ID: {item.recordId}</p>
              <p>Content: {JSON.stringify(item.content)}</p>
              <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;