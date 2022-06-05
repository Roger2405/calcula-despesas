var botaoSubmit = document.querySelector('.formulario__botao');

var formularioIngrediente = document.querySelector('.formulario-ingrediente');
var formularioEmbalagem = document.querySelector('.formulario-embalagem');

var quantidadeProdutos = document.querySelector('#quantidade-produtos');


var formularioNome = document.querySelector('#nome');
var formularioTipoDespesa = document.querySelector('#tipo');

var formularioPrecos;

formularioTipoDespesa.addEventListener('change', function() {
    if(formularioTipoDespesa.value === 'ingrediente') {
        formularioIngrediente.classList.remove('formulario-inativo');
        formularioEmbalagem.classList.add('formulario-inativo');
    }
    else if(formularioTipoDespesa.value === 'embalagem') {
        formularioEmbalagem.classList.remove('formulario-inativo');
        formularioIngrediente.classList.add('formulario-inativo');
    }
    else {
        formularioIngrediente.classList.add('formulario-inativo');
        formularioEmbalagem.classList.add('formulario-inativo');

    }
    formularioPrecos = document.querySelector('.inputPreco');
})

const args = {
    afterFormat(e) { console.log('afterFormat', e); },
    allowNegative: false,
    beforeFormat(e) { console.log('beforeFormat', e); },
    negativeSignAfter: false,
    prefix: '',
    suffix: '',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '.',
    cursor: 'move'
  };


const inputPreco = SimpleMaskMoney.setMask(formularioPrecos, {
            prefix: 'R$ ',
            fixed: true,
            fractionDigits: 2,
            decimalSeparator: ',',
            thousandsSeparator: '.',
            cursor: 'end'
        });

botaoSubmit.addEventListener('click', event =>{
    event.preventDefault();
    console.log(formularioTipoDespesa.value);
})