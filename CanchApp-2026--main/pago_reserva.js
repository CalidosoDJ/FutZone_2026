// Función para cargar los datos de la reserva desde localStorage
function cargarResumenReserva() {
    const resumenContainer = document.getElementById('resumen-container');
    
    // Intentar obtener datos de localStorage
    let reserva = localStorage.getItem('reserva_temp');
    
    if (!reserva) {
        // Si no hay datos, mostrar mensaje y botón para volver
        resumenContainer.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="fas fa-exclamation-triangle text-warning fs-1 mb-3"></i>
                <p>No hay datos de reserva disponibles.</p>
                <p class="small">Por favor, selecciona una cancha y horario primero.</p>
                <a href="list_canchas.html" class="btn btn-success mt-3">
                    <i class="fas fa-arrow-left me-2"></i>Ver canchas disponibles
                </a>
            </div>
        `;
        return;
    }

    // Parsear los datos
    try {
        reserva = JSON.parse(reserva);
    } catch (e) {
        console.error('Error al parsear reserva:', e);
        resumenContainer.innerHTML = '<div class="alert alert-danger">Error al cargar los datos</div>';
        return;
    }

    // Calcular total (asumiendo precio por hora)
    const precioPorHora = reserva.precio || 45000;
    const horas = reserva.horas || 1;
    const total = precioPorHora * horas;

    // Actualizar el valor en Nequi si existe
    const nequiValor = document.getElementById('nequi-valor');
    if (nequiValor) {
        nequiValor.textContent = `$${total.toLocaleString('es-CO')} COP`;
    }

    // Mostrar el resumen (corregido: usar nombre_cancha en lugar de cancha)
    resumenContainer.innerHTML = `
        <h5 class="card-title fw-bold text-success">${reserva.nombre_cancha || 'Cancha sin nombre'}</h5>
        <hr>
        <div class="mb-3">
            <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Fecha:</span>
                <span class="fw-semibold">${reserva.fecha || 'No especificada'}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Hora:</span>
                <span class="fw-semibold">${reserva.hora || 'No especificada'}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Duración:</span>
                <span class="fw-semibold">${horas} ${horas === 1 ? 'hora' : 'horas'}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Precio por hora:</span>
                <span class="fw-semibold">$${precioPorHora.toLocaleString('es-CO')} COP</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between fw-bold">
                <span>Total a pagar:</span>
                <span class="text-success fs-5">$${total.toLocaleString('es-CO')} COP</span>
            </div>
        </div>
    `;
}

// Función para copiar número Nequi
function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        alert('Número copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar:', err);
        alert('No se pudo copiar el número');
    });
}

// Evento del botón pagar
document.getElementById('btnPagar')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    const terminos = document.getElementById('terminos')?.checked;
    const mensaje = document.getElementById('mensaje');
    
    if (!terminos) {
        mensaje.innerHTML = '<span class="text-danger">Debes aceptar los términos y condiciones</span>';
        return;
    }

    // Determinar método activo
    const tabActivo = document.querySelector('.tab-pane.active');
    let metodo = 'desconocido';
    
    if (tabActivo.id === 'tarjeta') metodo = 'tarjeta';
    else if (tabActivo.id === 'nequi') metodo = 'nequi';
    else if (tabActivo.id === 'efectivo') metodo = 'efectivo';

    // Simular pago
    mensaje.innerHTML = '<span class="text-success">Procesando pago...</span>';
    
    setTimeout(() => {
        if (metodo === 'efectivo') {
            mensaje.innerHTML = '<span class="text-warning">Reserva pendiente de confirmación por administrador</span>';
            // Guardar estado
            localStorage.setItem('pago_estado', 'pendiente');
        } else {
            mensaje.innerHTML = '<span class="text-success">¡Pago exitoso! Redirigiendo...</span>';
            localStorage.setItem('pago_estado', 'confirmado');
            
            // Limpiar reserva temporal
            localStorage.removeItem('reserva_temp');
            
            // Redirigir después de 2 segundos
            setTimeout(() => {
                window.location.href = 'list_canchas.html';
            }, 2000);
        }
        
        localStorage.setItem('pago_metodo', metodo);
    }, 1500);
});

// Cargar datos al iniciar la página
document.addEventListener('DOMContentLoaded', cargarResumenReserva);