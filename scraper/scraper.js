const cheerio = require('cheerio');
const axios = require('axios');

const regions = require('./libs/regions.js');
const provinces = require('./libs/provinces.js');

console.clear();

/* 

	Scraping Steps
	Get Regions data
	TODO: Use correspondence code from region to get provinces
	TODO: Use correspondence code from province to get cities
	TODO: Use correspondence code from cities to get barangays

*/

async function scrape() {
	const scrapedRegions = await regions();
	const scrapedProvinces = await provinces(scrapedRegions);

	console.log(scrapedRegions);
}

scrape();
