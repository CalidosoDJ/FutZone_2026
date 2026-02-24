// ==============================================
// PASO 1: Leer datos de la URL (vienen de list_canchas.html)
// ==============================================
function obtenerParametrosURL() {
    const params = new URLSearchParams(window.location.search);
    
    return {
        id_cancha: params.get('id') || 'DESCONOCIDO',
        nombre_cancha: params.get('nombre') || 'Cancha sin nombre',
        precio: parseInt(params.get('precio')) || 45000
    };
}

// Guardar datos de la cancha en localStorage
const datosCancha = obtenerParametrosURL();
localStorage.setItem('cancha_temp', JSON.stringify({
    id_cancha: datosCancha.id_cancha,
    nombre_cancha: datosCancha.nombre_cancha,
    precio: datosCancha.precio
}));

console.log('Datos de cancha guardados:', datosCancha);

// ==============================================
// PASO 2: Slider de imágenes (tu código original)
// ==============================================
let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");
let img3 = document.getElementById("img3");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let contador = 1;

function mostrarImagen() {
    img1.classList.remove("active");
    img2.classList.remove("active");
    img3.classList.remove("active");

    if (contador == 1) img1.classList.add("active");
    else if (contador == 2) img2.classList.add("active");
    else if (contador == 3) img3.classList.add("active");
}

next.onclick = function () {
    contador++;
    if (contador > 3) contador = 1;
    mostrarImagen();
};

prev.onclick = function () {
    contador--;
    if (contador < 1) contador = 3;
    mostrarImagen();
};

setInterval(function () {
    contador++;
    if (contador > 3) contador = 1;
    mostrarImagen();
}, 4000);

// ==============================================
// PASO 3: Formulario de reserva (sin fecha/hora)
// ==============================================
let form = document.getElementById("formReserva");
let mensaje = document.getElementById("mensaje");

form.onsubmit = function (e) {
    e.preventDefault();

    // Obtener valores del formulario
    let tipo = document.getElementById("tipo").value;
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value;

    // Validación básica
    if (tipo == "" || nombre == "" || correo == "" || telefono == "") {
        mensaje.style.color = "red";
        mensaje.innerHTML = "Debes llenar todos los campos.";
        return;
    }

    // Leer datos de la cancha desde localStorage
    let cancha = JSON.parse(localStorage.getItem('cancha_temp')) || {
        id_cancha: 'DESCONOCIDO',
        nombre_cancha: 'Cancha genérica',
        precio: 45000
    };

    // Crear objeto con los datos actuales (fecha/hora se agregarán en calendario)
    let reserva = {
        id_cancha: cancha.id_cancha,
        nombre_cancha: cancha.nombre_cancha,
        tipo_cancha: tipo,
        nombre_usuario: nombre,
        correo: correo,
        telefono: telefono,
        precio: cancha.precio
        // fecha y hora se añadirán en calendario.html
    };

    // Guardar en localStorage
    localStorage.setItem('reserva_temp', JSON.stringify(reserva));
    
    // Mensaje de éxito
    mensaje.style.color = "green";
    mensaje.innerHTML = "Datos guardados. Redirigiendo a calendario...";
    
    // Redirigir a calendario.html
    setTimeout(() => {
        window.location.href = "calendario.html";
    }, 1500);
};