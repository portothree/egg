const { Builder, By, Key, until } = require('selenium-webdriver');

const egg = '🥚';
const gridId = 'Grid';
const votesSelector = {
	A: '/html/body/div/div/div[1]/div[1]/div/div[1]',
};

(async function main() {
	const [url] = process.argv.slice(2);

	if (!url) {
		throw new Error('No URL provided');
	}

	let driver = await new Builder().forBrowser('firefox').build();
	try {
		await driver.get(url);
		await driver.wait(until.titleIs('GRID'), 1000);
		driver.wait(() =>
			driver
				.executeScript('return document.readyState')
				.then((readyState) => readyState === 'complete')
		);

		await driver.wait(until.elementLocated(By.id(gridId), 10000));

		let emoji = '';

		while (emoji !== egg) {
			const A = await driver.findElement(By.xpath(votesSelector.A));
			A.click();
		}
	} finally {
		await driver.quit();
	}
})();
