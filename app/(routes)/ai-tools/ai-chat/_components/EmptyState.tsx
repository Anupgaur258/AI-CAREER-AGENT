import React from "react";
import Image from "next/image";

// Correct: Array of questions
const questionList = [
  "What skills do I need for a Next.js developer role?",
  "How do I switch careers to UX design?"
];

const EmptyState = ({selectedQuestion}: any) => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-400 mt-10">
      <Image src="/idea.png" alt="Idea Bulb" width={60} height={60} />
      <h3 className="mt-3 font-semibold text-lg text-gray-500">
        Start a New Conversation
      </h3>
      <p className="text-sm">
        Ask AI anything related to your career, roadmap, or resume.
      </p>

      {/* Suggestions */}
      {questionList.map((question, index) => (
        <h2
              key={index}
              onClick={()=>selectedQuestion(question)}
          className="p-4 text-center border rounded-xl my-3 hover:border-orange-500 cursor-pointer transition"
        >
          {question}
        </h2>
      ))}
    </div>
  );
};

export default EmptyState;
