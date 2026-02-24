// Botones "Cómo llegar"
const botonesLlegar = document.querySelectorAll('.llegar');

botonesLlegar.forEach((btn, index) => {
  btn.addEventListener('click', function() {
    const direccion = this.getAttribute('data-direccion') || 
                      'Popayán, Cauca'; // fallback
    const url = `https://www.google.com/maps/search/${encodeURIComponent(direccion)}`;
    window.open(url, '_blank');
  });
});

// Opcional: Si quieres mantener compatibilidad con el array anterior
// (pero ahora usamos data-direccion directamente)