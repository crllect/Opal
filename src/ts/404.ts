async function fetchKaomojiLine() {
	try {
		const response = await fetch('./assets/kaomojis.txt');
		const text = await response.text();
		const lines = text.split('\n').filter(line => line.trim().length > 0);
		const randomIndex = Math.floor(Math.random() * lines.length);
		return lines[randomIndex];
	} catch (error) {
		console.error('Error fetching kaomoji:', error);
		return '😅';
	}
}

async function setRandomKaomoji() {
	const kaomoji = await fetchKaomojiLine();
	const kaomojiElement = document.querySelector('.kaomoji');
	if (kaomojiElement) {
		kaomojiElement.textContent = kaomoji;
	}
}

document.addEventListener('DOMContentLoaded', setRandomKaomoji);
