import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  {
    id: "hello-world-function",
    name: "Hello World Function",
  },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "3s");
 
    return {
      message: `Hello ${event.data.name || "World"}`,
    };
  }
);
