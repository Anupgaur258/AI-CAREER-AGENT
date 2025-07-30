import { NextRequest } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const resumeFile: any = formData.get("resumeFile");
  const recordId = formData.get("recordId");

  const loader = new WebPDFLoader(resumeFile); // ✅ fixed here
  const docs = await loader.load();

  console.log(docs[0]); // raw pdf text

  const arrayBuffer = await resumeFile.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  console.log(base64); // 🔥 base64 of the PDF
  return new Response("Success", { status: 200 });
}
