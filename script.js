// Seleccionar el botón
const boton = document.getElementById("boton");
let contenedor = document.getElementById("contenedor");

// Agregar un evento al botón
boton.addEventListener("click", () => {
    contenedor.innerHTML += "<p>¡Hola, mundo!</p>";
});