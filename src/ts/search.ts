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
    ?.addEventListener('keydown', function (event: KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('searchButton')?.click();
        }
    });

document.getElementById('searchButton')!.onclick = async function (event: MouseEvent) {
    event.preventDefault();

    let urlInput = document.getElementById('urlInput') as HTMLInputElement;
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
        await connection.setTransport('/epoxy/index.mjs', [{ wisp: wispUrl }]);
    }
    iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
};

document.getElementById('switcher')!.onselect = async function (event: Event) {
    const target = event.target as HTMLSelectElement;
    switch (target.value) {
        case 'epoxy':
            await connection.setTransport('/epoxy/index.mjs', [
                { wisp: wispUrl }
            ]);
            break;
        case 'bare':
            await connection.setTransport('/baremod/index.mjs', [bareUrl]);
            break;
    }
};
