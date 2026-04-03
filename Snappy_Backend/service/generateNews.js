const generateNews = async ({ query, userType, articles }) => {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  try {
    const context = articles
      .slice(0, 5)
      .map((a, i) => `${i + 1}. ${a.title} - ${a.description?.slice(0, 150)}`)
      .join("\n");

    const prompt = `
You are an intelligent news analyst and visual director.

User Query: ${query}
User Type: ${userType || "General Reader"}

News Articles:
${context}

IMPORTANT:
- Use ONLY the provided articles.
- Keep response simple and factual.
- Generate a script engaging for video narration.

IMAGE KEYWORD RULES:
- Generate 10-15 UNIQUE, highly descriptive image search keywords.
- AVOID generic words like "news", "update", "press", or "background".
- FOCUS on specific subjects, locations, or symbolic objects mentioned in the articles.
- Format for search engines (e.g., "Elon Musk launching rocket high angle", "Close up of gold coins on digital circuit board").
- Ensure keywords vary across the different points of the story.

Return valid JSON only:
{
  "summary": "",
  "key_points": [],
  "impact": "",
  "followups": [],
  "script": "",
  "image_keywords": []
}
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5, // Slightly higher temperature allows for more creative/diverse keywords
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) throw new Error(`Groq API Error: ${response.status}`);

    const data = await response.json();
    const rawText = data?.choices?.[0]?.message?.content;
    if (!rawText) throw new Error("No AI response content");

    return JSON.parse(rawText);

  } catch (error) {
    console.error("🔥 Groq AI Error:", error.message);
    return {
      summary: "AI service temporarily unavailable.",
      key_points: [],
      impact: "",
      followups: [],
      script: "",
      image_keywords: []
    };
  }
};

export { generateNews };