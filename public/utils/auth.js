const onLoad = async () => {
    try {
      const response = await axios.get("/usuario/me");
      const getLogRegBtn = document.querySelector(".userOptions-container");
      
      if (response) {
        getLogRegBtn.innerHTML = ' '
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  export { onLoad }