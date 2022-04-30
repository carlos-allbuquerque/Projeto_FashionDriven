let promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");
promise.then(getPedidos);

function getPedidos(promise) {
let dados = promise.data;
console.log(dados);
}
