// calendario.js

// Referencias al DOM
const selectYear = document.getElementById("select-year");
const selectMonth = document.getElementById("select-month");
const diasMes = document.getElementById("dias-mes");
const horasDisponibles = document.getElementById("horas-disponibles");

// Datos de ejemplo: horas disponibles por día (simulado)
const horasPorDia = [
    "08:00 - 09:00",
    "09s:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
];

// Generar años dinámicamente
function llenarAnios() {
const anioActual = new Date().getFullYear();
for (let i = anioActual; i <= anioActual + 5; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
}
}

// Generar meses
function llenarMeses() {
    const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
    meses.forEach((mes, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = mes;
    selectMonth.appendChild(option);
});
}

// Generar calendario
function generarCalendario(anio, mes) {
  diasMes.innerHTML = ""; // limpiar tabla
  const primerDia = new Date(anio, mes, 1).getDay(); // 0=Domingo
const diasEnMes = new Date(anio, mes + 1, 0).getDate();

let fila = document.createElement("tr");
let contadorDia = 1;

  // Ajuste para que lunes sea primero
let inicio = primerDia === 0 ? 6 : primerDia - 1;

  // Rellenar celdas vacías antes del primer día
for (let i = 0; i < inicio; i++) {
    const celda = document.createElement("td");
    fila.appendChild(celda);
}

for (let dia = 1; dia <= diasEnMes; dia++) {
    if (fila.children.length === 7) {
    diasMes.appendChild(fila);
    fila = document.createElement("tr");
    }

    const celda = document.createElement("td");
    celda.textContent = dia;

    // Simulación: días pares disponibles, impares ocupados
    celda.className = dia % 2 === 0 ? "disponible" : "ocupado";

    celda.addEventListener("click", () => {
    mostrarHoras(dia);
    });

    fila.appendChild(celda);
}

  // Rellenar fila final si es incompleta
while (fila.children.length < 7) {
    const celda = document.createElement("td");
    fila.appendChild(celda);
    }

    diasMes.appendChild(fila);
}

// Mostrar horas disponibles en el panel derecho
function mostrarHoras(dia) {
  horasDisponibles.innerHTML = ""; // limpiar
  // Aquí puedes traer datos reales desde backend según el día
    horasPorDia.forEach((hora, index) => {
    const li = document.createElement("li");
    li.textContent = hora;

    // Simulación: horas pares disponibles, impares ocupadas
    if (index % 2 === 0) {
        li.classList.add("disponible");
        li.addEventListener("click", () => {
        alert(`Hora ${hora} seleccionada para reservar`);
    });
    } else {
    li.classList.add("ocupado");
    }

    horasDisponibles.appendChild(li);
});
}

// Eventos cambio año/mes
selectYear.addEventListener("change", () => {
    generarCalendario(selectYear.value, selectMonth.value);
});

selectMonth.addEventListener("change", () => {
    generarCalendario(selectYear.value, selectMonth.value);
});

// Inicialización
llenarAnios();
llenarMeses();
const hoy = new Date();
selectYear.value = hoy.getFullYear();
selectMonth.value = hoy.getMonth();
generarCalendario(hoy.getFullYear(), hoy.getMonth());