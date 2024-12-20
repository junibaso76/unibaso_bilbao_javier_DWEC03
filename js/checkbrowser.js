'use strict';

window.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("main-content");

    try {
        // Verificar si el navegador soporta características básicas
        if (!window.localStorage || !window.addEventListener) {
            throw new Error("El navegador no soporta características esenciales para este juego.");
        }

        // Verificar el idioma del navegador
        const userLanguage = navigator.language || navigator.userLanguage;
        if (!userLanguage || !userLanguage.startsWith("es")) {
            throw new Error("El idioma del navegador no es compatible. Por favor, configure su navegador en español.");
        }

        // Redirigir si todo está correcto
        mainContent.innerHTML = "<p>Cargando el juego...</p>";
        setTimeout(() => {
            window.location.href = "html/login.html";
        }, 1000);
    } catch (error) {
        // Mostrar mensaje de error en caso de incompatibilidad
        mainContent.innerHTML = `<p class="error">${error.message}</p>`;
    }
});
