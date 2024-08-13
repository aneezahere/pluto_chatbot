import Groq from "groq-sdk";

// Initialize the Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid request. Message is required.' });
    }

    try {
      console.log('Received message:', message);
      // Use Groq's chat completion method
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        model: "llama3-8b-8192", // Adjust the model based on your requirements
      });

      console.log('AI Response:', chatCompletion);

      // Extract the response from the Groq API response structure
      const text = chatCompletion.choices[0]?.message?.content || '';
      return res.status(200).json({ response: text });
    } catch (error) {
      console.error("Error generating content from AI:", error);
      return res.status(500).json({ error: 'Failed to generate content from AI.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
