const form = document.getElementById("formCancha");
const mensaje = document.getElementById("mensaje");
const contenedorCanchas = document.getElementById("contenedorCanchas");

// Mostrar canchas guardadas al cargar la página
document.addEventListener("DOMContentLoaded", mostrarCanchas);

// Evento submit
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Capturar valores
    const nombre = document.getElementById("nombre").value.trim();
    const idCancha = document.getElementById("idCancha").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const tipo = document.getElementById("tipo").value;
    const medidas = document.getElementById("medidas").value.trim();
    const horario = document.getElementById("horario").value.trim();
    const precio = document.getElementById("precio").value.trim();
    const estado = document.getElementById("estado").value;

    // Validación básica
    if (nombre === "" || idCancha === "" || direccion === "" || tipo === "" || precio === "") {
        mensaje.style.color = "red";
        mensaje.textContent = "⚠️ Por favor completa los campos obligatorios.";
        return;
    }

    // Crear objeto cancha
    const cancha = {
        nombre,
        idCancha,
        direccion,
        tipo,
        medidas,
        horario,
        precio,
        estado
    };

    // Guardar en LocalStorage
    let canchas = JSON.parse(localStorage.getItem("canchas")) || [];

    // Validar que el ID no se repita
    const existe = canchas.some(c => c.idCancha === idCancha);

    if (existe) {
        mensaje.style.color = "red";
        mensaje.textContent = "❌ Ya existe una cancha con ese ID.";
        return;
    }

    canchas.push(cancha);
    localStorage.setItem("canchas", JSON.stringify(canchas));

    // Mensaje éxito
    mensaje.style.color = "green";
    mensaje.textContent = "✅ Cancha publicada exitosamente.";

    // Limpiar formulario
    form.reset();

    // Actualizar lista
    mostrarCanchas();
});

// Función para mostrar canchas
function mostrarCanchas() {
    contenedorCanchas.innerHTML = "";

    let canchas = JSON.parse(localStorage.getItem("canchas")) || [];

    if (canchas.length === 0) {
        contenedorCanchas.innerHTML = "<p>No hay canchas publicadas aún.</p>";
        return;
    }

    canchas.forEach((cancha, index) => {
        const div = document.createElement("div");
        div.classList.add("canchaCard");

        div.innerHTML = `
            <h3>${cancha.nombre}</h3>
            <p><b>ID:</b> ${cancha.idCancha}</p>
            <p><b>Dirección:</b> ${cancha.direccion}</p>
            <p><b>Tipo:</b> ${cancha.tipo}</p>
            <p><b>Medidas:</b> ${cancha.medidas || "No especificado"}</p>
            <p><b>Horario:</b> ${cancha.horario || "No especificado"}</p>
            <p><b>Precio:</b> $${cancha.precio} COP</p>
            <p><b>Estado:</b> ${cancha.estado}</p>

            <button class="btnEliminar" onclick="eliminarCancha(${index})">
                🗑 Eliminar Cancha
            </button>
        `;

        contenedorCanchas.appendChild(div);
    });
}

// Función eliminar cancha
function eliminarCancha(index) {
    let canchas = JSON.parse(localStorage.getItem("canchas")) || [];

    canchas.splice(index, 1);

    localStorage.setItem("canchas", JSON.stringify(canchas));

    mensaje.style.color = "green";
    mensaje.textContent = "🗑 Cancha eliminada correctamente.";

    mostrarCanchas();
}
