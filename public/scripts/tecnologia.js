document.querySelectorAll('.deploy-arrow').forEach(function(arrow) {
    arrow.addEventListener('click', function(event) {
        event.preventDefault(); // Evita el comportamiento predeterminado del enlace

        // Encuentra el submenú más cercano y alterna la clase 'show-sub'
        const subcategory = arrow.closest('div').nextElementSibling; // Selecciona el submenú
        subcategory.classList.toggle('show-sub'); // Alterna la clase 'show-sub'
    });
});

const falseBuy = document.getElementById('prueba')

falseBuy.addEventListener("click", function(event) {
    event.preventDefault();
    Swal.fire({
        title: "The Internet?",
        text: "That thing is still around?",
        icon: "question"
      });
})

