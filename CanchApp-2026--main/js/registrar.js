function registrar(event) {
    event.preventDefault();

    let usuario = document.getElementById("usuario").value;
    let correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let terminos = document.getElementById("terminos").checked;

    if (usuario == "") {
        alert("Ingrese un nombre de usuario ❌");
        return;
    }

    if (correo == "") {
        alert("Ingrese un correo ❌");
        return;
    }

    if (telefono == "") {
        alert("Ingrese un teléfono ❌");
        return;
    }

    if (password == "") {
        alert("Ingrese una contraseña ❌");
        return;
    }

    if (confirmPassword == "") {
        alert("Confirme su contraseña ❌");
        return;
    }

    if (password != confirmPassword) {
        alert("Las contraseñas no coinciden ❌");
        return;
    }

    if (terminos == false) {
        alert("Debe aceptar los términos ❌");
        return;
    }

    localStorage.setItem("usuario", usuario);
    localStorage.setItem("correo", correo);
    localStorage.setItem("telefono", telefono);
    localStorage.setItem("password", password);

    alert("Registro exitoso ✅⚽");

    window.location.href = "iniciarsec.html";
}
