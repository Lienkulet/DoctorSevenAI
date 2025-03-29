// /api/chat/route.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set in environment variables");
    }

    // Validate content type
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ error: "Content-Type must be application/json" }),
        { status: 400 }
      );
    }

    // Parse JSON body
    const { message, summary } = await req.json();

    // Validate message
    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: "Message is required and must be a string" }),
        { status: 400 }
      );
    }

    // Prepare messages for OpenAI
    const messages = [
      {
        role: "system",
        content: "You are a medical AI assistant. Provide accurate and professional medical advice based on the user's message and any provided clinical report summary.",
      },
    ];

    // Add summary as context if it exists
    if (summary && typeof summary === 'string') {
      messages.push({
        role: "user",
        content: `Here is a summary of a clinical report for context:\n${summary}`,
      });
    }

    // Add the user's message
    messages.push({
      role: "user",
      content: message,
    });

    // Generate response using OpenAI's gpt-4o model
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      max_tokens: 300, // Adjust as needed
    });

    // Validate response structure
    if (
      !response ||
      !response.choices ||
      !response.choices[0] ||
      !response.choices[0].message ||
      !response.choices[0].message.content
    ) {
      throw new Error("Unexpected response structure from OpenAI");
    }

    const reply = response.choices[0].message.content;
    return new Response(JSON.stringify({ message: reply }), { status: 200 });
  } catch (error) {
    console.error("Error processing chat request:", error.message);
    return new Response(
      JSON.stringify({ error: `Failed to process chat request: ${error.message}` }),
      { status: 500 }
    );
  }
}