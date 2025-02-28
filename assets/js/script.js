document.addEventListener("DOMContentLoaded", function () {
    const abholungRadio = document.getElementById("abholung");
    const geschaeftsstelleRadio = document.getElementById("uebergabe-geschaeftsstelle");
    const kleidungDetails = document.getElementById("kleidungDetails");
    const abholungDetails = document.getElementById("abholungDetails");
    const plzInput = document.getElementById("plz");
    const form = document.getElementById("spendeForm");

    function toggleDetails() {
        if (geschaeftsstelleRadio.checked) {
            kleidungDetails.classList.remove("d-none");
            abholungDetails.style.display = "none";
        } else if (abholungRadio.checked) {
            kleidungDetails.classList.add("d-none");
            abholungDetails.style.display = "block";
        }
    }

    // Initiale Anzeige basierend auf der Auswahl
    toggleDetails();

    // Event-Listener hinzufügen
    geschaeftsstelleRadio.addEventListener("change", toggleDetails);
    abholungRadio.addEventListener("change", toggleDetails);

    // JSON-Datei mit den Geschäftsstellen laden
    fetch("assets/json/geschaeftsstellen_deutschland.json")
        .then(response => response.json())
        .then(data => {
            form.addEventListener("submit", function (event) {
                if (abholungRadio.checked) {
                    const eingegebenePLZ = plzInput.value.trim().substring(0, 2); // Erste 2 Stellen der PLZ
                    const erlaubtePLZs = data.geschaeftsstellen.map(stelle => stelle.plz.substring(0, 2));

                    if (!erlaubtePLZs.includes(eingegebenePLZ)) {
                        event.preventDefault();
                        alert("Diese Abholadresse liegt zu weit von einer Geschäftsstelle entfernt.");
                    }
                }
            });
        })
        .catch(error => console.error("Fehler beim Laden der JSON-Datei:", error));
});
