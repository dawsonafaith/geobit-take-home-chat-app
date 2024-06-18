document.addEventListener('DOMContentLoaded', async () => {
    const messagesElement = document.getElementById('messages');

    // function to fetch all messages from API endpoint
    async function fetchMessages() {
        try {
            const response = await fetch('/messages');
            const data = await response.json();

            // clear previous messages
            messagesElement.innerHTML = '';

            // displays fetched messages by creating list element for each one
            data.messages.forEach(msg => {
                const item = document.createElement('li');
                item.textContent = msg.text;
                messagesElement.appendChild(item);
            });
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }

    // initial fetch of messages when the page loads
    fetchMessages();

    // function to send a message via POST request to API endpoint
    async function sendMessage(event) {
        event.preventDefault(); // prevent default form submission behavior - added this because page kept reloading
        const inputElement = document.getElementById('input');
        const text = inputElement.value;

        try {
            const response = await fetch('/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            // clears the input field after message sent
            inputElement.value = '';

            // fetch and display updated messages
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    // attatch the sendMessage function to when the 'send' button is pressed in the form
    const form = document.getElementById('form');
    form.addEventListener('submit', sendMessage);
});