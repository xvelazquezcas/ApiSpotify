//Logica de la aplicación

// Variables de autenticación
const clientId = '6e2d3fa056844bca8398c664c6e52a64'; // Reemplaza con tu Client ID de Spotify
const redirectUri = 'http://localhost:5500'; // Asegúrate de usar la misma URI registrada
const scopes = 'user-top-read playlist-read-private';

// Elementos de la interfaz
const loginButton = document.getElementById('login-button');
const tracksList = document.getElementById('tracks-list');
const playlistsList = document.getElementById('playlists-list');

// Autenticación con Spotify
loginButton.addEventListener('click', () => {
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
    window.location.href = spotifyAuthUrl;
});

// Obtener el token de acceso
function getAccessToken() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get('access_token');
}

const token = getAccessToken();
if (token) {
    fetchUserTopTracks(token);
    fetchUserPlaylists(token);
}

// Obtener las 5 canciones más escuchadas
function fetchUserTopTracks(token) {
    fetch('https://api.spotify.com/v1/me/top/tracks?limit=5', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const tracks = data.items;
        tracks.forEach(track => {
            const li = document.createElement('li');
            li.textContent = `${track.name} - ${track.artists[0].name}`;
            tracksList.appendChild(li);
        });
        document.getElementById('top-tracks').style.display = 'block';
    });
}

// Obtener listas de reproducción
function fetchUserPlaylists(token) {
    fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const playlists = data.items;
        playlists.forEach(playlist => {
            const li = document.createElement('li');
            li.textContent = playlist.name;
            playlistsList.appendChild(li);
        });
        document.getElementById('playlists').style.display = 'block';
    });
}
