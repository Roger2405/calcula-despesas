
export var listaDeDespesas = [];
var precoUnitario;
var quantidadePorProduto;
var custoPorProduto;

const tabelas = document.querySelectorAll('tbody');

export function processarDados(nomeDespesa, tipoDespesa, quantidadeUtilizada, quantidade, preco, quantidadeDeProdutos) {
    precoUnitario = preco/quantidade;
    custoPorProduto = ((precoUnitario) * quantidadeUtilizada) / quantidadeDeProdutos;
    quantidadePorProduto = quantidadeUtilizada / quantidadeDeProdutos; 
    
    criaObjetoDespesa(nomeDespesa, tipoDespesa, precoUnitario, quantidadePorProduto, custoPorProduto);
    
    atualizaTabela(listaDeDespesas);
}

atualizaTabela(listaDeDespesas);
function criaObjetoDespesa(nomeDespesa, tipoDespesa, precoUnitario, quantidadePorProduto, custoPorProduto){
    var objetoDespesa = {
        nome: nomeDespesa,
        tipo: tipoDespesa,
        precoUnitario: precoUnitario,
        quantidadePorProduto: quantidadePorProduto,
        custoPorProduto: custoPorProduto
    }
    listaDeDespesas.push(objetoDespesa);

    listaDeDespesas.forEach((despesa) => {
        console.log(despesa.nome);
        console.log(despesa.precoUnitario);
        console.log(despesa.quantidadePorProduto);
        console.log(despesa.custoPorProduto);
    })
}

function atualizaTabela(listaDeDespesas) {
    var linhasTabela = document.querySelectorAll('.tabela__linha');
    linhasTabela.forEach(linha => {
        linha.remove();
    })

    var somaCustoIngredientes = 0;
    var somaCustoEmbalagens = 0;
    const formatar = function(number){
        return new Intl.NumberFormat('pt-br', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2}).format(number);
    };
    listaDeDespesas.forEach(despesa => {
        const tabelaLinha = document.createElement('tr');
        tabelaLinha.classList.add('tabela__linha');
        //Cria botão delete
        
        criarCelulaNomeEBotaoDelete(despesa.nome, tabelaLinha);
        criarElementoNaLinha(formatar(despesa.precoUnitario), tabelaLinha);
        criarElementoNaLinha(despesa.quantidadePorProduto.toFixed(3), tabelaLinha);
        criarElementoNaLinha(formatar(despesa.custoPorProduto), tabelaLinha);
        var tabela;
        if(despesa.tipo == 'ingrediente') {
            tabela = tabelas[0];
            somaCustoIngredientes += despesa.custoPorProduto;
        }
        else {
            tabela = tabelas[1];
            somaCustoEmbalagens += despesa.custoPorProduto;
        }
        console.log(tabelas)
        tabela.appendChild(tabelaLinha);
    });
    const custoIngredientes = document.querySelector('#custo-ingredientes');
    const custoEmbalagens = document.querySelector('#custo-embalagens');
    const custoTotal = document.querySelector('#custo-total');
    custoIngredientes.textContent = formatar(somaCustoIngredientes);
    custoEmbalagens.textContent = formatar(somaCustoEmbalagens);
    custoTotal.textContent = formatar(somaCustoIngredientes + somaCustoEmbalagens);
    verificaBotoesDelete();
}
function criarCelulaNomeEBotaoDelete(nomeDaDespesa, tabelaLinha) {
    var botaoDelete = document.createElement('button');
    botaoDelete.classList.add('botao-delete');
    botaoDelete.classList.add('botao');
    var tdNome = criarElementoNaLinha(nomeDaDespesa, tabelaLinha);
    tdNome.classList.add('tabela__linha--nome');
    tdNome.appendChild(botaoDelete);
}
function verificaBotoesDelete() {
    var botoesDelete = document.querySelectorAll('.botao-delete');
    botoesDelete.forEach(botao => {
        botao.addEventListener('click', () => {
            var paiDoBotao = botao.parentNode;
            var linhaInteira = paiDoBotao.parentNode;
            linhaInteira.classList.add('removerLinha');


            setTimeout(function(){
                var nomeDaDespesaASerDeletada = botao.parentElement.textContent;
                listaDeDespesas.forEach(despesa => {
                    if(despesa.nome == nomeDaDespesaASerDeletada) {
                        var indice = listaDeDespesas.indexOf(despesa);
                        listaDeDespesas.splice(indice, 1);
                    }
                    atualizaTabela(listaDeDespesas);
                })

            }, 500);


        })
    })
}
function criarElementoNaLinha(valor, tr) {
    const td = document.createElement('td');
    td.textContent = valor;
    
    tr.appendChild(td);
    return td;
 }
 /*<td class="td-nomeDespesa"><button class="botao__delete">X</button>Açúcar</td>*/