// src/pages/Faq.js
import { useState, useMemo, useEffect } from "react";

export default function Faq() {
  const IMAGE_URL = "/mnt/data/2ad39373-d115-413a-b891-24fbd4200650.png";

  const initialFaqs = [
    { id: 1, q: "Como eu crio uma conta no servidor?", a: "Para criar uma conta, acesse a tela de registro no menu principal, informe e-mail, nome e senha. Verifique seu e-mail para ativar a conta.", category: "Conta" },
    { id: 2, q: "Quais são as regras básicas do servidor?", a: "Respeite outros jogadores, não use cheats, não faça spam e siga as diretrizes do roleplay. Violações podem resultar em banimento.", category: "Regras" },
    { id: 3, q: "Como reporto um erro (bug)?", a: "Abra um ticket no Discord do servidor com título, descrição e passos para reproduzir o bug. Anexe prints se possível.", category: "Suporte" },
    { id: 4, q: "Posso transferir itens entre jogadores?", a: "Sim, há um sistema de trocas. Evite escambo que viole regras de economia; operações suspeitas podem ser revertidas.", category: "Jogabilidade" },
    { id: 5, q: "Como altero o nome do meu personagem?", a: "O nome pode ser alterado através do painel de usuário uma vez a cada 30 dias mediante custo em moeda do jogo.", category: "Conta" },
    { id: 6, q: "O que é metagaming e por que é proibido?", a: "Metagaming é usar informações externas ao jogo para benefício dentro do jogo. Prejudica a imersão e por isso é proibido.", category: "Regras" },
  ];

  const [faqs, setFaqs] = useState(initialFaqs);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [openId, setOpenId] = useState(null);

  const categories = useMemo(() => {
    const s = new Set(faqs.map((f) => f.category));
    return ["all", ...Array.from(s).sort()];
  }, [faqs]);

  function handleToggle(id) {
    // **Corrigido**: retornar null quando já está aberto, senão abrir o id
    setOpenId((prev) => (prev === id ? null : id));
  }

  function filteredFaqs() {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const text = `${f.q} ${f.a} ${f.category}`.toLowerCase();
      const matchesQ = q ? text.includes(q) : true;
      const matchesC = category === "all" ? true : f.category === category;
      return matchesQ && matchesC;
    });
  }

  // Expor updateFaqs de forma segura (useEffect)
  useEffect(() => {
    // define
    window.updateFaqs = (newFaqs) => {
      if (Array.isArray(newFaqs)) setFaqs(newFaqs);
    };
    // cleanup
    return () => {
      try {
        delete window.updateFaqs;
      } catch (e) {}
    };
  }, []);

  return (
    <main className="container" aria-labelledby="faq-title">
      <header className="header">
        <div className="hero">
          <h1 id="faq-title">Central de Ajuda — Perguntas Frequentes</h1>
          <p className="lead">Encontre respostas rápidas sobre o servidor, regras e como começar.</p>
        </div>
        <div className="heroImageWrap" aria-hidden>
          <img src={IMAGE_URL} alt="ilustração FAQ" />
        </div>
      </header>

      <section className="controls" aria-label="controles do faq">
        <div className="search">
          <label htmlFor="q" className="small">Pesquisar</label>
          <input id="q" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Digite uma pergunta ou palavra-chave" aria-label="Pesquisar FAQ" />
        </div>

        <div className="selectWrap">
          <label htmlFor="cat" className="small">Categoria</label>
          <select id="cat" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>{c === "all" ? "Todas as categorias" : c}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="faqGrid">
        <div className="list" id="faqList" aria-live="polite">
          <div className="accordion" role="list">
            {filteredFaqs().length === 0 ? (
              <p className="noResults">Nenhum resultado encontrado.</p>
            ) : (
              filteredFaqs().map((item) => (
                <article key={item.id} className={`item ${openId === item.id ? "open" : ""}`} role="listitem">
                  <button className="trigger" onClick={() => handleToggle(item.id)} aria-expanded={openId === item.id} aria-controls={`panel-${item.id}`}>
                    <div className="qwrap">
                      <div className="question">{item.q}</div>
                      <div className="meta">Categoria: {item.category}</div>
                    </div>
                    <svg className="chev" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 6l6 6-6 6" />
                    </svg>
                  </button>

                  <div id={`panel-${item.id}`} className="panel" role="region">
                    <p>{item.a}</p>
                  </div>
                </article>
              ))
            )}
          </div>

          <div className="footer">
            Ainda com dúvida? <a className="link" href="#contact">Contate-nos</a>.
          </div>
        </div>

        <aside className="sidebar" aria-label="sidebar de categorias">
          <div className="card">
            <h3 style={{ margin: 0 }}>Categorias</h3>
            <div className="tags">
              {categories.filter(c => c !== "all").map((c) => (
                <button key={c} className={`tag ${category === c ? "active" : ""}`} type="button" onClick={() => setCategory(category === c ? "all" : c)}>
                  {c}
                </button>
              ))}
            </div>

            <hr />
            <p className="small">Use a pesquisa ou clique em uma categoria para filtrar as perguntas.</p>
          </div>
        </aside>
      </section>

      <style jsx>{`
        :root {
          --bg: #0f1724;
          --card: #0b1220;
          --muted: #9aa4b2;
          --accent: #7c3aed;
          --glass: rgba(255,255,255,0.03);
          --radius: 12px;
        }
          
        .container { max-width: 980px; margin: 32px auto; padding: 20px; color: #e6eef6; font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; background: #0f1724; min-height: 100vh; border-radius: 12px;}
        .header { display: flex; align-items: center; gap: 16px; margin-bottom: 18px; }
        .hero { flex: 1; }
        .heroImageWrap { width: 110px; height: 70px; display: flex; align-items: center; justify-content: center; }
        .heroImageWrap img { max-width: 100%; max-height: 70px; border-radius: 8px; object-fit: cover; border: 1px solid rgba(255,255,255,0.04); }
        h1 { margin: 0; font-size: 1.6rem; }
        .lead { margin: 4px 0 0 0; color: var(--muted); }
        .controls { display: flex; gap: 12px; margin: 18px 0; flex-wrap: wrap; }
        .search { flex: 1; min-width: 220px; }
        input[type="search"], select { width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.06); background: var(--glass); color: inherit; font-size: 0.95rem; }
        .selectWrap { width: 220px; }
        .faqGrid { display: grid; grid-template-columns: 1fr 340px; gap: 20px; }
        @media (max-width: 900px) { .faqGrid { grid-template-columns: 1fr; } .heroImageWrap { display: none; } }
        .list { background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent); padding: 14px; border-radius: var(--radius); border: 1px solid rgba(255,255,255,0.04); }
        .accordion { border-radius: 8px; overflow: hidden; }
        .item { border-top: 1px solid rgba(255,255,255,0.03); }
        .trigger { display: flex; justify-content: space-between; align-items: center; padding: 14px; cursor: pointer; width: 100%; background: none; border: none; text-align: left; color: inherit; }
        .trigger:focus { outline: 3px solid rgba(124,58,237,0.12); border-radius: 8px; }
        .qwrap { display:flex; flex-direction: column; align-items: flex-start; gap: 6px; }
        .question { font-weight: 600; }
        .meta { font-size: 0.85rem; color: var(--muted); }
        .chev { transition: transform .25s ease; opacity: 0.9; }
        .panel { padding: 0 14px 16px 14px; color: var(--muted); line-height: 1.6; max-height: 0; overflow: hidden; transition: max-height .32s ease; }
        .item.open .panel { max-height: 400px; }
        .item.open .chev { transform: rotate(90deg); }
        .sidebar .card { padding: 14px; border-radius: var(--radius); background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent); border: 1px solid rgba(255,255,255,0.04); }
        .tags { margin-top: 8px; display:flex; flex-wrap:wrap; gap:8px; }
        .tag { display:inline-block; padding:6px 10px; border-radius:999px; margin:6px 0 0 0; background: rgba(255,255,255,0.03); cursor:pointer; border: none; }
        .tag.active { background: linear-gradient(90deg, var(--accent), #4f46e5); color: white; }
        .small { font-size: 0.85rem; color: var(--muted); }
        .footer { margin-top: 18px; color: var(--muted); font-size: 0.9rem; }
        .link { color: var(--accent); text-decoration: none; }
        .noResults { padding: 12px; color: var(--muted); }
      `}</style>
    </main>
  );
}
