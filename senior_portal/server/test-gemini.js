require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
    console.log("Testing Gemini API...");
    console.log("Key present:", !!process.env.GEMINI_API_KEY);

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const chat = model.startChat({
            history: [],
        });

        const result = await chat.sendMessage("Hello");
        const response = await result.response;
        console.log("Response:", response.text());
        console.log("SUCCESS");
    } catch (error) {
        console.error("FAILURE:", error);
    }
}

test();
