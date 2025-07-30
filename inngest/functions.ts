import { Description } from "@radix-ui/react-dialog";
import { inngest } from "./client";
import { openai, createAgent, anthropic } from "@inngest/agent-kit"; // Fixed openai import
import { gemini } from "inngest";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const AiCareerChatAgent = createAgent({
  name: "AiCareerChatAgent",
  description: "An Ai Agent that answers career related question", // Fixed in previous response
  system: `You are a helpful and professional AI Career Coach Agent. Your role is to assist users with career-related questions, including job search strategies, interview preparation, resume optimization, skill development, career transitions, and understanding industry trends.

Always respond with clarity, encouragement, and practical, actionable advice tailored to the user's needs.

If the user asks something unrelated to careers (such as health, relationships, coding help, or general trivia), kindly remind them that you are a career coach and encourage them to ask career-focused questions instead.`,
  model: gemini({
    model: "gpt-4o-mini", // Changed to OpenAI-compatible model
    apiKey: process.env.OPENAI_API_KEY, // Changed to OpenAI API key
  }),
});

export const AiCareerAgent = inngest.createFunction(
  { id: "AiCareerAgent" },
  { event: "AiCareerAgent" },
  async ({ event, step }) => {
    const userInput = event.data.query; // Assuming query is in event.data
    const result = await AiCareerChatAgent.run(userInput);

    return result;
  },
);