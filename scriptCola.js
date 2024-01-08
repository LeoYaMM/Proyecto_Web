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
    var ul = document.getElementById("cola");
    var li = document.createElement("li");
    var inputField = document.getElementById('nuevoElemento');
    var elemento = inputField.value;
    if (elemento.trim() === '') return;

    li.appendChild(document.createTextNode(elemento));
    li.classList.add("elemento-cola");
    ul.appendChild(li);

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

// pop
function quitarDeLaCola() {
    var ul = document.getElementById("cola");
    if (ul.childElementCount > 0) {
        var primerElemento = ul.firstElementChild;

        primerElemento.classList.add("salidaPop");

        setTimeout(() => {
            ul.removeChild(primerElemento);
        }, 800);
    }

    colaJS.shift();
    console.log(colaJS);
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
                const nuevoElemento = document.createElement('li');
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
