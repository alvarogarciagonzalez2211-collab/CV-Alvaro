// ==========================================
// 1. ANIMACIÓN AL HACER SCROLL (Scroll Reveal)
// ==========================================
const elementosARevelar = document.querySelectorAll('.seccion, .elemento-linea-tiempo, .tarjeta-proyecto, .elemento-habilidad');
elementosARevelar.forEach(element => element.classList.add('reveal'));

// Configuramos el Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Si el elemento entra en el área visible (viewport)
        if (entry.isIntersecting) {
            entry.target.classList.add('activo'); // Añadimos la clase 'activo'
        }
    });
}, {
    threshold: 0.1 // Se activa cuando el 10% del elemento es visible
});

// Empezamos a observar todos los elementos
elementosARevelar.forEach(element => observer.observe(element));


// ==========================================
// 2. MODO OSCURO (Dark Mode)
// ==========================================
const botonSelectorTema = document.getElementById('selector-tema');
const cuerpo = document.body;
// El botón solo existe si no estamos en una pantalla muy pequeña donde el icono podría no caber
if (botonSelectorTema) {
    const icono = botonSelectorTema.querySelector('i');

    // Función para actualizar el icono (Luna o Sol)
    const actualizarIcono = (esOscuro) => {
        if (esOscuro) {
            icono.classList.remove('fa-moon');
            icono.classList.add('fa-sun');
        } else {
            icono.classList.remove('fa-sun');
            icono.classList.add('fa-moon');
        }
    };

    // *Función de Inicialización* (Comprueba si hay una preferencia guardada)
    const temaGuardado = localStorage.getItem('theme');
    // También comprueba la preferencia del sistema operativo si no hay tema guardado
    const sistemaOscuro = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (temaGuardado === 'dark' || (!temaGuardado && sistemaOscuro)) {
        cuerpo.classList.add('modo-oscuro');
        actualizarIcono(true);
    }

    // *Listener del botón* (Función principal)
    botonSelectorTema.addEventListener('click', () => {
        cuerpo.classList.toggle('modo-oscuro');
        
        // 1. Guardar la preferencia en el navegador del usuario (LocalStorage)
        const esOscuro = cuerpo.classList.contains('modo-oscuro');
        localStorage.setItem('theme', esOscuro ? 'dark' : 'light');
        
        // 2. Actualizar el icono
        actualizarIcono(esOscuro);
    });
}