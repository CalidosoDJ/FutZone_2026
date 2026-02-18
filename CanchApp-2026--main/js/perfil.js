
var editarBtn = document.getElementsByTagName("button")[0];
var cancelarBtn = document.getElementById("editar").getElementsByTagName("button")[1];

var editar = document.getElementById("editar");

var form = editar.getElementsByTagName("form")[0];

var nombre = document.getElementsByTagName("h2")[0];
var correo = document.getElementsByTagName("p")[0];
var foto = document.getElementById("img");

var nombreInput = form.getElementsByTagName("input")[0];
var correoInput = form.getElementsByTagName("input")[1];
var fotoInput = form.getElementsByTagName("input")[2];


editar.style.display = "none";


editarBtn.onclick = function () {
  editar.style.display = "block";
};


cancelarBtn.onclick = function () {
  editar.style.display = "none";
};


form.onsubmit = function (e) {
  e.preventDefault();

  nombre.innerHTML = nombreInput.value;
  correo.innerHTML = correoInput.value;

  if (fotoInput.files.length > 0) {
    var archivo = fotoInput.files[0];

    if (archivo.size > 5 * 1024 * 1024) {
      alert("La imagen es muy grande");
      return;
    }

    var leer = new FileReader();
    leer.onload = function () {
      foto.src = leer.result;
    };
    leer.readAsDataURL(archivo);
  }

  alert("Datos guardados");
  editar.style.display = "none";
};
