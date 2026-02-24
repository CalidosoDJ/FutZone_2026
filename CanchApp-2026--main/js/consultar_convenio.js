// Función para consultar solicitud por ID
function consultarSolicitud(idSolicitud) {
    const solicitudes = JSON.parse(localStorage.getItem('solicitudes_convenio')) || [];
    return solicitudes.find(s => s.id === idSolicitud) || null;
}

// Función para obtener clase CSS según estado
function getEstadoClass(estado) {
    switch(estado) {
        case 'pendiente': return 'estado-pendiente';
        case 'aprobado': return 'estado-aprobado';
        case 'rechazado': return 'estado-rechazado';
        default: return 'bg-light';
    }
}

// Función para formatear estado en texto
function formatearEstado(estado) {
    switch(estado) {
        case 'pendiente': return '⏳ Pendiente de revisión';
        case 'aprobado': return '✅ Aprobado';
        case 'rechazado': return '❌ Rechazado';
        default: return estado;
    }
}

// Función para mostrar el resultado
function mostrarResultado(solicitud) {
    const resultado = document.getElementById('resultado');
    
    if (!solicitud) {
        resultado.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-circle me-2"></i>
                No se encontró ninguna solicitud con ese número.
            </div>
        `;
        return;
    }

    // Construir HTML del historial
    let historialHTML = '';
    if (solicitud.historial_estados && solicitud.historial_estados.length > 0) {
        historialHTML = '<h6 class="mt-3 mb-2">Historial de estados:</h6>';
        solicitud.historial_estados.forEach(item => {
            historialHTML += `
                <div class="historial-item">
                    <small class="text-muted">${item.fecha}</small>
                    <p class="mb-0"><strong>${formatearEstado(item.estado)}</strong></p>
                    <small>${item.comentario}</small>
                </div>
            `;
        });
    }

    // Construir HTML completo
    resultado.innerHTML = `
        <div class="resultado-card ${getEstadoClass(solicitud.estado)}">
            <div class="d-flex justify-content-between align-items-start">
                <h5 class="mb-3">${solicitud.empresa.nombre}</h5>
                <span class="badge bg-secondary">${solicitud.id}</span>
            </div>
            
            <p><strong>NIT:</strong> ${solicitud.empresa.nit}</p>
            <p><strong>Fecha de solicitud:</strong> ${solicitud.fecha_solicitud}</p>
            <p><strong>Propuesta:</strong> ${solicitud.propuesta.titulo}</p>
            <p><strong>Beneficio:</strong> ${solicitud.propuesta.valor}</p>
            
            <div class="mt-3 p-2 bg-white rounded">
                <p class="mb-0"><strong>Estado actual:</strong> 
                    <span class="fw-bold">${formatearEstado(solicitud.estado)}</span>
                </p>
            </div>
            
            ${historialHTML}
            
            <div class="mt-3 text-muted small">
                <i class="fas fa-info-circle me-1"></i>
                Guarda este número para futuras consultas
            </div>
        </div>
    `;
}

// Evento del botón consultar
document.getElementById('btnConsultar').addEventListener('click', function() {
    const idSolicitud = document.getElementById('idSolicitud').value.trim();
    
    if (!idSolicitud) {
        alert('Por favor ingresa un número de solicitud');
        return;
    }
    
    const solicitud = consultarSolicitud(idSolicitud);
    mostrarResultado(solicitud);
});

// Evento para buscar al presionar Enter
document.getElementById('idSolicitud').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('btnConsultar').click();
    }
});

// Precargar datos de ejemplo si no hay solicitudes
document.addEventListener('DOMContentLoaded', function() {
    const solicitudes = JSON.parse(localStorage.getItem('solicitudes_convenio')) || [];
    
    // Si no hay solicitudes y estamos en desarrollo, crear una de ejemplo
    if (solicitudes.length === 0 && window.location.hostname === 'localhost') {
        const solicitudEjemplo = {
            id: 'SOL-1234567890-ABC12',
            fecha_solicitud: '24/02/2026',
            estado: 'pendiente',
            empresa: {
                nombre: 'Empresa Ejemplo SAS',
                nit: '901.123.456-7',
                tipo: 'comercial'
            },
            propuesta: {
                titulo: 'Descuento para empleados',
                descripcion: '15% de descuento en todas las reservas para empleados',
                tipo_beneficio: 'descuento',
                valor: '15%',
                vigencia_meses: 12
            },
            contacto: {
                nombre: 'Juan Pérez',
                cargo: 'Gerente',
                telefono: '3101234567',
                email: 'juan@ejemplo.com'
            },
            historial_estados: [
                {
                    estado: 'pendiente',
                    fecha: '24/02/2026',
                    comentario: 'Solicitud recibida, pendiente de revisión'
                }
            ]
        };
        
        localStorage.setItem('solicitudes_convenio', JSON.stringify([solicitudEjemplo]));
        console.log('Solicitud de ejemplo creada. ID: SOL-1234567890-ABC12');
    }
});