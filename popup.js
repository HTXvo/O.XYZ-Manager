const textarea = document.getElementById('collectedText');

function loadTexts() {
    chrome.storage.local.get({texts: []}, (data) => {
        textarea.value = data.texts.join('\\n');
    });
}

// Handle the "Clear Message" event
document.getElementById('clearButton').addEventListener('click', () => {
    chrome.storage.local.set({texts: []}, loadTexts);
});

// Handle the "Send Message" event
document.getElementById('sendButton').addEventListener('click', () => {
    // Send a message to the o.xyz search engine
    // Link:  https://ocean.o.xyz/
    // Element:  .message-textarea
    // Event: press "Enter"

    // Open the site in a separate tab
    // Open a new tab
    chrome.tabs.create({url: 'https://ocean.o.xyz/'}, () => {});

    // Clear storage
    // chrome.storage.local.set({texts: []});
});

// When the popup opens, load the text into the textarea for editing.
loadTexts();