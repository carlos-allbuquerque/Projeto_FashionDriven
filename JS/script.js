let promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");
promise.then(getPedidos);
promise.then(renderPedidos)

let nome = "Fade";

function getPedidos(promise) {
let dados = promise.data;
console.log(dados);
}

let modelos = document.querySelector(".modelos");
let golas = document.querySelector(".golas");
let tecidos = document.querySelector(".tecidos");

function selecionaModelo(parameter) {
    let selecionado = modelos.querySelector(".selecionado");
    if( selecionado !== null) {
        selecionado.classList.remove("selecionado");
    }
    let icone = parameter.querySelector(".icone")
    icone.classList.add("selecionado");
    habilitaBotao();
}

function selecionaGola(parameter) {
    let selecionado = golas.querySelector(".selecionado");
    if( selecionado !== null) {
        selecionado.classList.remove("selecionado");
    }
    let icone = parameter.querySelector(".icone")
    icone.classList.add("selecionado");
    habilitaBotao();
}

function selecionaTecido(parameter) {
    let selecionado = tecidos.querySelector(".selecionado");
    if( selecionado !== null) {
        selecionado.classList.remove("selecionado");
    }
    let icone = parameter.querySelector(".icone")
    icone.classList.add("selecionado");
    habilitaBotao();
}

function isValidUrl() {
    console.log("entrou");
    let url = document.querySelector("input").value;
    if (url.startsWith("https://") || url.startsWith("http://")) {
        habilitaBotao()
        return true;
    }

    return false;
}

function isNull() {
    console.log("nulo");
}


function renderPedidos(response) {
    let pedidos = response.data;
    const tag = document.querySelector(".ultimos-pedidos-list");
    let i = 0;
    let posicao = 10;
    while(i < pedidos.length) {
        let pedido = pedidos[i];
      tag.innerHTML+=  `
      <div class="pedido">
        <img src="${pedido.image}" alt="">
        <div class="texto"> Criador: ${pedido.owner}</div>
    </div>
      `
      i++;
      posicao--;
    }
}



function habilitaBotao() {
    let botao = document.querySelector("button");

    let input = document.querySelector("input");

    let modeloSelecionado = modelos.querySelector(".selecionado");
    let golaSelecionada = golas.querySelector(".selecionado");
    let tecidoSelecionado = tecidos.querySelector(".selecionado");

    console.log(modeloSelecionado);
  
    if (modeloSelecionado !== null && golaSelecionada !== null && tecidoSelecionado !== null && isValidUrl(input)) {
        botao.classList.add("botao-habilitado");
    }
}

