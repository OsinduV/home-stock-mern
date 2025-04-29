import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "node:fs";
import dotenv from "dotenv";
import { errorHandler } from "../utils/error.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

export const ocr = async (req, res, next) => {
  try {
    const imageUrl = req.body.imageUrl;

    if (!imageUrl) {
      return next(errorHandler(400, "Image URL is required"));
    }

    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

    // const model = genAI.getGenerativeModel({
    //   model: "gemini-2.0-flash",
    //   systemInstruction: "when i give you an URL of image, Extract the item name, quantity, and price from this grocery receipt. Return the data as following structure of json\n\n{\n{\n\"item name\": \"<Extracted data>\",\n\"quantity\": <Extracted data in number format>,\n\"price\": <Extracted data in number format>,\n},\n{\n\"item name\": \"<Extracted data>\",\n\"quantity\": <Extracted data in number format>,\n\"price\": <Extracted data in number format>,\n},\n{\n\"item name\": \"<Extracted data>\",\n\"quantity\": <Extracted data in number format>,\n\"price\": <Extracted data in number format>,\n},\n.............\n}",
    // });
    // const generationConfig = {
    //   temperature: 1,
    //   topP: 0.95,
    //   topK: 40,
    //   maxOutputTokens: 8192,
    //   responseMimeType: "text/plain",
    // };

    const prompt =
      `when i give you an URL of image of grocery reciept, Extract the itemname, quantity, and price from this grocery receipt. Return the data as following structure of json.
      {
        {
          "itemname": "<Extracted data>", 
          "quantity": <Extracted data in number format>, 
          "price": <Extracted data in number format>
        },
        {
          "itemname": "<Extracted data>", 
          "quantity": <Extracted data in number format>, 
          "price": <Extracted data in number format>
        },
        {
          "itemname": "<Extracted data>", 
          "quantity": <Extracted data in number format>, 
          "price": <Extracted data in number format>
        },
        .....
      }`;

    // const imageResp = await fetch(imageUrl)
    // .then((response) => response.arrayBuffer());
    const resp = await fetch(imageUrl);

    if (!resp.ok) {
      return next(errorHandler(400, "Failed to fetch image"));
      // throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const mimeType = resp.headers.get('content-type');
    const imageResp = await resp.arrayBuffer();

    if (!mimeType) {
      return next(errorHandler(400, "Could not determine MIME type from response headers"));
      // throw new Error("Could not determine MIME type from response headers.");
  }

    const result = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(imageResp).toString("base64"),
          mimeType: "image/jpeg",
        },
      },
      prompt,
    ]);
    // console.log(result.response.text());

    // const result = await model.generateContent([prompt, image]);
    const response = await result.response;
    let text = response.text();

    // Remove markdown code block
    text = text.replace('```json', '').replace('```', '').trim();

    const extractedData = JSON.parse(text);

    res.json(extractedData);

    // const prompt =
    //   "extract only item name, quantity and price from each item in the receipt";
    // const imagePart = fileToGenerativePart("receiptWalmart.jpg", "image/jpg");

    // const result = await model.generateContent([prompt, imagePart]);
    // // console.log(result.response.text());
    // res.json(result.response.text());
  } catch (error) {
    next(error);
  }
};
