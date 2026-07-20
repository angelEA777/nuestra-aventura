let paso = 0;
let planElegido = "";
let fechaElegida = "";
let horaElegida = "";
const musica = document.getElementById("musica");

const preguntas = [

{
    titulo:"Esto solo se desbloquea con tu último nombre ❤️",
    texto:"",
    tipo:"nombre"
},

{
    titulo:"Bueno mor ya no hay vuelta atras",
    texto:
`Ahora debes elegir lo más importante: `,

    tipo:"dates",

    botones:[

    {
        nombre:"🎬 Opción 1 - Ida al cine",
        video:"img/CineV.mp4",
        descripcion:"¿Una peli para comenzar? 🍿"
    },

    {
        nombre:"🧺 Opción 2 - Picnic",
        video:"img/PicnicV.mp4",
        descripcion:"Un clásico nunca falla 🌳"
    },

    {
        nombre:"🍦 Opción 3 - Helado",
        video:"img/HeladoV.mp4",
        descripcion:"Algo dulce siempre ayuda 😋"
    },

    {
        nombre:"🌿 Opción 4 - Naturaleza",
        video:"img/NaturalezaV.mp4",
        descripcion:"Respiremos aire fresco ❤️"
    },

    {
        nombre:"🚗 Opción 5 - Tour por Tecpán",
        video:"img/PaseoV.mp4",
        descripcion:"Prepárate para la aventura 😎"
    }

    ]
},

{
    titulo:"Excelente decisión",
    texto:"¿Estas segura de tu decisión?",
    imagen: "img/meme.png",
    botones:[
        "Sii!, Completamente 🤍",
        "No 😑"
    ]
},

{
    titulo:"Un detalle más❤️",
    texto:"Necesito confirmar cuándo será nuestra misión.",

    tipo:"agenda"
},

{
    titulo:"Misión confirmada ❤️",
    texto:"Todo está listo. Solo falta que disfrutemos el momento.",

    tipo:"resumen"
},

{
    titulo:"Buenooo con esto claro",
    texto:"Brisa arreglate ponte bonita, que está noche yo voy a verte y avisale a tus pretendientes.",

    tipo:"foto"
},

{
    titulo:"Ojitos lindos espero no haya brisa ese día.",

    texto:`🤍`,

    tipo:"promesa",

    imagen:"img/pinky promise.gif"
}

];

mostrarPregunta();


function mostrarPregunta(){

    let titulo = document.getElementById("titulo");
    let texto = document.getElementById("texto");
    let contenido = document.getElementById("contenido");
    let icono = document.getElementById("icono");

    titulo.innerHTML = preguntas[paso].titulo;
    texto.innerText = preguntas[paso].texto;

    const btnAtras = document.getElementById("btnAtras");

    if(paso === 0){

        btnAtras.classList.add("oculto");

    }else{

        btnAtras.classList.remove("oculto");

    }

    contenido.innerHTML = "";

    if (preguntas[paso].imagen) {

    contenido.innerHTML += `
        <img class="pregunta-img"
             src="${preguntas[paso].imagen}"
             alt="Imagen">
    `;

    }

    // Mostrar el candado solo en la primera pantalla
    if(paso === 0){

        icono.innerHTML = `
        <div class="lock-icon">
            <i class="fa-solid fa-lock"></i>
        </div>
        `;

    }else{

        icono.innerHTML = "";

    }

    if(preguntas[paso].tipo === "nombre"){

        contenido.innerHTML = `
        <input
        id="nombre"
        placeholder="Rapidoo">

        <button onclick="verificarNombre()">
            Continuar
        </button>
        `;

    }
    else if(preguntas[paso].tipo==="dates"){

    preguntas[paso].botones.forEach((date,index)=>{

        contenido.innerHTML += `

        <button onclick="abrirDate(${index})">

            ${date.nombre}

        </button>

        `;

    });
    }

    else if(preguntas[paso].tipo === "foto"){

    musica.currentTime = 0;

    musica.play().catch(()=>{
        console.log("El navegador bloqueó el audio");
    });

    contenido.innerHTML = `

        <div class="foto-container">

            <img
                src="img/brisa.jpeg"
                class="foto-brisa"
                alt="Brisa">

        </div>

        <button onclick="siguiente()">
            Continuar ❤️
        </button>

    `;

    musica.currentTime = 5;   // 1 minuto con 15 segundos
    musica.play();

    }
    else if(preguntas[paso].tipo==="agenda"){

    contenido.innerHTML = `

        <div class="agenda">

            <label>📅 Día</label>

            <input
                id="fecha"
                type="date">

            <label>🕒 Hora</label>

            <input
                id="hora"
                type="time">

            <button onclick="confirmarAgenda()">
                Confirmar misión ❤️
            </button>

        </div>

    `;
    }
    else if(preguntas[paso].tipo==="resumen"){

    contenido.innerHTML = `

        <div class="resumen">

            <div class="item">
                <span>📍 Plan</span>
                <h3>${planElegido}</h3>
            </div>

            <div class="item">
                <span>📅 Fecha</span>
                <h3>${fechaElegida}</h3>
            </div>

            <div class="item">
                <span>🕒 Hora</span>
                <h3>${horaElegida}</h3>
            </div>

            <button onclick="siguiente()">
                ❤️ Confirmar misión
            </button>

        </div>

    `;

    }

    else if(preguntas[paso].tipo === "promesa"){

    contenido.innerHTML = `

        <img
            class="promesa-img"
            src="${preguntas[paso].imagen}"
            alt="Promesa">

        <div class="promesa-texto">

        </div>

        <button onclick="guardarDatos()">

            Yo tampoco 🤍

        </button> 

    `;

    }
    else{

        preguntas[paso].botones.forEach(opcion => {

            contenido.innerHTML += `
            <button onclick="siguiente()">
                ${opcion}
            </button>
            `;

        });

    }

    if(preguntas[paso].tipo !== "foto"){

    musica.pause();
    musica.currentTime = 0;

}

}

