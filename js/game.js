'use strict';

document.addEventListener("DOMContentLoaded", function () {
    let level = parseInt(localStorage.getItem("level")) || 0;
    const gameColors = localStorage.getItem("colors");
    const stylesheet = document.getElementById("stylesheet");

    // Cargar tema según configuración previa
    if (gameColors === "grayscale") {
        stylesheet.setAttribute("href", "../css/grayscale.css");
    } else if (gameColors === "whitescale") {
        stylesheet.setAttribute("href", "../css/whitescale.css");
    }

    // Temporizador general del juego
    let timer = 100;
    const timerElement = document.getElementById("timer");
    const timerInterval = setInterval(function () {
        timer--;
        timerElement.textContent = timer;

        if (timer <= 0) {
            clearInterval(timerInterval);
            window.location.href = "results.html";
        }
    }, 1000);

    // Variables del juego
    const colors = ["red", "green", "yellow", "blue"];
    let sequence = [];
    let userSequence = [];
    let score = 0;
    let timeout;
    let delay = 1000;
    let playingSequence = false;

    const scoreElement = document.getElementById("score");
    const segments = document.querySelectorAll(".segment");
    const infoJuegoElement = document.getElementById("infoJuego");
    const container = document.querySelector(".container");

    // Función para iniciar el juego
    function startGame() {
        resetGame();

        for (let i = 0; i < level; i++) {
            addToSequence();
        }
        nextRound();
    }

    // Reiniciar el estado del juego
    function resetGame() {
        sequence = [];
        userSequence = [];
        score = 0;
        delay = 1000;
        clearTimeout(timeout);
        document.body.style.backgroundColor = "";
        container.style.backgroundColor = "";
        scoreElement.textContent = "0";
    }

    // Avanzar a la siguiente ronda
    function nextRound() {
        userSequence = [];
        level++;
        addToSequence();
        playSequence();
    }

    // Añadir un nuevo color aleatorio a la secuencia
    function addToSequence() {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(randomColor);
    }

    // Reproducir la secuencia de colores
    function playSequence() {
        let i = 0;
        infoJuegoElement.textContent = "Observa la secuencia...";
        playingSequence = true;

        function illuminateNext() {
            if (i < sequence.length) {
                const color = sequence[i];
                highlightColor(color);
                setTimeout(() => {
                    clearAllHighlights();
                    i++;
                    setTimeout(illuminateNext, delay / 2);
                }, delay / 2);
            } else {
                setTimeout(() => {
                    clearAllHighlights();
                    infoJuegoElement.textContent = "Tu turno: Reproduce la secuencia.";
                    playingSequence = false;
                    startUserTimer();
                }, delay / 2);
            }
        }

        illuminateNext();
    }

    // Resaltar un color específico
    function highlightColor(color) {
        const segment = document.querySelector(`.segment[data-color='${color}']`);
        if (segment) { // Verificar que el elemento existe
            segment.style.filter = "brightness(2.5)";
            segment.style.transform = "scale(1.1)";
            setTimeout(() => {
                segment.style.filter = "brightness(1)";
                segment.style.transform = "scale(1)";
            }, delay / 2);
        } else {
            console.error(`No se encontró el segmento para el color: ${color}`);
        }
    }

    // Apagar todos los colores iluminados
    function clearAllHighlights() {
        segments.forEach(segment => {
            segment.style.filter = "brightness(1)";
            segment.style.transform = "scale(1)";
        });
    }

    // Manejar clic del usuario en los segmentos
    segments.forEach(segment => {
        segment.addEventListener("click", function () {
            if (!playingSequence && userSequence.length < sequence.length) {
                const color = this.dataset.color;
                userSequence.push(color);
                highlightColor(color);
                if (color !== sequence[userSequence.length - 1]) {
                    gameOver();
                } else {
                    score++;
                    scoreElement.textContent = score;
                    if (userSequence.length === sequence.length) {
                        clearTimeout(timeout);
                        container.style.backgroundColor = "green";
                        infoJuegoElement.textContent = "¡Correcto! Nueva ronda...";
                        setTimeout(() => {
                            container.style.backgroundColor = "";
                            delay = Math.max(400, delay - 100);
                            nextRound();
                        }, 1500);
                    }
                }
            }
        });
    });

    

    // Temporizador del usuario para responder
    function startUserTimer() {
        timeout = setTimeout(() => {
            gameOver();
        }, 5000);
    }

    // Finalizar el juego si el usuario falla
    function gameOver() {
        clearTimeout(timeout);
        container.style.backgroundColor = "red";
        infoJuegoElement.textContent = `¡Fallaste! Nivel alcanzado: ${level}`;
        localStorage.setItem("finalScore", score);
        setTimeout(() => {
            container.style.backgroundColor = "";
            window.location.href = "results.html";
        }, 3000);
    }

    // Cambiar estilos al pasar el ratón por un segmento
    segments.forEach(segment => {
        segment.addEventListener("mouseover", function () {
            this.style.opacity = "0.7";
        });

        segment.addEventListener("mouseout", function () {
            this.style.opacity = "1";
        });
    });

    // Iniciar el juego
    startGame();
    // Fade-in para la carga inicial de la página
    $("body").hide().fadeIn(500);
  
});
