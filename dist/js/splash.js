"use strict";
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('hasVisited')) {
        localStorage.setItem('hasVisited', 'true');
        setTimeout(() => {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            overlay.style.zIndex = '999';
            overlay.style.backdropFilter = 'blur(16px)';
            overlay.style.transition = 'background-color 0.3s ease';
            const firstVisitPopup = document.createElement('div');
            firstVisitPopup.style.position = 'fixed';
            firstVisitPopup.style.top = '50%';
            firstVisitPopup.style.left = '50%';
            firstVisitPopup.style.transform = 'translate(-50%, -50%)';
            firstVisitPopup.style.fontSize = '24px';
            firstVisitPopup.style.color = '#333';
            firstVisitPopup.style.padding = '20px';
            firstVisitPopup.style.backgroundColor = '#313244';
            firstVisitPopup.style.boxShadow =
                '0px 2px 10px 0px rgba(0, 0, 0, 0.25)';
            firstVisitPopup.style.borderRadius = '9px';
            firstVisitPopup.style.width = '475px';
            firstVisitPopup.style.height = '300px';
            firstVisitPopup.style.zIndex = '1000';
            firstVisitPopup.style.display = 'flex';
            firstVisitPopup.style.flexDirection = 'column';
            firstVisitPopup.style.alignItems = 'center';
            firstVisitPopup.style.transition = 'background-color 0.3s ease';
            const closeButton = document.createElement('button');
            closeButton.style.position = 'absolute';
            closeButton.style.top = '10px';
            closeButton.style.left = '10px';
            closeButton.style.width = '16px';
            closeButton.style.height = '16px';
            closeButton.style.background = '#A6ADC8';
            closeButton.style.border = 'none';
            closeButton.style.borderRadius = '100%';
            closeButton.style.cursor = 'pointer';
            closeButton.style.transition = 'background-color 0.3s ease';
            const image = document.createElement('div');
            image.style.boxShadow = '0px 2px 10px 0px rgba(0, 0, 0, 0.25)';
            image.style.background =
                'url("../assets/splashpfp2.png") no-repeat center center';
            image.style.backgroundSize = 'cover';
            image.style.width = '128px';
            image.style.height = '128px';
            image.style.flexShrink = '0';
            image.style.borderRadius = '100%';
            image.style.transform = 'translateY(0.3rem)';
            image.style.transition = 'background-color 0.3s ease';
            const textBox = document.createElement('div');
            textBox.style.color = '#A6ADC8';
            textBox.style.textAlign = 'center';
            textBox.style.fontFamily = 'Open Sans';
            textBox.style.fontSize = '26px';
            textBox.style.fontStyle = 'normal';
            textBox.style.fontWeight = '400';
            textBox.style.lineHeight = 'normal';
            textBox.textContent =
                'Welcome to Opal proxy, a fully featured and sleek Ultraviolet implementation';
            textBox.style.padding = '1rem';
            textBox.style.transition = 'background-color 0.3s ease';
            const shamelessPlug = document.createElement('a');
            shamelessPlug.href = 'https://github.com/crllect';
            shamelessPlug.style.color = '#CBA6F7';
            shamelessPlug.style.textAlign = 'center';
            shamelessPlug.style.fontFamily = 'Open Sans';
            shamelessPlug.style.fontSize = '22px';
            shamelessPlug.style.fontStyle = 'normal';
            shamelessPlug.style.fontWeight = '400';
            shamelessPlug.style.lineHeight = 'normal';
            shamelessPlug.style.textDecorationLine = 'underline';
            shamelessPlug.textContent = 'By crllect';
            shamelessPlug.style.transition = 'color 0.3s ease';
            firstVisitPopup.addEventListener('mouseenter', () => (closeButton.style.background = '#ED8796'));
            firstVisitPopup.addEventListener('mouseleave', () => (closeButton.style.background = '#A6ADC8'));
            firstVisitPopup.appendChild(closeButton);
            firstVisitPopup.appendChild(image);
            firstVisitPopup.appendChild(textBox);
            firstVisitPopup.appendChild(shamelessPlug);
            const fadeOutElements = () => {
                firstVisitPopup.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                [closeButton, image, textBox, shamelessPlug].forEach(element => {
                    element.style.opacity = '0';
                });
            };
            closeButton.addEventListener('click', () => {
                fadeOutElements();
                setTimeout(() => {
                    firstVisitPopup.remove();
                    overlay.remove();
                }, 300);
            });
            overlay.addEventListener('click', () => {
                fadeOutElements();
                setTimeout(() => {
                    firstVisitPopup.remove();
                    overlay.remove();
                }, 300);
            });
            document.body.appendChild(overlay);
            document.body.appendChild(firstVisitPopup);
        }, 400);
    }
    window.onload = () => {
        setTimeout(() => {
            const urlInput = document.getElementById('urlInput');
            if (urlInput) {
                const event = new KeyboardEvent('keydown', { key: 'Enter' });
                urlInput.dispatchEvent(event);
            }
        }, 1000);
    };
});
