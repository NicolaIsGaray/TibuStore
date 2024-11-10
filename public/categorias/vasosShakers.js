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

//RENDERIZADO DE PRODUCTOS

const renderProduct = (Productos) => {
    const sectionName = document.querySelector("#currentSect").textContent;

    const divProducts = document.querySelector(".products-card");
    const divFilter = document.querySelector(".search-filter");

    const divItem = document.createElement("div");
    const productImg = document.createElement("img");
    const buyButton = document.createElement("button");
    const buyLogo = document.createElement("img");

    productImg.classList.add("item-img");
    buyButton.classList.add("buy-button");
    divItem.classList.add("item-main");

    buyLogo.setAttribute("src", "../media/icons/iconoCesta.png");
    buyLogo.setAttribute("alt", "producto");

    const spanBuy = document.createTextNode("Comprar ");

    const testFilter = divFilter.querySelector("h3").textContent = sectionName;

    let imgVerify = Productos.imgPortada ? Productos.imgPortada : "../media/icons/default.png"
    productImg.setAttribute("src", imgVerify);

    buyButton.appendChild(spanBuy);
    buyButton.appendChild(buyLogo);
    divItem.appendChild(buyButton);
    divItem.appendChild(productImg);

    if (Productos.categoria === 'vasosAndShakers') {
        divProducts.appendChild(divItem);
    }

    console.log(Productos._id);

    buyButton.addEventListener("click", () => {
        redirect(Productos._id,`./producto.html`)
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