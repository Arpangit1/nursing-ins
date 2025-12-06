import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateContent = async (prompt: string, context: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock response.");
    return "AI generation is unavailable without an API Key.";
  }

  try {
    // Construct a focused prompt based on context
    const fullPrompt = `
      Context: You are an AI assistant for a Nursing Institute administrator (Royal Care Nursing Institute).
      Task: ${context}
      User Input: ${prompt}
      
      Keep the tone professional, medical, academic, and warm. Return only the generated text content.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    
    return response.text?.trim() || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate content. Please try again.";
  }
};