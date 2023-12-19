// Intercambio de imágenes
var pushButton = document.getElementById("pushButton");
var popButton = document.getElementById("popButton");
var imagenPop = document.getElementById("imagenPop");
var imagenPush = document.getElementById("imagenPush");
let colaJS = [];

popButton.addEventListener("click", function(event) {
    imagenPush.style.display= "none"
    event.preventDefault();
    imagenPop.style.display = "block"; 
});

pushButton.addEventListener("click", function(event) {
    imagenPop.style.display= "none"
    event.preventDefault();
    imagenPush.style.display = "block";
});

//funcionalidad de la cola
function crearNuevaCola() {
    const cola = document.getElementById('cola');
    while (cola.firstChild) {
        cola.removeChild(cola.firstChild);
    }
}
//push
function agregarALaCola(elemento) {
    var inputField = document.getElementById('nuevoElemento');
    var elemento = inputField.value;
    //visual
    const cola = document.getElementById('cola');
    const nuevoElemento = document.createElement('div');
    nuevoElemento.classList.add('elemento-cola');
    nuevoElemento.textContent = elemento;
    cola.appendChild(nuevoElemento);
    //interno
    colaJS.push(elemento);
}

//pop function
function quitarDeLaCola() {
    const cola = document.getElementById('cola');
    if (cola.firstChild) {
        // Quitar de la cola visual
        cola.removeChild(cola.firstChild);
        // Quitar de la cola en JS
        colaJS.shift();
    }
}

// Función para guardar la cola en una cookie
function guardarCola() {
    let enFormatoString = JSON.stringify(colaJS);
    document.cookie = "cola=" + enFormatoString + ";max-age=8200;path=/";
}

// Función para cargar la cola desde una cookie
function cargarCola() {
    let colaString = obtenerMiEstructuraDeDatos("cola");
    if (colaString) {
        colaJS = JSON.parse(colaString);

        // Reconstruir la cola visual
        const colaVisual = document.getElementById('cola');
        colaVisual.innerHTML = ""; // Borra todos los elementos visuales existentes

        colaJS.forEach(elemento => {
            const nuevoElemento = document.createElement('div');
            nuevoElemento.classList.add('elemento-cola');
            nuevoElemento.textContent = elemento;
            colaVisual.appendChild(nuevoElemento);
        });
    }
}

// Función para obtener el valor de una cookie por nombre
function obtenerMiEstructuraDeDatos(nombreCookie) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(nombreCookie + '=')) {
            return decodeURIComponent(cookie.substring(nombreCookie.length + 1, cookie.length));
        }
    }
    return null;
}

// Llama a cargarCola al cargar la página para cargar la cola previamente guardada
window.onload = cargarCola;
