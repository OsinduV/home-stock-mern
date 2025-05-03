import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "node:fs";
import dotenv from "dotenv";
import { errorHandler } from "../utils/error.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const ocr = async (req, res, next) => {
  try {
    const imageUrl = req.body.imageUrl;

    if (!imageUrl) {
      return next(errorHandler(400, "Image URL is required"));
    }

    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

    const prompt = `
You are an intelligent receipt parser.

Given an image of a grocery receipt, extract a structured list of items in the following JSON format:

[
  {
    "itemname": "<Extracted item name>",
    "quantity": <Extracted quantity as number>,
    "price": <Extracted price as number>,
    "category": "<Best match from this list: Dairy, Bakery, Meat, Fruits, Vegetables, Snacks, Beverages, Household, Frozen, Personal Care>"
  },
  ...
]

Only return JSON (no explanation, no markdown). Classify each item into one of the predefined categories listed above based on common grocery knowledge. If you are unsure about a category, use "Uncategorized".
`;

    const resp = await fetch(imageUrl);
    if (!resp.ok) {
      return next(errorHandler(400, "Failed to fetch image"));
    }

    const mimeType = resp.headers.get("content-type");
    const imageResp = await resp.arrayBuffer();

    if (!mimeType) {
      return next(errorHandler(400, "Could not determine MIME type from response headers"));
    }

    const result = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(imageResp).toString("base64"),
          mimeType,
        },
      },
      prompt,
    ]);

    const response = await result.response;
    let text = response.text();

    // Remove markdown code block if present
    text = text.replace("```json", "").replace("```", "").trim();

    // Parse the structured result
    const parsedData = JSON.parse(text);

    // Validate categories
    const validCategories = [
      "Dairy",
      "Bakery",
      "Meat",
      "Fruits",
      "Vegetables",
      "Snacks",
      "Beverages",
      "Household",
      "Frozen",
      "Personal Care",
    ];

    const extractedData = parsedData.map((item) => ({
      ...item,
      category: validCategories.includes(item.category)
        ? item.category
        : "Uncategorized",
    }));

    res.json(extractedData);
  } catch (error) {
    next(error);
  }
};
