import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const prompt = `Attached is a clinical report (image or PDF). Study it. Retrieve text from the image and summarize it. 
Go over the clinical report and identify biomarkers that show slight or large abnormalities. Then summarize in 100 words. You may increase the word limit if the report has multiple pages. Do not output patient name, date, etc. Make sure to include numerical values and key details from the report, including report title.
## Summary: `;

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
    const { base64 } = await req.json();

    // Validate base64 string
    if (!base64 || typeof base64 !== 'string') {
      return new Response(
        JSON.stringify({ error: "Base64 image is required and must be a string" }),
        { status: 400 }
      );
    }

    // Validate base64 format
    if (!base64.startsWith('data:') || !base64.includes('base64,')) {
      return new Response(
        JSON.stringify({ error: "Invalid base64 format. Expected format: data:<type>;base64,..." }),
        { status: 400 }
      );
    }

    // Generate summary using OpenAI's gpt-4o model
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: base64 } },
          ],
        },
      ],
      max_tokens: 300, // Adjust as needed for longer summaries
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

    const summary = response.choices[0].message.content;
    return new Response(summary, { status: 200 });
  } catch (error) {
    console.error("Error processing image:", error.message);
    return new Response(
      JSON.stringify({ error: `Failed to process image: ${error.message}` }),
      { status: 500 }
    );
  }
}