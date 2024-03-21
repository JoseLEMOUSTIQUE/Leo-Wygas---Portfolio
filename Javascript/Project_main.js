document.addEventListener("DOMContentLoaded", function () {
    const box = document.querySelector('.box');
    const section = document.querySelector('section');
    const separator = document.querySelector('.project-section:before');
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
            } else {
                closestPosition = 25; // Si dans la seconde moitié, mettre à 25%
            }
    
            box.style.setProperty('--bar-position', closestPosition + '%');
            section.style.flex = `0 0 ${closestPosition}%`;
    
            // Ajuster la position de la séparation
            separator.style.left = `calc(${closestPosition}% - 1px - ${boxWidth * 0.03}px)`; // Ajustement du décalage
        }
    });

    function resetBarPosition() {
        box.style.setProperty('--bar-position', '50%');
        section.style.flex = '0 0 50%';

        // Réinitialiser la position de la séparation
        separator.style.left = 'calc(50% - 1px)';
    }

    function findClosestPosition(currentPosition, positions) {
        return positions.reduce(function (prev, curr) {
            return (Math.abs(curr - currentPosition) < Math.abs(prev - currentPosition) ? curr : prev);
        });
    }
});