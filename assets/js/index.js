const cardContainter = document.querySelector('.card-container');
const btnSort = document.querySelectorAll('.btn-sort');
let sortMethod = "maxToMin";

const fetchCountries = async () => {
    const fetchData = await fetch("https://restcountries.com/v3.1/all");
    const data = await fetchData.json();

    countriesData = data;

    displayCard();
}

const displayCard = async () => {
    cardContainter.innerHTML = '';
   
    countriesData
        .filter((country) => country.translations.fra.common.toLowerCase().includes(inputSearch.value.toLowerCase()))
        .slice(0, inputRange.value)
        .sort((a, b) => {
            if (sortMethod === "maxToMin") {
                return b.population - a.population;
            } else if (sortMethod === "minToMax") {
                return a.population - b.population;
            } else if (sortMethod === "alpha") {
                return a.translations.fra.common.localeCompare(b.translations.fra.common);
            }
        })
        .map((country) => {
            const title = country.translations.fra.common;
            const flagUrl = country.flags.png;
            const capital = country.capital;
            const population = country.population;

            const card = document.createElement('div');
            card.classList.add('card');
        
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container');
            const img = document.createElement('img');
            img.src = flagUrl;
            img.alt = `"Photo de ${title}"`;
            imgContainer.append(img);

            const content = document.createElement('div');
            content.classList.add('content');

            const h2 = document.createElement('h2');
            h2.textContent = title;

            const h3 = document.createElement('h3');
            const capitalName = document.createElement('span');
            capitalName.style.color = "#B6B1E7";
            capitalName.textContent = capital;
            h3.textContent = "Capitale : ";
            h3.append(capitalName);

            const pop = document.createElement('p');
            pop.textContent = `Nombre d'habitants : ${population.toLocaleString()}`;

            content.append(h2, h3, pop);

            card.append(imgContainer, content);
            cardContainter.append(card);
        })
}

window.addEventListener('load', fetchCountries);
inputSearch.addEventListener('input', displayCard);

inputRange.addEventListener('input', () => {
    displayCard();
    rangeValue.textContent = inputRange.value;
});

btnSort.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        sortMethod = e.target.id;
        displayCard();
    })
})