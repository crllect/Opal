document.addEventListener('DOMContentLoaded', () => {
	const settingsButton = document.getElementById('settingsButton');
	const iframeWindow = document.querySelector('.iframeWindow');
	const settingsWindow = document.querySelector('.settingsWindow');
	const settingsComponents = document.querySelectorAll('.settingsComponent');
	const titleInput = document.getElementById(
		'titleInput'
	) as HTMLInputElement;
	const faviconInput = document.getElementById(
		'faviconInput'
	) as HTMLInputElement;
	const clearCookiesInput = document.getElementById(
		'clearCookiesInput'
	) as HTMLInputElement;
	const disableSplashInput = document.getElementById(
		'disableSplashInput'
	) as HTMLInputElement;

	if (
		settingsButton &&
		iframeWindow &&
		settingsWindow &&
		settingsComponents.length > 0
	) {
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

		if (clearCookiesInput) {
			clearCookiesInput.addEventListener('keypress', event => {
				if (event.key === 'Enter') {
					handleClearCookiesInput();
				}
			});
		}

		loadInitialValues();
	}
});

function handleTitleInput() {
	const titleInput = document.getElementById(
		'titleInput'
	) as HTMLInputElement;
	const value = sanitizeInput(titleInput.value);
	if (value.toLowerCase() === 'default') {
		localStorage.setItem('titleCloak', 'Opal');
		document.title = 'Opal';
	} else {
		localStorage.setItem('titleCloak', value);
		document.title = value;
	}
}

function handleFaviconInput() {
	const faviconInput = document.getElementById(
		'faviconInput'
	) as HTMLInputElement;
	const value = sanitizeInput(faviconInput.value);
	if (value.toLowerCase() === 'default') {
		localStorage.setItem('faviconCloak', '');
		updateFavicon('');
	} else {
		localStorage.setItem('faviconCloak', value);
		updateFavicon(value);
	}
}

function handleClearCookiesInput() {
	const clearCookiesInput = document.getElementById(
		'clearCookiesInput'
	) as HTMLInputElement;
	const value = sanitizeInput(clearCookiesInput.value);
	if (value.toLowerCase() === 'y') {
		clearCookiesAndLocalStorage();
	}
}

function clearCookiesAndLocalStorage() {
	const cookies = document.cookie.split(';');
	for (const cookie of cookies) {
		const eqPos = cookie.indexOf('=');
		const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
	}

	localStorage.clear();

	location.reload();
}

function sanitizeInput(input: string): string {
	const element = document.createElement('div');
	element.innerText = input;
	return element.innerHTML;
}

function updateFavicon(url: string) {
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
	const savedDisableSplash = localStorage.getItem('disableSplash');

	if (savedTitle) {
		document.title = savedTitle;
		const titleInput = document.getElementById(
			'titleInput'
		) as HTMLInputElement;
		titleInput.value = savedTitle;
	}

	if (savedFavicon) {
		updateFavicon(savedFavicon);
		const faviconInput = document.getElementById(
			'faviconInput'
		) as HTMLInputElement;
		faviconInput.value = savedFavicon;
	}

	if (savedDisableSplash) {
		const disableSplashInput = document.getElementById(
			'disableSplashInput'
		) as HTMLInputElement;
		disableSplashInput.value = savedDisableSplash === 'true' ? 'y' : 'n';
	}
}
