import { inngest } from "@/inngest/client";
import axios from "axios";
import { NextResponse } from "next/server"; // Don't forget this

export async function Post(req: any) {
  const { userInput } = await req.json();

  // Trigger the Inngest function
  const resultIds = await inngest.send({
    name: "AiCareerAgent",
    data: {
      userInput: userInput,
    },
  });

  const runId = resultIds.ids[0];
  let runStatus;

  // Polling until status is Completed
  while (true) {
    runStatus = await getRuns(runId);

    if (runStatus?.data[0]?.status === "Completed") {
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return NextResponse.json(runStatus);
}

// Helper function to fetch the run status
export async function getRuns(runId: string) {
  const url = `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`;

  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
    },
  });

  return result.data;
}
