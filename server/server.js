const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "..")));

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

                const lowerMessage = userMessage.toLowerCase();

        if (
            lowerMessage.includes("coding profile") ||
            lowerMessage.includes("coding profiles") ||
            lowerMessage.includes("github") ||
            lowerMessage.includes("codechef") ||
            lowerMessage.includes("hackerrank")
        )
        
        {
            return res.json({
                reply: `Here are Hasit's coding profiles:

GitHub: https://github.com/Hasit-18-02
CodeChef: https://www.codechef.com/users/valid_tune_51
HackerRank: https://www.hackerrank.com/profile/knightcyber99`
            });
        }
        if (
    lowerMessage.includes("resume") ||
    lowerMessage.includes("cv")
) {
    return res.json({
        reply: `Here is Hasit's resume:

Resume: http://localhost:3000/Document%20from%20Hasit.pdf`
    });
}
        const response = await fetch("http://localhost:11434/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gemma3:1b",
                stream: false,
                messages: [
                    {
                        role: "system",
                        content: `You are Hasit's AI Portfolio Assistant.

You are answering questions about Hasit and his portfolio.

Hasit is a 2nd-year AIML student at VNR VJIET.
His interests include programming, technology and building projects.

His skills are:
- C
- C++
- Python
- Java
- SQL
- Some web development

His projects include:
1. Subscription Billing Management System
   A DBMS-based project involving customers, subscription plans,
   subscriptions and billing. Technologies include Oracle SQL,
   JDBC and Java.

2. OccuSense
   An intelligent occupancy and air-quality based energy management
   system designed to reduce unnecessary energy consumption.

Answer questions about Hasit's portfolio clearly and honestly.
Do not invent achievements, skills, projects or experience.

Coding profiles:
GitHub: https://github.com/Hasit-18-02
CodeChef: https://www.codechef.com/users/valid_tune_51
HackerRank: https://www.hackerrank.com/profile/knightcyber99

If asked about the resume, tell the visitor that Hasit's resume
is available in the Resume section of the website.`
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            })
        });

        const data = await response.json();

        res.json({
            reply: data.message?.content || "Sorry, I couldn't generate a response."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            reply: "Sorry, the AI assistant is currently unavailable."
        });
    }
});

app.listen(3000, () => {
    console.log("Portfolio server running at http://localhost:3000");
});