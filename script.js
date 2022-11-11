//INICIALIZACION DE VARIABLES
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let numerosAll = [];
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerInicial = 60;
let tiempoRegresivoId = null;

//APUNTANDO A DOCUMENTO HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//GENERACION DE NUMEROS ALEATORIOS
let numeros = [ 1,1,2,2,3,3,4,4,  
                5,5,6,6,7,7,8,8,
                9,9,10,10,11,11,12,12,
                13,13,14,14,15,15,16,16,
                17,17,18,18,19,19,20,20,  /////ARRAY DE LAS IMAGENES
                21,21,22,22,23,23,24,24,
                25,25,26,26,27,27,28,28,
                29,29,30,30,31,31,32,32];
numeros = numeros.sort(()=>{return Math.random() - 0.5}) ///FUNCION PARA DESORDENAR Y OBTENER RANDOM EN CADA JUEGO
numeros = numeros.slice(0,8); /////OBTENCION DE LOS PRIMERAS 8 POSICIONES 
numerosAll = numeros.slice(); 
numerosAll = numerosAll.concat(numeros);
console.log('ArrayAll',numerosAll); 
numerosAll = numerosAll.sort(()=>{return Math.random() - 0.5})
// numeros = numeros.sort(() => { return Math.random() - 0.5 });
// console.log(numeros);

//FUNCIONES
function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas(numerosAll);
        }
    }, 1000);
}
// FUNCION QUE HACE QUE AL TERMINAR EL TIEMPO SE BLOQUEEN LAS TARJETAS PARA QUE YA NO TE PERMITA 
//VOLTEAR O TE LAS CUENTES COMO MOVIMIENTOS

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="../Images/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}

//FUNCION PRINCIPAL
function destapar(id) {
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;

    if (tarjetasDestapadas == 1) {
        //MOSTRAR PRIMERA TARJETA
        tarjeta1 = document.getElementById(id);
        primerResultado = numerosAll[id];
        tarjeta1.innerHTML = `<img src="../Images/${primerResultado}.png" alt="">`;

        //DESHABILITAR PRIMER BOTON
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        //MOSTRAR SEGUNDO NUMERO
        tarjeta2 = document.getElementById(id);
        segundoResultado = numerosAll[id];
        tarjeta2.innerHTML = `<img src="../Images/${segundoResultado}.png" alt="">`;

        //DESABILITAR SEGUNDO BOTON
        tarjeta2.disabled = true;

        //INCREMENTAR MOVIMIENTOS
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            //ENCERAR CONTADOR TARJETAS DESTAPADAS
            tarjetasDestapadas = 0;

            //AUMENTAR ACIERTOS
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos == 8) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} Felicitaciones`;
                mostrarTiempo = `Felicitaciones solo tardaste ${timerInicial - timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
            }
        } else {
            //MOSTRAR VALORES Y VOLVER A TAPAR
            setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
                //MODIFICACION DEL TIEMPO QUE TARDA EN VOLTEARSE LA IMAGEN CUANDO ESTA INCORRECTA
            }, 900);
        }
    }
}