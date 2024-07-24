"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const connection = new BareMux.BareMuxConnection('/baremux/worker.js');
const wispUrl = (location.protocol === 'https:' ? 'wss' : 'ws') +
    '://' +
    location.host +
    '/wisp/';
const bareUrl = (location.protocol === 'https:' ? 'https' : 'http') +
    '://' +
    location.host +
    '/bare/';
(_a = document
    .getElementById('urlInput')) === null || _a === void 0 ? void 0 : _a.addEventListener('keydown', function (event) {
    var _a;
    if (event.key === 'Enter') {
        event.preventDefault();
        (_a = document.getElementById('searchButton')) === null || _a === void 0 ? void 0 : _a.click();
    }
});
document.getElementById('searchButton').onclick = function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        let urlInput = document.getElementById('urlInput');
        let url = urlInput.value;
        let searchUrl = 'https://www.google.com/search?q=';
        if (!url.includes('.')) {
            url = searchUrl + encodeURIComponent(url);
        }
        else {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }
        }
        if (!(yield connection.getTransport())) {
            yield connection.setTransport('/epoxy/index.mjs', [{ wisp: wispUrl }]);
        }
        iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
};
document.getElementById('switcher').onselect = function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        const target = event.target;
        switch (target.value) {
            case 'epoxy':
                yield connection.setTransport('/epoxy/index.mjs', [
                    { wisp: wispUrl }
                ]);
                break;
            case 'bare':
                yield connection.setTransport('/baremod/index.mjs', [bareUrl]);
                break;
        }
    });
};
