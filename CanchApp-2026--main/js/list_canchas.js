var botonesLlegar = document.getElementsByClassName("llegar");
var botonesReservar = document.getElementsByClassName("reservar");


var direcciones = [
  "Cancha El Cubo Popayán",
  "Cancha Balón de Oro Popayán",
  "Cancha Las Santas Popayán"
];


for (var i = 0; i < botonesLlegar.length; i++) {
  botonesLlegar[i].onclick = function () {

    var posicion = Array.prototype.indexOf.call(botonesLlegar, this);

    var url = "https://www.google.com/maps/search/" + direcciones[posicion];

    window.open(url, "_blank");
  };
}


for (var j = 0; j < botonesReservar.length; j++) {
  botonesReservar[j].onclick = function () {
    alert("Redirigiendo a la reserva de esta cancha");
  };
}
