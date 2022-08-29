const cheerio = require('cheerio');
const axios = require('axios');

const regionsURL = 'https://psa.gov.ph/classification/psgc/?q=psgc/regions';

console.clear();

async function scrape() {
	const { data } = await axios.get(regionsURL);

	const $ = cheerio.load(data);
	const table = $('#classifytable');

	const scrapedData = [];

	table.each((index, el) => {
		const regionStr = $(el)
			.children('thead')
			.children('tr')
			.children('th')
			.text();

		const regionName = regionStr.split('10 Digit Code')[0];

		// ("10 Digit Code: " + "0000000000").length = 25
		const tenDigitStrLen = ('10 Digit Code: ' + '0000000000').length;
		const tenDigitCode = regionStr.substring(
			regionName.length,
			regionName.length + tenDigitStrLen
		);

		const correspondenceCode = regionStr.substring(
			regionName.length + tenDigitStrLen
		);

		region = {
			regionName: regionName.replace("Region: ", ""),
			tenDigitCode: tenDigitCode.replace("10 Digit Code: ", ""),
			correspondenceCode: correspondenceCode.replace("Correspondence Code: ", ""),
		};

		scrapedData.push(region);
	});

	debugger;

	console.log(scrapedData);

	// provinceTable.each((index, el) => {
	// 	const iso = $(el).find('th').text();

	// 	scrapedData.push([iso, "as"]);
	// });

	// console.dir(typeof provinceTable);
	// const scrapedData = [];

	// books.each((index, el) => {
	// 	const scrapItem = { title: '', price: '' };
	// 	scrapItem.title = $(el).children('h3').text();
	// 	scrapItem.price = $(el)
	// 		.children('.product_price')
	// 		.children('p.price_color')
	// 		.text();

	// 	scrapedData.push(scrapItem);
	// });

	// console.log(scrapedData);
	// tableRows.each(row => {
	// 	console.log(row);
	// });
}

scrape();
