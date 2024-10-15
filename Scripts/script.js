let cartillas = [];
const numerosMarcados = new Set();
let figura = {};

function cargarCartillasDesdeJSON() {
    fetch('Datos/cartillas.json')
        .then(response => response.json())
        .then(data => {
            cartillas = data;
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
        event.preventDefault();
    }
});

document.getElementById('numero').addEventListener('input', function () {
    const numeroIngresado = parseInt(this.value);

    if (isNaN(numeroIngresado) || numeroIngresado < 1 || numeroIngresado > 75) {
        this.value = '';
    }

    habilitarBotonMarcar();
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('Datos/figuras.json')
        .then(response => response.json())
        .then(data => {
            figura = data;
            document.getElementById('numero').focus();
            habilitarBotonMarcar();
        })
        .catch(error => console.error('Error al cargar el archivo de figuras:', error));

    document.getElementById('numero').focus();
    habilitarBotonMarcar();
    cargarCartillasDesdeJSON();
});

function generarFigura() {
    const figuraSeleccionada = document.getElementById('figura').value.toLowerCase();

    if (figuraSeleccionada === 'ninguna') {
        mostrarAlerta("Por favor, selecciona una figura antes de generar.", "warning");
        return;
    }

    if (!figura[figuraSeleccionada]) {
        mostrarAlerta("Figura desconocida.", "error");
        return;
    }

    document.getElementById('figura-seleccionada-text').textContent = figuraSeleccionada;
    mostrarElemento('figura-seleccionada');

    ocultarElemento('figura-container');
    mostrarElemento('bingo-board-container');
    document.getElementById('numero').focus();
}

function validarNumero(numero) {
    return numero >= 1 && numero <= 75;
}

function habilitarBotonMarcar() {
    const numero = document.getElementById('numero').value;
    const botonMarcar = document.getElementById('btn-marcar');
    botonMarcar.disabled = !validarNumero(parseInt(numero));
}

document.getElementById('numero').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        manejarIngresoNumero();
    }
});

function manejarIngresoNumero() {
    const numeroIngresado = parseInt(document.getElementById('numero').value);

    if (isNaN(numeroIngresado) || !validarNumero(numeroIngresado)) {
        mostrarAlerta("Ingresa un número válido entre 1 y 75.", "error  ");
        document.getElementById('numero').value = '';
        document.getElementById('numero').focus();
        return;
    }

    if (numerosMarcados.has(numeroIngresado)) {
        mostrarAlerta("Este número ya ha sido marcado.", "info");
        document.getElementById('numero').value = '';
        document.getElementById('numero').focus();
        return;
    }

    marcarNumero(numeroIngresado);
    document.getElementById('numero').value = '';
    document.getElementById('numero').focus();
    habilitarBotonMarcar();
}


function marcarNumero(numeroIngresado) {
    const figuraSeleccionada = document.getElementById('figura').value.toLowerCase();
    const figuraActual = figura[figuraSeleccionada];

    if (!figuraActual) {
        mostrarAlerta("Figura desconocida.", "error");
        return;
    }

    let cartillasMarcadas = [];
    let cartillasConFiguraCompleta = [];

    cartillas.forEach(cartilla => {
        const numeroMarcado = marcarEnFigura(numeroIngresado, figuraActual, cartilla);

        if (numeroMarcado) {
            cartillasMarcadas.push(cartilla.nombre);
            numerosMarcados.add(numeroIngresado);

            if (verificarFiguraCompleta(cartilla, figuraActual)) {
                cartillasConFiguraCompleta.push(cartilla.nombre);
            }
        }
    });

    if (cartillasMarcadas.length > 0) {
        const mensaje = cartillasMarcadas.length > 1
            ? `Número ${numeroIngresado} marcado en las cartillas (${cartillasMarcadas.join(", ")}).`
            : `Número ${numeroIngresado} marcado en la ${cartillasMarcadas[0]}.`;
        mostrarAlerta(mensaje, "success");
    } else {
        mostrarAlerta("El número ingresado no forma parte de la figura.", "error");
    }

    if (cartillasConFiguraCompleta.length > 0) {
        ganador(cartillasConFiguraCompleta);
        reproducirSonido('Archivos Media/bingo-sound.mp3');
    }
}

function marcarEnFigura(numeroIngresado, figura, cartilla) {
    for (const pos of figura.posiciones) {
        const [row, column] = pos.split("").map(Number);

        if (row < cartilla.numeros.length && column < cartilla.numeros[row].length) {
            if (cartilla.numeros[row][column] === numeroIngresado) {
                return true;
            }
        }
    }

    return false;
}

function verificarFiguraCompleta(cartilla, figura) {
    const marcados = figura.posiciones
        .map(pos => {
            const [row, column] = pos.split("").map(Number);
            return row < cartilla.numeros.length && column < cartilla.numeros[row].length
                ? numerosMarcados.has(cartilla.numeros[row][column])
                : false;
        });

    return marcados.filter(Boolean).length >= figura.limite;
}

function ganador(cartillasConFiguraCompleta) {
    if (cartillasConFiguraCompleta.length > 0) {
        const mensaje = cartillasConFiguraCompleta.length > 1
            ? `Las cartillas (${cartillasConFiguraCompleta.join(", ")}) han completado el BINGO.`
            : `La cartilla ${cartillasConFiguraCompleta[0]} ha completado el BINGO.`;
        Swal.fire({
            title: "BINGO!",
            text: mensaje,
            icon: "success"
        });
    }

    document.getElementById('numero').disabled = true;
    start();
    stop();
}

function mostrarAlerta(mensaje, tipo) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1300,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: tipo,
        title: mensaje
    });
}

function ocultarElemento(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.style.display = 'none';
    }
}

function mostrarElemento(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.style.display = 'block';
    }
}

function reproducirSonido(nombreArchivo) {
    const audio = new Audio(nombreArchivo);

    audio.addEventListener('canplaythrough', () => audio.play().catch(console.error));
    audio.addEventListener('error', (e) => console.error('Error al cargar el archivo de audio:', e));
}

const elegirOtraFigura = () => {
    mostrarElemento('figura-container');
    ocultarElemento('bingo-board-container');
    ocultarElemento('ganaste-message');

    const numeroInput = document.getElementById('numero');
    numeroInput.disabled = false;
    numeroInput.value = '';

    numerosMarcados.clear();

    document.getElementById('bingo-board').innerHTML = '';
    document.getElementById('figura').value = 'ninguna';
    ocultarElemento('figura-seleccionada');
};

const start = () => {
    setTimeout(() => confetti.start(), 1000);
};

const stop = () => {
    setTimeout(() => confetti.stop(), 3000);
};