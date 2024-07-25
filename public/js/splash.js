'use strict';
document.addEventListener('DOMContentLoaded', () => {
	const splash = document.createElement('div');
	splash.style.position = 'absolute';
	splash.style.top = '0';
	splash.style.left = '0';
	splash.style.width = '100vw';
	splash.style.height = '100vh';
	splash.style.background =
		'url("../assets/splash.png") no-repeat center center';
	splash.style.backgroundSize = 'cover';
	splash.style.transition = 'transform 0.3s ease-in, opacity 0.4s ease-in';
	document.body.appendChild(splash);
	const clock = document.createElement('span');
	clock.style.color = 'rgba(255, 255, 255, 0.70)';
	clock.style.textAlign = 'center';
	clock.style.textShadow = '0px 0px 4px #FFF';
	clock.style.fontFamily = 'Open Sans';
	clock.style.fontSize = '24px';
	clock.style.fontStyle = 'normal';
	clock.style.fontWeight = '400';
	clock.style.lineHeight = 'normal';
	clock.style.position = 'absolute';
	clock.style.left = '50%';
	clock.style.bottom = '150px';
	clock.style.transform = 'translateX(-50%)';
	splash.appendChild(clock);
	const updateClock = () => {
		const now = new Date();
		const options = {
			weekday: 'long',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		};
		clock.innerText = now.toLocaleTimeString('en-US', options);
	};
	updateClock();
	setInterval(updateClock, 60000);
	const hideDiv = () => {
		splash.style.transition =
			'transform 0.5s ease-in, opacity 0.5s ease-in';
		splash.style.transform = 'translateY(-100%)';
		splash.style.opacity = '0';
		setTimeout(() => splash.remove(), 500);
		document.removeEventListener('wheel', hideOnScrollAttempt);
		document.removeEventListener('keydown', hideDiv);
		document.removeEventListener('click', hideDiv);
	};
	const hideOnScrollAttempt = event => {
		event.preventDefault();
		hideDiv();
	};
	document.addEventListener('wheel', hideOnScrollAttempt, { passive: false });
	document.addEventListener('keydown', hideDiv, { once: true });
	document.addEventListener('click', hideDiv, { once: true });
});
