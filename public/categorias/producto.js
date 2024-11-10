//VER MÁS INFO
function verMas() {
    Swal.fire({
        title: "Aqui va una ficha tecnica o eso",
        text: "Pronto",
        icon: "question"
      });
}

// SEPARAR Y MOSTRAR ID EN BARRA DE NAVEGACIÓN
const query = window.location.search.split("=");
const idProduct = query[1];

const redirect = async (id, url) => {
    window.location.href = `${url}?product=${id}`;
    console.log(id);
    
}

function renderProduct(Productos) {
    const titleContent = document.querySelector("title");

    const divProductAbout = document.querySelector(".product-about");
    const divProductContainer = document.querySelector(".product-container");
    const divProductImg = document.querySelector(".product-img");
    const divPriceOptions = document.querySelector(".product-price-options");
    const divPurchaseButtons = document.querySelector(".purchase-buttons");
    const divProductNameDesc = document.querySelector(".name-desc");

    const productName = document.querySelector(".product-name");
    const productDetails = document.querySelector(".more-details");
    const confirmBuy = document.querySelector(".inBuyButton");
    const productDesc = document.querySelector("#description-p");
    const productPrice = document.querySelector(".product-price");
    const stockCheck = document.querySelector(".stock-available");

    const isStock = document.createElement("span");
    const productDescName = document.createElement("span");
    const productImg = document.createElement("img");

    let nameVerify = Productos.nombre ? Productos.nombre : error;
    titleContent.textContent = nameVerify;
    productName.textContent = nameVerify;
    productDescName.textContent = nameVerify;

    let descVerify = Productos.descripcion ? Productos.descripcion : error;
    productDesc.textContent = descVerify;

    let imgVerify = Productos.imgPortada ? Productos.imgPortada : ("../media/icons/default.png");
    productImg.setAttribute("src", imgVerify);

    let priceVerify = Productos.precio ? Productos.precio : error;
    let precioFormateado = new Intl.NumberFormat('es-ES').format(priceVerify);
    productPrice.textContent = '$ ' + precioFormateado;

    let stockVerify = Productos.stock ? Productos.stock : error;
    if (!stockVerify) {
        isStock.textContent = 'N/A'
    } else {
        isStock.textContent = 'Restantes: ' + stockVerify;
    }

    divProductImg.append(productImg);
    divProductNameDesc.append(productDescName);
    divProductNameDesc.append(productDesc);
    stockCheck.append(isStock);
}


const getProduct = async () => {
  try {
    const response = await axios.get(`../../producto/selected/${idProduct}`);
      console.log(response);
      // Envolver el objeto en un array si no es un array
    const products = Array.isArray(response.data) ? response.data : [response.data];

    // Ahora puedo usar map
    products.map((Productos) => {
      renderProduct(Productos);
    });

  } catch (error) {
      console.log(error);
  }
}

getProduct()