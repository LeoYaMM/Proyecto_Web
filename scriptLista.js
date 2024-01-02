function appendToEnd() {
    var ul = document.getElementById("myList");
    var li = document.createElement("li");
    var inputValue = prompt("Ingresa el elemento:");
    li.appendChild(document.createTextNode(inputValue));
    li.style.width = '50px';
    li.classList.add("animate-add");
    ul.appendChild(li);
    document.getElementById('imagenMostrada').src = 'appendToEnd.png';
}

function appendToTop() {
    var ul = document.getElementById("myList");
    var li = document.createElement("li");
    var inputValue = prompt("Ingresa el elemento:");
    li.appendChild(document.createTextNode(inputValue));
    li.style.width = '50px';
    li.classList.add("animate-add");
    ul.insertBefore(li, ul.firstChild);
    document.getElementById('imagenMostrada').src = 'appendToTop.png';
}

function insert() {
    var elemento = prompt("Ingrese el elemento:");
    var posicion = prompt("Ingrese la posición:");

    // Convierte la posición a un número y valida
    posicion = parseInt(posicion, 10);
    if (isNaN(posicion)) {
        alert("Por favor, ingrese un número válido para la posición.");
        return;
    }

    var ul = document.getElementById("myList");
    var li = document.createElement("li");
    li.textContent = elemento;

    li.style.width = '50px';
    li.classList.add("animate-add");

    if (posicion < 0 || posicion >= ul.children.length) {
        ul.appendChild(li);
    } else {
        ul.insertBefore(li, ul.children[posicion]);
    }
    document.getElementById('imagenMostrada').src = 'insert.png';
}

function deleteFirst() {
    var ul = document.getElementById("myList");
    if (ul.childElementCount > 0) {
        var primerElemento = ul.firstElementChild;

        primerElemento.classList.add("animate-delete");

        setTimeout(() => {
            ul.removeChild(primerElemento);
        }, 800);
    }
    document.getElementById('imagenMostrada').src = 'deleteFirst.png';
}

function deleteLast() {
    var ul = document.getElementById("myList");
    if (ul.childElementCount > 0) {
        var lastElement = ul.lastElementChild;

        lastElement.classList.add("animate-delete");

        setTimeout(() => {
            ul.removeChild(lastElement);
        }, 800);
    }
    document.getElementById('imagenMostrada').src = 'deleteLast.png';
}

function deleteByPosition() {
    var index = prompt("Ingrese la posición de la celda a eliminar:");
    var ul = document.getElementById("myList");
    var items = document.querySelectorAll("#myList li");
    if (index < items.length) {
        items[index].classList.add("animate-delete");

        setTimeout(() => {
            ul.removeChild(items[index]);
        }, 800);
    } else {
        alert("Celda fuera de rango.");
    }
    document.getElementById('imagenMostrada').src = 'deleteByPosition.png';
}

function deleteByValue() {
    var contenido = prompt("Ingrese el contenido del elemento que desea eliminar:");

    var lista = document.getElementById("myList");
    var elementos = lista.getElementsByTagName("li");
    var encontrado = false;

    for (var i = 0; i < elementos.length; i++) {
        if (elementos[i].textContent === contenido) {
            elementos[i].classList.add("animate-delete");

            setTimeout(() => {
                lista.removeChild(elementos[i]);
            }, 800);
            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        alert("No se encontró un elemento con ese contenido.");
    }
    document.getElementById('imagenMostrada').src = 'deleteByValue.png';
}

function guardarLista() {
    var ul = document.getElementById("myList");
    var elementos = [];

    for (var i = 0; i < ul.children.length; i++) {
        elementos.push(ul.children[i].innerText);
    }

    var listaEnCadena = JSON.stringify(elementos);
    localStorage.setItem("miLista", listaEnCadena);
    alert("Lista Guardada");
}

function cargarLista() {
    var listaEnCadena = localStorage.getItem("miLista");
    if (listaEnCadena) {
        var elementos = JSON.parse(listaEnCadena);
        var ul = document.getElementById("myList");
        ul.innerHTML = ""; // Limpiar la lista actual

        elementos.forEach(function(item) {
            var li = document.createElement("li");
            li.style.width = 50 + 'px';
            li.appendChild(document.createTextNode(item));
            li.classList.add("lista-animada");
            ul.appendChild(li);
        });
    } else {
        alert("No hay lista guardada");
    }
}