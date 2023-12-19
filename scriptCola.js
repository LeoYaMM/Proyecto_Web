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

function agregarALaCola(elemento) {
    const cola = document.getElementById('cola');
    const nuevoElemento = document.createElement('div');
    nuevoElemento.classList.add('elemento-cola');
    nuevoElemento.textContent = elemento;
    cola.appendChild(nuevoElemento);
}

function guardarCola() {
    const elementos = [];
    document.querySelectorAll('.elemento-cola').forEach(elemento => {
        elementos.push(elemento.textContent);
    });
    localStorage.setItem('cola', JSON.stringify(elementos));
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

pushButton.addEventListener('click', function() {
    const elemento = document.getElementById('elementoCola').value;
    if (elemento) {
        agregarALaCola(elemento);
        guardarCola();
    }
    mostrarImagen('push');
});
