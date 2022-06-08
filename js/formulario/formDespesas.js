import { processarDados } from "./processaDadosDespesas.js";

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

/*BOTÃO SUBMIT*/
const botaoSubmit = document.querySelector('.botao__despesa');

resetarFormulario();
function resetarFormulario(){
    formulario.reset();
    formularioTipoDiv.classList.add('formulario-inativo');
    inputQuantidadeUtilizada.placeholder = `padrão: ${quantidadeDeProdutos}`;
}

inputQuantidadeDeProdutos.addEventListener('blur', evento => {
    var elementoErro = evento.target.parentElement.querySelector('.mensagem-erro');
    if(evento.target.validity.valueMissing | evento.target.value == 0){
        elementoErro.classList.remove('mensagem-erro-oculta');
    }
    else {
        elementoErro.classList.add('mensagem-erro-oculta');
    }  
    
})

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
    var valores = [nomeDespesa, quantidade, quantidadeUtilizada, preco, quantidadeDeProdutos];
    
    if(inputsValidos(valores)){
        resetarFormulario();
        processarDados(nomeDespesa, tipoDespesa, quantidadeUtilizada, quantidade, preco, quantidadeDeProdutos);
    }
}
function inputsValidos(valores) {
    var valoresInvalidos = []
    valores.forEach(valor => {
        if(valor === '') {
            valoresInvalidos.push(valor);
        }
    })
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
        console.log('Há campos vazios!');
        if(valoresInvalidos.length == 1){
            mensagem = 'Há um campo obrigatório vazio';
            elementoMensagemErro.classList.remove('mensagem-erro-oculta');
        }
        else if(valoresInvalidos.length > 1) {
            mensagem = 'Há campos obrigatórios vazios';
            elementoMensagemErro.classList.remove('mensagem-erro-oculta');
        }
    }
    elementoMensagemErro.innerHTML = mensagem;

}
