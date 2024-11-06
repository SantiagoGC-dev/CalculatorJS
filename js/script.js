const pantalla = document.querySelector(".pantalla");
let operacionPendiente = "";
let numeroAnterior = "";
let operadorActual = null;
let reiniciarPantalla = false;


//Agregar
function agregar(valor) {
    if (reiniciarPantalla) {
        pantalla.value = "";
        reiniciarPantalla = false;
    }

    if (["+", "-", "*", "/", "√"].includes(valor)) {
        if (operadorActual !== null) {
            calcular();
        }
        numeroAnterior = pantalla.value;
        operadorActual = valor;
        reiniciarPantalla = true;
    } else {
        pantalla.value += valor;
    }
}

//limpiar todo
function limpiar() {
    pantalla.value = '';
    operacionPendiente = '';
    numeroAnterior = '';
    operadorActual = null;
}

function calcular() {
    if (operadorActual === null) {
        // Si no hay un operador no hace nada
        return;
    }

    const numero1 = parseFloat(numeroAnterior);
    const numero2 = parseFloat(pantalla.value);

    if (isNaN(numero1) || isNaN(numero2)) {
        pantalla.value = 'Syntax Error';
        setTimeout(limpiar, 1500);
        // Limpia la pantalla despues de 1.5 segundos
        return;
    }

    let resultado;
    switch (operadorActual) {
        case '+':
            resultado = numero1 + numero2;
            break;
        case '-':
            resultado = numero1 - numero2;
            break;
        case '*':
            resultado = numero1 * numero2;
            break;
        case '/':
            resultado = numero1 / numero2;
            break;
        case '√':
            resultado = Math.sqrt(numero2);
            break;
        default:
            pantalla.value = 'Error';
            return;
    }

    resultado = Math.round(resultado * 100000000) / 100000000;
    pantalla.value = resultado;
    operadorActual = null;
    numeroAnterior = '';
    reiniciarPantalla = true;
}

//retroceder
function regresar() {
    pantalla.value = pantalla.value.slice(0, -1);
}


document.addEventListener('keydown', (event) => {
    event.preventDefault();
    const key = event.key;

    if (/[0-9\+\-\*\/\./]/.test(key)) {

        agregar(key);

    } else if (key === 'Enter') {

        calcular();

    } else if (key === 'Escape') {

        limpiar();

    } else if (key === 'Backspace') {
        regresar();

    }
});
