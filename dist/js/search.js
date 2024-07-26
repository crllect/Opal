"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const connection = new BareMux.BareMuxConnection('/baremux/worker.js');
const wispUrl = (location.protocol === 'https:' ? 'wss' : 'ws') +
    '://' +
    location.host +
    '/wisp/';
const bareUrl = (location.protocol === 'https:' ? 'https' : 'http') +
    '://' +
    location.host +
    '/bare/';
let searchHistory = [];
let currentHistoryIndex = -1;
const urlPattern = new RegExp('^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$', 'i');
(_a = document
    .getElementById('urlInput')) === null || _a === void 0 ? void 0 : _a.addEventListener('keydown', function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        if (event.key === 'Enter') {
            event.preventDefault();
            let urlInput = document.getElementById('urlInput');
            let url = urlInput.value;
            let searchUrl = 'https://www.google.com/search?q=';
            if (!urlPattern.test(url)) {
                url = searchUrl + encodeURIComponent(url);
            }
            else {
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'https://' + url;
                }
            }
            if (!(yield connection.getTransport())) {
                yield connection.setTransport('/epoxy/index.mjs', [
                    { wisp: wispUrl }
                ]);
            }
            iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
            updateHistory(iframeWindow.src);
            updateArrows();
        }
    });
});
const updateHistory = (src) => {
    searchHistory = [...searchHistory.slice(0, currentHistoryIndex + 1), src];
    currentHistoryIndex++;
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    updateArrows();
};
const goBack = () => {
    if (currentHistoryIndex > 0) {
        currentHistoryIndex--;
        iframeWindow.src = searchHistory[currentHistoryIndex];
        updateArrows();
    }
};
const goForward = () => {
    if (currentHistoryIndex < searchHistory.length - 1) {
        currentHistoryIndex++;
        iframeWindow.src = searchHistory[currentHistoryIndex];
        updateArrows();
    }
};
const reloadPage = () => {
    if (currentHistoryIndex >= 0) {
        iframeWindow.src = searchHistory[currentHistoryIndex];
    }
};
const updateArrows = () => {
    const backButton = document.getElementById('backButton');
    const forwardButton = document.getElementById('forwardButton');
    if (backButton) {
        if (currentHistoryIndex > 0) {
            backButton.disabled = false;
            backButton.style.opacity = '1';
        }
        else {
            backButton.disabled = true;
            backButton.style.opacity = '0.5';
        }
    }
    if (forwardButton) {
        if (currentHistoryIndex < searchHistory.length - 1) {
            forwardButton.disabled = false;
            forwardButton.style.opacity = '1';
        }
        else {
            forwardButton.disabled = true;
            forwardButton.style.opacity = '0.5';
        }
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
        searchHistory = JSON.parse(savedHistory);
        currentHistoryIndex = searchHistory.length - 1;
    }
    const switcherButton = document.getElementById('switcherButton');
    const switcherButton2 = document.getElementById('switcherButton2');
    const updateButtons = () => {
        const currentValue = localStorage.getItem('switcher') || 'epoxyTransport';
        switcherButton.textContent = currentValue;
        switcherButton2.textContent = currentValue;
    };
    const toggleSwitcher = () => {
        const currentValue = localStorage.getItem('switcher');
        const newValue = currentValue === 'epoxyTransport' ? 'bareMux' : 'epoxyTransport';
        localStorage.setItem('switcher', newValue);
        updateButtons();
        switch (newValue) {
            case 'epoxyTransport':
                connection.setTransport('/epoxy/index.mjs', [
                    { wisp: wispUrl }
                ]);
                break;
            case 'bareMux':
                connection.setTransport('/baremod/index.mjs', [bareUrl]);
                break;
        }
    };
    updateButtons();
    switcherButton.addEventListener('click', toggleSwitcher);
    switcherButton2.addEventListener('click', toggleSwitcher);
    const observeLocalStorage = () => {
        const storageObserver = new MutationObserver(updateButtons);
        storageObserver.observe(document, {
            subtree: true,
            childList: true,
            attributes: true
        });
        window.addEventListener('storage', updateButtons);
    };
    observeLocalStorage();
    const updateWebsiteTitle = () => {
        const websiteTitle = document.getElementById('websiteTitle');
        if (websiteTitle) {
            try {
                const iframeDoc = iframeWindow.contentDocument ||
                    iframeWindow.contentWindow.document;
                websiteTitle.textContent = iframeDoc.title;
                if (!iframeDoc.title) {
                    websiteTitle.textContent = 'Opal';
                }
            }
            catch (error) {
                websiteTitle.textContent = 'Opal';
            }
        }
    };
    setInterval(updateWebsiteTitle, 1000);
    const iframe = document.querySelector('iframe');
    if (iframe) {
        const observer = new MutationObserver(() => {
            updateWebsiteTitle();
        });
        observer.observe(iframe, {
            attributes: true,
            attributeFilter: ['src']
        });
    }
    updateArrows();
    const urlInput = document.getElementById('urlInput');
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        setInterval(() => {
            input.placeholder = input.placeholder === '_' ? '' : '_';
        }, 250);
    });
    if (urlInput) {
        urlInput.style.width = '100px';
        const updateWidth = () => {
            const maxChars = 35;
            const initialWidth = 250;
            const tempSpan = document.createElement('span');
            tempSpan.style.visibility = 'hidden';
            tempSpan.style.position = 'absolute';
            tempSpan.style.whiteSpace = 'pre';
            tempSpan.style.font = window.getComputedStyle(urlInput).font;
            tempSpan.textContent = urlInput.value || urlInput.placeholder;
            document.body.appendChild(tempSpan);
            const newWidth = tempSpan.offsetWidth + 10;
            urlInput.style.width =
                urlInput.value.length > maxChars
                    ? `${initialWidth + maxChars * 7}px`
                    : `${Math.max(initialWidth, newWidth)}px`;
            document.body.removeChild(tempSpan);
        };
        urlInput.addEventListener('input', updateWidth);
        urlInput.addEventListener('change', updateWidth);
        updateWidth();
    }
    const botClock = document.getElementById('botClock');
    const updateClock = () => {
        if (botClock) {
            const now = new Date();
            const options = {
                weekday: 'long',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            const dayOptions = {
                weekday: 'long'
            };
            const timeOptions = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            const formattedDay = now.toLocaleDateString('en-US', dayOptions);
            const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
            botClock.innerText = `${formattedDay}, ${formattedTime}`;
        }
    };
    updateClock();
    setInterval(updateClock, 15000);
    const search = document.querySelector('.search');
    if (urlInput && search) {
        urlInput.addEventListener('focus', () => {
            search.style.transform = 'translateX(-75%)';
        });
        urlInput.addEventListener('blur', () => {
            search.style.transform = 'translateX(-25%)';
        });
    }
    if (!localStorage.getItem('hasVisited')) {
        setTimeout(() => {
            const urlInput = document.getElementById('urlInput');
            if (urlInput) {
                urlInput.focus();
            }
        }, 250);
    }
    const params = new URLSearchParams(window.location.search);
    if (params.has('q')) {
        const query = params.get('q');
        if (query && urlInput) {
            urlInput.value = query;
            const event = new KeyboardEvent('keydown', { key: 'Enter' });
            urlInput.dispatchEvent(event);
        }
    }
});
