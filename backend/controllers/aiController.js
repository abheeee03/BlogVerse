const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate blog description
exports.generateDescription = async (req, res, next) => {
  try {
    const { title } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: 'Gemini API key not configured' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Generate a concise and engaging description/summary for a blog post with the title: "${title}".
    The description should be approximately 2-3 sentences long (50-70 words), capturing the main idea or hook of what the blog post would be about.
    Make it compelling and informative, suitable for a blog post preview or meta description.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const description = response.text();

    res.json({ description });
  } catch (error) {
    next(error);
  }
}; 