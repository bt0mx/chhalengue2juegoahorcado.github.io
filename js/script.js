var palabras = ['ALURA', 'AHORCADO', 'LIBRO'];
//var tablero = document.getElementById('horca').getContext('2d');
var pincel = document.querySelector("canvas");
var tablero = horca.getContext("2d");
var letras = [];
var bandera = 35;
var recorre = 35;
var contador = 0;
var contador_correcto = 0;
var palabraCorrecta = "";
var errores = 9;
var inicio = 0;
document.getElementById("div-aparece-ahorcado").style.display = "none";
document.getElementById("boton-1").style.display = "none";
document.getElementById("boton-2").style.display = "none";
document.getElementById("secion_nueva_palabra").style.display = "none";


function escojerPalabraSecreta(){
    var palabra = palabras[Math.floor(Math.random()*palabras.length)]
    palabraSecreta = palabra
    console.log(palabra)
    return palabra
}

function dibujarInicioAhorcado(){
    tablero.lineWidth = 6
    tablero.beginPath();
    tablero.moveTo(200,50);
    tablero.lineTo(200,400);
    tablero.lineTo(300,400);
    tablero.strokeStyle = "#0A3871"
    tablero.stroke();
}

function dibujarLineas(){
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.strokeStyle = "#0A3871"
    tablero.beginPath()

    var ancho=600/palabraSecreta.length
    for(let i = 0; i < palabraSecreta.length ; i++){
        tablero.moveTo(400+(ancho*i),540)
        tablero.lineTo(450+(ancho*i),540)
    }

    tablero.stroke()
    tablero.closePath()
    
}


function iniciarJuego(){
    letras = [];
    bandera = 35;
    recorre = 35;
    contador = 0;
    contador_correcto = 0;
    palabraCorrecta = "";
    errores = 9;
    tablero.clearRect(0, 0, pincel.width, pincel.height);
    tablero.clearRect(0, 0, pincel.width, pincel.height);
    document.getElementById("div-aparece-ahorcado").style.display = "block";
    document.getElementById("centrado1").style.display = "none";
    document.getElementById("centrado2").style.display = "none";
    document.getElementById("boton-1").style.display = "inline-block";
    document.getElementById("boton-2").style.display = "inline-block";
    inicio = 1;
    dibujarLineas(escojerPalabraSecreta(dibujarInicioAhorcado()))
}



function escribirLetraCorrecta(index){
    contador_correcto+=1
    tablero.font = 'bold 52px Inter'
    tablero.lineWidth=6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.fillStyle = "#0A3871"
    var ancho=600/palabraSecreta.length
    tablero.fillText(palabraSecreta[index], 405+(ancho*index), 520)
    if(contador_correcto==palabraSecreta.length){
        console.log(contador_correcto);
        console.log(palabraSecreta.length);
        alert('Haz ganado , reinicia el juego !');
    }
}

function nuevaPalabra(){
    document.getElementById("centrado1").style.display = "none";
    document.getElementById("centrado2").style.display = "none";
    document.getElementById("secion_nueva_palabra").style.display = "block";
    document.getElementById("palabra_nueva").style.display = "block";
    document.getElementById("guardar").style.display = "inline-block";
    document.getElementById("regresar").style.display = "inline-block";
    inicio=0;
}

function compararPalabra(letraIngresada) {
    alert(letraIngresada);
    const pattern = new RegExp('^[A-Z\u00d1]+$', 'i');
    if(!pattern.test(letraIngresada)) {
        alert("Solo se permiten letras");
        return false;
    } else {
        return true;
    }
}

guardar.addEventListener("click", () => {
    if((palabra_nueva.value.length > 3 )) {
        //alert(palabra_nueva.value.length)
      if(compararPalabra(palabra_nueva.value.toUpperCase())) {
        palabras.push(palabra_nueva.value.toUpperCase());
        document.getElementById("secion_nueva_palabra").style.display = "none";
        iniciarJuego()
      }
    } 
    else {
       alert("Esta palabra no contiene mayusculas o tiene menos de 4 caracteres")
    }
  });

