const onLoad = async () => {
    try {
      const response = await axios.get("../../usuario/me");
      const userName = document.querySelector("#userName") //Cambiar.
      userName.textContent = `${response.data.nombre} ${response.data.apellido}`;
      userName.style.fontWeigth = "bold"
    } catch (error) {
      window.location.href = "../user/login.html"
    }
  };

  const logOut = async () => {
    try {
      const response = await axios.post("../../usuario/logOut")
    } catch (error) {
      console.log(error.message);
    }
  }

  export {onLoad, logOut}