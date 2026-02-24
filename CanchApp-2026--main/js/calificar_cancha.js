// Variables globales
let calificacion = 0;
let reserva = null;

// Cargar datos de la reserva
function cargarReserva() {
    const resumenDiv = document.getElementById('resumen-cancha');
    const reservaStr = localStorage.getItem('reserva_temp');
    
    if (!reservaStr) {
        resumenDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle text-warning me-2"></i>
            No hay información de reserva reciente.
            <div class="mt-2">
                <a href="list_canchas.html" class="btn btn-sm btn-outline-success">
                    Ver canchas disponibles
                </a>
            </div>
        `;
        return;
    }
    
    try {
        reserva = JSON.parse(reservaStr);
        resumenDiv.innerHTML = `
            <strong>${reserva.nombre_cancha || 'Cancha'}</strong><br>
            Fecha: ${reserva.fecha || 'No disponible'} - Hora: ${reserva.hora || 'No disponible'}<br>
            <small class="text-muted">¿Cómo fue tu experiencia?</small>
        `;
    } catch (e) {
        resumenDiv.innerHTML = 'Error al cargar los datos.';
    }
}

// Sistema de estrellas
const estrellas = document.querySelectorAll('.estrella');
const btnEnviar = document.getElementById('btnEnviar');

// Función para actualizar visualización de estrellas
function actualizarEstrellas(valor) {
    estrellas.forEach(estrella => {
        const estrellaValor = parseInt(estrella.dataset.valor);
        if (estrellaValor <= valor) {
            estrella.classList.remove('far');
            estrella.classList.add('fas', 'seleccionada');
        } else {
            estrella.classList.remove('fas', 'seleccionada');
            estrella.classList.add('far');
        }
    });
}

// Eventos para estrellas
estrellas.forEach(estrella => {
    // Click para seleccionar
    estrella.addEventListener('click', function() {
        calificacion = parseInt(this.dataset.valor);
        actualizarEstrellas(calificacion);
        btnEnviar.disabled = false;
    });
    
    // Hover para efecto visual
    estrella.addEventListener('mouseenter', function() {
        const valor = parseInt(this.dataset.valor);
        estrellas.forEach(e => {
            if (parseInt(e.dataset.valor) <= valor) {
                e.classList.add('hover');
            }
        });
    });
    
    estrella.addEventListener('mouseleave', function() {
        estrellas.forEach(e => e.classList.remove('hover'));
    });
});

// Enviar calificación
document.getElementById('btnEnviar').addEventListener('click', function() {
    const comentario = document.getElementById('comentario').value;
    const mensaje = document.getElementById('mensaje');
    
    // Crear objeto de calificación
    const calificacionObj = {
        fecha: new Date().toLocaleDateString('es-CO'),
        cancha: reserva ? reserva.nombre_cancha : 'No especificada',
        calificacion: calificacion,
        comentario: comentario || 'Sin comentario',
        usuario: reserva ? reserva.nombre_usuario : 'Anónimo'
    };
    
    // Guardar en localStorage (historial de calificaciones)
    let calificaciones = JSON.parse(localStorage.getItem('calificaciones')) || [];
    calificaciones.push(calificacionObj);
    localStorage.setItem('calificaciones', JSON.stringify(calificaciones));
    
    // Mostrar mensaje de éxito
    mensaje.innerHTML = `
        <div class="alert alert-success">
            <i class="fas fa-check-circle me-2"></i>
            ¡Gracias por calificar!<br>
            <small>Tu opinión nos ayuda a mejorar.</small>
        </div>
    `;
    
    // Deshabilitar todo
    btnEnviar.disabled = true;
    estrellas.forEach(e => e.style.pointerEvents = 'none');
    
    // Opcional: redirigir después de unos segundos
    setTimeout(() => {
        window.location.href = 'list_canchas.html';
    }, 3000);
});

// Inicializar
document.addEventListener('DOMContentLoaded', cargarReserva);