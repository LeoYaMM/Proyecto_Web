// Intercambio de imágenes
var pushButton = document.getElementById("pushButton");
var popButton = document.getElementById("popButton");
var imagenPop = document.getElementById("imagenPop");
var imagenPush = document.getElementById("imagenPush");
var guardaCola = document.getElementById("guardarCola")
var cargaCola = document.getElementById("cargarCola")
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
    // Vaciar la cola lógica
    colaJS = [];

    // Vaciar la cola visual
    const cola = document.getElementById('cola');
    while (cola.firstChild) {
        cola.removeChild(cola.firstChild);
    }
}
//push
function agregarALaCola() {
    var inputField = document.getElementById('nuevoElemento');
    var elemento = inputField.value;
    if (elemento.trim() === '') return; // No hacer nada si el campo está vacío

    // Visual
    const cola = document.getElementById('cola');
    const nuevoElemento = document.createElement('div');
    nuevoElemento.classList.add('elemento-cola', 'entradaPush'); // Agrega la clase de la animación
    nuevoElemento.textContent = elemento;
    cola.appendChild(nuevoElemento);
    
    // Asegurarse de que la imagen de push se muestre y aplique la animación
    imagenPush.style.display = "block";
    imagenPush.classList.remove('salidaPop');
    imagenPush.classList.add('entradaPush');

    // Interno
    colaJS.push(elemento);
    console.log(colaJS);

    // Limpiar el campo de entrada
    inputField.value = '';
}

// Modifica la función quitarDeLaCola para incluir la animación pop
function quitarDeLaCola() {
    const cola = document.getElementById('cola');
    if (cola.firstChild) {
        // Quitar de la cola visual con animación
        const elementoARemover = cola.firstChild;
        //elementoARemover.classList.add('salidaPop'); // Agrega la clase de la animación

        // Esperar a que termine la animación antes de remover el elemento
        setTimeout(() => {
            if (cola.contains(elementoARemover)) {
                cola.removeChild(elementoARemover);
            }
        }, 500); // 500 ms es la duración de la animación
        // Quitar de la cola en JS
        colaJS.shift();
        console.log(colaJS);
    }
}



// Función para guardar la cola en una cookie
function guardarCola() {
    console.log(colaJS);
    let enFormatoString = JSON.stringify(colaJS);
    document.cookie = "cola=" + enFormatoString + ";max-age=86400;path=/"
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
function cargarColaGuardada() {
    let colaString = obtenerMiEstructuraDeDatos("cola");
    if (colaString) {
        try {
            colaJS = JSON.parse(colaString);

            // Reconstruir la cola visual
            const colaVisual = document.getElementById('cola');

            colaJS.forEach(elemento => {
                const nuevoElemento = document.createElement('div');
                nuevoElemento.classList.add('elemento-cola');
                nuevoElemento.textContent = elemento;
                colaVisual.appendChild(nuevoElemento);
            });
        } catch (error) {
            console.error("Error al analizar la cookie: " + error);
        }
    }
}

guardaCola.addEventListener("click", function(event) {
    event.preventDefault();
    guardarCola();
});

cargaCola.addEventListener("click", function (event) {
    event.preventDefault();
    cargarColaGuardada();
})

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('nuevaCola').addEventListener('click', crearNuevaCola);
    document.getElementById('guardarCola').addEventListener('click', guardarCola);
    document.getElementById('pushButton').addEventListener('click', agregarALaCola);
    document.getElementById('popButton').addEventListener('click', quitarDeLaCola);
});
