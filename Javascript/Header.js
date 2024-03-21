document.addEventListener('DOMContentLoaded', function () {
    var menuItems = document.querySelectorAll('.dropdown-menu ul li a');
    var mouseInMenu = false;
    var mouseInSubMenu = false;

    menuItems.forEach(function (item) {
        item.addEventListener('mouseenter', function () {
            document.querySelectorAll('.parent').forEach(function (otherParent) {
                otherParent.classList.remove('active');
            });
            item.closest('.parent').classList.add('active');
        });
    });

    var mainMenu = document.querySelector('.dropdown-menu');

    mainMenu.addEventListener('mouseenter', function () {
        mouseInMenu = true;
    });

    mainMenu.addEventListener('mouseleave', function (event) {
        if (!event.relatedTarget || !event.relatedTarget.closest('.dropdown-menu')) {
            mouseInMenu = false;
            hideMenu();
        }
    });

    var subMenus = document.querySelectorAll('.sub-menu');
    subMenus.forEach(function (subMenu) {
        subMenu.addEventListener('mouseenter', function () {
            mouseInMenu = true;
        });

        var subSubMenus = subMenu.querySelectorAll('.sub-sub-menu');

        subSubMenus.forEach(function (subSubMenu) {
            var parentLink = subSubMenu.parentElement.querySelector('a');

            parentLink.addEventListener('mouseenter', function () {
                // Cacher les autres sous-sous-menus du même sous-menu
                subMenu.querySelectorAll('.sub-sub-menu').forEach(function (otherSubMenu) {
                    if (otherSubMenu !== subSubMenu) {
                        otherSubMenu.style.display = 'none';
                    }
                });
                subSubMenu.style.display = 'block';
                mouseInSubMenu = true;
            });

            parentLink.addEventListener('mouseleave', function () {
                if (!mouseInSubMenu && !mouseInMenu) {
                    subSubMenu.style.display = 'none';
                }
            });
        });

        subMenu.addEventListener('mouseleave', function () {
            if (!mouseInMenu && !mouseInSubMenu) {
                subMenu.style.display = 'none';
            }
        });
    });

    function hideMenu() {
        if (!mouseInMenu) {
            document.querySelectorAll('.parent').forEach(function (otherParent) {
                otherParent.classList.remove('active');
            });
        }
    }
});
