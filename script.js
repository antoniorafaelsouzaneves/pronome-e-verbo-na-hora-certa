const combinacoes = [
  {
    combo: "he + study + afirmativa",
    sujeito: "he",
    verbo: "study",
    tipoFrase: "afirmativa",
    frase: "He studies every day.",
    verboCorreto: "studies",
    traducao: "Ele estuda todos os dias.",
    dica: "Complete a frase: He ___ every day."
  },
  {
    combo: "they + like + negativa",
    sujeito: "they",
    verbo: "like",
    tipoFrase: "negativa",
    frase: "They don’t like pizza.",
    verboCorreto: "like",
    traducao: "Eles não gostam de pizza.",
    dica: "Complete a frase: They don’t ___ pizza."
  },
  {
    combo: "we + watch + interrogativa",
    sujeito: "we",
    verbo: "watch",
    tipoFrase: "interrogativa",
    frase: "Do we watch TV at night?",
    verboCorreto: "watch",
    traducao: "Nós assistimos TV à noite?",
    dica: "Complete a frase: Do we ___ TV at night?"
  },
  {
    combo: "I + play + afirmativa",
    sujeito: "I",
    verbo: "play",
    tipoFrase: "afirmativa",
    frase: "I play soccer on Sundays.",
    verboCorreto: "play",
    traducao: "Eu jogo futebol aos domingos.",
    dica: "Complete a frase: I ___ soccer on Sundays."
  },
  {
    combo: "she + work + negativa",
    sujeito: "she",
    verbo: "work",
    tipoFrase: "negativa",
    frase: "She doesn’t work on weekends.",
    verboCorreto: "work",
    traducao: "Ela não trabalha nos finais de semana.",
    dica: "Complete a frase: She doesn’t ___ on weekends."
  },
  {
    combo: "you + study + interrogativa",
    sujeito: "you",
    verbo: "study",
    tipoFrase: "interrogativa",
    frase: "Do you study English?",
    verboCorreto: "study",
    traducao: "Você estuda inglês?",
    dica: "Complete a frase: Do you ___ English?"
  },
  {
    combo: "it + like + afirmativa",
    sujeito: "it",
    verbo: "like",
    tipoFrase: "afirmativa",
    frase: "It likes warm weather.",
    verboCorreto: "likes",
    traducao: "Ele/Ela gosta de tempo quente.",
    dica: "Complete a frase: It ___ warm weather."
  },
  {
    combo: "he + play + negativa",
    sujeito: "he",
    verbo: "play",
    tipoFrase: "negativa",
    frase: "He doesn’t play basketball.",
    verboCorreto: "play",
    traducao: "Ele não joga basquete.",
    dica: "Complete a frase: He doesn’t ___ basketball."
  },
  {
    combo: "they + work + interrogativa",
    sujeito: "they",
    verbo: "work",
    tipoFrase: "interrogativa",
    frase: "Do they work in an office?",
    verboCorreto: "work",
    traducao: "Eles trabalham em um escritório?",
    dica: "Complete a frase: Do they ___ in an office?"
  },
  {
    combo: "she + watch + afirmativa",
    sujeito: "she",
    verbo: "watch",
    tipoFrase: "afirmativa",
    frase: "She watches movies at night.",
    verboCorreto: "watches",
    traducao: "Ela assiste filmes à noite.",
    dica: "Complete a frase: She ___ movies at night."
  }
];

let pontos = 0;
let rodadasGanhas = 0;
let fraseAtual = null;

const btnSorteio = document.getElementById("btnsorteio");
const sorteioPalavra = document.getElementById("sorteiopalavra");
const inputResposta = document.getElementById("inputresposta");
const btnEnviar = document.getElementById("btnenviar");
const pontosDisplay = document.querySelector("#pontos h2");
const rodadaDisplay = document.querySelector("#rodada h2");
const dicaParagrafo = document.getElementById("dicasparagrafo");

function sortearFrase() {
  const index = Math.floor(Math.random() * combinacoes.length);
  fraseAtual = combinacoes[index];
  sorteioPalavra.textContent = fraseAtual.combo;
  dicaParagrafo.innerHTML = `<strong>Tradução:</strong> ${fraseAtual.traducao}<br><strong>Dica:</strong> ${fraseAtual.dica}<br><strong>Forma correta do verbo:</strong> ${fraseAtual.verboCorreto}`;
  inputResposta.value = "";
  inputResposta.focus();
}

function verificarResposta() {
  if (!fraseAtual) {
    alert("Por favor, clique em 'Sortear' para começar o jogo.");
    return;
  }

  let respostaJogador = inputResposta.value.trim();

  const normalize = (str) => 
    str.toLowerCase()
      .replace(/’/g, "'")
      .replace(/[.?!]$/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const fraseCorretaNorm = normalize(fraseAtual.frase);

  const fraseAlternativa = normalize(
    fraseAtual.frase.replace(fraseAtual.verboCorreto, 
      fraseAtual.combo.split("+")[1].trim()
    )
  );

  const respostaNorm = normalize(respostaJogador);

  if (respostaNorm === fraseCorretaNorm || respostaNorm === fraseAlternativa) {
    pontos++;
    dicaParagrafo.innerHTML = "✔️ Muito bem! Você acertou!";
  } else {
    dicaParagrafo.innerHTML = `❌ Errado! A frase correta é: "<em>${fraseAtual.frase}</em>"`;
  }

  pontosDisplay.textContent = pontos;
  inputResposta.value = "";
  inputResposta.focus();

  if (pontos >= 10) {
    rodadasGanhas++;
    rodadaDisplay.textContent = rodadasGanhas;
    pontos = 0;
    dicaParagrafo.innerHTML = "🎉 Parabéns! Você venceu a rodada! Clique em Sortear para jogar novamente.";
    pontosDisplay.textContent = pontos;
    fraseAtual = null;
    sorteioPalavra.textContent = "Clique em Sortear para iniciar!";
  }
}

btnSorteio.addEventListener("click", sortearFrase);
btnEnviar.addEventListener("click", verificarResposta);
inputResposta.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    verificarResposta();
  }
});
