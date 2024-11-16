async function verificarAccesoAdmin() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("No tienes acceso. Por favor, inicia sesión.");
        window.location.href = "../user/login.html"; // Redirigir a la página de login
        return;
    }

    try {
        const response = await axios.get("/usuario/admin-only", {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log(response.data.message); // Mensaje de éxito
    } catch (error) {
        console.error("Acceso denegado:", error.response?.data?.message || error.message);
        alert("Acceso denegado. No tienes permisos para ver esta página.");
        window.location.href = "/"; // Redirigir a otra página
    }
}

verificarAccesoAdmin();

const divProductOpt = document.querySelector(".product-options");
const divSectionOpt = document.querySelector(".section-options");
const divAboutOpt = document.querySelector(".about-options");
const divContactOpt = document.querySelector(".contact-options");

const liProductOpt = document.querySelector("#product-option");
const liSectionOpt = document.querySelector("#section-option");
const liAboutOpt = document.querySelector("#about-option");
const liContactOpt = document.querySelector("#contact-option");

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("optionS")) {
        console.log("ID del elemento clicado:", event.target.id);
        if (event.target.id === 'product-option') {
            divAboutOpt.style.display = "none";
            divSectionOpt.style.display = "none";
            divContactOpt.style.display = "none";
            divProductOpt.style.display = "flex";

            liSectionOpt.classList.remove("selected-option");
            liAboutOpt.classList.remove("selected-option");
            liContactOpt.classList.remove("selected-option");
            liProductOpt.classList.toggle("selected-option");

        }
        if (event.target.id === 'section-option') {
            divAboutOpt.style.display = "none";
            divProductOpt.style.display = "none";
            divContactOpt.style.display = "none";
            divSectionOpt.style.display = "flex";

            liProductOpt.classList.remove("selected-option");
            liAboutOpt.classList.remove("selected-option");
            liContactOpt.classList.remove("selected-option");
            liSectionOpt.classList.toggle("selected-option");
        }
        if (event.target.id === 'about-option') {
            divSectionOpt.style.display = "none";
            divProductOpt.style.display = "none";
            divContactOpt.style.display = "none";
            divAboutOpt.style.display = "flex";

            liSectionOpt.classList.remove("selected-option");
            liProductOpt.classList.remove("selected-option");
            liContactOpt.classList.remove("selected-option");
            liAboutOpt.classList.toggle("selected-option");
        }
        if (event.target.id === 'contact-option') {
            divSectionOpt.style.display = "none";
            divProductOpt.style.display = "none";
            divAboutOpt.style.display = "none";
            divContactOpt.style.display = "flex";

            liSectionOpt.classList.remove("selected-option");
            liProductOpt.classList.remove("selected-option");
            liAboutOpt.classList.remove("selected-option");
            liContactOpt.classList.toggle("selected-option");
        }
    }
});

const addProductPage = document.getElementById('addProductPage');

const goToAdd = async () => {
    window.location.href = '../producto/agregarProducto.html';
}

addProductPage.addEventListener('click', (e) => {
    goToAdd(e);
});

function getCategoryInput() {
    const addInput = document.getElementById("newCtgr");

    const addValue = addInput.value;

    if (addValue.length <= 1) {
        console.log("Error, no puede ser menor a 1.");
    }

    return {
        nombreCategoria: addValue
    }
}

const categoryRegister = async (e) => {
    e.preventDefault();
    const {nombreCategoria} = getCategoryInput();

    if (!nombreCategoria) {
        Swal.fire({
            icon: "error",
            title: "¡Hey!",
            text: "El nombre no puede estar vacio."
          });
        return;
    }

    const CategoryToSend = {
        nombreCategoria
    };

    try {
        await axios.post("/producto/categoria", CategoryToSend)
        window.history.back();
    } catch (error) {
        console.log(error.response.data);
    }
}

const categoryAdd = document.querySelector("#addCategoryBtn");
categoryAdd.addEventListener("click", (e) => {
    categoryRegister(e);
});

const formularioAcerca = document.getElementById("about-form");
const acercaInfoInput = document.getElementById("new-info");

const editarAcerca = async () => {
    const acercaInfo = acercaInfoInput.value;

    try {
        const response = await axios.post('/pagina/editar-acerca', { acercaInfo });
        alert("Información actualizada con éxito.")
    } catch (error) {
        console.error("Error al enviar la solicitud:", error.response.data);
    }
}

const formularioContacto = document.getElementById("contact-form");
const contactoInfoInput = document.getElementById("new-contact");

const editarContacto = async () => {
    const contactoInfo = contactoInfoInput.value;

    try {
        const response = await axios.post('/pagina/editar-contacto', { contactoInfo });
        alert("Información actualizada con éxito.")
    } catch (error) {
        console.error("Error al enviar la solicitud:", error.response.data);
    }
}