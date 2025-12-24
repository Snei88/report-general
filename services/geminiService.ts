
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeInvestmentData = async (
  query: string,
  contextData: string
): Promise<string> => {
  try {
    // Upgrading to gemini-3-pro-preview for advanced data analysis reasoning
    const model = 'gemini-3-pro-preview';
    
    const prompt = `
      You are an expert data analyst for the government of Santiago de Cali.
      Analyze the following summarized investment data and answer the user's question.
      
      Data Context (Summary):
      ${contextData}
      
      User Question:
      ${query}
      
      Provide a concise, professional, and insightful answer. Use markdown for formatting.
      If the answer involves numbers, format them as currency (COP) or percentages.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.3,
      }
    });

    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Lo siento, no pude procesar la solicitud en este momento. Por favor verifica tu conexión o intenta más tarde.";
  }
};
