// Función para generar un ID único para la solicitud
function generarIdSolicitud() {
    return 'SOL-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
}

// Función para guardar la solicitud en localStorage
function guardarSolicitud(solicitud) {
    // Obtener solicitudes existentes
    let solicitudes = JSON.parse(localStorage.getItem('solicitudes_convenio')) || [];
    
    // Agregar nueva solicitud
    solicitudes.push(solicitud);
    
    // Guardar en localStorage
    localStorage.setItem('solicitudes_convenio', JSON.stringify(solicitudes));
    
    // Guardar también la última solicitud para consulta inmediata
    localStorage.setItem('ultima_solicitud', JSON.stringify(solicitud));
}

// Manejar el envío del formulario
document.getElementById('formConvenio').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const solicitud = {
        id: generarIdSolicitud(),
        fecha_solicitud: new Date().toLocaleDateString('es-CO'),
        estado: 'pendiente', // pendiente, aprobado, rechazado
        empresa: {
            nombre: document.getElementById('nombreEmpresa').value,
            nit: document.getElementById('nit').value,
            tipo: document.getElementById('tipoEmpresa').value
        },
        propuesta: {
            titulo: document.getElementById('tituloPropuesta').value,
            descripcion: document.getElementById('descripcionPropuesta').value,
            tipo_beneficio: document.getElementById('tipoBeneficio').value,
            valor: document.getElementById('valorBeneficio').value,
            vigencia_meses: parseInt(document.getElementById('vigencia').value)
        },
        contacto: {
            nombre: document.getElementById('nombreContacto').value,
            cargo: document.getElementById('cargoContacto').value,
            telefono: document.getElementById('telefonoContacto').value,
            email: document.getElementById('emailContacto').value
        },
        historial_estados: [
            {
                estado: 'pendiente',
                fecha: new Date().toLocaleDateString('es-CO'),
                comentario: 'Solicitud recibida, pendiente de revisión'
            }
        ]
    };
    
    // Guardar en localStorage
    guardarSolicitud(solicitud);
    
    // Mostrar mensaje de éxito
    const mensaje = document.getElementById('mensaje');
    mensaje.innerHTML = `
        <div class="alert alert-success">
            <i class="fas fa-check-circle me-2"></i>
            ¡Solicitud enviada con éxito!<br>
            <strong>Número de solicitud: ${solicitud.id}</strong><br>
            <small>Guardar este número para consultar el estado.</small>
        </div>
    `;

    // Al final del submit, después de mostrar el mensaje de éxito
    setTimeout(() => {
        window.location.href = 'consultar_convenio.html';
    }, 3000);
    
    // Limpiar formulario (opcional)
    // this.reset();
    
    // Desplazarse al mensaje
    mensaje.scrollIntoView({ behavior: 'smooth' });
    
    // Aquí podrías redirigir después de unos segundos
    // setTimeout(() => {
    //     window.location.href = 'consultar_convenio.html';
    // }, 3000);
});

// Función para consultar el estado de una solicitud (para usar en otra página)
function consultarSolicitud(idSolicitud) {
    const solicitudes = JSON.parse(localStorage.getItem('solicitudes_convenio')) || [];
    return solicitudes.find(s => s.id === idSolicitud) || null;
}

// Opcional: precargar datos de ejemplo (solo para pruebas)
// localStorage.removeItem('solicitudes_convenio'); // Para limpiar