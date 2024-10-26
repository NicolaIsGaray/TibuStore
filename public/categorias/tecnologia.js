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


//RENDERIZADO DE PRODUCTOS

const renderProduct = (Productos) => {
    const divProducts = document.querySelector(".products-card")

    const divItem = document.createElement("div");
    const productImg = document.createElement("img");
    const buyButton = document.createElement("button");
    const buyLogo = document.createElement("img");
    const toBuy = document.createElement("a");

    productImg.classList.add("item-img");
    buyButton.classList.add("buy-button");
    divItem.classList.add("item-main");

    toBuy.setAttribute("href", "./producto.html");
    buyLogo.setAttribute("src", "../media/icons/iconoCesta.png")
    buyLogo.setAttribute("alt", "producto");

    const spanBuy = document.createTextNode("Comprar ");

    let imgVerify = Productos.imgPortada ? Productos.imgPortada : "../media/icons/defaultImg"
    productImg.setAttribute("src", imgVerify);

    buyButton.appendChild(spanBuy);
    buyButton.appendChild(buyLogo);
    toBuy.appendChild(buyButton);
    divItem.appendChild(toBuy);
    divItem.appendChild(productImg);

    divProducts.appendChild(divItem);

    console.log(Productos._id);
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