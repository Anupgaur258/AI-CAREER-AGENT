"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import EmptyState from "./_components/EmptyState";
import { useEffect, useState } from "react";
import axios from "axios";

type Message = {
  content: string;
  role: string;
  type: string;
};

const Page = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState<Message[]>([
    {
      content: "User Msg",
      role: "user",
      type: "text",
    },
    {
      content: "Assistant Msg",
      role: "assistant",
      type: "text",
    },
  ]);

  const onSend = async () => {
    try {
      setLoading(true);
      setMessageList((prev) => [
        ...prev,
        {
          content: userInput,
          role: "user",
          type: "text",
        },
      ]);
      setUserInput("");

      const result = await axios.post("/api/ai-career-chat-agent", {
        userInput: userInput,
      });

      setMessageList((prev) => [...prev, result.data]);
    } catch (error) {
      console.error("Axios Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Save messages to DB (if needed)
  }, [messageList]);

  const handleSelectQuestion = (question: string) => {
    setUserInput(question);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
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

      <div className="flex flex-col justify-between h-[75vh] p-4 border rounded-xl bg-white shadow-sm">
        {messageList?.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState selectedQuestion={handleSelectQuestion} />
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {messageList?.map((message, index) => {
            return (
              <div
                key={index}
                className={`flex mb-2 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs break-words ${
                    message.role === "user"
                      ? "bg-gray-200 text-black"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {loading && index === messageList.length - 1 && message.role === "assistant" ? (
                    <LoaderCircle className="animate-spin w-4 h-4" />
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3 border-t pt-3">
          <Input
            placeholder="Type your message here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-1"
          />
          <button
            onClick={onSend}
            disabled={loading || !userInput.trim()}
            className="p-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