let dateSeleccionado = null;

function anterior(){

    if(paso > 0){

        paso--;

        mostrarPregunta();

    }

}

function abrirDate(indice){

    dateSeleccionado = preguntas[paso].botones[indice];

    const video = document.getElementById("modalVideo");

    video.src = dateSeleccionado.video;

    video.load();

    document.getElementById("modalTitulo").innerHTML =
        dateSeleccionado.nombre;

    document.getElementById("modalDescripcion").innerHTML =
        dateSeleccionado.descripcion;

    document.getElementById("modalDate").classList.add("show");

    // Espera un instante y reproduce
    setTimeout(() => {
        video.play().catch(err => {
            console.log("No se pudo reproducir:", err);
        });
    }, 200);
}

function cerrarModal(){

    const video = document.getElementById("modalVideo");

    video.pause();

    video.currentTime = 0;

    document
        .getElementById("modalDate")
        .classList.remove("show");

}

function elegirDate(){

    planElegido = dateSeleccionado.nombre;

    cerrarModal();

    siguiente();

}

function verificarNombre(){

    let nombre =
    document
    .getElementById("nombre")
    .value
    .trim()
    .toLowerCase();

    if(nombre === "jose"){
        siguiente();
    }
    else{
        const card = document.querySelector(".card");
        card.classList.add("error");
        setTimeout(() => {
            card.classList.remove("error");
        }, 400);
    }
}

function siguiente(){

    const card = document.querySelector(".card");

    card.classList.add("salida");

    setTimeout(() => {

        paso++;

        actualizarBarra();

        if(paso < preguntas.length){

            mostrarPregunta();

        }else{

            mostrarFinal();

        }

        card.classList.remove("salida");

        card.classList.add("entrada");

        setTimeout(() => {

            card.classList.remove("entrada");

        },50);

    },600);

}

function actualizarBarra(){

    let pasos = document.querySelectorAll(".step");

    pasos.forEach(step=>{
        step.classList.remove("active");
    });

    for(let i=0;i<=paso;i++){

        if(pasos[i]){

            pasos[i].classList.add("active");

        }

    }

}

function confirmarAgenda(){

    fechaElegida = document.getElementById("fecha").value;
    horaElegida = document.getElementById("hora").value;

    if(fecha==="" || hora===""){

        alert("Primero necesito saber cuándo nos veremos 😅");

        return;

    }

    siguiente();

}

function mostrarFinal(){

    document.getElementById("titulo").innerHTML =
    "Muy bien, Brisa ❤️";

    document.getElementById("texto").innerHTML =

    `La aventura está por comenzar.`;

    document.getElementById("contenido").innerHTML =

    `<button>
    Comenzar la cita ❤️
    </button>`;
}

function guardarDatos(){

    fetch("https://script.google.com/macros/s/AKfycbx3lOX02KyVQD36qxXxqrHfhtqrji_kXr1-kHlu0OOuCNDH242TWCrD_BVSwORGEQ0L3A/exec",{

        method:"POST",

        body:JSON.stringify({

            nombre:"Brisa",

            plan:planElegido,

            fecha:fechaElegida,

            hora:horaElegida

        })

    });

    aceptarPromesa();

}

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letras = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
const columnas = canvas.width / fontSize;

const drops = [];

for(let i = 0; i < columnas; i++){
    drops[i] = 1;
}

function drawMatrix(){

    ctx.fillStyle = "rgba(9,9,9,.05)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "rgba(255,60,100,.25)";
    ctx.font = fontSize + "px monospace";

    for(let i = 0; i < drops.length; i++){

        const letra =
        letras[Math.floor(Math.random()*letras.length)];

        ctx.fillText(
            letra,
            i * fontSize,
            drops[i] * fontSize
        );

        if(
            drops[i] * fontSize > canvas.height
            &&
            Math.random() > .98
        ){
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix,40);

function aceptarPromesa(){

    document.getElementById("btnAtras").style.display = "none";

    document.querySelector(".card").classList.add("despedida");

}