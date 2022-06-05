const inputs = document.querySelectorAll('input');

var quantidadeDeProdutos = document.querySelector('#quantidade-produtos').value;


const inputQuantidadeDeProdutos = document.querySelector('#quantidade-produtos');

var formulario = document.querySelector('form');
var formularioTipoDiv = document.querySelector('.formulario__tipo');
resetarFormulario();

var formularioNome = document.querySelector('#nome-despesa');
var formularioTipoDespesa = document.querySelector('#tipo-despesa');
var formularioPreco;

var tipoDespesa;

inputQuantidadeDeProdutos.addEventListener('change', function() {
    quantidadeDeProdutos = document.querySelector('#quantidade-produtos').value;
    console.log(quantidadeDeProdutos);
    //atualizarConta();
})
function resetarFormulario(){
    formulario.reset();
    formularioTipoDiv.classList.add('formulario-inativo');
}

formularioTipoDespesa.addEventListener('change', function() {
    tipoDespesa = formularioTipoDespesa.value;
    if(formularioTipoDespesa.value == 'ingrediente' | formularioTipoDespesa.value == 'embalagem') {
        formularioTipoDiv.classList.remove('formulario-inativo');
    }
    else {
        formularioTipoDiv.classList.add('formulario-inativo');
    }
    /*
    var formularioIngrediente = document.querySelector('.formulario__tipo--ingrediente');
    var formularioEmbalagem = document.querySelector('.formulario__tipo--embalagem');

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
    */
    
})

var nomeDespesa;

var preco;
var quantidade;
var precoUnitario;

var quantidadeUtilizada;
var quantidadePorProduto;

var botaoSubmit = document.querySelector('.formulario__botao');
botaoSubmit.addEventListener('click', event =>{
    nomeDespesa = document.querySelector('#nome-despesa').value;
    quantidade = document.querySelector('#quantidade-preco').value;
    quantidadeUtilizada = document.querySelector('#quantidade-usada').value;
    var custoPorProduto;
    if(tipoDespesa == 'ingrediente') {
        
        //preco = document.querySelector('#preco-ingrediente').value;
        preco = document.querySelector('#preco').value;
        precoUnitario = preco/quantidade;
        
        custoPorProduto = ((precoUnitario) * quantidadeUtilizada) / 15;

        console.log(`quantidadeUtilizada ${quantidadeUtilizada}`);
    }
    else if(tipoDespesa == 'embalagem') {
        //preco = document.querySelector('#preco-embalagem').value;
        preco = document.querySelector('#preco').value;
        precoUnitario = preco/quantidade;
        
        
        custoPorProduto = ((preco/1) * 15) / 15;
        
    }
    
    quantidadePorProduto = quantidadeUtilizada / quantidadeDeProdutos; 
    criarTabela(nomeDespesa, precoUnitario, quantidadePorProduto, custoPorProduto);
    
    resetarFormulario();
})



function criarTabela(nome, precoUnitario, quantidadePorProduto, custoPorProduto) {
    //criando elementos
    var tdNome = document.createElement('td');
    var tdPrecoUnitario = document.createElement('td');
    var tdQtdPorProduto = document.createElement('td');
    var tdCustoPorProduto = document.createElement('td');
    //adicionando classes

    tdNome.classList.add('tabela__linha--nome');
    tdPrecoUnitario.classList.add('tabela__linha--precoUnitario')
    tdQtdPorProduto.classList.add('tabela__linha--quantidadePorProduto')
    tdCustoPorProduto.classList.add('tabela__linha--custoPorProduto')
    //colocando dados nos td
    const formatar = function(number){
        return new Intl.NumberFormat('pt-br', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2}).format(number);
    };
    tdNome.textContent = nome;
    tdPrecoUnitario.textContent = formatar(precoUnitario);
    console.log(quantidadePorProduto);
    tdQtdPorProduto.textContent = quantidadePorProduto.toFixed(3);
    tdCustoPorProduto.textContent = formatar(custoPorProduto);
    //criando linha da tabela
    var tabelaLinha = document.createElement('tr');
    tabelaLinha.classList.add('tabela__linha');
    //append td(s)
    tabelaLinha.appendChild(tdNome);
    tabelaLinha.appendChild(tdPrecoUnitario);
    tabelaLinha.appendChild(tdQtdPorProduto);
    tabelaLinha.appendChild(tdCustoPorProduto);

    var tabela;
    console.log('O tipo de despesa: ' + formularioTipoDespesa.value);
    if(tipoDespesa == 'ingrediente') {
        tabela = document.querySelector('.tabela__ingredientes');
    }
    else if(tipoDespesa == 'embalagem') {
        tabela = document.querySelector('.tabela__embalagens');
    }

    tabela.appendChild(tabelaLinha);
}

