// script.js
document.getElementById('formElemento').addEventListener('submit', function(event) {
    event.preventDefault();
    const nuevoElemento = document.getElementById('nuevoElemento').value;
    if (nuevoElemento) {
        agregarALaPila(nuevoElemento);
        document.getElementById('nuevoElemento').value = ''; // Limpiar el campo de texto
    }
    mostrarImagen('push');
});

function agregarALaPila(elemento) {
    const pila = document.getElementById('pila');
    const elementoDiv = document.createElement('div');
    elementoDiv.classList.add('elemento-pila');
    elementoDiv.textContent = elemento;
    pila.insertBefore(elementoDiv, pila.firstChild); // Agrega el elemento al principio de la pila
    guardarPila(); // Guarda la pila después de agregar un nuevo elemento
}

document.getElementById('eliminarElemento').addEventListener('click', function() {
    const pila = document.getElementById('pila');
    if (pila.firstChild) {
        pila.removeChild(pila.firstChild); // Elimina el elemento superior de la pila
    }
    mostrarImagen('pop');
});

document.getElementById('cargarPila').addEventListener('click', function() {
    cargarPilaGuardada();
});

document.getElementById('nuevaPila').addEventListener('click', function() {
    crearNuevaPila();
});

function guardarPila() {
    const elementos = [];
    document.querySelectorAll('.elemento-pila').forEach(elemento => {
        elementos.push(elemento.textContent);
    });
    localStorage.setItem('pila', JSON.stringify(elementos));
}

function cargarPilaGuardada() {
    const pilaGuardada = JSON.parse(localStorage.getItem('pila'));
    if (pilaGuardada) {
        crearNuevaPila(); // Limpia la pila actual antes de cargar la guardada
        pilaGuardada.forEach(elemento => {
            agregarALaPila(elemento);
        });
    }
}

function crearNuevaPila() {
    const pila = document.getElementById('pila');
    while (pila.firstChild) {
        pila.removeChild(pila.firstChild);
    }
}

function mostrarImagen(operacion) {
    const imagenPush = document.getElementById('imagenPush');
    const imagenPop = document.getElementById('imagenPop');

    // Ocultar ambas imágenes primero
    imagenPush.style.display = 'none';
    imagenPop.style.display = 'none';

    // Mostrar la imagen correspondiente
    if (operacion == 'push') {
        imagenPush.style.display = 'block';
        imagenPush.classList.add('visible');
    } else if (operacion == 'pop') {
        imagenPop.style.display = 'block';
        imagenPop.classList.add('visible');
    }
}