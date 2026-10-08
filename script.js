const input = document.getElementById("userInput");
const sendButton = document.getElementById("sendBtn");
const chatbox = document.getElementById("chatbox");

async function sendMessage() {
    const message = input.value.trim();

    if (message === "") {
        return;
    }

    chatbox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;

    input.value = "";

    chatbox.innerHTML += `<p><strong>AI:</strong> Thinking...</p>`;

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        // Remove "Thinking..."
        chatbox.lastElementChild.remove();

const formattedReply = data.reply
    .replace(/\n/g, "<br>")
    .replace(
        /(https?:\/\/[^\s<]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );

chatbox.innerHTML += `<p><strong>AI:</strong> ${formattedReply}</p>`;
    } catch (error) {
        chatbox.lastElementChild.remove();

        chatbox.innerHTML += `
            <p><strong>AI:</strong> Sorry, I couldn't connect to the AI.</p>
        `;

        console.error(error);
    }

    chatbox.scrollTop = chatbox.scrollHeight;
}

sendButton.addEventListener("click", sendMessage);

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});