const { default: Swal } = require("sweetalert2");

//VER MÁS INFO
function verMas() {
    Swal.fire({
        text: "Especificaciones:",
        showConfirmButton: false
    })
}

//SEPARAR Y MOSTRAR ID EN BARRA DE NAVEGACIÓN
const query = window.location.search.split("=");
const idProducto = query[1]

// FILTRO DE PRODUCTOS
document.querySelectorAll('.deploy-arrow').forEach(function(arrow) {
    arrow.addEventListener('click', function(event) {
        event.preventDefault();

        const subcategory = arrow.closest('div').nextElementSibling;
        subcategory.classList.toggle('show-sub');
    });
});

const redirect = async (id, url) => {
    window.location.href = `${url}?product=${id}`;
}


//RENDERIZADO DE PRODUCTOS

const renderSelProduct = (Productos) => {
    const divContainer = document.querySelector(".product-container");
    const divImg = document.querySelector(".product-img");
    const divAbout = document.querySelector(".product-about");
    const divPurchase = document.querySelector(".purchase-buttons");
    const divPurchaseBtn = document.querySelector(".purchase");
    const divProductDesc = document.querySelector(".product-desc");

    const spanPrice = document.querySelector(".product-price");
    const pTitleDesc = document.querySelector("#title-desc");
}

//OBTENER PRODUCTOS (MODELO BACKEND)

const getProductos = async () => {
    try {
        const response = await axios.get(`../../producto/productos`);
        response.data.map((Productos) => {
            renderSelProduct(Productos)
        })
    } catch (error) {
        console.log(error);
        
    }
}

getProductos();