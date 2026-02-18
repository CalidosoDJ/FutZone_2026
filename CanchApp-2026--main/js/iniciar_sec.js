function login(event) {
    event.preventDefault();

    let usuarioLogin = document.getElementById("usuarioLogin").value;
    let passwordLogin = document.getElementById("passwordLogin").value;

    let usuarioGuardado = localStorage.getItem("usuario");
    let passwordGuardado = localStorage.getItem("password");

    if (usuarioLogin == "") {
        alert("Ingrese el usuario ❌");
        return;
    }

    if (passwordLogin == "") {
        alert("Ingrese la contraseña ❌");
        return;
    }

    if (usuarioLogin == usuarioGuardado && passwordLogin == passwordGuardado) {
        alert("Inicio de sesión exitoso ✅⚽");
        window.location.href = "list_canchas.html";
    } else {
        alert("Usuario o contraseña incorrectos ❌");
    }
}
