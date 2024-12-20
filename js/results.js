'use strict';

$(document).ready(function () {
    // Mostrar la puntuación final desde localStorage
    const finalScore = localStorage.getItem("finalScore") || 0;
    $("#final-score").text(finalScore);

    // Reiniciar el juego: ir a welcome.html
    $("#restart-game").on("click", function () {
       
            window.location.href = "welcome.html";
   });

    // Salir del juego: limpiar localStorage y redirigir a login.html
    $("#exit-game").on("click", function () {
        localStorage.clear();
        window.location.href = "login.html";
    });

    // Fade-in para la carga inicial de la página
    $("body").hide().fadeIn(500);
});
