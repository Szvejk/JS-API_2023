const list = document.querySelector('.choose');
const africa = document.querySelector('.africa');
const america = document.querySelector('.america');
const europa = document.querySelector('.europa');
const oceania = document.querySelector('.oceania');
const asia = document.querySelector('.asia');
const countries = document.querySelector('.countries');
const main = document.querySelector('.main');

async function getData() {
	const response = await fetch('https://restcountries.com/v3.1/all');
	const data = await response.json();
	return data;
}

getData().then((data) => {
	const elementCountry = data.slice(0, 20);

	elementCountry.forEach((element) => {
		let box = document.createElement('div');
		box.innerHTML = element.name.common;
		countries.appendChild(box);

		const listBlock = document.createElement('div');
		box.appendChild(listBlock);
		const img = document.createElement('div');
		box.appendChild(img);

		img.innerHTML = `${element.png}`
		listBlock.innerHTML = `Region: ${element.region} Population:  ${element.population}  Capital: ${element.capital}`;
	});
});
