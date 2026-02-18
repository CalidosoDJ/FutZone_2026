
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

  if (contador == 1) {
    img1.classList.add("active");
  } else if (contador == 2) {
    img2.classList.add("active");
  } else if (contador == 3) {
    img3.classList.add("active");
  }
}

next.onclick = function () {
  contador++;

  if (contador > 3) {
    contador = 1;
  }

  mostrarImagen();
};

prev.onclick = function () {
  contador--;

  if (contador < 1) {
    contador = 3;
  }

  mostrarImagen();
};

setInterval(function () {
  contador++;

  if (contador > 3) {
    contador = 1;
  }

  mostrarImagen();
}, 4000);



let form = document.getElementById("formReserva");
let mensaje = document.getElementById("mensaje");

form.onsubmit = function (e) {
  e.preventDefault();

  let fecha = document.getElementById("fecha").value;
  let hora = document.getElementById("hora").value;
  let tipo = document.getElementById("tipo").value;
  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let telefono = document.getElementById("telefono").value;

  if (fecha == "" || hora == "" || tipo == "" || nombre == "" || correo == "" || telefono == "") {
    mensaje.style.color = "red";
    mensaje.innerHTML = "⚠️ Debes llenar todos los campos.";
  } else {
    mensaje.style.color = "green";
    mensaje.innerHTML = "✅ Reserva realizada con éxito. ¡Gracias por reservar!";

    form.reset();
  }
};
