import React, { useState } from "react";
import { supabase } from "../services/supabase";
import "./CadastroUsuario.css"; // Importação do CSS

export default function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(null);
  const [tipo, setTipo] = useState("cliente");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSucesso(null);

    try {
      // Cria usuário no Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: { nome, tipo }
        }
      });
      if (error) throw error;

      // Salva os dados do usuário na tabela 'users'
      const { user } = data;
      await supabase.from("users").insert([
        {
          uid: user?.id,
          nome,
          email,
          tipo,
          criadoEm: new Date().toISOString(),
        }
      ]);
      setSucesso("Usuário cadastrado e autenticado com sucesso!");
      setNome("");
      setEmail("");
      setSenha("");
    } catch (err) {
      setSucesso("Erro ao cadastrar: " + (err.message || err.error_description));
    }
    setLoading(false);
  };

  return (
    <div className="cadastro-container">
      <h2 className="cadastro-titulo">Cadastro de Usuário</h2>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <label className="cadastro-label">
          Nome: <br />
          <input className="cadastro-input" type="text" value={nome} onChange={e => setNome(e.target.value)} required />
        </label>
        <br /><br />
        <label className="cadastro-label">
          Email: <br />
          <input className="cadastro-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <br /><br />
        <label className="cadastro-label">
          Senha: <br />
          <input className="cadastro-input" type="password" value={senha} onChange={e => setSenha(e.target.value)} required minLength={6} />
        </label>
        <br /><br />
        <label className="cadastro-label">
          Você é:
          <select
            className="cadastro-input"
            value={tipo}
            onChange={e => setTipo(e.target.value)}
            required
            style={{ color: "#222" }}
          >
            <option value="cliente">Cliente / Comprador</option>
            <option value="produtor">Produtor</option>
          </select>
        </label>
        <br /><br />
        <button className="cadastro-botao" type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      {sucesso && <p className={`cadastro-msg ${sucesso.startsWith("Usuário") ? "sucesso" : "erro"}`}>{sucesso}</p>}
    </div>
  );
}