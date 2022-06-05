const inputs = document.querySelectorAll('input');

const inputQuantidadeDeProdutos = document.querySelector('#quantidade-produtos');
var quantidadeDeProdutos;

var formularioNome = document.querySelector('#nome-despesa');
var formularioTipoDespesa = document.querySelector('#tipo-despesa');
var formularioPreco;

var tipoDespesa;

inputQuantidadeDeProdutos.addEventListener('change', function() {
    quantidadeDeProdutos = document.querySelector('#quantidade-produtos').value;
    console.log(quantidadeDeProdutos);
    //atualizarConta();
})

formularioTipoDespesa.addEventListener('change', function() {
    var formularioIngrediente = document.querySelector('.formulario__tipo--ingrediente');
    var formularioEmbalagem = document.querySelector('.formulario__tipo--embalagem');
    var formularioTipoDiv = document.querySelector('.formulario__tipo');

    if(formularioTipoDespesa.value == 'ingrediente') {
        formularioIngrediente.classList.remove('formulario-inativo');
        formularioEmbalagem.classList.add('formulario-inativo');
        formularioPreco = document.querySelector('#preco-ingrediente');
    }
    else if(formularioTipoDespesa.value == 'embalagem') {
        formularioEmbalagem.classList.remove('formulario-inativo');
        formularioIngrediente.classList.add('formulario-inativo');
        formularioPreco = document.querySelector('#preco-embalagem');
    }
    else {
        formularioIngrediente.classList.add('formulario-inativo');
        formularioEmbalagem.classList.add('formulario-inativo');
        return;
    }
    tipoDespesa = formularioTipoDespesa.value;
    console.log('Tipo de dispesa: ' + tipoDespesa)
    formularioTipoDiv.classList.remove('formulario-inativo');
})

var nomeDespesa;

var preco;
var quantidade;
var precoUnitario;

var quantidadeUtilizada;
var quantidadePorProduto;

var botaoSubmit = document.querySelector('.formulario__botao');
botaoSubmit.addEventListener('click', event =>{
    event.preventDefault();
    
    
    nomeDespesa = document.querySelector('#nome-despesa').value;
    var custoPorProduto;
    if(formularioTipoDespesa.value == 'ingrediente') {
        quantidadeUtilizada = document.querySelector('#quantidade-usada').value;

        preco = document.querySelector('#preco-ingrediente').value;
        quantidade = document.querySelector('#quantidade-preco').value;
        precoUnitario = preco/quantidade;
        
        custoPorProduto = ((preco/quantidade) * quantidadeUtilizada) / 15;
    }
    else if(formularioTipoDespesa.value == 'embalagem') {
        preco = document.querySelector('#preco-embalagem').value;
        precoUnitario = preco/1;

        quantidadePorProduto = 1; 

        custoPorProduto = ((preco/1) * 15) / 15;

    }
    
    criarTabela(nomeDespesa, quantidadeUtilizada, precoUnitario, quantidadePorProduto, custoPorProduto)
})



function criarTabela(nome, quantidadeUtilizada, precoUnitario, quantidadePorProduto, custoPorProduto) {
    //criando elementos
    var tdNome = document.createElement('td');
    var tdQtdUsada = document.createElement('td');
    var tdPrecoUnitario = document.createElement('td');
    var tdQtdPorProduto = document.createElement('td');
    var tdCustoPorProduto = document.createElement('td');
    //adicionando classes

    tdNome.classList.add('tabela__linha--nome');
    tdQtdUsada.classList.add('tabela__linha--quantidadeUtilizada');
    tdPrecoUnitario.classList.add('tabela__linha--precoUnitario')
    tdQtdPorProduto.classList.add('tabela__linha--quantidadePorProduto')
    tdCustoPorProduto.classList.add('tabela__linha--custoPorProduto')
    //colocando dados nos td
    tdNome.textContent = nome;
    tdQtdUsada.textContent = quantidadeUtilizada;
    tdPrecoUnitario.textContent = precoUnitario;
    tdQtdPorProduto.textContent = quantidadePorProduto;
    tdCustoPorProduto.textContent = custoPorProduto;
    //criando linha da tabela
    var tabelaLinha = document.createElement('tr');
    tabelaLinha.classList.add('tabela__linha');
    //append td(s)
    tabelaLinha.appendChild(tdNome);
    tabelaLinha.appendChild(tdQtdUsada);
    tabelaLinha.appendChild(tdPrecoUnitario);
    tabelaLinha.appendChild(tdQtdPorProduto);
    tabelaLinha.appendChild(tdCustoPorProduto);

    var tabela;
    if(tipoDespesa == 'ingrediente') {
        tabela = document.querySelector('.tabela__ingredientes');
    }
    else {
        tabela = document.querySelector('.tabela__embalagens');
    }

    tabela.appendChild(tabelaLinha);
}

