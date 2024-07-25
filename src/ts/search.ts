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

			if (!url.includes('.')) {
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
		}
	});

document.addEventListener('DOMContentLoaded', () => {
	if (!localStorage.getItem('switcher')) {
		localStorage.setItem('switcher', 'epoxy');
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
});
