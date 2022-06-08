const tabelaProdutos = document.querySelector('.tabela');

var arquivoJson = fetch("../produtos.json")
.then(response => {
   return response.json();
})
.then(jsondata => criarTabelaDeProdutos(jsondata));

const formatar = function(number){
   return new Intl.NumberFormat('pt-br', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2}).format(number);
};

function criarTabelaDeProdutos(produtos) {
   produtos.forEach(produto => {
      const despesas = produto.despesas;
      var custoTotalDoProduto = 0;
      var quantidadeDeDespesas = 0;
      const linhaTabela = document.createElement('tr');
      despesas.forEach(despesa => {
         custoTotalDoProduto += despesa.custoPorProduto;
         quantidadeDeDespesas++;
      })
      
      criarElementoNaLinha(produto.nome, linhaTabela);
      criarElementoNaLinha(quantidadeDeDespesas, linhaTabela);
      criarElementoNaLinha(formatar(custoTotalDoProduto), linhaTabela);
      
      
      tabelaProdutos.appendChild(linhaTabela);
   });
}
function criarElementoNaLinha(valor, tr) {
   const td = document.createElement('td');
   td.textContent = valor;
   
   tr.appendChild(td);
}