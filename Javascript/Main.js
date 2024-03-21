console.log("Script Main executed");

// JavaScript

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

document.addEventListener("wheel", function(event) {
    // Utiliser deltaY pour déterminer la direction du défilement
    if (event.deltaY > 0) {
        // Vers le bas
        scrollToBottom();
    } else if (event.deltaY < 0) {
        // Vers le haut
        scrollToTop();
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
    const box2Top = document.querySelector(".box:nth-child(2)").offsetTop;
    window.scrollTo({
        top: box2Top,
        behavior: "smooth"
    });
}

// main.js

document.addEventListener("DOMContentLoaded", function () {
    const box = document.querySelector('.box');
    const section = document.querySelector('section');
    const separator = document.querySelector('.project-section:before');
    const premier = document.querySelector('.first-section .main-description');
    const second = document.querySelector('.project-section .main-description')
    let isMouseOverBox = false;

    box.addEventListener('mouseenter', function () {
        isMouseOverBox = true;
    });

    box.addEventListener('mouseleave', function () {
        isMouseOverBox = false;
        resetBarPosition();
    });

    box.addEventListener('mousemove', function (e) {
        if (isMouseOverBox) {
            const mouseX = e.clientX - box.getBoundingClientRect().left;
            const boxWidth = box.offsetWidth;
    
            // Positions possibles : 25%, 50%, 75%
            const barPositions = [25, 50, 75];
            let closestPosition = findClosestPosition((mouseX / boxWidth) * 100, barPositions);
    
            // Mettre à jour la position de la barre en fonction de la position de la souris dans la première moitié ou la seconde moitié
            if (mouseX < boxWidth / 2) {
                closestPosition = 75; // Si dans la première moitié, mettre à 75%
                premier.style.opacity = '1';
                second.style.opacity = '0' ;
            } else {
                closestPosition = 25; // Si dans la seconde moitié, mettre à 25%
                premier.style.opacity = '0';
                second.style.opacity = '1' ;
            }
    
            box.style.setProperty('--bar-position', closestPosition + '%');
            section.style.flex = `0 0 ${closestPosition}%`;
    
            // Ajuster la position de la séparation
            separator.style.left = `calc(${closestPosition}% - 1px - ${boxWidth * 0.03}px)`; // Ajustement du décalage
        }
    });

    function resetBarPosition() {
        box.style.setProperty('--bar-position', '46%');
        section.style.flex = '0 0 46%';
        premier.style.opacity = '0';
        second.style.opacity = '0';

        // Réinitialiser la position de la séparation
        separator.style.left = 'calc(50% - 1px)';
    }

    function findClosestPosition(currentPosition, positions) {
        return positions.reduce(function (prev, curr) {
            return (Math.abs(curr - currentPosition) < Math.abs(prev - currentPosition) ? curr : prev);
        });
    }
});
