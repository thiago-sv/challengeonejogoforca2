var palavras = ["AULA", "FLORIPA", "ORACLE", "BOLA", "ONE", "ALURA"];
var desenho = document.getElementById("forca-canvas").getContext("2d");
var palavraCerta = "";
var palavraSecreta = "";
var btIniciar = document.querySelector(".bt-jogar");
var btAddpalavras = document.querySelector(".bt-addpalavra");
var btSalvar = document.querySelector(".bt-salvar");
var btCancelar = document.querySelector(".bt-cancelar");
var btReiniciar = document.querySelector(".bt-novojogo");
var btDesistir = document.querySelector(".bt-desistir");
var erros = 5;
var acertos = 0;
var letras = [];

btDesistir.addEventListener("click", function (e) {
    document.getElementById("canvas").style.display = "none";
    document.getElementById("botoes-tela-jogo").style.display = "none";
    document.getElementById("botoes-tela-iniciar").style.display = "flex";
    document.onkeydown = null;
});

btReiniciar.addEventListener("click", function (e) {
    iniciaJogo();
});

btIniciar.addEventListener("click", function (e) {
    document.getElementById("botoes-tela-iniciar").style.display = "none";
    document.getElementById("canvas").style.display = "flex";
    document.getElementById("botoes-tela-jogo").style.display = "flex";
    iniciaJogo();
});

btAddpalavras.addEventListener("click", function (e) {
    document.getElementById("botoes-tela-iniciar").style.display = "none";
    document.getElementById("text-addpalavra").style.display = "flex";
    document.getElementById("botoes-tela-addpalavra").style.display = "flex";
});

btSalvar.addEventListener("click", function (e) {
    palavras.push(document.getElementById("text").value.toUpperCase());
    if (document.getElementById("text").value === "") {
        alert("Campo de texto vazio")
        return;
    }
    document.getElementById("text").value = "";
    document.getElementById("text-addpalavra").style.display = "none";
    document.getElementById("botoes-tela-addpalavra").style.display = "none";
    document.getElementById("canvas").style.display = "flex";
    document.getElementById("botoes-tela-jogo").style.display = "flex";
    iniciaJogo();
});

btCancelar.addEventListener("click", function (e) {
    document.getElementById("text").value = "";
    document.getElementById("text-addpalavra").style.display = "none";
    document.getElementById("botoes-tela-addpalavra").style.display = "none";
    document.getElementById("botoes-tela-iniciar").style.display = "flex";
});

function sortearPalavra() {
    var palavra = palavras[Math.floor(Math.random() * palavras.length)];
    palavraSecreta = palavra;
    return palavra;
}

function desenhaTracos() {
    desenho.lineWidth = 3;
    desenho.lineCap = "round";
    desenho.lineJoin = "round";
    desenho.strokeStyle = "#0A3871";
    desenho.beginPath();

    for (let i = 0; i < palavraSecreta.length; i++) {
        desenho.moveTo(500 + (50 * i), 640);
        desenho.lineTo(530 + (50 * i), 640);
    }

    desenho.stroke();
    desenho.closePath();
}

function desenharLetrasCorretas(indice) {
    desenho.font = "52px Arial";
    desenho.lineWidth = 3;
    desenho.lineCap = "round";
    desenho.lineJoin = "round";
    desenho.fillStyle = "#0A3871";
    desenho.beginPath();
    desenho.fillText(palavraSecreta[indice], 495 + (50 * indice), 630);
    desenho.stroke();
    desenho.closePath();
}

function desenharLetrasErradas(letras, errosRestantes) {
    desenho.font = "40px Arial";
    desenho.lineWidth = 3;
    desenho.lineCap = "round";
    desenho.lineJoin = "round";
    desenho.fillStyle = "#0A3871";
    desenho.beginPath();
    desenho.fillText(letras, 500 + (40 * (10 - errosRestantes)), 710, 40);
    desenho.stroke();
    desenho.closePath();
}

function verificarLetraCorreta(e) {
    if (letras.length < 1 || letras.indexOf(e) < 0) {
        letras.push(e);
        return false;
    } else {
        letras.push(e.toUpperCase());
        return true;
    }
}

function addLetraCorreta(i) {
    palavraCerta += palavraSecreta[i].toUpperCase();
}

function addLetraIncorreta(i) {
    if (palavraSecreta.indexOf(i) <= 0) {
        erros -= 1;
    }
}

function desenhaForca(erro) {
    desenho.lineWidth = 3;
    desenho.lineCap = "round";
    desenho.lineJoin = "round";
    desenho.strokeStyle = "#0A3871";
    desenho.beginPath();

    switch (erro) {
        case 5:
            desenho.moveTo(490, 530);
            desenho.lineTo(790, 530);
            desenho.moveTo(550, 530);
            desenho.lineTo(550, 200);
            desenho.moveTo(550, 200);
            desenho.lineTo(730, 200);
            desenho.moveTo(730, 200);
            desenho.lineTo(730, 250);
            break;
        case 4:
            desenho.arc(730, 270, 20, 0, 2 * Math.PI);
            break;
        case 3:
            desenho.moveTo(730, 290);
            desenho.lineTo(730, 400);
            break;
        case 2:
            desenho.moveTo(690, 330);
            desenho.lineTo(730, 292);
            desenho.lineTo(770, 330);
            break;
        case 1:
            desenho.moveTo(690, 438);
            desenho.lineTo(730, 400);
            desenho.lineTo(770, 438);
            break;
        default:
            verificaDerrota();
            break;
    }
    desenho.stroke();
    desenho.closePath();
}

function verifaVitoria(acertos) {

    if (acertos === palavraSecreta.length) {
        alert("Parabéns você ganhou!!!" + "\n" + "A palavra secreta é: " + palavraSecreta);
        desenho.clearRect(0, 0, 1440, 1024);
        document.getElementById("canvas").style.display = "none";
        document.getElementById("botoes-tela-jogo").style.display = "none";
        document.getElementById("botoes-tela-iniciar").style.display = "flex";
        document.onkeydown = null;
    }
}

function verificaDerrota() {

    alert("Forca!!!" + "\n" + "Infelizmente você perdeu :(" + "\n" + "A palavra secreta era: " + palavraSecreta);
    desenho.clearRect(0, 0, 1440, 1024);
    document.getElementById("canvas").style.display = "none";
    document.getElementById("botoes-tela-jogo").style.display = "none";
    document.getElementById("botoes-tela-iniciar").style.display = "flex";
    document.onkeydown = null;

}

function iniciaJogo() {
    desenho.clearRect(0, 0, 1440, 1024);
    erros = 5;
    acertos = 0;
    letras = []
    desenhaTracos(sortearPalavra());

    desenho.font = "36px Arial";
    desenho.lineWidth = 3;
    desenho.lineCap = "round";
    desenho.lineJoin = "round";
    desenho.fillStyle = "#0A3871";
    desenho.fillText("Digite uma letra para jogar", 450, 900);



    document.onkeydown = (e) => {

        var letra = e.key.toUpperCase();

        if (!verificarLetraCorreta(e.key)) {
            if (palavraSecreta.includes(letra)) {
                addLetraCorreta(palavraSecreta.indexOf(letra))
                for (let i = 0; i < palavraSecreta.length; i++) {
                    if (palavraSecreta[i] === letra) {
                        desenharLetrasCorretas(i);
                        acertos += 1;
                        verifaVitoria(acertos);
                    }
                }
            } else {
                if (!verificarLetraCorreta(e.key))
                    return;
                desenharLetrasErradas(letra, erros);
                desenhaForca(erros);
                addLetraIncorreta(letra);
            }
        }
    }
}
