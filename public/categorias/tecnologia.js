
// FILTRO DE PRODUCTOS
document.querySelectorAll('.deploy-arrow').forEach(function(arrow) {
    arrow.addEventListener('click', function(event) {
        event.preventDefault();

        const subcategory = arrow.closest('div').nextElementSibling;
        subcategory.classList.toggle('show-sub');
    });
});

