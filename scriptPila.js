// script.js

document.getElementById('formElemento').addEventListener('submit', function(event) {
    event.preventDefault();

    const nuevoElemento = document.getElementById('nuevoElemento').value;
    if (nuevoElemento) {
        agregarALaPila(nuevoElemento);
        document.getElementById('nuevoElemento').value = ''; // Limpiar el campo de texto
        actualizarCodigoOperacion(`void push(Pila *p, int dato) {
            Nodo *nuevoNodo = crearNodo(dato);
            nuevoNodo->siguiente = p->cima;
            p->cima = nuevoNodo;
        }`)
    }    
});

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function guardarPila() {
    const elementos = [];
    document.querySelectorAll('.elemento-pila').forEach(elemento => {
        elementos.push(elemento.textContent);
    });
    setCookie('pila', JSON.stringify(elementos), 7); // Guarda la pila por 7 días
    console.log("Pila guardada:", JSON.stringify(elementos));

}


function agregarALaPila(elemento) {
    const pila = document.getElementById('pila');
    const elementoDiv = document.createElement('div');
    elementoDiv.classList.add('elemento-pila');
    elementoDiv.textContent = elemento;
    pila.insertBefore(elementoDiv, pila.firstChild); // Agrega el elemento al principio de la pila
    guardarPila(); // Guarda la pila después de agregar un nuevo elemento
    elementoDiv.classList.add('entrando');
}

document.getElementById('eliminarElemento').addEventListener('click', function() {
    const pila = document.getElementById('pila');
    
    if (pila.firstChild) {
        const elementoAEliminar = pila.firstChild;
        elementoAEliminar.classList.add('saliendo');
        
        elementoAEliminar.addEventListener('animationend', function() {
            pila.removeChild(elementoAEliminar);
            guardarPila();
            
            actualizarCodigoOperacion(`int pop(Pila *p) {
                if (p->cima == NULL) {
                    printf("Pila vacía. No se puede realizar pop.\\n");
                    return -1; // O manejar el error como prefieras
                }
                Nodo *nodoAEliminar = p->cima;
                int dato = nodoAEliminar->dato;
                p->cima = nodoAEliminar->siguiente;
                free(nodoAEliminar);
                return dato;
            }`);
            
            elementoAEliminar.removeEventListener('animationend', arguments.callee);
        });
    }
});


function actualizarCodigoOperacion(texto) {
    let codigoOperacion = document.getElementById('codigoOperacion');
    let codigoFuente = document.getElementById('codigoFuente');
    
    // Actualizar texto
    codigoOperacion.textContent = texto;
    
    // Reiniciar la animación
    codigoOperacion.classList.remove('codigo-visible', 'codigo-oculto');
    // Forzar el reflujo del DOM
    void codigoOperacion.offsetWidth;
    codigoOperacion.classList.add('codigo-visible');
    
    // Ocultar el código fuente con animación
    codigoFuente.classList.remove('codigo-visible');
    codigoFuente.classList.add('codigo-oculto');
}

document.getElementById('cargarPila').addEventListener('click', function() {
    cargarPilaGuardada();
    mostrarCodigoFuente();
});

document.getElementById('nuevaPila').addEventListener('click', function() {
    crearNuevaPila();
    mostrarCodigoFuente();
});

document.getElementById('guardarPila').addEventListener('click', function() {
    guardarPila();
    mostrarCodigoFuente();
});

function cargarPilaGuardada() {
    let pilaGuardada = getCookie('pila');
    if (pilaGuardada) {
        try {
            pilaGuardada = JSON.parse(pilaGuardada);
            console.log("Pila cargada:", pilaGuardada);
            crearNuevaPila(); // Limpia la pila actual antes de cargar la guardada
            pilaGuardada.forEach(elemento => {
                agregarALaPila(elemento);
            });
        } catch (e) {
            console.error("Error al parsear la pila guardada:", e);
        }
    }
}


function crearNuevaPila() {
    const pila = document.getElementById('pila');
    while (pila.firstChild) {
        pila.removeChild(pila.firstChild);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    cargarPilaGuardada();
    const codigoFuente = 
`#include <stdio.h>
#include <stdlib.h>

// Definición de la estructura del nodo
typedef struct nodo {
    int dato;
    struct nodo *siguiente;
} Nodo;

// Definición de la estructura de la pila
typedef struct {
    Nodo *cima;
} Pila;

// Función para crear una nueva pila
Pila* crearPila() {
    Pila *p = (Pila *)malloc(sizeof(Pila));
    p->cima = NULL;
    return p;
}

// Función para crear un nuevo nodo
Nodo* crearNodo(int dato) {
    Nodo *nuevoNodo = (Nodo *)malloc(sizeof(Nodo));
    nuevoNodo->dato = dato;
    nuevoNodo->siguiente = NULL;
    return nuevoNodo;
}`;

    document.getElementById('codigoFuente').textContent = codigoFuente;
});

function mostrarCodigoFuente() {
    let codigoFuente = document.getElementById('codigoFuente');
    let codigoOperacion = document.getElementById('codigoOperacion');

    // Mostrar el código fuente con animación
    codigoFuente.classList.remove('codigo-oculto');
    codigoFuente.classList.add('codigo-visible');

    // Ocultar el código de operación, si está visible
    codigoOperacion.classList.remove('codigo-visible');
    codigoOperacion.classList.add('codigo-oculto');
}
