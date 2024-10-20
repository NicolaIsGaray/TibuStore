document.querySelectorAll('.deploy-arrow').forEach(function(arrow) {
    arrow.addEventListener('click', function(event) {
        event.preventDefault(); // Evita el comportamiento predeterminado del enlace

        // Encuentra el submenú más cercano y alterna la clase 'show-sub'
        const subcategory = arrow.closest('div').nextElementSibling; // Selecciona el submenú
        subcategory.classList.toggle('show-sub'); // Alterna la clase 'show-sub'
    });
});