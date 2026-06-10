require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const models = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-002",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-1.5-pro-001",
    "gemini-1.5-pro-002",
    "gemini-1.5-pro-latest",
    "gemini-1.0-pro",
    "gemini-pro",
    "gemini-pro-vision"
];

async function test() {
    console.log("Key:", process.env.GEMINI_API_KEY ? "Found" : "Missing");
    for (const modelName of models) {
        process.stdout.write(`Testing ${modelName}... `);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            const text = result.response.text();
            console.log(`✅ SUCCESS`);
            console.log(`Response: ${text.substring(0, 50)}...`);
            return; // Exit on first success
        } catch (e) {
            console.log(`❌ FAILED (${e.response ? e.response.status : e.message})`);
        }
    }
    console.log("All models failed.");
}

test();
