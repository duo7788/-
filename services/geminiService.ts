
import { GoogleGenAI } from "@google/genai";

export const analyzeMoodAndSummary = async (content: string) => {
  if (!process.env.API_KEY || content.length < 10) return null;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an empathetic journal assistant. Analyze the following diary entry and provide a mood (single emoji) and a very short summary (max 15 words) in JSON format.
      Entry: "${content}"`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const data = JSON.parse(response.text || "{}");
    return {
      mood: data.mood || "📝",
      summary: data.summary || ""
    };
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return null;
  }
};
