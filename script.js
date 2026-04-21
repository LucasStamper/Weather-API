document.addEventListener('DOMContentLoaded', () => {

    // 1. CONFIGURATION & DOM
    const apiKey = "4c9d9e8f7b451652f02e3319b5774b9c";
    
    // Éléments principaux
    const searchBtn = document.getElementById('searchBtn');
    const cityInput = document.getElementById('cityInput');
    const weatherResult = document.getElementById('weatherResult');
    const randomContainer = document.getElementById('randomCities');

    // Éléments du Menu Latéral (Favoris)
    const sideMenu = document.getElementById('sideMenu');
    const openFavMenu = document.getElementById('openFavMenu');
    const closeFavMenu = document.getElementById('closeFavMenu');
    const favoriteContainer = document.getElementById('favoriteCities');

    // Liste pour les suggestions aléatoires
    const cityPool = ["Tokyo", "New York", "London", "Sydney", "Paris", "Berlin", "Dakar", "Bangkok", "Oslo"];

    // Initialisation des favoris depuis le stockage local
    let favorites = JSON.parse(localStorage.getItem('weatherFavs')) || [];

    // --- A. GESTION DU MENU LATÉRAL ---

    openFavMenu.addEventListener('click', () => {
        sideMenu.classList.add('active');
        displayFavorites(); // On rafraîchit la liste à l'ouverture
    });

    closeFavMenu.addEventListener('click', () => {
        sideMenu.classList.remove('active');
    });

    // --- B. LOGIQUE DE RECHERCHE MÉTEO ---

    /**
     * Appelle l'API OpenWeatherMap
     */
    async function getWeather(city) {
        // État de chargement
        weatherResult.innerHTML = `<p class="placeholder-text">Chargement de ${city}...</p>`;
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            displayWeather(data);

        } catch (error) {
            weatherResult.innerHTML = `
                <div class="error-msg">
                    <p style="color:#e74c3c">Erreur : ${error.message === 'city not found' ? 'Ville introuvable' : error.message}</p>
                </div>
            `;
        }
    }

    /**
     * Affiche les résultats dans la zone de droite
     */
    function displayWeather(data) {
        const { name, main, weather, wind } = data;
        const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
        const description = weather[0].description;
        const descFormatted = description.charAt(0).toUpperCase() + description.slice(1);

        weatherResult.innerHTML = `
            <div class="weather-info">
                <h2>${name}</h2>
                <p class="description-text">${descFormatted}</p>
                <img src="${iconUrl}" alt="icon" class="weather-icon">
                <p class="temp">${Math.round(main.temp)}°C</p>
                
                <button class="fav-btn" id="btnAddFav">⭐ Ajouter aux favoris</button>
                
                <div class="details">
                    <div class="detail-item">
                        <p><strong>Humidité</strong></p>
                        <p>${main.humidity}%</p>
                    </div>
                    <div class="detail-item">
                        <p><strong>Vent</strong></p>
                        <p>${Math.round(wind.speed * 3.6)} km/h</p>
                    </div>
                </div>
            </div>
        `;

        // Écouteur pour le bouton favori (généré dynamiquement)
        document.getElementById('btnAddFav').addEventListener('click', () => {
            addFavorite(name);
        });
    }

    // --- C. GESTION DES SUGGESTIONS (Villes Aléatoires) ---

    async function loadRandomCities() {
        if (!randomContainer) return;
        
        const shuffled = [...cityPool].sort(() => 0.5 - Math.random());
        const selectedCities = shuffled.slice(0, 3);
        randomContainer.innerHTML = "";

        for (const city of selectedCities) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                
                const miniCard = document.createElement('div');
                miniCard.className = 'mini-card';
                miniCard.innerHTML = `
                    <h4>${data.name}</h4>
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="icon">
                    <p class="mini-temp">${Math.round(data.main.temp)}°C</p>
                `;
                
                miniCard.addEventListener('click', () => getWeather(data.name));
                randomContainer.appendChild(miniCard);
            } catch (e) { console.error(e); }
        }
    }

    // --- D. GESTION DES FAVORIS (LocalStorage) ---

    function displayFavorites() {
        if (!favoriteContainer) return;
        favoriteContainer.innerHTML = favorites.length === 0 ? "<p>Aucun favori.</p>" : "";

        favorites.forEach(city => {
            const favCard = document.createElement('div');
            favCard.className = 'mini-card'; // Réutilisation du style CSS
            favCard.innerHTML = `
                <h4 style="cursor:pointer; color:white;">${city}</h4>
                <span class="delete-btn" style="color:#e74c3c; cursor:pointer; font-weight:bold;">✕</span>
            `;

            // Action : Rechercher la ville en cliquant sur le nom
            favCard.querySelector('h4').addEventListener('click', () => {
                getWeather(city);
                sideMenu.classList.remove('active'); // On ferme le menu après sélection
            });

            // Action : Supprimer le favori
            favCard.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                removeFavorite(city);
            });

            favoriteContainer.appendChild(favCard);
        });
    }

    function addFavorite(city) {
        if (!favorites.includes(city)) {
            favorites.push(city);
            localStorage.setItem('weatherFavs', JSON.stringify(favorites));
            alert(`${city} ajouté aux favoris !`);
        } else {
            alert(`${city} est déjà dans vos favoris.`);
        }
    }

    function removeFavorite(city) {
        favorites = favorites.filter(fav => fav !== city);
        localStorage.setItem('weatherFavs', JSON.stringify(favorites));
        displayFavorites();
    }

    // --- E. ÉCOUTEURS D'ÉVÉNEMENTS CLASSIQUES ---

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
            cityInput.value = "";
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchBtn.click();
    });

    // --- INITIALISATION ---
    loadRandomCities();
});