document.addEventListener("DOMContentLoaded", () => {
  const elMeses = document.getElementById("nav-meses");
  const elPaginas = document.getElementById("paginas");
  const btnTopo = document.getElementById("irTopo");
  const btnMesAtual = document.getElementById("irMesAtual");
  const btnImprimir = document.getElementById("imprimir");

  const MESES = [
    { nome:"JANEIRO", dias:31, msg:"Janeiro abre caminhos — intenção e fé." },
    { nome:"FEVEREIRO", dias:28, msg:"Fevereiro pede leveza e amor." },
    { nome:"MARÇO", dias:31, msg:"Março inspira ação equilibrada." },
    { nome:"ABRIL", dias:30, msg:"Abril traz cura e paciência." },
    { nome:"MAIO", dias:31, msg:"Maio floresce gratidão e prosperidade." },
    { nome:"JUNHO", dias:30, msg:"Junho desperta a intuição." },
    { nome:"JULHO", dias:31, msg:"Julho vibra coragem e disciplina." },
    { nome:"AGOSTO", dias:31, msg:"Agosto celebra a expansão." },
    { nome:"SETEMBRO", dias:30, msg:"Setembro harmoniza escolhas." },
    { nome:"OUTUBRO", dias:31, msg:"Outubro guia a transformação." },
    { nome:"NOVEMBRO", dias:30, msg:"Novembro cura ciclos antigos." },
    { nome:"DEZEMBRO", dias:31, msg:"Dezembro consagra com gratidão." },
  ];

  const pad2 = n => String(n).padStart(2,"0");
  const storageKey = (y,m,d,f) => `filhosdaluz:${y}-${pad2(m)}-${pad2(d)}:${f}`;

  // monta navegação dos meses
  elMeses.innerHTML = MESES.map((m,i)=>`<button class="mes" data-mes="${i}">${m.nome}</button>`).join("");

  // gera todas as páginas
  const out = [];
  for (let mi=0; mi<MESES.length; mi++){
    const { nome, dias, msg } = MESES[mi];
    out.push(`<section class="divisoria-mes" id="mes-${mi+1}"><div class="cartao-mes"><h2>${nome}</h2><p>${msg}</p></div></section>`);

    for (let d=1; d<=dias; d++){
      const data = new Date(2026, mi, d);
      const semana = data.toLocaleDateString("pt-BR",{weekday:"long"});
      const dataFmt = `${pad2(d)}/${pad2(mi+1)}/2026`;
      const carta = `Carta ${(d % 36) + 1}`;

      out.push(`
        <article class="pagina" data-date="2026-${pad2(mi+1)}-${pad2(d)}">
          <div class="card-dia">
            <div class="topo-dia">
              <div class="data-dia">${semana}, ${dataFmt}</div>
              <div class="carta"><strong>${carta}</strong><div class="thumb"></div></div>
            </div>
            <div class="label">Mensagem de Mariah</div>
            <div class="linhas" contenteditable data-field="mensagem">✨ Acredite na sua luz e siga com amor. ✨</div>
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

  // adiciona ao HTML
  elPaginas.innerHTML = out.join("");

  // restaura conteúdo salvo
  elPaginas.querySelectorAll("[contenteditable]").forEach(el=>{
    const page = el.closest(".pagina");
    const [, m, d] = page.dataset.date.match(/-(\d+)-(\d+)/);
    const key = storageKey(2026, m, d, el.dataset.field);
    const saved = localStorage.getItem(key);
    if(saved) el.innerHTML = saved;
    el.addEventListener("input",()=>localStorage.setItem(key,el.innerHTML));
  });

  // clique nos meses
  elMeses.addEventListener("click", e=>{
    const b = e.target.closest(".mes");
    if(!b) return;
    document.getElementById(`mes-${+b.dataset.mes+1}`)?.scrollIntoView({behavior:"smooth"});
    document.querySelectorAll(".mes").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
  });

  // botão topo
  if(btnTopo) btnTopo.onclick = ()=> elPaginas.scrollTo({top:0,behavior:"smooth"});

  // botão mês atual
  if(btnMesAtual) btnMesAtual.onclick = ()=>{
    const hoje = new Date();
    const mesIndex = hoje.getFullYear()===2026 ? hoje.getMonth() : 0;
    document.getElementById(`mes-${mesIndex+1}`)?.scrollIntoView({behavior:"smooth"});
    document.querySelectorAll(".mes").forEach((b,i)=>b.classList.toggle("active", i===mesIndex));
  };

  // botão imprimir
  if(btnImprimir) btnImprimir.onclick = ()=>{
    alert("💫 Dica: ative 'Imprimir plano de fundo' e escolha tamanho A5 antes de salvar o PDF.");
    window.print();
  };

  // marca o primeiro mês ativo
  document.querySelector(".mes")?.classList.add("active");
});
