const result =document.querySelector(".result");
const form = document.querySelector(".get-weather");
const city = document.querySelector("#city");
const country = document.querySelector("#country");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = city.value;
    const countryValue = country.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue},${countryValue}&appid=547a59fac46dbd95263bf9c9a5919c63&units=metric`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <h5>${data.name}, ${data.sys.country}</h5>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
            <h2>${Math.round(data.main.temp)}<sup>°C</sup></h2>
            <p>Max: ${Math.round(data.main.temp_max)}<sup>°C</sup></p>
            <p>Min: ${Math.round(data.main.temp_min)}<sup>°C</sup></p>
            `;
        })
        .catch((error) => {
            alert("Cidudad no encontrada,por favor ingrese una nueva.");
            console.error("Error fetching weather data:", error);
        });
});

// Lista de ciudades de ejemplo
const cities = [
    'Buenos Aires', 'Bogotá', 'Cartagena', 'Barcelona', 'Madrid', 'New York', 'Los Angeles',
    'Mexico City', 'Lima', 'Santiago', 'Montevideo', 'Quito', 'Caracas', 'San José'
];

// Selecciona los elementos del DOM
const cityInput = document.getElementById('city');
const suggestionsContainer = document.getElementById('suggestions');

// Función para mostrar sugerencias
cityInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    suggestionsContainer.innerHTML = '';

    if (query.length === 0) return;

    const filteredCities = cities.filter(city => city.toLowerCase().includes(query));
    filteredCities.forEach(city => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = city;
        suggestionItem.addEventListener('click', function() {
            cityInput.value = city;
            suggestionsContainer.innerHTML = '';
        });
        suggestionsContainer.appendChild(suggestionItem);
    });
});

// Ocultar sugerencias cuando se hace clic fuera del input
document.addEventListener('click', function(e) {
    if (!cityInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
        suggestionsContainer.innerHTML = '';
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Chequear si el usuario tiene una preferencia de modo oscuro almacenada
    const currentMode = localStorage.getItem('mode') || 'light-mode';
    body.classList.add(currentMode);
    darkModeToggle.textContent = currentMode === 'dark-mode' ? 'Modo Claro' : 'Modo Oscuro';

    // Cambiar entre modos al hacer clic en el botón
    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            darkModeToggle.textContent = 'Modo Oscuro';
            localStorage.setItem('mode', 'light-mode');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            darkModeToggle.textContent = 'Modo Claro';
            localStorage.setItem('mode', 'dark-mode');
        }
    });
});
