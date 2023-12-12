// Funkcija sugeneruoja atsitiktinę spalvą is HEX formato
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.addEventListener('DOMContentLoaded', function () {
    const jokeInput = document.querySelector('.form input[name="joke"]');
    const jokeContainer = document.querySelector('.container');

    jokeInput.addEventListener('input', function () {
        const searchTerm = jokeInput.value.trim(); //.trim(): Tai yra teksto eilutės metodas, kuris pašalina tarpus (tiek iš pradžių, tiek iš galo) iš teksto eilutės. Tai naudinga, nes naudotojai gali įvesti tarpus prieš ar po teksto.
                                                    //Šis kintamasis atstovauja paieškos žodžiui ar frazei, kurią naudotojas įvedė į įvesties lauką.
        if (searchTerm !== '') {
            // Išvalo esamus juokelius
            jokeContainer.innerHTML = '';

            // Siuncia užklausą į API
            fetch(`https://api.chucknorris.io/jokes/search?query=${searchTerm}`)
                .then(response => data=response.json()) 
                .then(data => {                

                    // Sukuria Bootstrap "row" elementą
                    const row = document.createElement('div');
                    row.classList.add('row');
                    row.style.padding = '50px';                    

                    // Atvaizduoja kiekvieną gautą juokelį
                    data.result.forEach(joke => {
                        const col = document.createElement('div');
                        col.classList.add('col-sm-3'); 
                        col.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-center');
                        col.style.backgroundColor = getRandomColor();
                        col.style.margin ='5px';
                        col.style.padding = '10px';
                        col.style.width = '290px';
                        col.style.height = 'auto';
                        col.innerHTML = `<p>${joke.value}</p>`;
                        row.appendChild(col);
                    });

                    // Įtraukiu "row" į "container"
                    jokeContainer.appendChild(row);
                })
                .catch(error => console.error('Klaida gavus juokelius:', error.message));
        }
    });
});
