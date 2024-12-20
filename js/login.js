$(document).ready(function () {
    // Manejo del envío del formulario
    $("#login-form").on("submit", function (e) {
        e.preventDefault();

        const username = $("#username").val().trim();
        const password = $("#password").val().trim();

        // Limpia mensajes previos
        $("#error-message").text("");

        if (!username || !password) {
            // Valida que no haya campos vacíos
            $("#error-message").text("Por favor, completa todos los campos.");
            return;
        }

        // Realiza una solicitud AJAX para obtener los datos del archivo JSON
        $.getJSON("/data/usuarios.json", function (usuarios) {
            const usuario = usuarios.find(user => user.usuario === username);

            if (!usuario) {
                // Usuario no encontrado
                $("#error-message").text("El usuario no existe.");
            } else if (usuario.contraseña !== password) {
                // Contraseña incorrecta
                $("#error-message").text("Contraseña incorrecta.");
            } else {
                // Usuario y contraseña correctos
                $("#error-message").text("");
                localStorage.setItem("usuarioAutenticado", username); 
                localStorage.setItem("usuarioNombre", usuario.nombre);
                window.location.href = "welcome.html"; // Redirige a la página de bienvenida
            }
        }).fail(function () {
            // Error al cargar el archivo JSON
            $("#error-message").text("No se pudieron cargar los datos. Intenta más tarde.");
        });
    });

    // Evento de foco en los inputs (resaltar bordes y fondo)
    $("input").on("focus", function () {
        $(this).css({
            "border-color": "#007bff",
            "box-shadow": "0 0 10px rgba(0, 123, 255, 0.5)",
            "background-color": "#e0f7fa"
        });
    });

    // Evento al perder el foco (restaurar estilos originales)
    $("input").on("blur", function () {
        $(this).css({
            "border-color": "#ccc",
            "box-shadow": "none",
            "background-color": "white",
            "font-style": "none",
            "font-weight": "none"
        });
    });

    // Evento hover sobre el botón (cambio de color y brillo)
    $("button").on("mouseenter", function () {
        $(this).css({
            "background-color": "#0056b3",
            "color": "white",
            "box-shadow": "0 0 20px rgba(0, 123, 255, 0.7)",
            "font-weight": "bold"
        });
    });

    // Evento al salir del hover del botón (restaurar estilos)
    $("button").on("mouseleave", function () {
        $(this).css({
            "background-color": "#007bff",
            "color": "white",
            "box-shadow": "none",
            "font-weight": "normal"
        });
    });

    // Evento al escribir en los inputs (cambiar tipografía)
    $("input").on("input", function () {
        $(this).css({
            "background-color": "#e0f7fa",
            "box-shadow": "0 0 20px rgba(0, 123, 255, 0.7)"
        });
    });

     // Evento mientras se presiona el botón (mousedown)
     $("button").on("mousedown", function () {
        $(this).css({
            "background-color": "#003d80",
            "transform": "scale(0.95)",
            "box-shadow": "0 0 5px rgba(0, 0, 0, 0.5)"
        });
    });

    // Evento al soltar el botón (mouseup)
    $("button").on("mouseup", function () {
        $(this).css({
            "background-color": "#0056b3",
            "transform": "scale(1)",
            "box-shadow": "0 0 15px rgba(0, 123, 255, 0.7)"
        });
    });

    // Fade-in para la carga inicial de la página
    $("body").hide().fadeIn(500);
    
});
