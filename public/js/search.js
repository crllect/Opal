'use strict';
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
					});
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step(
				(generator = generator.apply(thisArg, _arguments || [])).next()
			);
		});
	};
var _a;
const connection = new BareMux.BareMuxConnection('/baremux/worker.js');
const wispUrl =
	(location.protocol === 'https:' ? 'wss' : 'ws') +
	'://' +
	location.host +
	'/wisp/';
const bareUrl =
	(location.protocol === 'https:' ? 'https' : 'http') +
	'://' +
	location.host +
	'/bare/';
(_a = document.getElementById('urlInput')) === null || _a === void 0
	? void 0
	: _a.addEventListener('keydown', function (event) {
			return __awaiter(this, void 0, void 0, function* () {
				if (event.key === 'Enter') {
					event.preventDefault();
					let urlInput = document.getElementById('urlInput');
					let url = urlInput.value;
					let searchUrl = 'https://www.google.com/search?q=';
					if (!url.includes('.')) {
						url = searchUrl + encodeURIComponent(url);
					} else {
						if (
							!url.startsWith('http://') &&
							!url.startsWith('https://')
						) {
							url = 'https://' + url;
						}
					}
					if (!(yield connection.getTransport())) {
						yield connection.setTransport('/epoxy/index.mjs', [
							{ wisp: wispUrl }
						]);
					}
					iframeWindow.src =
						__uv$config.prefix + __uv$config.encodeUrl(url);
				}
			});
		});
document.addEventListener('DOMContentLoaded', () => {
	if (!localStorage.getItem('switcher')) {
		localStorage.setItem('switcher', 'epoxy');
	}
	const switcherButton = document.getElementById('switcherButton');
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
