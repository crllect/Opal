"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const settingsButton = document.getElementById('settingsButton');
    const iframeWindow = document.querySelector('.iframeWindow');
    const settingsWindow = document.querySelector('.settingsWindow');
    const settingsComponent = document.querySelector('.settingsComponent');
    if (settingsButton && iframeWindow && settingsWindow && settingsComponent) {
        settingsButton.addEventListener('click', () => {
            iframeWindow.classList.toggle('settingsOpen');
            settingsWindow.classList.toggle('settingsOpen');
            settingsButton.classList.toggle('settingsOpen');
            settingsComponent.classList.toggle('settingsOpen');
        });
    }
});
