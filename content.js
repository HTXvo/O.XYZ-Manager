/*
     Show a button to transfer the selected text to the Google Chrome extension.
*/
document.addEventListener('mouseup', () => {
    removeIcon();
    const selectedText = window.getSelection().toString().trim();

    if (selectedText) {
        setTimeout(() => {
            showIcon(selectedText);
        }, 110);
    } else {
        removeIcon();
    }
});

function showIcon(selectedText) {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const floatingIcon = document.createElement('div');
    floatingIcon.classList.add("select_item")
    floatingIcon.innerHTML = '<img class="select_image_icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJoSURBVHgBtVfheYIwED07ARuYDcoG2g3cQDZQJ9ANyga4gTqBXydAJwAnQCdI76WkDSFBoPG+7/0wEd7Ly+VyTKh/RIwFY8aIGaIeQ9wZJePC+GIc67EgIRifjIohByCrnx0dUU0s/4lP+nOqdwhGEYBco6ABbsQ+8iiK5Ha7lefzWRZFIXVUVaXG1uu1FEJ0iYifkQsXOV4KAjPwez6fK1H6f3Ecy/1+L3e7nU9IpxORi3y1WqkV6sDKQUwdloP8cDgoRzwinDnRSjjYbUaapo0VPwNcwjvInZgt61srN/d4sVgMTTwlFs96nBCmgMy2UNsOK4es2gbyAe9y5ERKxt43JrMsU+Qe5YMAYp201lxVc1PieiAEuYZ20+Fk0rIfxHAgFDmgawa2w5oDN+VkZW5HMRmFPM9925C/kaMwlGVJIeN+/7kYeWH2lICARlF4PB4UOm63m09A9GaPcMJQ6NAOuAICGrOvcEALcAi5Q0BpjkynU+LjQiFD59TlcmlNQcDVHLler8Rll14Rp9PJHlKKEqJm/ca5/U/5JUc5RjiON7jVKWj0ezivOLuhROA+8RS3371OySrHKJ997v5n0O9yrD4z90LYD6Ik293PGAFYeZ/ruOWCuXemkCRJepOjGXHUf0nGVWyGsyWDerMl021ZlxDkDnrDPi3ZxBIhGGey7EEJ5ZXQcrls/Bnn+3g8qqOLIoP/zWYzNbfZbFx3CgY+yKo9dnjbciQSVoWtsBtVjMHujpNTUI+23HSioBFJ10EuaGBgn1qJOQIpjfg0M0Mw9gNJq5pYPHv5hPqH/jyfM94p0Of5N4chd5eoAlYKAAAAAElFTkSuQmCC"> '; // Тут можно вставить картинку <img> или любую другую иконку
    floatingIcon.style.cssText = `
        width: 100%;
        max-width: 30px;
        position: absolute;
        top: ${window.scrollY + rect.bottom}px;
        left: ${window.scrollX + rect.right + 5}px;
        font-size: 18px;
        cursor: pointer;
        z-index: 10000;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    `;

    floatingIcon.onclick = () => {
        // console.log("Выделенный текст:", selectedText);
        copyToClipboard(selectedText);
    };

    document.body.appendChild(floatingIcon);
}

function removeIcon() {
    // Find all elements and remove them.
    setTimeout(() => {
        document.querySelectorAll('.select_item').forEach(el => el.remove());
    }, 100);  // Give 100ms for `onclick` to trigger before removing
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("The text has been copied, you can open the extension:");
        // Clear existing messages
        chrome.runtime.sendMessage({action: 'saveText', text: text});
    }).catch(err => {
        console.error('Copy error: ', err);
    });
}

// Event for the website https://ocean.o.xyz/
const currentUrl = window.location.href;

if (currentUrl == "https://ocean.o.xyz/") {
    setTimeout(() => {
        chrome.storage.local.get({texts: []}, (data) => {
            const input = document.querySelector('.message-textarea');  // Select the required field
            function typeText(el, text) {
                for (let char of text) {
                    el.dispatchEvent(new KeyboardEvent('keydown', { key: char }));
                    el.value += char;
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new KeyboardEvent('keyup', { key: char }));
                }

                // Simulate pressing Enter


                const enterEvent = new KeyboardEvent('keydown', {
                    key: 'Enter',
                    code: 'Enter',
                    keyCode: 13,
                    which: 13,
                    bubbles: true
                });

                input.dispatchEvent(enterEvent);
            }

            typeText(input, data.texts[0]);
        });

        chrome.storage.local.set({texts: []});
    }, 2010);
}
