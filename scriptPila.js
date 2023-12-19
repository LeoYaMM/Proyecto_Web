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
    // Vaciar la pila lógica
    pilaJS = [];

    // Vaciar la pila visual
    const pila = document.getElementById('pila');
    while (pila.firstChild) {
        pila.removeChild(pila.firstChild);
    }
}
// push
function agregarALaPila() {
    var inputField = document.getElementById('nuevoElemento');
    var elemento = inputField.value;
    // visual
    const pila = document.getElementById('pila');
    const nuevoElemento = document.createElement('div');
    nuevoElemento.classList.add('elemento-pila');
    nuevoElemento.textContent = elemento;
    pila.insertBefore(nuevoElemento, pila.firstChild); // Se inserta al inicio
    // interno
    pilaJS.unshift(elemento); // Se agrega al inicio de la pila
    console.log(pilaJS)
}
// pop
function quitarDeLaPila() {
    const pila = document.getElementById('pila');
    if (pila.firstChild) {
        // Quitar de la pila visual
        pila.removeChild(pila.firstChild);
        // Quitar de la pila en JS
        pilaJS.shift();
        console.log(pilaJS)
    }
}
// Función para guardar la pila en una cookie
function guardarPila() {
    console.log(pilaJS);
    let enFormatoString = JSON.stringify(pilaJS);
    document.cookie = "pila=" + enFormatoString + ";max-age=86400;path=/"
}
// Función para cargar la pila guardada
function cargarPilaGuardada() {
    let pilaString = obtenerMiEstructuraDeDatos("pila");
    if (pilaString) {
        try {
            pilaJS = JSON.parse(pilaString);

            // Reconstruir la pila visual
            const pilaVisual = document.getElementById('pila');

            pilaJS.forEach(elemento => {
                const nuevoElemento = document.createElement('div');
                nuevoElemento.classList.add('elemento-pila');
                nuevoElemento.textContent = elemento;
                pilaVisual.insertBefore(nuevoElemento, pilaVisual.firstChild); // Se inserta al inicio
            });
        } catch (error) {
            console.error("Error al analizar la cookie: " + error);
        }
    }
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
