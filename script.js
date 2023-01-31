const choose = document.querySelector('.choose');
// const africa = document.querySelector('.africa');
// const america = document.querySelector('.america');
// const europa = document.querySelector('.europa');
// const oceania = document.querySelector('.oceania');
// const asia = document.querySelector('.asia');
const input = document.querySelector('#country');
const countries = document.querySelector('.countries');
const main = document.querySelector('.main');

async function getData() {
	const response = await fetch('https://restcountries.com/v3.1/all');
	const data = await response.json();
	return data;
}

function generateCards(elements) {
	countries.innerHTML = ``;
	elements.forEach((element) => {
		let box = document.createElement('div');
		box.innerHTML = element.name.common;

		const listBlock = document.createElement('div');
		listBlock.innerHTML = `Region: ${element.region} Population:  ${
			element.population
		}  Capital: ${element.capital ? element.capital : '-'}`;
		box.appendChild(listBlock);
		const img = document.createElement('img');
		img.src = element.flags.png;
		img.height = 150;
		box.appendChild(img);

		countries.appendChild(box);
	});
}

getData().then((data) => {
	const elementCountry = data.slice(0, 20);
	generateCards(elementCountry);
	
	let choosenContinent='none'
	let searchName=''

	const filterCountries=()=>{
		if (choosenContinent === 'none' && searchName === '') {
			generateCards(elementCountry);
		} else {
			const filteredData = elementCountry.filter((el) =>{
				if(choosenContinent==="none") return el
				return el.continents.includes(choosenContinent)
			}
			).filter((el) => {
				return el.name.common.toLowerCase().includes(searchName.toLowerCase())})
			generateCards(filteredData);
		} 
	}

	choose.addEventListener('change', (e) => {
		choosenContinent=e.target.value
		filterCountries()
	});

	input.addEventListener('keyup', (e) => {
		searchName=e.target.value
		filterCountries()
	});

	// const search = () => {
	// 	const searchBox = document.getElementById('country').value.toUpperCase();
	// 	for (let i = 0; i < `${box.element.name.common}`; i++) {
	// 		let match = box[i].getElementsByClassName(box)[0];
	// 		if (match) {
	// 			let textValue = match.textContent || match.innerHTML;
	// 			if (textValue.toUpperCase().indexOf(searchBox) > -1) {
	// 				box[i].style.display = '';
	// 			} else {
	// 				box[i].style.display = 'none';
	// 			}
	// 		}
	// 	}
	// };
});
