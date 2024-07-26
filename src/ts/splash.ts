document.addEventListener('DOMContentLoaded', () => {
	function splashScreen() {
		const splash = document.createElement('div');
		splash.style.position = 'absolute';
		splash.style.top = '0';
		splash.style.left = '0';
		splash.style.width = '100vw';
		splash.style.height = '100vh';
		splash.style.background =
			'url("../assets/splashsmall.png") no-repeat center center';
		splash.style.backgroundSize = 'cover';
		splash.style.transition =
			'transform 0.3s ease-in, opacity 0.4s ease-in';
		document.body.appendChild(splash);

		const heroText = document.createElement('span');
		heroText.textContent = 'Opal';
		heroText.style.position = 'absolute';
		heroText.style.top = '175px';
		heroText.style.left = '50%';
		heroText.style.transform = 'translateX(-50%)';
		heroText.style.fontSize = '128px';
		heroText.style.fontFamily = 'Open Sans';
		heroText.style.color = '#FFF';
		heroText.style.textAlign = 'center';
		heroText.style.fontStyle = 'normal';
		heroText.style.fontWeight = '600';
		heroText.style.lineHeight = 'normal';
		splash.appendChild(heroText);

		const clock = document.createElement('span');
		clock.style.color = 'rgba(255, 255, 255, 0.70)';
		clock.style.textAlign = 'center';
		clock.style.textShadow = '0px 0px 4px #FFF';
		clock.style.fontFamily = 'Open Sans';
		clock.style.fontSize = '20px';
		clock.style.fontStyle = 'normal';
		clock.style.fontWeight = '400';
		clock.style.lineHeight = 'normal';
		clock.style.position = 'absolute';
		clock.style.left = '50%';
		clock.style.bottom = '150px';
		clock.style.transform = 'translateX(-50%)';
		splash.appendChild(clock);

		const updateClock = () => {
			if (clock) {
				const now = new Date();
				const dayOptions: Intl.DateTimeFormatOptions = {
					weekday: 'long'
				};
				const timeOptions: Intl.DateTimeFormatOptions = {
					hour: 'numeric',
					minute: 'numeric',
					hour12: true
				};
				const formattedDay = now.toLocaleDateString(
					'en-US',
					dayOptions
				);
				const formattedTime = now.toLocaleTimeString(
					'en-US',
					timeOptions
				);
				clock.innerText = `${formattedDay}, ${formattedTime}`;
			}
		};

		updateClock();
		setInterval(updateClock, 15000);

		const hideDiv = () => {
			splash.style.transition =
				'transform 0.5s ease-in, opacity 0.5s ease-in';
			splash.style.transform = 'translateY(-100%)';
			splash.style.opacity = '0';
			setTimeout(() => splash.remove(), 500);
			document.removeEventListener('wheel', hideOnScrollAttempt);
			document.removeEventListener('keydown', hideDiv);
			document.removeEventListener('click', hideDiv);

			if (!localStorage.getItem('hasVisited')) {
				localStorage.setItem('hasVisited', 'true');

				setTimeout(() => {
					const overlay = document.createElement('div');
					overlay.style.position = 'fixed';
					overlay.style.top = '0';
					overlay.style.left = '0';
					overlay.style.width = '100vw';
					overlay.style.height = '100vh';
					overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
					overlay.style.zIndex = '999';
					overlay.style.backdropFilter = 'blur(16px)';
					overlay.style.transition = 'background-color 0.3s ease';

					const firstVisitPopup = document.createElement('div');
					firstVisitPopup.style.position = 'fixed';
					firstVisitPopup.style.top = '50%';
					firstVisitPopup.style.left = '50%';
					firstVisitPopup.style.transform = 'translate(-50%, -50%)';
					firstVisitPopup.style.fontSize = '24px';
					firstVisitPopup.style.color = '#333';
					firstVisitPopup.style.padding = '20px';
					firstVisitPopup.style.backgroundColor = '#313244';
					firstVisitPopup.style.boxShadow =
						'0px 2px 10px 0px rgba(0, 0, 0, 0.25)';
					firstVisitPopup.style.borderRadius = '9px';
					firstVisitPopup.style.width = '475px';
					firstVisitPopup.style.height = '350px';
					firstVisitPopup.style.zIndex = '1000';
					firstVisitPopup.style.display = 'flex';
					firstVisitPopup.style.flexDirection = 'column';
					firstVisitPopup.style.alignItems = 'center';
					firstVisitPopup.style.transition =
						'background-color 0.3s ease';

					const closeButton = document.createElement('button');
					closeButton.style.position = 'absolute';
					closeButton.style.top = '10px';
					closeButton.style.left = '10px';
					closeButton.style.width = '16px';
					closeButton.style.height = '16px';
					closeButton.style.background = '#A6ADC8';
					closeButton.style.border = 'none';
					closeButton.style.borderRadius = '100%';
					closeButton.style.cursor = 'pointer';
					closeButton.style.transition = 'background-color 0.3s ease';

					const image = document.createElement('div');
					image.style.boxShadow =
						'0px 2px 10px 0px rgba(0, 0, 0, 0.25)';
					image.style.background =
						'url("../assets/splashpfp2.png") no-repeat center center';
					image.style.backgroundSize = 'cover';
					image.style.width = '128px';
					image.style.height = '128px';
					image.style.flexShrink = '0';
					image.style.borderRadius = '100%';
					image.style.transform = 'translateY(0.3rem)';
					image.style.transition = 'background-color 0.3s ease';

					const textBox = document.createElement('div');
					textBox.style.color = '#A6ADC8';
					textBox.style.textAlign = 'center';
					textBox.style.fontFamily = 'Open Sans';
					textBox.style.fontSize = '22px';
					textBox.style.fontStyle = 'normal';
					textBox.style.fontWeight = '400';
					textBox.style.lineHeight = 'normal';
					textBox.textContent =
						'Welcome to Opal proxy, a fully featured and sleek Ultraviolet implementation';
					textBox.style.padding = '1rem';
					textBox.style.transition = 'background-color 0.3s ease';

					const shamelessPlug = document.createElement('a');
					shamelessPlug.href = 'https://github.com/crllect';
					shamelessPlug.style.color = '#CBA6F7';
					shamelessPlug.style.textAlign = 'center';
					shamelessPlug.style.fontFamily = 'Open Sans';
					shamelessPlug.style.fontSize = '20px';
					shamelessPlug.style.fontStyle = 'normal';
					shamelessPlug.style.fontWeight = '400';
					shamelessPlug.style.lineHeight = 'normal';
					shamelessPlug.style.textDecorationLine = 'underline';
					shamelessPlug.textContent = 'By crllect';
					shamelessPlug.style.transition = 'color 0.3s ease';

					firstVisitPopup.addEventListener(
						'mouseenter',
						() => (closeButton.style.background = '#ED8796')
					);
					firstVisitPopup.addEventListener(
						'mouseleave',
						() => (closeButton.style.background = '#A6ADC8')
					);

					firstVisitPopup.appendChild(closeButton);
					firstVisitPopup.appendChild(image);
					firstVisitPopup.appendChild(textBox);
					firstVisitPopup.appendChild(shamelessPlug);

					const fadeOutElements = () => {
						firstVisitPopup.style.backgroundColor =
							'rgba(0, 0, 0, 0)';
						overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';

						[closeButton, image, textBox, shamelessPlug].forEach(
							element => {
								element.style.opacity = '0';
							}
						);
					};

					closeButton.addEventListener('click', () => {
						fadeOutElements();
						setTimeout(() => {
							firstVisitPopup.remove();
							overlay.remove();
						}, 300);
					});

					overlay.addEventListener('click', () => {
						fadeOutElements();
						setTimeout(() => {
							firstVisitPopup.remove();
							overlay.remove();
						}, 300);
					});
					document.body.appendChild(overlay);
					document.body.appendChild(firstVisitPopup);
				}, 400);
			}
		};

		const hideOnScrollAttempt = (event: WheelEvent) => {
			event.preventDefault();
			hideDiv();
		};

		setTimeout(() => {
			document.addEventListener('wheel', hideOnScrollAttempt, {
				passive: false
			});
			document.addEventListener('keydown', hideDiv, { once: true });
			document.addEventListener('click', hideDiv, { once: true });
		}, 100);
	}

	const splashButton = document.getElementById('splashButton');

	if (splashButton) {
		splashButton.addEventListener('click', splashScreen);
	}

	splashScreen();
});
