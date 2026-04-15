let map;
let marker;
let currentPosition = null;

// Initialisation carte
function initMap(lat = 48.8566, lon = 2.3522) { // Paris par défaut
    map = L.map('map').setView([lat, lon], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
}

// Mise à jour GPS
function updatePosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    currentPosition = { lat, lon };

    // Centrer la carte
    map.setView([lat, lon], 16);

    // Mettre à jour le marqueur
    if (marker) {
        marker.setLatLng([lat, lon]);
    } else {
        marker = L.marker([lat, lon]).addTo(map);
    }
}

// Lancer le suivi GPS
function startGPS() {
    navigator.geolocation.watchPosition(updatePosition);
}

// Sauvegarde locale
function savePosition() {
    const name = document.getElementById("name").value;

    const data = {
        name,
        ...currentPosition
    };

    let positions = JSON.parse(localStorage.getItem("positions") || "[]");
    positions.push(data);

    localStorage.setItem("positions", JSON.stringify(positions));

    // Ajouter un marqueur sauvegardé
    L.marker([data.lat, data.lon])
        .addTo(map)
        .bindPopup(name);
}

// Init
initMap();
startGPS();
