"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import EmptyState from "./_components/EmptyState";
import { useState } from "react";

const Page = () => {
  const [userInput, setUserInput] = useState<string>("");

  // Function to handle suggestion click
  const handleSelectQuestion = (question: string) => {
    setUserInput(question);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-orange-600">AI Career Chat</h2>
          <p className="text-sm text-gray-600 mt-1 max-w-xl">
            Smart career decisions start here – get tailored advice, real-time market insights,
            and a roadmap built just for you with the power of AI.
          </p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white">
          + New Chat
        </Button>
      </div>

      {/* Chat Container */}
      <div className="flex flex-col justify-between h-[75vh] p-4 border rounded-xl bg-white shadow-sm">
        
        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center">
          <EmptyState selectedQuestion={handleSelectQuestion} />
        </div>

        {/* Input Field */}
        <div className="flex items-center gap-3 border-t pt-3">
          <Input 
            placeholder="Type your message here..." 
            value={userInput} 
            onChange={(event) => setUserInput(event.target.value)} 
            className="flex-1" 
          />
          <button className="p-2 bg-orange-600 text-white rounded hover:bg-orange-700">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
