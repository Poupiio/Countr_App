const cardContainter = document.querySelector('.card-container');
const rangeValue = document.getElementById('range-value');

range.addEventListener('input', updateRangeValue);

// Fonction pour mettre à jour la valeur dans le span
function updateRangeValue() {
    // Récupère la valeur actuelle du range
    const newRange = range.value;

    // Met à jour le contenu du span avec la valeur du range
    rangeValue.textContent = newRange;
}

const fetchCountries = async () => {
    const fetchData = await fetch("https://restcountries.com/v3.1/all");
    const data = await fetchData.json();

    return data;
}

const createCard = async () => {
    const countriesData = await fetchCountries();
    console.log(countriesData);
   
    countriesData.map((data) => {
        const title = data.translations.fra.common;
        const flagUrl = data.flags.png;
        const capital = data.capital;
        const population = data.population;

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
        pop.textContent = `Nombre d'habitants : ${population}`;

        content.append(h2, h3, pop);

        card.append(imgContainer, content);
        cardContainter.append(card);
    })
}

createCard()

