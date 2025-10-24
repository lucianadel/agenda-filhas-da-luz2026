document.addEventListener("DOMContentLoaded", () => {
  const elMeses = document.getElementById("nav-meses");
  const elPaginas = document.getElementById("paginas");
  const btnTopo = document.getElementById("irTopo");
  const btnMesAtual = document.getElementById("irMesAtual");
  const btnImprimir = document.getElementById("imprimir");

  const MESES = [
    { nome: "JANEIRO", dias: 31, msg: "Janeiro abre caminhos — intenção e fé." },
    { nome: "FEVEREIRO", dias: 28, msg: "Fevereiro pede leveza e amor." },
    { nome: "MARÇO", dias: 31, msg: "Março inspira ação equilibrada." },
    { nome: "ABRIL", dias: 30, msg: "Abril traz cura e paciência." },
    { nome: "MAIO", dias: 31, msg: "Maio floresce gratidão e prosperidade." },
    { nome: "JUNHO", dias: 30, msg: "Junho desperta a intuição." },
    { nome: "JULHO", dias: 31, msg: "Julho vibra coragem e disciplina." },
    { nome: "AGOSTO", dias: 31, msg: "Agosto celebra a expansão." },
    { nome: "SETEMBRO", dias: 30, msg: "Setembro harmoniza escolhas." },
    { nome: "OUTUBRO", dias: 31, msg: "Outubro guia a transformação." },
    { nome: "NOVEMBRO", dias: 30, msg: "Novembro cura ciclos antigos." },
    { nome: "DEZEMBRO", dias: 31, msg: "Dezembro consagra com gratidão." },
  ];

  const CARTAS = [
    "O Cavaleiro", "O Trevo", "O Navio", "A Casa", "A Árvore", "As Nuvens",
    "A Cobra", "O Caixão", "O Buquê", "A Foice", "O Chicote", "Os Pássaros",
    "A Criança", "A Raposa", "O Urso", "As Estrelas", "A Cegonha", "O Cão",
    "A Torre", "O Jardim", "A Montanha", "O Caminho", "Os Ratos", "O Coração",
    "O Anel", "O Livro", "A Carta", "O Homem", "A Mulher", "Os Lírios",
    "O Sol", "A Lua", "A Chave", "Os Peixes", "A Âncora", "A Cruz"
  ];

  // 🌟 Mensagens inspiradoras e místicas — estilo Mariah Cartomante
  const MENSAGENS = [
    "A luz que você espalha sempre volta multiplicada.",
    "O universo fala em silêncio — escute com o coração.",
    "Você é guiada pela força invisível do amor.",
    "Há beleza até nas pausas do caminho.",
    "Sua intuição sabe o que sua mente ainda não entende.",
    "Confie no tempo do universo — ele nunca se atrasa.",
    "A esperança é a chama que renova a alma.",
    "Tudo o que é verdadeiro encontra o caminho até você.",
    "Respire e lembre-se: você é a própria cura.",
    "Floresça mesmo em tempos de sombra.",
    "A gratidão transforma o comum em milagre.",
    "Você é o templo onde mora a paz.",
    "O amor próprio é a oração mais poderosa que existe.",
    "Caminhe leve — a vida é feita de ciclos e recomeços.",
    "Quando o coração está em paz, o universo se alinha.",
    "Nada é por acaso — tudo ensina, tudo desperta.",
    "Os ventos mudam, mas a essência permanece.",
    "A fé é o farol que guia nas noites escuras.",
    "Acolha o que vem e libere o que já não vibra com você.",
    "Cada amanhecer é uma nova chance de renascer.",
    "Você é feita de estrelas e coragem.",
    "Aceite o mistério e confie na jornada.",
    "Deixe a alma dançar com o invisível.",
    "O que é seu tem a sua frequência — ninguém pode tomar.",
    "A luz que te guia é a mesma que você espalha.",
    "Gratidão é a chave que abre todas as portas.",
    "Você está exatamente onde precisa estar.",
    "Transforme o medo em oração e siga.",
    "O universo cuida de quem caminha com fé.",
    "Abençoe o caminho e ele florescerá sob seus pés.",
    "A intuição é a voz suave da alma te guiando.",
    "Nada é pequeno quando feito com amor.",
    "A prosperidade nasce da mente tranquila.",
    "Perdoar é libertar-se das correntes do passado.",
    "Você é a alquimista da própria vida.",
    "A paciência é o ritmo secreto do divino.",
    "O silêncio também fala — e sempre com sabedoria.",
    "Abra espaço para o novo florescer.",
    "A beleza da alma é a luz que nunca se apaga.",
    "Tudo o que vibra em amor retorna em bênção.",
    "Sua jornada é sagrada — caminhe com honra.",
    "A luz não teme a escuridão — apenas a transforma.",
    "Sonhar é conversar com o infinito.",
    "Mesmo sem ver, o universo está trabalhando por você.",
    "A abundância começa com um coração grato.",
    "Seja gentil com o seu próprio processo.",
    "A coragem nasce no silêncio das decisões da alma.",
    "A vida é feita de sinais — e todos levam ao despertar.",
    "Você não está atrasada — está sendo preparada.",
    "Tudo o que você entrega com amor se multiplica.",
    "O amor é o idioma universal da alma.",
    "Cada desafio é uma lição disfarçada de tempestade.",
    "Siga a direção da paz e encontrará o propósito.",
    "Há magia no simples ato de acreditar.",
    "Quando você vibra luz, a escuridão não te alcança.",
    "O coração aberto é o portal para os milagres.",
    "Não se apresse: até as estrelas levam tempo para brilhar.",
    "A cura acontece quando você escolhe a si mesma.",
    "Seja fiel à sua essência — ela é sua bússola espiritual.",
    "A energia que você emana cria o seu destino.",
    "Você é o canal da própria prosperidade.",
    "O amor que você doa é o amor que te sustenta.",
    "Nada é coincidência — tudo é sincronia divina.",
    "Quando o coração confia, o caminho se revela.",
    "Deixe o universo surpreender você.",
    "Tudo que vem do coração tem poder de cura.",
    "A calma é o terreno fértil da sabedoria.",
    "Seja luz, mesmo quando o mundo estiver cinza.",
    "Você é o milagre que esperava acontecer.",
    "Gratidão é o perfume da alma desperta.",
    "Sorria: a alegria é um ato de fé.",
    "Você carrega dentro de si o poder de recomeçar.",
    "A magia está nas pequenas coisas.",
    "A fé te faz caminhar até quando não há chão.",
    "O amor divino te envolve como um manto de proteção.",
    "Solte o controle e confie — o universo sabe o caminho.",
    "Sua alma reconhece o que é verdadeiro.",
    "A serenidade é a forma mais elevada de força.",
    "Você é filha da luz — e isso basta.",
  ];

  const pad2 = n => String(n).padStart(2, "0");
  const storageKey = (y, m, d, f) => `filhasdaluz:${y}-${pad2(m)}-${pad2(d)}:${f}`;

  // Monta navegação dos meses
  elMeses.innerHTML = MESES.map((m, i) =>
    `<button class="mes" data-mes="${i}">${m.nome}</button>`
  ).join("");

  // Gera as páginas com cartas embaralhadas e mensagens aleatórias
  const out = [];
  for (let mi = 0; mi < MESES.length; mi++) {
    const { nome, dias, msg } = MESES[mi];
    out.push(`<section class="divisoria-mes" id="mes-${mi + 1}">
                <div class="cartao-mes"><h2>${nome}</h2><p>${msg}</p></div>
              </section>`);

    // Embaralhar cartas do mês
    const cartasMes = CARTAS.map((_, i) => i).sort(() => Math.random() - 0.5);

    for (let d = 1; d <= dias; d++) {
      const data = new Date(2026, mi, d);
      const semana = data.toLocaleDateString("pt-BR", { weekday: "long" });
      const dataFmt = `${pad2(d)}/${pad2(mi + 1)}/2026`;
      const cartaIndex = cartasMes[(d - 1) % 36];
      const cartaNome = CARTAS[cartaIndex];
      const imagemCarta = `imagens/carta${cartaIndex + 1}.jpg`;

      // Mensagem aleatória do dia
      const mensagemDia = MENSAGENS[Math.floor(Math.random() * MENSAGENS.length)];

      out.push(`
        <article class="pagina" data-date="2026-${pad2(mi + 1)}-${pad2(d)}">
          <div class="card-dia">
            <div class="topo-dia">
              <div class="data-dia">${semana}, ${dataFmt}</div>
              <div class="carta">
                <div class="thumb" style="background-image:url('${imagemCarta}')"></div>
                <div class="nome-carta">${cartaNome}</div>
              </div>
            </div>

            <div class="label">Mensagem de Mariah</div>
            <div class="linhas" contenteditable data-field="mensagem">✨ ${mensagemDia} ✨</div>

            <div class="label">🙏 Gratidão do Dia</div>
            <div class="linhas" contenteditable data-field="gratidao"></div>

            <div class="label">💭 Sentimentos / Intuição</div>
            <div class="linhas" contenteditable data-field="sentimentos"></div>

            <div class="label">🌞 Tarefas / Compromissos do Dia</div>
            <div class="tarefas" contenteditable data-field="tarefas"></div>
          </div>
        </article>
      `);
    }
  }

  // Adiciona conteúdo ao HTML
  elPaginas.innerHTML = out.join("");

  // Restaura conteúdo salvo
  elPaginas.querySelectorAll("[contenteditable]").forEach(el => {
    const page = el.closest(".pagina");
    const [, m, d] = page.dataset.date.match(/-(\d+)-(\d+)/);
    const key = storageKey(2026, m, d, el.dataset.field);
    const saved = localStorage.getItem(key);
    if (saved) el.innerHTML = saved;
    el.addEventListener("input", () => localStorage.setItem(key, el.innerHTML));
  });

  // Navegação dos meses
  elMeses.addEventListener("click", e => {
    const b = e.target.closest(".mes");
    if (!b) return;
    document.getElementById(`mes-${+b.dataset.mes + 1}`)?.scrollIntoView({ behavior: "smooth" });
    document.querySelectorAll(".mes").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
  });

  // Botão Topo
  if (btnTopo) btnTopo.onclick = () => elPaginas.scrollTo({ top: 0, behavior: "smooth" });

  // Botão Mês Atual
  if (btnMesAtual) btnMesAtual.onclick = () => {
    const hoje = new Date();
    const mesIndex = hoje.getFullYear() === 2026 ? hoje.getMonth() : 0;
    document.getElementById(`mes-${mesIndex + 1}`)?.scrollIntoView({ behavior: "smooth" });
    document.querySelectorAll(".mes").forEach((b, i) =>
      b.classList.toggle("active", i === mesIndex)
    );
  };

  // Botão Imprimir
  if (btnImprimir) btnImprimir.onclick = () => {
    alert("💫 Dica: ative 'Imprimir plano de fundo' e escolha tamanho A5 antes de salvar o PDF.");
    window.print();
  };

  // Marca o primeiro mês ativo
  document.querySelector(".mes")?.classList.add("active");
});

  