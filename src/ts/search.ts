interface TransportConfig {
	wisp?: string;
	bare?: string;
}

class BareMuxConnection {
	constructor(workerPath: string) {}

	async getTransport(): Promise<boolean> {
		return false;
	}

	async setTransport(modulePath: string, config: TransportConfig[]): Promise<void> {}
}

const connection = new BareMuxConnection('/baremux/worker.js');

const wispUrl: string = (location.protocol === 'https:' ? 'wss' : 'ws') + '://' + location.host + '/wisp/';
const bareUrl: string = (location.protocol === 'https:' ? 'https' : 'http') + '://' + location.host + '/bare/';

document.getElementById('urlInput')?.addEventListener('keydown', function (event: KeyboardEvent) {
	if (event.key === 'Enter') {
		event.preventDefault();
		(document.getElementById('searchButton') as HTMLButtonElement)?.click();
	}
});

document.getElementById('searchButton')?.addEventListener('click', async function (event: MouseEvent) {
	event.preventDefault();

	let url: string = (document.getElementById('urlInput') as HTMLInputElement).value;
	const searchUrl: string = 'https://www.google.com/search?q=';

	if (!url.includes('.')) {
		url = searchUrl + encodeURIComponent(url);
	} else {
		if (!url.startsWith('http://') && !url.startsWith('https://')) {
			url = 'https://' + url;
		}
	}

	if (!(await connection.getTransport())) {
		await connection.setTransport('/epoxy/index.mjs', [{ wisp: wispUrl }]);
	}

	const iframeWindow = document.getElementById('iframeWindow') as HTMLIFrameElement;
	iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
});

document.getElementById('switcher')?.addEventListener('change', async function (event: Event) {
	const target = event.target as HTMLSelectElement;

	switch (target.value) {
		case 'epoxy':
			await connection.setTransport('/epoxy/index.mjs', [{ wisp: wispUrl }]);
			break;
		case 'bare':
			await connection.setTransport('/baremod/index.mjs', [bareUrl]);
			break;
	}
});
