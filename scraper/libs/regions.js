const cheerio = require('cheerio');
const axios = require('axios');

const regionsURL =
	'https://psa.gov.ph/classification/psgc/?q=psgc/regions';

async function regions() {
	const { data } = await axios.get(regionsURL);

	const $ = cheerio.load(data);
	const table = $('#classifytable');

	const scrapedData = [];

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

		const provinceCount = parseInt(
			$(el)
				.children('tbody')
				.children('tr:first-child')
				.children('td:nth-child(2)')
				.text()
				.replace(/,/g, '')
		);

		const cityCount = parseInt(
			$(el)
				.children('tbody')
				.children('tr:first-child')
				.children('td:nth-child(4)')
				.text()
				.replace(/,/g, '')
		);

		const municipalityCount = parseInt(
			$(el)
				.children('tbody')
				.children('tr:first-child')
				.children('td:nth-child(6)')
				.text()
				.replace(/,/g, '')
		);

		const barangayCount = parseInt(
			$(el)
				.children('tbody')
				.children('tr:first-child')
				.children('td')
				.last()
				.text()
				.replace(/,/g, '')
		);

		const population = parseInt(
			$(el)
				.children('tbody')
				.children('tr')
				.last()
				.children('td')
				.last()
				.text()
				.replace(/,/g, '')
		);

		region = {
			regionName: regionName.replace('Region: ', ''),
			tenDigitCode: tenDigitCode.replace('10 Digit Code: ', ''),
			correspondenceCode: correspondenceCode.replace(
				'Correspondence Code: ',
				''
			),
			provinceCount,
			cityCount,
			municipalityCount,
			barangayCount,
			population
		};

		scrapedData.push(region);
	});

	return scrapedData;
}

module.exports = regions;
