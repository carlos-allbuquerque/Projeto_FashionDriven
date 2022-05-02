function getPedidos() {
   let promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");

    promise.then(renderPedidos); 
}

setInterval(getPedidos, 3000);
let dados;

function tratarErro(response) {
    alert("Ops, não conseguimos processar sua encomenda");
    console.log("Status code: " + erro.response.status);
	console.log("Mensagem de erro: " + erro.response.data); 
}


let nome = prompt("Qual é o seu nome?");

document.querySelector("input").value = "";



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

function isValidUrl(valor) {
    return (valor.startsWith("https://") || valor.startsWith("http://"));
}



function renderPedidos(response) {
    let pedidos = response.data;
    dados = pedidos;
    let tag = document.querySelector(".ultimos-pedidos-list");
    tag.innerHTML = "";
    for( let i = 0; i < pedidos.length; i++) {
        let pedido = pedidos[i];
        
        tag.innerHTML+=  `
            <div class="pedido" onclick='getPedidoSpecs(${pedido.id})'>
                <img src="${pedido.image}" alt="">
                <div class="texto"> <span>Criador:</span> ${pedido.owner}</div>
            </div>
        `
    }
}

function habilitaBotao() {
    let botao = document.querySelector("button");

    let input = document.querySelector("input").value;

    let modeloSelecionado = modelos.querySelector(".selecionado");
    let golaSelecionada = golas.querySelector(".selecionado");
    let tecidoSelecionado = tecidos.querySelector(".selecionado");

    console.log(modeloSelecionado);
    if (input === "") botao.classList.remove("botao-habilitado");
    
    if (modeloSelecionado !== null && golaSelecionada !== null && tecidoSelecionado !== null && input !== "") {
        botao.classList.add("botao-habilitado");
    }

    document.querySelector("button").addEventListener("click", confirmarPedido);
    
}

document.querySelector("input").addEventListener("input", habilitaBotao);

function confirmarPedido() {
    let input = document.querySelector("input").value;
    if (!isValidUrl(input)) {
        alert("URL da imagem inválida");
        return false;
    }

    let modelo;
    let gola;
    let material;

    let modeloSelecionado = modelos.querySelector(".selecionado");
    let golaSelecionada = golas.querySelector(".selecionado");
    let tecidoSelecionado = tecidos.querySelector(".selecionado");

    //Definindo o modelo

    if (modeloSelecionado.classList.contains("t-shirt")) {
        modelo = "t-shirt";
    }
    else if (modeloSelecionado.classList.contains("camiseta")) {
        modelo = "top-tank";
    }
    else if (modeloSelecionado.classList.contains("manga-longa")) {
        modelo = "long";
    }

    //Definindo a gola

    if (golaSelecionada.classList.contains("gola-v")) {
        gola = "v-neck";
    }
    else if (golaSelecionada.classList.contains("gola-redonda")) {
        gola = "round";
    }
    else if (golaSelecionada.classList.contains("gola-polo")) {
        gola= "polo";
    }

    //Definindo o tecido

    if (tecidoSelecionado.classList.contains("seda")) {
        material = "silk";
    }
    else if (tecidoSelecionado.classList.contains("algodao")) {
        material = "cotton";
    }
    else if (tecidoSelecionado.classList.contains("poliester")) {
        material = "polyester";
    }

    let pedido = {
        model: modelo,
        neck: gola, 
        material: material, 
        image: input, 
        owner: nome,
        author: nome
    }
    console.log(pedido);

    let promise = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", pedido);
    promise.catch(tratarErro)
    alert("Pedido Enviado!");
}

function getPedidoSpecs(id) {
    let pegar = confirm("Gostaria de encomendar uma peça com essas mesmas definições?");
    console.log(id);
    let pedido = {};
    if (pegar) {
        console.log(dados);
        for (let i = 0; i < dados.length; i++) {
            if(dados[i].id === id) {

                pedido = {
                    model: dados[i].model,
                    neck: dados[i].neck, 
                    material: dados[i].material, 
                    image: dados[i].image, 
                    owner: nome,
                    author: nome
                }
            }
        }
        
        let promise = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", pedido);
        
    }

    
}
