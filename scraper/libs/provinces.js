const cheerio = require('cheerio');
const axios = require('axios');

const PROVINCE_BASE_URL =
	'https://psa.gov.ph/classification/psgc/?q=psgc/provinces/';

async function provinces(regions) {
	const provinces = []

	regions.forEach(async (region) => {
		const { correspondenceCode } = region;

		const PROVINCE_URL = `${PROVINCE_BASE_URL}${correspondenceCode}`;

		const { data } = await axios.get(PROVINCE_URL);

		const $ = cheerio.load(data);
		const table = $('#classifytable').last();
		const rows = $(table).children('tbody').children('tr');

		rows.each((index, el) => {
			const provinceName = $(el).children('td:first-child').children('a').text();
			const correspondenceCode = $(el).children("td:nth-child(3)").text()

			const province = {
				provinceName,
				correspondenceCode,
				regionCorrespondenceCode: region.correspondenceCode
			}

			provinces.push(province);
		});

		console.log(provinces);
	});
}

module.exports = provinces;
