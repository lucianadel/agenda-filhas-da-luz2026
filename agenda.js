document.addEventListener("DOMContentLoaded", () => {
  const elContainer = document.getElementById("containerSemanas");
  const btnPrev = document.getElementById("semanaAnterior");
  const btnNext = document.getElementById("semanaProxima");
  const elIndicador = document.getElementById("indicadorSemana");

  const YEAR = 2026;

  const CARTAS = [
    "O Cavaleiro","O Trevo","O Navio","A Casa","A Árvore","As Nuvens",
    "A Cobra","O Caixão","O Buquê","A Foice","O Chicote","Os Pássaros",
    "A Criança","A Raposa","O Urso","As Estrelas","A Cegonha","O Cão",
    "A Torre","O Jardim","A Montanha","O Caminho","Os Ratos","O Coração",
    "O Anel","O Livro","A Carta","O Homem","A Mulher","Os Lírios",
    "O Sol","A Lua","A Chave","Os Peixes","A Âncora","A Cruz"
  ];

  // ---------- Funções utilitárias ----------
  const pad2 = n => String(n).padStart(2, "0");
  const storageKey = (y, m, d, f) => `filhasdaluz:${y}-${pad2(m)}-${pad2(d)}:${f}`;
  const nomeMes = i => [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ][i];

  function seededIndex(seed, modulo) {
    let x = seed | 0;
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    return Math.abs(x) % modulo;
  }

  function getWeeksOfYear(year) {
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);
    const weeks = [];
    let cursor = new Date(start);
    while (cursor.getDay() !== 1) cursor.setDate(cursor.getDate() + 1);
    while (cursor <= end) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(cursor));
        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  }

  // ---------- Frases da Mensagem de Mariah ----------
  const ABERTURAS = [
    "Mariah te lembra:",
    "Mensagem de Mariah:",
    "Hoje, Mariah te diz:",
    "Da mesa de Mariah:",
    "Sussurro de Mariah:",
    "Benção de Mariah:"
  ];
  const TONICA = [
    "confie no que floresce dentro de você",
    "a luz retorna para quem escolhe a fé",
    "a calma abre portas que a pressa não vê",
    "a sua intuição é um mapa seguro",
    "o amor próprio é a ponte mais curta",
    "o silêncio cura o que a mente não alcança",
    "o seu coração já sabe o caminho",
    "onde há gratidão, há milagre",
    "o universo responde ao seu brilho",
    "respire e permita que o bem te encontre"
  ];
  const INSIGHTS_CARTA = [
    "traz movimento e boas notícias.",
    "abençoa a sorte simples e o riso leve.",
    "pede travessia com coragem e visão ampla.",
    "protege o lar e firma suas raízes.",
    "nutre processos lentos, férteis e fiéis.",
    "dissipa dúvidas com respiração e fé.",
    "ensina astúcia com ética e coração.",
    "encerra ciclos e abre espaço sagrado.",
    "perfuma o dia com beleza e alegria.",
    "colhe o que amadureceu: confie.",
    "pede foco, disciplina e palavra reta.",
    "eleva conversas e parcerias do destino.",
    "abençoa recomeços puros e curiosos.",
    "pede escolhas sábias e coerentes.",
    "sustenta proteção e força ancestral.",
    "ilumina caminhos sob céu favorável.",
    "anuncia chegadas e novidades boas.",
    "sela lealdade e afetos verdadeiros.",
    "ergue estruturas com dignidade.",
    "expande vida e boa companhia.",
    "testa perseverança diante do alto.",
    "abre encruzilhadas e novas rotas.",
    "pede cuidado com o que rouba energia.",
    "acende afetos e cura o sentir.",
    "firma compromissos de alma e propósito.",
    "convida a estudar o mistério com humildade.",
    "movimenta recados e respostas claras.",
    "oferece olhar assertivo e protetor.",
    "acolhe a sabedoria do feminino sagrado.",
    "espalha paz e elegância no ambiente.",
    "abençoa vitalidade, brilho e calor.",
    "clareia o inconsciente e a intuição.",
    "destranca soluções simples e precisas.",
    "faz circular prosperidade com consciência.",
    "ancora estabilidade e pertencimento.",
    "transmuta dores em fé serena."
  ];

  function mensagemMariah(date, cartaNome) {
    const seed = Number(`${date.getFullYear()}${pad2(date.getMonth()+1)}${pad2(date.getDate())}`);
    const ab = ABERTURAS[seededIndex(seed + 3, ABERTURAS.length)];
    const to = TONICA[seededIndex(seed + 11, TONICA.length)];
    const insight = INSIGHTS_CARTA[(date.getDate() - 1) % 36];
    return `${ab} ${cartaNome} ${insight} ${to.charAt(0).toUpperCase() + to.slice(1)}.`;
  }

  // ---------- Renderização das semanas ----------
  const weeks = getWeeksOfYear(YEAR);
  const out = [];

  weeks.forEach((week, wi) => {
    const inicio = week[0], fim = week[6];
    const tituloMes = nomeMes(inicio.getMonth());
    const tituloSemana = `Semana ${wi + 1} • ${pad2(inicio.getDate())}/${pad2(inicio.getMonth()+1)} a ${pad2(fim.getDate())}/${pad2(fim.getMonth()+1)}`;

    const diasHtml = week.map(date => {
      const dataFmt = `${pad2(date.getDate())}/${pad2(date.getMonth()+1)}/${date.getFullYear()}`;
      const semana = date.toLocaleDateString("pt-BR",{weekday:"short"}).toUpperCase();
      const cartaIdx = ((date.getDate()-1) % 36);
      const cartaNome = CARTAS[cartaIdx];
      const imagemCarta = `imagens/carta${cartaIdx+1}.jpg`;
      const msg = mensagemMariah(date, cartaNome);

      return `
      <div class="dia" data-y="${date.getFullYear()}" data-m="${date.getMonth()+1}" data-d="${date.getDate()}">
        <div class="bloco-esq">
          <div class="data-mini">${semana}<br>${dataFmt}</div>
          <div class="thumb" style="background-image:url('${imagemCarta}')"></div>
          <div class="nome-carta">${cartaNome}</div>
        </div>

        <div class="faixa-mariah">
          <span class="titulo">Mensagem de Mariah</span>
          <span class="texto">${msg}</span>
        </div>

        <div class="col-dir">
          <div class="bloco">
            <div class="label">🙏 Gratidão</div>
            <div class="area" contenteditable data-field="gratidao" data-placeholder="Escreva aqui sua gratidão de hoje..."></div>
          </div>
          <div class="bloco">
            <div class="label">💭 Sentimentos / Intuição</div>
            <div class="area" contenteditable data-field="sentimentos" data-placeholder="Descreva seus sentimentos, intuições ou percepções do dia..."></div>
          </div>
          <div class="bloco">
            <div class="label">🌞 Tarefas</div>
            <div class="area tarefas" contenteditable data-field="tarefas" data-placeholder="Anote suas tarefas e compromissos do dia..."></div>
          </div>
        </div>
      </div>`;
    }).join("");

    out.push(`
    <section class="semana" data-week-index="${wi}">
      <div class="sem-head">
        <h2>🌕 ${tituloMes} ${YEAR} 🌕</h2>
        <p>${tituloSemana}</p>
      </div>
      <div class="grid-semana">${diasHtml}</div>
    </section>`);
  });

  elContainer.innerHTML = out.join("");

  // ---------- Salvamento local ----------
  function restaurarCampos(weekIndex){
    const semanaEl = document.querySelector(`.semana[data-week-index="${weekIndex}"]`);
    if(!semanaEl) return;
    semanaEl.querySelectorAll(".dia").forEach(diaEl=>{
      const y = +diaEl.dataset.y, m = +diaEl.dataset.m, d = +diaEl.dataset.d;
      diaEl.querySelectorAll('[contenteditable][data-field]').forEach(area=>{
        const k = storageKey(y,m,d, area.dataset.field);
        const saved = localStorage.getItem(k);
        if (saved) area.innerHTML = saved;
        area.oninput = ()=> localStorage.setItem(k, area.innerHTML);
      });
    });
  }

  // ---------- Navegação ----------
  let currentWeek = 0;
  function showWeek(i){
    currentWeek = Math.max(0, Math.min(weeks.length-1, i));
    document.querySelectorAll(".semana").forEach((s,idx)=>s.classList.toggle("active", idx===currentWeek));
    const w = weeks[currentWeek], ini = w[0], fim = w[6];
    elIndicador.textContent = `${nomeMes(ini.getMonth())} ${YEAR} — ${pad2(ini.getDate())}/${pad2(ini.getMonth()+1)} a ${pad2(fim.getDate())}/${pad2(fim.getMonth()+1)}`;
    restaurarCampos(currentWeek);
  }

  btnPrev?.addEventListener("click", ()=> showWeek(currentWeek-1));
  btnNext?.addEventListener("click", ()=> showWeek(currentWeek+1));

  showWeek(0);

  // ---------- 🩵 AVISO DE SALVAMENTO LOCAL ----------
  if (!localStorage.getItem("avisoLocalMostrado")) {
    setTimeout(() => {
      alert("💾 As informações que você escrever ficarão salvas apenas neste dispositivo.\nSe limpar o histórico ou os dados do navegador, elas serão apagadas.");
      localStorage.setItem("avisoLocalMostrado", "1");
    }, 800);
  }
});
