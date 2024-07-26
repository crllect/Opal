"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const settingsButton = document.getElementById('settingsButton');
    const iframeWindow = document.querySelector('.iframeWindow');
    const settingsWindow = document.querySelector('.settingsWindow');
    const settingsComponents = document.querySelectorAll('.settingsComponent');
    const titleInput = document.getElementById('titleInput');
    const faviconInput = document.getElementById('faviconInput');
    if (settingsButton &&
        iframeWindow &&
        settingsWindow &&
        settingsComponents.length > 0) {
        settingsButton.addEventListener('click', () => {
            iframeWindow.classList.toggle('settingsOpen');
            settingsWindow.classList.toggle('settingsOpen');
            settingsButton.classList.toggle('settingsOpen');
            settingsComponents.forEach(settingsComponent => {
                settingsComponent.classList.toggle('settingsOpen');
            });
        });
        if (titleInput) {
            titleInput.addEventListener('keypress', event => {
                if (event.key === 'Enter') {
                    handleTitleInput();
                }
            });
        }
        if (faviconInput) {
            faviconInput.addEventListener('keypress', event => {
                if (event.key === 'Enter') {
                    handleFaviconInput();
                }
            });
        }
        loadInitialValues();
    }
});
function handleTitleInput() {
    const titleInput = document.getElementById('titleInput');
    const value = sanitizeInput(titleInput.value);
    if (value.toLowerCase() === 'default') {
        localStorage.setItem('titleCloak', 'Opal');
        document.title = 'Opal';
    }
    else {
        localStorage.setItem('titleCloak', value);
        document.title = value;
    }
}
function handleFaviconInput() {
    const faviconInput = document.getElementById('faviconInput');
    const value = sanitizeInput(faviconInput.value);
    if (value.toLowerCase() === 'default') {
        localStorage.setItem('faviconCloak', '');
        updateFavicon('');
    }
    else {
        localStorage.setItem('faviconCloak', value);
        updateFavicon(value);
    }
}
function sanitizeInput(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}
function updateFavicon(url) {
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.setAttribute('rel', 'icon');
        document.head.appendChild(favicon);
    }
    favicon.setAttribute('href', url || 'about:blank');
}
function loadInitialValues() {
    const savedTitle = localStorage.getItem('titleCloak');
    const savedFavicon = localStorage.getItem('faviconCloak');
    if (savedTitle) {
        document.title = savedTitle;
        const titleInput = document.getElementById('titleInput');
        titleInput.value = savedTitle;
    }
    if (savedFavicon) {
        updateFavicon(savedFavicon);
        const faviconInput = document.getElementById('faviconInput');
        faviconInput.value = savedFavicon;
    }
}