function escribirLetraIncorrecta(letra, errorsLeft, bandera){
    tablero.font = 'bold 40px Inter'
    tablero.lineWidth=6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.fillStyle = "#0A3871"

    recorre=recorre+bandera;
    contador=contador+1;

    tablero.fillText(letra, 505+(recorre*(10-errorsLeft)), 610,30)
    crearAhorcado(contador);
}

function verificarLetraClicada(key){
    if(letras.length<1 || letras.indexOf(key)<0)
    {
        letras.push(key)
        return false
    }
    else
    {
        letras.push(key)
        return true
    }
}

function adicionarLetraCorrecta(i){
    palabraCorrecta += palabraSecreta[i]
}

function adicionarLetraIncorrecta(letter){
    if(palabraSecreta.indexOf(letter)<=0){
        errores-=1
    }
}

document.onkeydown = (e) => {
   // alert("asd");
    let letra=e.key.toUpperCase()
    if(inicio==1){
        if(contador_correcto==palabraSecreta.length){
            console.log(contador_correcto);
            console.log(palabraSecreta.length);
            alert('Haz ganado , reinicia el juego !');
        }
        else if(contador >= 8){
            alert('Perdiste, Fin del juego');
        }
        else{
            if(!verificarLetraClicada(e.key)){
                if(palabraSecreta.includes(letra)){
                    //Console.log(letra)
                    adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
                    for(let i=0; i<palabraSecreta.length;i++){
                        if(palabraSecreta[i]===letra){
                            escribirLetraCorrecta(i) 
                        }
                    }
                }
                else{
                    if(!verificarLetraClicada(e.key)) return
                    adicionarLetraCorrecta(letra)
                    escribirLetraIncorrecta(letra, errores, bandera)
                }
            }
        }
    }

};


function reiniciarJuego(){
    letras = [];
    bandera = 35;
    recorre = 35;
    contador = 0;
    contador_correcto = 0;
    palabraCorrecta = "";
    errores = 9;
    inicio = 1;
    tablero.clearRect(0, 0, pincel.width, pincel.height);
    tablero.clearRect(0, 0, pincel.width, pincel.height);

    dibujarLineas(escojerPalabraSecreta(dibujarInicioAhorcado()))
}

function regresar(){
    document.getElementById("div-aparece-ahorcado").style.display = "none";
    document.getElementById("boton-1").style.display = "none";
    document.getElementById("boton-2").style.display = "none";
    document.getElementById("centrado1").style.display = "block";
    document.getElementById("centrado2").style.display = "block";
    document.getElementById("guardar").style.display = "none";
    document.getElementById("regresar").style.display = "none";
    document.getElementById("palabra_nueva").style.display = "none"; 
    inicio=0;
}

function crearAhorcado(counter) {
    if (counter == 0) {
        tablero.moveTo(200, 285);
        tablero.lineTo(200, 50);
        tablero.stroke();
        counter++;
        return counter;
    } else if(counter == 1) {
        tablero.moveTo(200, 50);
        tablero.lineTo(300, 50);
        tablero.stroke();
        counter++;
        return counter;
    } else if(counter == 2) {
        tablero.moveTo(300, 50);
        tablero.lineTo(300, 70);
        tablero.stroke();
        counter++;
        return counter;
    } else if(counter == 3) {
        tablero.beginPath();
        tablero.arc(300, 90, 20, 0, 2*Math.PI);
        tablero.stroke();
        counter++;
        return counter;
    } else if(counter == 4) {
        tablero.beginPath();
        tablero.moveTo(300, 110); //160
        tablero.lineTo(300, 190); //240
        tablero.stroke();
        counter++;
        return counter;
    } else if(counter == 5) {
        tablero.moveTo(300, 190);
        tablero.lineTo(270, 220); //270
        tablero.stroke();
        counter++;
        return counter;
    } else if(counter == 6) {
        tablero.moveTo(300, 190); //240
        tablero.lineTo(330, 220); //270
        tablero.stroke();
        counter++;
        return counter;
    } else if(counter == 7) {
        tablero.moveTo(300, 130); //180
        tablero.lineTo(270, 160); //210
        tablero.stroke();
        counter++;
        return counter;
    } else if(counter == 8) {
        tablero.moveTo(300, 130);
        tablero.lineTo(330, 160);
        tablero.stroke();
        counter++;
        alert('Perdiste, Fin del juego');
        return counter;
    } else {
        return;
    }
}