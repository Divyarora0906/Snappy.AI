const generateNews = async ({ query, userType, articles }) => {
  try {
    // 🧠 Build context
    const context = articles
      .slice(0, 5)
      .map((a, i) => `${i + 1}. ${a.title} - ${a.description?.slice(0, 150)}`)
      .join("\n");

    const prompt = `
You are an intelligent news analyst.

User Query: ${query}
User Type: ${userType || "General Reader"}

News Articles:
${context}

IMPORTANT:
- Use ONLY the provided articles
- Do NOT add external knowledge
- Keep response simple and factual
- Keep script engaging for video narration

Task:
1. Give summary (easy language)
2. Key points (bullets)
3. Impact (clear explanation)
4. Followup questions
5. Generate a short narration script (5–6 lines, smooth flow)
6. Generate 10–15 image search keywords (relevant visuals)

You MUST return valid JSON only.

Return format:
{
  "summary": "",
  "key_points": [],
  "impact": "",
  "followups": [],
  "script": "",
  "image_keywords": []
}
`;
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.1:8b",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        stream: false,
        format: "json",
        options: {
          temperature: 0.3,
        },
      }),
    });

    const data = await response.json();
    console.log(data);
    const rawText = data?.message?.content;

    if (!rawText) {
      throw new Error("No AI response");
    }

    let result;
    try {
      result = typeof rawText === "string" ? JSON.parse(rawText) : rawText;
    } catch (err) {
      console.log("❌ Invalid JSON from Ollama:", rawText);

      return {
        summary: "Unable to generate summary properly.",
        key_points: [],
        impact: "",
        followups: [],
      };
    }

    return result;
  } catch (error) {
    console.error("🔥 AI Error:", error.message);

    return {
      summary: "AI service temporarily unavailable.",
      key_points: [],
      impact: "",
      followups: [],
    };
  }
};

export { generateNews };
