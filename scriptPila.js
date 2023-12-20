// Intercambio de imágenes
var pushButton = document.getElementById("pushButton");
var popButton = document.getElementById("popButton");
var imagenPop = document.getElementById("imagenPop");
var imagenPush = document.getElementById("imagenPush");
var guardaPila = document.getElementById("guardarPila")
var cargaPila = document.getElementById("cargarPila")
let pilaJS = [];

popButton.addEventListener("click", function(event) {
    imagenPush.style.display = "none"
    event.preventDefault();
    imagenPop.style.display = "block"; 
});

pushButton.addEventListener("click", function(event) {
    imagenPop.style.display = "none"
    event.preventDefault();
    imagenPush.style.display = "block";
});

// Funcionalidad de la pila
function crearNuevaPila() {
    const pila = document.getElementById('pila');
    // Aplicar animación de fade-out a cada elemento
    Array.from(pila.children).forEach(elemento => {
        elemento.classList.add('fade-out');
    });

    // Retrasar la eliminación hasta que la animación se complete
    setTimeout(() => {
        while (pila.firstChild) {
            pila.removeChild(pila.firstChild);
        }
        pilaJS = [];
        console.log('Nueva pila creada');
    }, 500);
}
// push
function agregarALaPila() {
    var inputField = document.getElementById('nuevoElemento');
    var elemento = inputField.value;
    if (!elemento) return; // Evita agregar elementos vacíos

    // Creación y configuración del nuevo elemento de la pila
    const nuevoElemento = document.createElement('div');
    nuevoElemento.classList.add('elemento-pila', 'entrando');
    nuevoElemento.textContent = elemento;

    // Visual: añadir el elemento al DOM
    const pila = document.getElementById('pila');
    pila.insertBefore(nuevoElemento, pila.firstChild); // Se inserta al inicio

    // Interno: agregar elemento a la estructura de datos de la pila
    pilaJS.unshift(elemento); // Se agrega al inicio de la pila
    console.log(pilaJS);
}
// pop
function quitarDeLaPila() {
    const pila = document.getElementById('pila');
    if (pila.firstChild) {
        pila.firstChild.classList.add('saliendo');

        // Retrasa la eliminación del elemento para permitir que la animación se complete
        setTimeout(() => {
            pila.removeChild(pila.firstChild);
            pilaJS.shift(); // Elimina el elemento de la estructura de datos de la pila
            console.log(pilaJS);
        }, 500); // Asegúrate de que este tiempo coincida con la duración de la animación en CSS
    }
}

// Función para guardar la pila en una cookie
function guardarPila() {
    console.log(pilaJS);
    let enFormatoString = JSON.stringify(pilaJS);
    document.cookie = "pila=" + enFormatoString + ";max-age=86400;path=/";

    // Efecto visual al guardar
    const pila = document.getElementById('pila');
    pila.classList.add('fade-out');
    setTimeout(() => {
        pila.classList.remove('fade-out');
    }, 500);
}
// Función para cargar la pila guardada
function cargarPilaGuardada() {
    let pilaString = obtenerMiEstructuraDeDatos("pila");
    if (pilaString) {
        try {
            pilaJS = JSON.parse(pilaString);
            const pilaVisual = document.getElementById('pila');
            // Vaciar la pila visual antes de reconstruir
            while (pilaVisual.firstChild) {
                pilaVisual.removeChild(pilaVisual.firstChild);
            }
            // Reconstruir la pila visual
            pilaJS.forEach(elemento => {
                const nuevoElemento = document.createElement('div');
                nuevoElemento.classList.add('elemento-pila', 'fade-in');
                nuevoElemento.textContent = elemento;
                pilaVisual.appendChild(nuevoElemento);
            });
        } catch (error) {
            console.error("Error al analizar la cookie: " + error);
        }
    }
}


function obtenerMiEstructuraDeDatos(nombreCookie) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(nombreCookie + '=')) {
            return decodeURIComponent(cookie.substring(nombreCookie.length + 1));
        }
    }
    return null;
}

guardaPila.addEventListener("click", function(event) {
    event.preventDefault();
    guardarPila();
});

cargaPila.addEventListener("click", function (event) {
    event.preventDefault();
    cargarPilaGuardada();
});

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('nuevaPila').addEventListener('click', crearNuevaPila);
    document.getElementById('guardarPila').addEventListener('click', guardarPila);
    document.getElementById('pushButton').addEventListener('click', agregarALaPila);
    document.getElementById('popButton').addEventListener('click', quitarDeLaPila);
});
