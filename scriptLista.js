function appendToEnd(){
    var ul = document.getElementById("myList");
    var li = document.createElement("li");
    var inputValue = prompt("Ingresa el elemento:");
    li.appendChild(document.createTextNode(inputValue));
    li.style.width = 50 + 'px';
    ul.appendChild(li);
}

function appendToTop(){
    var ul = document.getElementById("myList");
    var li = document.createElement("li");
    var inputValue = prompt("Ingresa el elemento:");
    li.appendChild(document.createTextNode(inputValue));
    li.style.width = 50 + 'px';
    ul.insertBefore(li, ul.firstChild);
}

function insert(){
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

    li.style.width = 50 + 'px';

    if (posicion < 0 || posicion >= ul.children.length) {
       ul.appendChild(li);
    } else {
       ul.insertBefore(li, ul.children[posicion]);
    }
}

function deleteFirst(){
    var ul = document.getElementById("myList");
    if (ul.childElementCount > 0) {
        ul.removeChild(ul.firstChild);
    }
}

function deleteLast(){
    var ul = document.getElementById("myList");
    if (ul.childElementCount > 0) {
        ul.removeChild(ul.lastChild);
    }
}

function deleteByPosition(){
    var index = prompt("Ingrese la posición de la celda a eliminar:");
    var ul = document.getElementById("myList");
    var items = document.querySelectorAll("#myList li");
    if (index < items.length) {
        ul.removeChild(items[index]);
    } else {
        alert("Celda fuera de rango.");
    }
}

function deleteByValue(){
    var contenido = prompt("Ingrese el contenido del elemento que desea eliminar:");

    var lista = document.getElementById("myList"); // Asegúrate de que este sea el ID de tu lista
    var elementos = lista.getElementsByTagName("li");
    var encontrado = false;

    for (var i = 0; i < elementos.length; i++) {
        if (elementos[i].textContent === contenido) {
            lista.removeChild(elementos[i]);
            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        alert("No se encontró un elemento con ese contenido.");
    }
}