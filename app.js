function getPosition() {
    if (!navigator.geolocation) {
        console.log("Géolocalisation non supportée");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            console.log("Latitude:", lat);
            console.log("Longitude:", lon);
        },
        (err) => {
            console.log("Erreur:", err.message);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}
