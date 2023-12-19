// Intercambio de imágenes
var pushButton = document.getElementById("pushButton");
var popButton = document.getElementById("popButton");
var imagenPop = document.getElementById("imagenPop");
var imagenPush = document.getElementById("imagenPush");

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
    const cola = document.getElementById('cola');
    const nuevoElemento = document.createElement('div');
    nuevoElemento.classList.add('elemento-cola');
    nuevoElemento.textContent = elemento;
    cola.appendChild(nuevoElemento);
}

//pop function
function quitarDeLaCola() {
    const cola = document.getElementById('cola');
    cola.removeChild(cola.firstChild);
}

//save queue
function guardarCola() {
    const cola = document.getElementById('cola');
    const colaGuardada = [];
    cola.childNodes.forEach(elemento => {
        colaGuardada.push(elemento.textContent);
    });
    localStorage.setItem('cola', JSON.stringify(colaGuardada));
}

function cargarColaGuardada() {
    const colaGuardada = JSON.parse(localStorage.getItem('cola'));
    if (colaGuardada) {
        crearNuevaCola(); // Limpia la cola actual antes de cargar la guardada
        colaGuardada.forEach(elemento => {
            agregarALaCola(elemento);
        });
    }
}

