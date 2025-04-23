let listaNumerosSorteados = [];
let numeroMax = 10;
let tentativas = 1;
let numeroSecreto = gerarNumeroAleatorio();

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    // esse comando vem do index.html (7), que carrega o responsiveVoice
    // ali tem 3 parâmetros para a função
    // o primeiro sendo o texto que sera falado, o segundo a voz escolhida no proprio site
    // e o ultimo sendo a velocidade da fala
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou');
        let palavraTent = tentativas > 1? 'tentativas' : 'tentativa';
        let msgTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTent}!`;
        exibirTextoNaTela('p', msgTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        tentativas++;
        limparCampo(chute);
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        };
        
    }
}

function exibirMsgInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    exibirMsgInicial();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMax + 1);
    let quantidadeElemLista = listaNumerosSorteados.length;

    if (quantidadeElemLista == numeroMax) {
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(limpar) {
    limpar = document.querySelector('input');
    limpar.value = ''
}

exibirMsgInicial();