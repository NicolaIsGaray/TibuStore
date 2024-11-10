const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getInputValues() {
    const nombreInput = document.querySelector("#name");
    const userInput = document.querySelector("#userName");
    const emailInput = document.querySelector("#email");
    const contraseñaInput = document.querySelector("#contra");
    const apellidoInput = document.querySelector("#lastName");

    const nombreValue = nombreInput.value;
    const userValue = userInput.value;
    const emailValue = emailInput.value;
    const contraseñaValue = contraseñaInput.value;
    const apellidoValue = apellidoInput.value;

    if (!nombreValue) {
        Swal.fire({
            title: 'Vaya. Eso no debió de suceder.',
            text: 'El nombre no puede estar vacío.',
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return null
    } else if (nombreValue.length < 2) {
        Swal.fire({
            title: 'Vaya. Eso no debió de suceder.',
            text: 'El nombre debe tener al menos 2 caracteres.',
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return null
    }

    if (!apellidoValue) {
        Swal.fire({
            title: 'Vaya. Eso no debió de suceder.',
            text: 'El apellido no puede estar vacío.',
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return null
    } else if (apellidoValue.length < 3) {
        Swal.fire({
            title: 'Vaya. Eso no debió de suceder.',
            text: 'El apellido debe tener al menos 3 caracteres.',
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return null
    }

    if (!apellidoValue) {
        Swal.fire({
            title: 'Vaya. Eso no debió de suceder.',
            text: 'El nombre de usuario no puede estar vacío.',
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return null
    } else if (apellidoValue.length < 3) {
        Swal.fire({
            title: 'Vaya. Eso no debió de suceder.',
            text: 'El nombre de usuario debe tener al menos 3 caracteres.',
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return null
    }

    if (!emailValue || !regex.test(emailValue)) {
        Swal.fire({
            title: 'Vaya. Eso no debió de suceder.',
            text: 'Ingresa un correo válido.',
            imageUrl: 'https://media.tenor.com/q-zZSTX6jSIAAAAC/mail-download.gif',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Email',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });

        return null
    }

    if (contraseñaValue === '' || contraseñaValue.length < 8) {
        Swal.fire({
            title: 'Vaya. Eso no debió de suceder.',
            text: 'La contraseña no puede estar vacía o ser inferior a 8 caracteres.',
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return null
    }

    if (!nombreValue && !emailValue && !contraseñaValue && !apellidoValue) {
        Swal.fire(
            '¿Eh?',
            'Creo que esto está algo vacío...',
            'question'
        );
    }


    return {
        nombre: nombreValue,
        email: emailValue,
        username: userValue,
        contraseña: contraseñaValue,
        apellido: apellidoValue
    };
}

const userRegister = async (e) => {
    e.preventDefault();
    const ObjectToSend = getInputValues();

    try {
        await axios.post("../../usuario/signUp", ObjectToSend);
        window.location.href = "./login.html";
    } catch (error) {
        console.log(error);
    }
};

const buttonRegister = document.querySelector("#registerButton");
buttonRegister.addEventListener("click", (e) => {
    userRegister(e);
});