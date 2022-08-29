const cheerio = require('cheerio');
const axios = require('axios');

const PROVINCE_BASE_URL =
	'https://psa.gov.ph/classification/psgc/?q=psgc/provinces/';

async function provinces(regions) {
	regions.forEach(async (region) => {
		const { correspondenceCode } = region;

		const PROVINCE_URL = `${PROVINCE_BASE_URL}${correspondenceCode}`;

		const { data } = await axios.get(PROVINCE_URL);

		const $ = cheerio.load(data);
		const table = $("#classifytable").last();

		debugger;
	});
}

module.exports = provinces;
