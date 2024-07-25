declare const BareMux: any;
declare const __uv$config: any;
declare const iframeWindow: any;

const connection = new BareMux.BareMuxConnection('/baremux/worker.js');
const wispUrl: string =
	(location.protocol === 'https:' ? 'wss' : 'ws') +
	'://' +
	location.host +
	'/wisp/';
const bareUrl: string =
	(location.protocol === 'https:' ? 'https' : 'http') +
	'://' +
	location.host +
	'/bare/';

let searchHistory: string[] = [];
let currentHistoryIndex = -1;

const urlPattern = new RegExp(
	'^(https?:\\/\\/)?' +
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
		'((\\d{1,3}\\.){3}\\d{1,3}))' +
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
		'(\\?[;&a-z\\d%_.~+=-]*)?' +
		'(\\#[-a-z\\d_]*)?$',
	'i'
);

document
	.getElementById('urlInput')
	?.addEventListener('keydown', async function (event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();

			let urlInput = document.getElementById(
				'urlInput'
			) as HTMLInputElement;
			let url: string = urlInput.value;
			let searchUrl: string = 'https://www.google.com/search?q=';

			if (!urlPattern.test(url)) {
				url = searchUrl + encodeURIComponent(url);
			} else {
				if (!url.startsWith('http://') && !url.startsWith('https://')) {
					url = 'https://' + url;
				}
			}
			if (!(await connection.getTransport())) {
				await connection.setTransport('/epoxy/index.mjs', [
					{ wisp: wispUrl }
				]);
			}
			iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
			updateHistory(iframeWindow.src);
			updateArrows();
		}
	});

const updateHistory = (src: string) => {
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
	const backButton = document.getElementById(
		'backButton'
	) as HTMLButtonElement;
	const forwardButton = document.getElementById(
		'forwardButton'
	) as HTMLButtonElement;

	if (backButton) {
		if (currentHistoryIndex > 0) {
			backButton.disabled = false;
			backButton.style.opacity = '1';
		} else {
			backButton.disabled = true;
			backButton.style.opacity = '0.5';
		}
	}

	if (forwardButton) {
		if (currentHistoryIndex < searchHistory.length - 1) {
			forwardButton.disabled = false;
			forwardButton.style.opacity = '1';
		} else {
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

	const switcherButton = document.getElementById(
		'switcherButton'
	) as HTMLButtonElement;

	const toggleSwitcher = () => {
		const currentValue = localStorage.getItem('switcher');
		const newValue = currentValue === 'epoxy' ? 'bare' : 'epoxy';
		localStorage.setItem('switcher', newValue);
		switcherButton.textContent = newValue;

		switch (newValue) {
			case 'epoxy':
				connection.setTransport('/epoxy/index.mjs', [
					{ wisp: wispUrl }
				]);
				break;
			case 'bare':
				connection.setTransport('/baremod/index.mjs', [bareUrl]);
				break;
		}
	};

	switcherButton.textContent = localStorage.getItem('switcher');
	switcherButton.addEventListener('click', toggleSwitcher);

	const updateWebsiteTitle = () => {
		const websiteTitle = document.getElementById('websiteTitle');
		if (websiteTitle) {
			try {
				const iframeDoc =
					iframeWindow.contentDocument ||
					iframeWindow.contentWindow.document;
				websiteTitle.textContent = iframeDoc.title;
			} catch (error) {
				websiteTitle.textContent = 'Opal';
			}
		}

		setInterval(updateWebsiteTitle, 1000);
	};

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
});
