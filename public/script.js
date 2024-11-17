//Verificacion de Rol
const obtenerAdminBtn = document.querySelector(".adm-b");
const getLogRegBtn = document.querySelector(".userOptions-container")

window.onload = () => {
    obtenerAdminBtn.style.display = "none";
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

        window.onload = () => {
            getLogRegBtn.style.display = "none";  
        } 
        
        if (isAdmin) {
            console.log("El usuario es un administrador.");
            alert("Eres admin.")
            // Aquí puedes mostrar los botones de admin
            obtenerAdminBtn.style.display = "flex"; // Mostrar los botones para admin
            getLogRegBtn.innerHTML = ' '
        } else {
            console.log("El usuario es un cliente.");
            // Aquí puedes mostrar los botones de cliente
            obtenerAdminBtn.innerHTML = ' '; // Ocultar botones de admin si es cliente
            document.getElementById("clienteButton").style.display = "block"; // Mostrar botones de cliente
        }

    } catch (error) {
    }
}

// Llamada para verificar el rol y ejecutar la acción
obtenerRolUsuario();

//Obtener Categorias
async function obtenerCategorias() {
    try {
        const response = await axios.get('/producto/categorias');
        const categorias = response.data; // Almacena las categorías obtenidas
        return categorias;
    } catch (error) {
        console.error('Error al obtener categorías:', error);
    }
}

async function trySeccion() {
    const seccion = await obtenerCategorias();
    window.location.href = `./categorias/seccion.html?seccion=${seccion.nombreCategoria}`
}

const redirect = (id, url) => {
    window.location.href = `${url}?product=${id}`;
}

const renderProduct = (Productos) => {
    const ulProducts = document.querySelector(".products-main")
    const categoryUl1 = document.querySelector("#enOferta");
    const categoryUl2 = document.querySelector("#vasos-shakers");
    const categoryUl3 = document.querySelector("#suplementos");

    const liItem = document.createElement("li");
    const productName = document.createElement("span");
    const productImg = document.createElement("img");
    const buyButton = document.createElement("button");
    const buyLogo = document.createElement("img");

    const divItemContent = document.createElement("div");

    divItemContent.classList.add("item-content");
    productImg.classList.add("item-img");
    buyButton.classList.add("buy-button");
    liItem.classList.add("item-main");

    buyLogo.setAttribute("src", "../media/icons/iconoCesta.png");
    buyLogo.setAttribute("alt", "producto");

    const spanBuy = document.createTextNode("Comprar ");

    let nameVerify = Productos.nombre ? Productos.nombre : "Null"
    productName.textContent = nameVerify;

    let imgVerify = Productos.imgPortada ? Productos.imgPortada : "../media/icons/default.png"
    productImg.setAttribute("src", imgVerify);

    if (Productos.categoria === 'oferta') {
        categoryUl1.append(liItem);
    }

    if (Productos.categoria === 'vasosAndShakers') {
        categoryUl2.append(liItem);
    }

    if (Productos.categoria === 'suplemento') {
        categoryUl3.append(liItem);
    }

    buyButton.appendChild(spanBuy);
    buyButton.appendChild(buyLogo);
    liItem.appendChild(productImg);
    divItemContent.appendChild(productName);
    divItemContent.appendChild(buyButton);
    liItem.appendChild(divItemContent)

    console.log(Productos._id);

    buyButton.addEventListener("click", () => {
        redirect(Productos._id,`./categorias/producto.html`)
    })
}

async function buscarProducto() {
    const query = document.getElementById('searchInput').value;

    if (!query) {
        alert("Por favor, ingresa un término de búsqueda.");
        return;
    }

    try {
        const respuesta = await axios.get(`../../producto/buscar?query=${query}`);
        const productos = respuesta.data;

        // Redirige al usuario al primer producto encontrado
        if (productos.length > 0) {
            window.location.href = `../../producto/${productos[0]._id}`;  // Redirige al HTML del producto
        } else {
            alert("No se encontró el producto.");
        }
    } catch (error) {
        console.error("Error al buscar el producto:", error.response.data);
    }
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