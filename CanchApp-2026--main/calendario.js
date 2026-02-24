// calendario.js - Versión corregida con integración de localStorage

// Referencias al DOM
const selectYear = document.getElementById("select-year");
const selectMonth = document.getElementById("select-month");
const diasMes = document.getElementById("dias-mes");
const horasDisponibles = document.getElementById("horas-disponibles");
const btnReservar = document.getElementById("btn-reservar");
const headerTitulo = document.querySelector(".calendario-header h1");
const headerUbicacion = document.querySelector(".calendario-header p");

// Variables para almacenar selección
let diaSeleccionado = null;
let horaSeleccionada = null;

// Cargar datos de la reserva desde localStorage al iniciar
function cargarDatosReserva() {
    const reserva = JSON.parse(localStorage.getItem('reserva_temp'));
    if (reserva) {
        if (headerTitulo) headerTitulo.textContent = reserva.nombre_cancha || 'Cancha';
        if (headerUbicacion) headerUbicacion.textContent = `Fecha: ${reserva.fecha || 'No especificada'} - ${reserva.hora || 'Hora por definir'}`;
    } else {
        console.warn('No hay datos de reserva');
    }
}

// Horas disponibles (simuladas)
const horasPorDia = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
];

// Generar años
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
    diasMes.innerHTML = "";
    const primerDia = new Date(anio, mes, 1).getDay(); // 0 = Domingo
    const diasEnMes = new Date(anio, mes + 1, 0).getDate();

    let fila = document.createElement("tr");
    // Ajuste para que lunes sea primero (0=Domingo, 1=Lunes, ...)
    let inicio = primerDia === 0 ? 6 : primerDia - 1;

    // Celdas vacías antes del primer día
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

        // Al hacer clic en un día, mostrar horas y guardar el día
        celda.addEventListener("click", () => {
            // Quitar clase seleccionado de todos los días
            document.querySelectorAll("#dias-mes td").forEach(td => td.classList.remove("seleccionado"));
            celda.classList.add("seleccionado");
            diaSeleccionado = dia;
            mostrarHoras(dia);
        });

        fila.appendChild(celda);
    }

    // Completar última fila
    while (fila.children.length < 7) {
        const celda = document.createElement("td");
        fila.appendChild(celda);
    }
    diasMes.appendChild(fila);
}

// Mostrar horas disponibles para un día
function mostrarHoras(dia) {
    horasDisponibles.innerHTML = "";
    horasPorDia.forEach((hora, index) => {
        const li = document.createElement("li");
        li.textContent = hora;

        // Simulación: horas pares disponibles, impares ocupadas
        if (index % 2 === 0) {
            li.classList.add("disponible");
            li.addEventListener("click", (e) => {
                e.stopPropagation();
                // Quitar clase seleccionado de otras horas
                document.querySelectorAll("#horas-disponibles li").forEach(l => l.classList.remove("seleccionado"));
                li.classList.add("seleccionado");
                horaSeleccionada = hora;
                // Habilitar botón reservar
                if (btnReservar) btnReservar.disabled = false;
            });
        } else {
            li.classList.add("ocupado");
        }

        horasDisponibles.appendChild(li);
    });
}

// Evento del botón reservar
if (btnReservar) {
    btnReservar.addEventListener("click", function() {
        if (!diaSeleccionado || !horaSeleccionada) {
            alert("Debes seleccionar un día y una hora disponibles.");
            return;
        }

        // Recuperar reserva actual de localStorage
        let reserva = JSON.parse(localStorage.getItem('reserva_temp'));
        if (!reserva) {
            alert("No hay datos de reserva. Por favor, vuelve a empezar.");
            window.location.href = "list_canchas.html";
            return;
        }

        // Actualizar con la hora seleccionada y el día (construir fecha completa)
        const anio = selectYear.value;
        const mes = selectMonth.value;
        const fechaCompleta = `${diaSeleccionado}/${parseInt(mes) + 1}/${anio}`;
        reserva.fecha = fechaCompleta;
        reserva.hora = horaSeleccionada;

        // Guardar en localStorage
        localStorage.setItem('reserva_temp', JSON.stringify(reserva));

        // Redirigir a pago
        window.location.href = "pago_reserva.html";
    });
}

// Eventos cambio año/mes
selectYear.addEventListener("change", () => {
    generarCalendario(selectYear.value, selectMonth.value);
    diaSeleccionado = null;
    horaSeleccionada = null;
    horasDisponibles.innerHTML = "";
    if (btnReservar) btnReservar.disabled = true;
});

selectMonth.addEventListener("change", () => {
    generarCalendario(selectYear.value, selectMonth.value);
    diaSeleccionado = null;
    horaSeleccionada = null;
    horasDisponibles.innerHTML = "";
    if (btnReservar) btnReservar.disabled = true;
});

// Inicialización
llenarAnios();
llenarMeses();
const hoy = new Date();
selectYear.value = hoy.getFullYear();
selectMonth.value = hoy.getMonth();
generarCalendario(hoy.getFullYear(), hoy.getMonth());
cargarDatosReserva();

// Deshabilitar botón reservar al inicio
if (btnReservar) btnReservar.disabled = true;