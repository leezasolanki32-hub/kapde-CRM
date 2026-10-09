import { GoogleGenerativeAI } from '@google/generative-ai';

const key = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(key);

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
    const prompt = `You are Kaapde AI CRM assistant. 
User: "give me button". 
Context: dashboard.
Answer accurately.`;
    const result = await model.generateContent(prompt);
    console.log('Success:', result.response.text());
  } catch (e) {
    console.error('Failed:', e.message);
  }
}
run();
