function getInputValues() {
  const userInput = document.querySelector("#username");
  const passInput = document.querySelector("#password");

  const userValue = userInput.value;
  const passValue = passInput.value;

  return {
    username: userValue,
    contraseña: passValue
  }
}

const redirect = () => {
    console.log("Redirigiendo a index.html");
    window.location.href = "../index.html";
}

const logInUser = async (e) => {
    e.preventDefault();
    const objectToSend = getInputValues();
    try {
        const response = await axios.post("../../usuario/logIn", objectToSend);
        if (response.status === 200) {
            redirect(); // Si la respuesta es exitosa, redirigir
        }
    } catch (error) {
        console.log("Error al iniciar sesión:", error);
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
            // Si hay otro tipo de error, redirigir a la página de login
            // window.location.href = "./login.html";
            console.log(error.response.data);
            
        }
    }
};

const logInButton = document.querySelector("#logIn");
logInButton.addEventListener("click", (e) => logInUser(e));