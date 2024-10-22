const objectToSend = {};
function getInputValues() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (objectToSend[input.id] = input.value));
}

const redirect = () => {
    window.location.href = "../";
}

const logInUser = async (e) => {
    e.preventDefault();
    getInputValues();
    try {
        const response = await axios.post("../../usuario/logIn", objectToSend);
        redirect()
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Swal.fire({
              title: 'Error',
              text: 'Credenciales no válidas. Verifica tu usuario y contraseña.',
              icon: 'error',
              customClass: {
                title: "swalTitle"
              }
            });
          } else {
            window.location.href = "./login.html";
          }
    }
};

const logInButton = document.querySelector("#logIn");
logInButton.addEventListener("click", (e) => logInUser(e));