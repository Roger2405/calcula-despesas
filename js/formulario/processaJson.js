import { listaDeDespesas } from "./processaDadosDespesas.js";

const inputNomeProduto = document.querySelector('#nome-produto');
const botaoAdicionarProduto = document.querySelector(".botao-produto");


botaoAdicionarProduto.addEventListener("click", () => {
    var nomeProduto = inputNomeProduto.value;
    var somaCustos = obterCustoTotal(listaDeDespesas);
    var jsonObj = criarJsonProdutos(nomeProduto, somaCustos);
    /*
    fetch('../../produtos.json', {method: 'post', mode: 'cors', body: JSON.stringify(jsonObj)})
    .then((response) => {
        return response.json();
    }).then((resJsonObj) => {
        resJsonObj += jsonObj;
        return resJsonObj.json();
    })
    */
})
function obterCustoTotal(listaDeDespesas) {
    var soma;
    listaDeDespesas.forEach(despesa => {
        soma += despesa.custoPorProduto;
    });
    return soma;
}

function criarJsonProdutos(nomeProduto, custoTotal) {
    var objeto = {
        "nome": nomeProduto,
        "custo" : custoTotal
    }
    return objeto;
}
/*
[
    {
        nome: nomeDespesa,
        tipo: tipoDespesa,
        precoUnitario: precoUnitario,
        quantidadePorProduto: quantidadePorProduto,
        custoPorProduto: custoPorProduto
    }
]
*/