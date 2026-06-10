const { GoogleGenerativeAI } = require("@google/generative-ai");

const key = "AIzaSyBVak_bHTfW2XePoFbTZ7RW0h9ZUVwW-Kw"; // User provided key
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
