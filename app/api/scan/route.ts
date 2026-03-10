import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { v2 as cloudinary } from "cloudinary";
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY as string,
});

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY, 
    api_secret: process.env.CLOUDNARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json(
        { success: false, error: "No image provided" },
        { status: 400 }
      );
    }

    const base64Data = image.split(",")[1];
    const mimeType = image.split(";")[0].split(":")[1];

    const fullBase64Image = `data:${mimeType};base64,${base64Data}`;

    const prompt = `
      You are an expert pharmacist AI. Analyze this medicine packaging.
      Extract the following information and return ONLY a valid JSON object. Do not include markdown formatting like \`\`\`json.
      {
        "name": "The name of the medicine and dosage (e.g., Paracetamol 500mg).",
        "instructions": "Any dosage instructions visible (e.g., Take 1 pill twice a day) strictly return none ("") if no visible instruction. Leave empty string if none. keep it small",
        "warnings": "Any warnings visible (e.g., May cause drowsiness) or very obvious warnings . Leave empty string if none. field length should be one line ",
        "expiryDate": "The expiry date formatted exactly as YYYY-MM-DD. If you only see a month and year (e.g. 11/25), assume the last day of that month (2025-11-30). Leave empty string strictly if confusion or not found."
        "unvalidImage": "if not a valid medical image, return this field true otherwise false"
      }
    `;

    const aiPromise =  genAI.models.generateContent({
      model: "gemini-2.5-flash",

      //force JSON output
      config: {
        responseMimeType: "application/json",
      },

      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data,
              },
            },
          ],
        },
      ],
    });

    const cloudinaryUploadPromise = cloudinary.uploader.upload(fullBase64Image, {
        folder:'digimeds_inventory'
    });

    const [resultAi, resultCloudnary] = await Promise.all([
        aiPromise,
        cloudinaryUploadPromise
    ])

    const extractedData = JSON.parse(resultAi.text ?? "{}");
         extractedData['imageUrl'] = resultCloudnary.secure_url;
    return NextResponse.json(
      { success: true, extractedData},
      { status: 200 }
    );
  } catch (error) {
    console.error("Gemini AI Error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to process image" },
      { status: 500 }
    );
  }
}