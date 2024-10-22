import { onLoad } from "./utils/utils.js";
import { logOut } from "./utils/utils.js";

const buttonLogOut = document.querySelector("#logOutButton");
buttonLogOut.addEventListener("click", () => {
    logOut();
    window.location.href = `./login/login.html`
})

onLoad()