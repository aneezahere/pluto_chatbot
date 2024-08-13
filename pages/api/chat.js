import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests are allowed" });
    return;
  }

  try {
    // Access your API key as an environment variable
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Get the prompt from the request body
    const { prompt } = req.body;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // Send the generated text as the response
    res.status(200).json({ text });
  } catch (error) {
    console.error("Error generating content:", error.message || error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
