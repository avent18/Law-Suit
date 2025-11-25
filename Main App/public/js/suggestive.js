document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
        addMessageToChatBox('User', userInput);
        getBotResponse(userInput);
        document.getElementById('user-input').value = '';
    }
});

function addMessageToChatBox(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(userInput) {
    // Simulate a bot response
    let botResponse = '';

    // Example responses
    if (userInput.toLowerCase().includes('definition')) {
        botResponse = 'Please provide the term you want the definition for.';
    } else if (userInput.toLowerCase().includes('help')) {
        botResponse = 'How can I assist you? You can ask for definitions or common law queries.';
    } else {
        botResponse = 'I am sorry, I do not understand your query. Please ask for definitions or common law queries.';
    }

    setTimeout(() => {
        addMessageToChatBox('Bot', botResponse);
    }, 1000);
}