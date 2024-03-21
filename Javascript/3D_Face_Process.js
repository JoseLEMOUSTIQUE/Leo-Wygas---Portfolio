console.log("Script Main executed");

// Script 3D Face Process

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        if (isAtBottom()) {
            scrollToTop();
        } else {
            scrollToBottom();
        }
    } else if (event.code === "ArrowUp") {
        scrollToTop();
    } else if (event.code === "ArrowDown") {
        if (!isAtBottom()) {
            scrollToBottom();
        }
    }
});

function isAtBottom() {
    // Vérifier si l'utilisateur est proche du bas de la page
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;

    return scrollPosition > documentHeight - windowHeight - 10; // Ajuster la marge si nécessaire
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function scrollToBottom() {
    const box2Top = document.querySelector("footer").offsetTop;
    window.scrollTo({
        top: box2Top,
        behavior: "smooth"
    });
}