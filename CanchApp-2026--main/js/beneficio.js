// js/beneficio.js

// Lista de códigos válidos (simulada)
const CODIGOS_VALIDOS = {
    'FUT10': { tipo: 'porcentaje', valor: 10, descripcion: '10% de descuento' },
    'FUT20': { tipo: 'porcentaje', valor: 20, descripcion: '20% de descuento' },
    'FIJO5000': { tipo: 'fijo', valor: 5000, descripcion: '$5.000 COP de descuento' },
    'EMPRESA5': { tipo: 'porcentaje', valor: 5, descripcion: '5% de descuento' }
};

let reserva = null;
let totalOriginal = 0;
let descuentoAplicado = null;

function cargarReserva() {
    const reservaStr = localStorage.getItem('reserva_temp');
    const resumenMini = document.getElementById('resumen-mini');
    const codigoInput = document.getElementById('codigo');
    const btnContinuar = document.getElementById('btnContinuar');
    const mensaje = document.getElementById('mensaje');

    if (!reservaStr) {
        resumenMini.innerHTML = 'No hay datos de reserva. Por favor, selecciona una cancha primero.';
        btnContinuar.disabled = true;
        return;
    }

    try {
        reserva = JSON.parse(reservaStr);
        const precio = reserva.precio || 45000;
        const horas = reserva.horas || 1;
        totalOriginal = precio * horas;

        // Si ya hay un descuento aplicado, mostrarlo
        if (reserva.descuento) {
            const d = reserva.descuento;
            codigoInput.value = d.codigo;
            descuentoAplicado = d.codigo;
            btnContinuar.disabled = false;
            mostrarResumenConDescuento(d, reserva.totalConDescuento);
        } else {
            mostrarResumenSinDescuento();
        }
    } catch (e) {
        resumenMini.innerHTML = 'Error al cargar los datos.';
        console.error(e);
    }
}

function mostrarResumenSinDescuento() {
    const resumenMini = document.getElementById('resumen-mini');
    resumenMini.innerHTML = `
        <strong>${reserva.nombre_cancha || 'Cancha'}</strong><br>
        Fecha: ${reserva.fecha || 'Pendiente'} - Hora: ${reserva.hora || 'Pendiente'}<br>
        Total sin descuento: <strong>$${totalOriginal.toLocaleString('es-CO')} COP</strong>
    `;
}

function mostrarResumenConDescuento(descuento, totalConDescuento) {
    const resumenMini = document.getElementById('resumen-mini');
    resumenMini.innerHTML = `
        <strong>${reserva.nombre_cancha || 'Cancha'}</strong><br>
        Fecha: ${reserva.fecha || 'Pendiente'} - Hora: ${reserva.hora || 'Pendiente'}<br>
        Total sin descuento: <strong>$${totalOriginal.toLocaleString('es-CO')} COP</strong><br>
        <span class="text-success">Descuento (${descuento.codigo}): -$${descuento.monto.toLocaleString('es-CO')} COP</span><br>
        <strong>Total con descuento: $${totalConDescuento.toLocaleString('es-CO')} COP</strong>
    `;
}

// Aplicar descuento
document.getElementById('btnAplicar').addEventListener('click', function() {
    const codigoInput = document.getElementById('codigo').value.trim().toUpperCase();
    const mensaje = document.getElementById('mensaje');
    const btnContinuar = document.getElementById('btnContinuar');

    if (!codigoInput) {
        mensaje.innerHTML = '<span class="text-danger">Por favor ingresa un código.</span>';
        return;
    }

    const beneficio = CODIGOS_VALIDOS[codigoInput];

    if (!beneficio) {
        mensaje.innerHTML = '<span class="text-danger">Código inválido o no encontrado.</span>';
        btnContinuar.disabled = true;
        descuentoAplicado = null;
        return;
    }

    // Calcular descuento
    let descuento = 0;
    if (beneficio.tipo === 'porcentaje') {
        descuento = totalOriginal * beneficio.valor / 100;
    } else {
        descuento = beneficio.valor;
        if (descuento > totalOriginal) descuento = totalOriginal;
    }

    const totalConDescuento = totalOriginal - descuento;
    descuentoAplicado = codigoInput;

    // Guardar en reserva
    reserva.descuento = {
        codigo: codigoInput,
        tipo: beneficio.tipo,
        valor: beneficio.valor,
        monto: descuento,
        descripcion: beneficio.descripcion
    };
    reserva.totalConDescuento = totalConDescuento;
    localStorage.setItem('reserva_temp', JSON.stringify(reserva));

    mensaje.innerHTML = `<span class="text-success">¡Beneficio aplicado! ${beneficio.descripcion}</span>`;
    mostrarResumenConDescuento(reserva.descuento, totalConDescuento);
    btnContinuar.disabled = false;
});

// Continuar al pago
document.getElementById('btnContinuar').addEventListener('click', function() {
    window.location.href = 'pago_reserva.html';
});

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', cargarReserva);