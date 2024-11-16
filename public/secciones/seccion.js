//Verificacion de Rol
const obtenerAdminBtn = document.querySelector(".adm-b");
const getLogRegBtn = document.querySelector(".userOptions-container")

window.onload = () => {
    obtenerAdminBtn.style.display = "none";
    getLogRegBtn.style.display = "none"
}

async function obtenerRolUsuario() {
    const token = localStorage.getItem("token"); // Obtener el token almacenado en localStorage

    if (!token) {
        alert("No estás autenticado.");
        return;
    }

    try {
        // Hacer la solicitud para obtener el rol
        const response = await axios.get('/usuario/verificar-rol', {
            headers: {
                Authorization: `Bearer ${token}` // Enviar el token en los headers
            }
        });

        console.log('Respuesta del servidor:', response.data); // Imprimir toda la respuesta para depuración

        const isAdmin = response.data.isAdmin; // Suponiendo que el backend te está enviando isAdmin como true/false

        if (isAdmin) {
            console.log("El usuario es un administrador.");
            alert("Eres admin.")
            // Aquí puedes mostrar los botones de admin
            obtenerAdminBtn.style.display = "flex"; // Mostrar los botones para admin
            getLogRegBtn.innerHTML = ' '
        } else {
            console.log("El usuario es un cliente.");
            // Aquí puedes mostrar los botones de cliente
            obtenerAdminBtn.style.display = "none"; // Ocultar botones de admin si es cliente
            getLogRegBtn.innerHTML = ' '
            document.getElementById("clienteButton").style.display = "block"; // Mostrar botones de cliente
        }

    } catch (error) {
    }
}

// Llamada para verificar el rol y ejecutar la acción
obtenerRolUsuario();

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

const redirect = (id, url) => {
    window.location.href = `${url}?product=${id}`;
}


const addProductPage = document.getElementById('addProductPage');

const goToAdd = async () => {
    window.location.href = '../producto/agregarProducto.html';
}

addProductPage.addEventListener('click', (e) => {
    goToAdd(e);
})

async function obtenerCategorias() {
    try {
        const respuesta = await fetch('/producto/categorias');
        const categorias = await respuesta.json();

        console.log(categorias);
        
    } catch (error) {
        console.error("Error al obtener categorías:", error);
    }
}

// Llamar a la función cuando la página esté lista
document.addEventListener("DOMContentLoaded", obtenerCategorias);


//Obtener Categorias
async function obtenerCategorias() {
    try {
        const response = await axios.get('/producto/categorias'); // URL de la API que devuelve las categorías
        const categorias = response.data; // Almacena las categorías obtenidas
        return categorias; // Devuelve las categorías obtenidas
    } catch (error) {
        console.error('Error al obtener categorías:', error);
    }
}

//RENDERIZADO DE PRODUCTOS

const renderProduct = (Productos) => {
    // General
    const sectionName = document.querySelector("#currentSect").textContent;

    const divProducts = document.querySelector(".products-card");
    const divFilter = document.querySelector(".search-filter");

    const divItem = document.createElement("div");
    const productImg = document.createElement("img");
    const buyButton = document.createElement("button");
    const buyLogo = document.createElement("img");
    const productName = document.createElement("span");

    productName.classList.add("product-name");
    productImg.classList.add("item-img");
    buyButton.classList.add("buy-button");
    divItem.classList.add("item-main");
    divItem.classList.add("seccion");

    buyLogo.setAttribute("src", "../media/icons/iconoCesta.png");
    buyLogo.setAttribute("alt", "producto");

    const spanBuy = document.createTextNode("Comprar ");

    let nameVerify = Productos.nombre ? Productos.nombre : "N/A";
    productName.textContent = nameVerify;

    let imgVerify = Productos.imgPortada ? Productos.imgPortada : "../media/icons/default.png"
    productImg.setAttribute("src", imgVerify);
    
    buyButton.appendChild(spanBuy);
    buyButton.appendChild(buyLogo);
    divProducts.appendChild(divItem);

    //División de "Sección"

    const testFilter = divFilter.querySelector("h3").textContent = sectionName;

    async function cargarCategorias() {
        const categorias = await obtenerCategorias();
    
        console.log(categorias);

        const divByCat = document.createElement("div");
        
        categorias.forEach(categoria => {
            // Comprobamos si ya existe un div con el id basado en nombreCategoria
            const divExistente = document.getElementById(categoria.nombreCategoria);

            // Si el div no existe, creamos un nuevo div con el id basado en nombreCategoria
            divExistente
                ? console.log(`El div con id ${categoria.nombreCategoria} ya existe`)
                : (() => {
                     divItem.setAttribute("id", categoria.nombreCategoria);
        })();

        divExistente
                ? console.log(`El div con id ${categoria.nombreCategoria} pertenece.`)
                : (() => {
                     divItem.style.display = "flex";
        })();

            divByCat.style.display = "flex";
            divByCat.style.flexDirection = "column";

            divByCat.appendChild(productImg);
            divByCat.appendChild(productName);
            divByCat.appendChild(buyButton);
            divItem.appendChild(divByCat);
        });
        
    }
    
    cargarCategorias();

    //Debug
    console.log(Productos._id);

    //Comprar producto
    buyButton.addEventListener("click", () => {
        redirect(Productos._id,`../producto/producto.html`)
    })
}

//OBTENER PRODUCTOS (MODELO BACKEND)

const getProductos = async () => {
    try {
        const response = await axios.get(`../../producto/productos`);
        response.data.map((Productos) => {
            renderProduct(Productos)
        })
    } catch (error) {
        console.log(error);
        
    }
}

getProductos();