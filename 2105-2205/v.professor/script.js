window.onload = function() {
  var alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var nomes_categorias = ['frutas', 'paises', 'animais'];
  
  var categorias_palavras = [['Abacaxi', 'Morango', 'Uva', 'Banana', 'Melancia'],
  ['Brasil', 'Argentina', 'Chile'],
  ['Cachorro', 'Gato', 'Papagaio', 'Cavalo', 'Galinha']];

  var dicas_palavras = [['Tem coroa', 'É vermelho', 'Tem cachos', 'É amarela', 'É grande e cheia de sementes'],
      ['Futebol, Samba e muita Diversão', 'Messi', 'Cordilheira dos Andes'],
      ['É o melhor amigo do homem', 'Dizem que não gosta de água', 'Tem penas', 'Usado também como transporte', 'Coloca ovos']];
  
  //Elementos html utilizados
  var html_p_categoria = document.getElementById('p_categoria');
  var html_p_vidas = document.getElementById('p_vidas');
  var html_p_dica = document.getElementById('p_dica');
  var html_botao_dica = document.getElementById('botao_dica');
  var html_botao_reiniciar = document.getElementById('botao_reiniciar');
  var html_div_img_lose = document.getElementById('div_img_lose');
  var html_div_img_win = document.getElementById('div_img_win');
  var html_div_letras = document.getElementById('div_letras');
  var html_div_tabuleiro = document.getElementById('div_tabuleiro');

  //Variáveis de controle 
  var jogo_terminado = false; //Identifica se o jogo já terminou
  var contador_vidas; //Contador de vidas remanescentes
  var lista_letras; //Lista não ordenada das letras
  var palavra_tabuleiro; //Lista não ordenada da palavra do tabuleiro
  var indice_categoria_escolhida = 0, indice_palavra_escolhida = 0;
  var palavra_selecionada;// Armazena a palavra selecionada
  var contador_espacos = 0; //Contador de espaços da palavra
  var contador_palpites = 0; //Contador de palpites realizados que coincidem com a palavra

  //funções comportamentais
 var  sortearPalavra = function (){
   indice_categoria_escolhida = Math.floor(Math.random()*nomes_categorias.length);
   palavras = categorias_palavras[indice_categoria_escolhida];
   indice_palavra_escolhida = Math.floor(Math.random() * palavras.length);
   palavra_selecionada = palavras[indice_palavra_escolhida].toLowerCase();
   console.log(palavra_selecionada);
   palavra_selecionada = palavra_selecionada.replace(/\s/g, "-");
 }
var palpiteLancado = function(){
 if (jogo_terminado === false){
  var letra_escolhida = this.innerHTML;
  this.setAttribute('class', 'desativar');
  this.onclick = null;
  if ((palavra_selecionada.indexOf(letra_escolhida) === -1)){
    contador_vidas--;
    atualizarPlacarVidas();
    return;
  }
   for (var i = 0; i < palavra_selecionada.length; i++) {
     if (palavra_selecionada[i] === letra_escolhida) {
       palavra_tabuleiro.children[i].innerHTML = letra_escolhida;
       contador_palpites++;
     }
   }
   atualizarPlacarVidas();
 } else {
   window.alert(" O Jogo já terminou, reinicie o jogo para jogar novamente!")
 }
}
 var criarPainelLetras = function (){
    lista_letras = document.createElement('ul');
     for (var i = 0; i < alfabeto.length; i++) {
       lista_letras.id = 'alfabeto';
       let letra = document.createElement('li');
       letra.id = 'letra_'+alfabeto[i];
       letra.innerHTML = alfabeto[i];
       letra.onclick = palpiteLancado;
       lista_letras.appendChild(letra);
       }
    html_div_letras.appendChild(lista_letras);
 }

  
var montarTabuleiro = function (){
   palavra_tabuleiro = document.createElement('ul');
   palavra_tabuleiro.setAttribute('id', 'minha_palavra');
   for (var i = 0; i < palavra_selecionada.length; i++) {
    let letraTabuleiro = document.createElement('li');
    letraTabuleiro.setAttribute('class', 'chute');
     if (palavra_selecionada[i] === '-'){
       letraTabuleiro.innerHTML = "-";
       contador_espacos += 1;
     }else {
        letraTabuleiro.innerHTML = "_";
     }
     palavra_tabuleiro.appendChild(letraTabuleiro);
   }
   html_div_tabuleiro.appendChild(palavra_tabuleiro);
}
  
  var visualizarCategoria = function (){
       html_p_categoria.innerHTML = "A palavra pertence a categoria: " + nomes_categorias[indice_categoria_escolhida];
  }
  
  var visualizarDica = function () {
     html_p_dica.innerHTML = "Dica: " + dicas_palavras[indice_categoria_escolhida][indice_palavra_escolhida];

  }

  var atualizarPlacarVidas = function () {
    if (contador_vidas < 1){
      html_p_vidas.innerHTML = "Você perdeu!";
      jogo_terminado = true;
      html_div_img_lose.style.display = 'block';
      return;
    }

    if ((contador_espacos+contador_palpites) === palavra_selecionada.length){
      html_p_vidas.innerHTML = "Você venceu!";
      jogo_terminado = true;
      html_div_img_win.style.display = 'block';
      return;
    }
    html_p_vidas.innerHTML = "Vidas: " + contador_vidas;
  }
  var reinciaJogo = function (){
    html_p_dica.innerHTML = "Dica: ?";
     html_p_categoria.innerHTML = "";
     html_p_vidas.innerHTML = "";
     jogo_terminado = false;
    lista_letras.parentNode.removeChild(lista_letras);
    palavra_tabuleiro.parentNode.removeChild(palavra_tabuleiro);
     html_div_img_win.style.display = "none";
     html_div_img_lose.style.display = "none";
    jogar();
  }
  var jogar = function(){
    contador_espacos = 0;
    contador_palpites = 0;
    contador_vidas = 6;
    sortearPalavra();
    criarPainelLetras();
    montarTabuleiro();
    visualizarCategoria();
  }
  jogar();
  html_botao_dica.addEventListener('click', visualizarDica);
  html_botao_reiniciar.addEventListener('click', reinciaJogo);
}
