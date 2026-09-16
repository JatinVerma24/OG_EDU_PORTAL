require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const key = process.env.GEMINI_API_KEY;
if (!key) {
    console.error("GEMINI_API_KEY environment variable is not configured.");
    process.exit(1);
}
const genAI = new GoogleGenerativeAI(key);

async function test() {
    console.log("Testing with hardcoded key...");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello");
        console.log("SUCCESS");
        console.log(result.response.text());
    } catch (e) {
        console.log("FAILED to generate content:", e.message);
    }
}

test();
