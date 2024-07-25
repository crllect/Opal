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
	splash.innerText = 'This is the div to show and then hide';
	document.body.appendChild(splash);

	const hideDiv = () => {
		splash.style.transform = 'translateY(-100%)';
		splash.style.opacity = '0';
		setTimeout(() => splash.remove(), 300);
	};

	document.addEventListener('keydown', hideDiv, { once: true });
	document.addEventListener('click', hideDiv, { once: true });
});
