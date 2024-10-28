function getInputValues() {
    const productNameInput = document.querySelector("#productName");
    const productDescInput = document.querySelector("#productDesc");
    const productStockInput = document.querySelector("#stock");
    const productPriceInput = document.querySelector("#price");
    const productImgInput = document.querySelector("#image");

    const productNameValue = productNameInput.value;
    const productDescValue = productDescInput.value;
    const productStockValue = productStockInput.value;
    const productPriceValue = productPriceInput.value;
    const productImgValue = productImgInput.value;

    return {
        nombre : productNameValue,
        descripcion: productDescValue,
        stock: productStockValue,
        precio: productPriceValue,
        imgPortada: productImgValue
    }
}

const productRegister = async (e) => {
    e.preventDefault();
    const {nombre, descripcion, stock, precio, imgPortada} = getInputValues();

    const ObjectsToSend = {
        nombre,
        descripcion,
        stock,
        precio,
        imgPortada
    };

    console.log(ObjectsToSend)

    try {
        await axios.post("/producto/agregarProducto", ObjectsToSend)
        window.location.href = "./agregarProducto.html"
    } catch (error) {
        console.log(error.response.data);
        
    }
}

const productAdd = document.querySelector("#addProduct");
productAdd.addEventListener("click", (e) => {
    productRegister(e);
})