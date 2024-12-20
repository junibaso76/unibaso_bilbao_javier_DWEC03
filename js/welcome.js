'use strict';

$(document).ready(function () {
    // Comprobación de usuario autenticado
    const usuarioNombre = localStorage.getItem("usuarioNombre");

    if (usuarioNombre) {
        // Mostrar mensaje de bienvenida con animación
        $("#bienvenida")
            .text(`¡Bienvenido ${usuarioNombre}!`)
            .hide()
            .fadeIn(1000);
    } else {
        // Redirigir al login si no hay usuario
        alert("No has iniciado sesión. Serás redirigido al login.");
        window.location.href = "login.html";
        return; // Detener la ejecución del resto del código
    }

    // Configuración del juego al hacer clic en "start-game"
    $("#start-game").on("click", function () {
        const level = $("#level").val();
        const colors = $("#colors").val();

        // Establecer el nivel inicial según la dificultad seleccionada
        let initialLevel = 0; // Por defecto para "fácil"
        if (level === "medium") {
            initialLevel = 4;
        } else if (level === "hard") {
            initialLevel = 9;
        }

        // Guardar configuraciones en localStorage
        localStorage.setItem("level", initialLevel);
        localStorage.setItem("colors", colors);

        // Animación antes de redirigir
       
            window.location.href = "game.html";
       
    });

    // Efecto visual en el título al pasar el mouse
    $("h1").on("mouseenter", function () {
        $(this).css("color", "blue").fadeOut(200).fadeIn(200).css("color", "black");
    });

    // Evento al cambiar las opciones del select
    $("#level, #colors").on("change", function () {
        $(this).css("background-color", "#e0f7fa").animate({ opacity: 1 }, 500);
    });

    // Mensaje motivacional al presionar Enter
    $(document).on("keydown", function (e) {
        if (e.key === "Enter") {
            alert("¡Presionaste Enter! ¿Listo para comenzar? Pulsa en Comenzar Juego");
        }
    });
    // Fade-in para la carga inicial de la página
    $("body").hide().fadeIn(500);
  
});
