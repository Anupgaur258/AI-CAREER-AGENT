export const runtime = "nodejs"; // Needed for Buffer to work

import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { NextRequest } from "next/server";
import { Buffer } from "buffer";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get("resumeFile");
    const recordId = formData.get("recordId")?.toString() || "";

    if (!(resumeFile instanceof File)) {
      return new Response("Invalid file", { status: 400 });
    }

    const arrayBuffer = await resumeFile.arrayBuffer();
    const loader = new WebPDFLoader(new Uint8Array(arrayBuffer));
    const docs = await loader.load();

    console.log("Extracted PDF text:", docs[0]?.pageContent);

    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return new Response(
      JSON.stringify({ success: true, recordId, base64 }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response("Server Error", { status: 500 });
  }
}
