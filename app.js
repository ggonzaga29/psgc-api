const cheerio = require('cheerio');
const axios = require('axios');

const regionsURL = 'https://psa.gov.ph/classification/psgc/?q=psgc/regions';

console.clear();

/* 

	Scraping Steps
	Get Regions data
	TODO: Use correspondence code from region to get provinces
	TODO: Use correspondence code from province to get cities
	TODO: Use correspondence code from cities to get barangays

*/

async function scrape() {
	const { data } = await axios.get(regionsURL);

	const $ = cheerio.load(data);
	const table = $('#classifytable');

	const scrapedData = [];

	// indent hell starts here
	table.each((index, el) => {

		// Region
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

		// Region - Province
		


		region = {
			regionName: regionName.replace("Region: ", ""),
			tenDigitCode: tenDigitCode.replace("10 Digit Code: ", ""),
			correspondenceCode: correspondenceCode.replace("Correspondence Code: ", ""),
		};

		scrapedData.push(region);
	});

}

scrape();
