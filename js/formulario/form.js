var formulario = document.querySelector('form');
var formularioTipoDiv = document.querySelector('.formulario__tipo');
var formularioTipoDespesa = document.querySelector('#tipo-despesa');

/*Primeiro input: QUANTIDADE DE PRODUTOS FEITOS COM AS DESPESAS INFORMADAS*/
var nomeDespesa;
var tipoDespesa;

const inputQuantidadeDeProdutos = document.querySelector('#quantidade-produtos');
const inputNomeDespesa = document.querySelector('#nome-despesa');
const inputQuantidadeUtilizada = document.querySelector('#quantidade-usada');
const inputPreco = document.querySelector('#preco');
const inputQuantidade = document.querySelector('#quantidade-preco');

var quantidadeDeProdutos = inputQuantidadeDeProdutos.value;

var quantidadeUtilizada;
var preco;
var quantidade;

/*Valores processados a partir dos valores informados*/
var precoUnitario;
var quantidadePorProduto;
var custoPorProduto;

/*BOTÃO SUBMIT*/
const botaoSubmit = document.querySelector('.formulario__botao');

var listaDeDespesas = [];
const tabelas = document.querySelectorAll('table');

resetarFormulario();




const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    if(input.dataset.tipo != 'quantidade-usada' && input.dataset.tipo != 'quantidade-preco'){
        input.addEventListener('blur', (evento) => {
            
                
            
        })
    }

})






function resetarFormulario(){
    formulario.reset();
    formularioTipoDiv.classList.add('formulario-inativo');
    inputQuantidadeUtilizada.placeholder = `padrão: ${quantidadeDeProdutos}`;
}

inputQuantidadeDeProdutos.addEventListener('change', function() {
    quantidadeDeProdutos = document.querySelector('#quantidade-produtos').value;
    inputQuantidadeUtilizada.placeholder = `padrão: ${quantidadeDeProdutos}`;
})


formularioTipoDespesa.addEventListener('change', function() {
    tipoDespesa = formularioTipoDespesa.value;
    if(tipoDespesa == 'ingrediente' | tipoDespesa == 'embalagem') {
        formularioTipoDiv.classList.remove('formulario-inativo');
    }
    else {
        formularioTipoDiv.classList.add('formulario-inativo');
    }
})

botaoSubmit.addEventListener('click', event =>{
    extrairDadosDosInputs();

    resetarFormulario();
})

function extrairDadosDosInputs() {
    nomeDespesa = inputNomeDespesa.value;
    quantidade = inputQuantidade.value;
    quantidadeUtilizada = inputQuantidadeUtilizada.value;
    preco = inputPreco.value;
    
    if(quantidadeUtilizada == '') {
        quantidadeUtilizada = quantidadeDeProdutos;
        console.log(quantidadeUtilizada);
    }
    if(quantidade == '') {
        quantidade = 1;
    }
    var valores = [nomeDespesa, quantidade, quantidadeUtilizada, preco];

    if(inputsValidos(valores)){
        processarDados(nomeDespesa, tipoDespesa, quantidadeUtilizada, quantidade, preco);
    }
}
function inputsValidos(valores) {
    var valoresInvalidos = []
    valores.forEach(valor => {
        if(valor === '') {
            valoresInvalidos.push(valor);
        }
    })
    verificaMensagemDeErro(valoresInvalidos);
    if(valoresInvalidos.length != 0) {
        return false;

    }
    else {
        return true;
    }
}
function verificaMensagemDeErro(valoresInvalidos) {
    var elementoMensagemErro = document.querySelector('.mensagem-erro');
    var mensagem;
    if(valoresInvalidos.length == 0) {
        mensagem = '';
        elementoMensagemErro.classList.add('mensagem-erro-oculta');
    }
    else {
        if(valoresInvalidos.length == 1){
            mensagem = 'Há um campo obrigatório vazio';
        }
        else if(valoresInvalidos.length > 1) {
            mensagem = 'Há campos obrigatórios vazios';
            elementoMensagemErro.classList.remove('mensagem-erro-oculta');
        }
    }
    elementoMensagemErro.innerHTML = mensagem;

}

function processarDados(nomeDespesa, tipoDespesa, quantidadeUtilizada, quantidade, preco) {
    precoUnitario = preco/quantidade;
    custoPorProduto = ((precoUnitario) * quantidadeUtilizada) / quantidadeDeProdutos;
    quantidadePorProduto = quantidadeUtilizada / quantidadeDeProdutos; 
    
    criaObjetoDespesa(nomeDespesa, tipoDespesa, precoUnitario, quantidadePorProduto, custoPorProduto);
    
    atualizaTabela(listaDeDespesas);
}

function criaObjetoDespesa(nomeDespesa, tipoDespesa, precoUnitario, quantidadePorProduto, custoPorProduto){
    var objetoDespesa = {
        nome: nomeDespesa,
        tipo: tipoDespesa,
        precoUnitario: precoUnitario,
        quantidadePorProduto: quantidadePorProduto,
        custoPorProduto: custoPorProduto
    }
    listaDeDespesas.push(objetoDespesa);
}
function atualizaTabela(listaDeDespesas) {
    var linhasTabela = document.querySelectorAll('.tabela__linha');
    linhasTabela.forEach(linha => {
        linha.remove();
    })
    listaDeDespesas.forEach(despesa => {
        var tdNome = document.createElement('td');
        var tdPrecoUnitario = document.createElement('td');
        var tdQtdPorProduto = document.createElement('td');
        var tdCustoPorProduto = document.createElement('td');

        const formatar = function(number){
            return new Intl.NumberFormat('pt-br', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2}).format(number);
        };
        tdNome.textContent = despesa.nome;
        tdPrecoUnitario.textContent = formatar(despesa.precoUnitario);
        tdQtdPorProduto.textContent = despesa.quantidadePorProduto.toFixed(3);
        tdCustoPorProduto.textContent = formatar(despesa.custoPorProduto);

        var tabelaLinha = document.createElement('tr');
        tabelaLinha.classList.add('tabela__linha');

        tabelaLinha.appendChild(tdNome);
        tabelaLinha.appendChild(tdPrecoUnitario);
        tabelaLinha.appendChild(tdQtdPorProduto);
        tabelaLinha.appendChild(tdCustoPorProduto);

        var tabela;
        if(despesa.tipo == 'ingrediente') {
            tabela = tabelas[0];
        }
        else if(despesa.tipo == 'embalagem') {
            tabela = tabelas[1];
        }

        tabela.appendChild(tabelaLinha);
    });
}
/*
{	
	{
		nomeDespesa: Morango,
        tipoDespesa: embalagem,
		precoUnitario: 10.00,
		quantidadePorProduto: 0.293,
		custoPorProduto: 2.93
	},

}
*/
