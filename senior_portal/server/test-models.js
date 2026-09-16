require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const key = process.env.GEMINI_API_KEY;
if (!key) {
    console.error("GEMINI_API_KEY environment variable is not configured.");
    process.exit(1);
}
const genAI = new GoogleGenerativeAI(key);

async function listModels() {
    const models = [
        "gemini-1.5-flash-latest",
        "gemini-1.5-flash-001",
        "gemini-1.5-flash",
        "gemini-1.0-pro",
        "gemini-pro"
    ];

    for (const modelName of models) {
        console.log(`--- Testing ${modelName} ---`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            console.log(`SUCCESS: ${modelName} worked! Response: ${result.response.text()}`);
            process.exit(0);
        } catch (e) {
            console.log(`FAILED: ${modelName}`);
            console.log(e.message); // Print full message
        }
    }
}

listModels();
