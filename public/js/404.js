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
function fetchKaomojiLine() {
	return __awaiter(this, void 0, void 0, function* () {
		try {
			const response = yield fetch('./assets/kaomojis.txt');
			const text = yield response.text();
			const lines = text
				.split('\n')
				.filter(line => line.trim().length > 0);
			const randomIndex = Math.floor(Math.random() * lines.length);
			return lines[randomIndex];
		} catch (error) {
			console.error('Error fetching kaomoji:', error);
			return '😅';
		}
	});
}
function setRandomKaomoji() {
	return __awaiter(this, void 0, void 0, function* () {
		const kaomoji = yield fetchKaomojiLine();
		const kaomojiElement = document.querySelector('.kaomoji');
		if (kaomojiElement) {
			kaomojiElement.textContent = kaomoji;
		}
	});
}
document.addEventListener('DOMContentLoaded', setRandomKaomoji);
