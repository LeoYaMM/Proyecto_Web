//Script para mostrar las imagenes cuando se pulse un botón y mostrar las imagenes
// Obtener los elementos
var pushButton = document.getElementById("pushButton");
var popButton = document.getElementById("popButton");
var imagenPop = document.getElementById("imagenPop");
var imagenPush = document.getElementById("imagenPush");

popButton.addEventListener("click", function(event) {
    imagenPush.style.display= "none"
    event.preventDefault(); // Prevenir el comportamiento predeterminado
    imagenPop.style.display = "block"; 
});

pushButton.addEventListener("click", function(event) {
    imagenPop.style.display= "none"
    event.preventDefault(); // Prevenir el comportamiento predeterminado
    imagenPush.style.display = "block";
});


