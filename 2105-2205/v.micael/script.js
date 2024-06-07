var alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
  'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var nomes_categorias = ['FRUTAS', 'PAISES', 'ANIMAIS'];
var categorias_palavras = [['ABACAXI', 'MORANGO', 'UVA', 'BANANA', 'MELANCIA'],
['BRASIL', 'ARGENTINA', 'CHILE'],
['CACHORRO', 'GATO', 'PAPAGAIO', 'CAVALO', 'GALINHA']];

var definirCategoria = 0;
var definirPalavras = 0;
var botaoLetras = document.getElementById('botoes');
var botaoJogar = document.querySelector('#reiniciar');
var botaoDica = document.querySelector('#botaoDica');
var vidas = document.querySelector('#vidas');
var dica = document.querySelector('#dica');

var botoes = function() {
  letras = document.createElement('ul');
  for (var i = 0; i < alfabeto.length; i++) {
    letras.id = 'alfabeto';
    list = document.createElement('li');
    list.id = 'letra';
    list.innerHTML = alfabeto[i];
    botaoLetras.appendChild(letras);
    letras.appendChild(list);
  }
};
function sortearPalavra(){
  definirCategoria = Math.floor(Math.random() * nomes_categorias.length);

  definirPalavras = Math.floor(Math.random() * categorias_palavras[definirCategoria].length);
  console.log(categorias_palavras[definirCategoria][definirPalavras])
}

function atualizarTabuleiro(){
  let categoria = document.getElementById("categoria");

  let categoriaEscolhida = document.querySelector("span");

  if (categoriaEscolhida) {
    categoriaEscolhida.innerText = nomes_categorias[definirCategoria];
  } else {
    categoriaEscolhida = document.createElement("span");
    categoriaEscolhida.innerText = nomes_categorias[definirCategoria];
    categoria.appendChild(categoriaEscolhida);
  }

  let tabuleiro = document.getElementById("tabuleiro")
  tabuleiro.innerText = "";
  for (let i = 0; i < categorias_palavras[definirCategoria][definirPalavras].length; i++) {
    var caixaLetras = document.createElement("span");
    caixaLetras.classList.add("letraEscolhida")
    caixaLetras.innerText = "_"
    tabuleiro.appendChild(caixaLetras);
  }
}

botaoJogar.addEventListener('click', function() {

  // Adicionei mudança do valor do botão e 6 vidas iniciais.
  if (this.innerText === 'Jogar') {
    this.innerText = "Jogar Novamente"
  }
  vidas.innerText = 'Vidas: 6';

  sortearPalavra();

  atualizarTabuleiro();

  // Criando evento para ao clicar na letra validar se tem a letra na palavra
  botaoLetras.addEventListener('click', function(event) {
    // Jogando a palavra sorteada para dentro da variável palavraEscolhida
    let palavraSorteada = categorias_palavras[definirCategoria][definirPalavras];
    // Verifica a letra que foi clicada pelo usuário
    let letraEscolhida = event.target.innerText;
    console.log(letraEscolhida)
    // Verifica se a letra clicada está dentro da palavra que está na variável palavraEscolhida
    if (palavraSorteada.includes(letraEscolhida)) {

      let indices = []; //[4,] 6
      // Um For para percorrer a palavra e verificar onde a letra está na palavra
      for (i = 0; i < palavraSorteada.length; i++) {
        if (palavraSorteada[i] === letraEscolhida) indices.push(i);
      }

      // Chamar o id tabuleiro, tag span com a classe.
      let letrasTabuleiro = document.querySelectorAll('.letraEscolhida');
      indices.forEach(index => {
        letrasTabuleiro[index].textContent = letraEscolhida;
      })

    } else {
      // dividi a string em duas partes com split, criando um array e usando o ":" como separador, escolhi o segundo valor do array e decrementei o valor de vida
      let numero =  (parseInt(vidas.innerText.split(':')[1]) - 1);
      vidas.innerText = 'Vidas: ' + numero
      alert('Não tem essa letra')

      if(numero === 0){
        alert("perdeu!")
        atualizarTabuleiro()
      }
    }

    
  })
  
  // Defini o texto Dica ? sempre que clicar no botão para jogar novamente.
  dica.innerText = 'Dica ?'
  })
  // Evento de clique para escolher a dica de acordo com a palavra
  botaoDica.addEventListener('click', function() {

    var dicas = [['É uma fruta tropical, tem uma casca áspera.', 'Vermelha pequena, com sementes do lado de fora.', 'Pode ser verde, roxa ou vermelha.', 'Amarela, rica em potássio.', 'Grande e verde por fora, vermelha por dentro.'],
    ['Conhecido pelo carnaval.', 'Famoso pelo tango', 'Famoso pelos Andes e suas vinícolas.'],
    ['Melhor amigo do homem.', 'Independente, adora caçar ratos.', 'Pode imitar a fala humana.', 'Usado para montaria e trabalho.', 'Não voa e é bem comum em fazendas.']]

    var dicasPalavras = dicas[definirCategoria][definirPalavras];
    dica.innerText = dicasPalavras;
  })


botoes();


// funcionalidades
//1 - seleciona a palavra
//2 - espaço para colocar palavra
//3 - selecionar uma letra
//4 - resposta 


/* dicas:
Frutas
ABACAXI: É uma fruta tropical, tem uma casca áspera
MORANGO: Vermelha pequena, com sementes do lado de fora
UVA: Pode ser verde, roxa ou vermelha
BANANA: Amarela, rica em potássio
MELANCIA: Grande e verde por fora, vermelha por dentro.

Paises
BRASIL: Conhecido pelo carnaval
ARGENTINA: Famoso pelo tango
CHILE: Famoso pelos Andes e suas vinícolas.

Animais
CACHORRO: Melhor amigo do homem.
GATO: Independente, adora caçar ratos.
PAPAGAIO: Pode imitar a fala humana.
CAVALO: Usado para montaria e trabalho.
GALINHA: Não voa e é bem comum em fazendas.
*/
