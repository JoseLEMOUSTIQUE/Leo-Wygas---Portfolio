document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    sendData();
});

function sendData() {
    var xhr = new XMLHttpRequest();
    var form = document.getElementById("contactForm");
    var formData = new FormData(form);

    xhr.open("POST", "formulaire.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // Affiche le message de confirmation
                alert("Votre message a été envoyé avec succès !");
                // Vous pouvez également rediriger l'utilisateur vers une page de confirmation
                // window.location.href = "confirmation.html";
            } else {
                // En cas d'erreur, affiche un message d'erreur
                alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
            }
        }
    };

    xhr.send(formData);
}

