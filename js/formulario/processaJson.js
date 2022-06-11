import { listaDeDespesas } from "./processaDadosDespesas.js";

const inputNomeProduto = document.querySelector('#nome-produto');
const botaoAdicionarProduto = document.querySelector(".botao__produto");

botaoAdicionarProduto.addEventListener("click", ()) => {
    event.preventDefault();
    console.log("clicou")
    var nomeProduto = inputNomeProduto.value;
    var somaCustos = obterCustoTotal(listaDeDespesas);
    criarJsonProdutos(nomeProduto, somaCustos)
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