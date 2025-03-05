chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'saveText') {
        chrome.storage.local.get({ texts: [] }, (data) => {
            const updatedTexts = [...data.texts, message.text];
            chrome.storage.local.set({ texts: updatedTexts });
        });
    }
});