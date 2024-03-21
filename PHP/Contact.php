<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = sanitize_input($_POST["firstName"]);
    $lastName = sanitize_input($_POST["lastName"]);
    $email = sanitize_input($_POST["email"]);
    $phone = sanitize_input($_POST["phone"]);
    $subject = sanitize_input($_POST["subject"]);
    $message = sanitize_input($_POST["message"]);

    // Modèle de données
    $dataModel = "Nouveau message de contact\n\n"
                . "Prénom: $firstName\n"
                . "Nom: $lastName\n"
                . "Email: $email\n"
                . "Téléphone: $phone\n"
                . "Sujet: $subject\n"
                . "Message:\n$message";

    // Envoyer l'e-mail
    $to = "joselemoustique@gmail.com";
    $subject = "Nouveau message de contact";
    
    // Utilisez la fonction mail() pour envoyer l'e-mail
    mail($to, $subject, $dataModel);

    // Pour envoyer sur Discord, vous pouvez utiliser une bibliothèque comme DiscordPHP
    // Assurez-vous d'installer les dépendances avec composer install
    // Exemple d'utilisation DiscordPHP : https://github.com/teamreflex/DiscordPHP#example
}

function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
