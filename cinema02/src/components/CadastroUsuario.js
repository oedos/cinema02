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

  // validação simples de email
  function validateEmail(value) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSucesso(null);

    // normaliza e valida o email
    const emailNormalized = email.trim().toLowerCase();
    if (!validateEmail(emailNormalized)) {
      setSucesso("Email inválido. Verifique e tente novamente.");
      setLoading(false);
      return;
    }

    try {
      // 1) cria usuário no Auth (envia email de confirmação conforme config do Supabase)
      const { data, error: signUpError } = await supabase.auth.signUp(
        { email: emailNormalized, password: senha },
        { data: { nome, tipo } } // metadata opcional
      );
      if (signUpError) throw signUpError;

      // usuário recém-criado (pode estar em data.user dependendo da versão)
      const userId = data?.user?.id || data?.id || null;

      // 2) salva perfil na tabela 'profiles' (use id = userId) — crie a tabela profiles no Supabase
      if (userId) {
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            id: userId,
            nome,
            email: emailNormalized,
            tipo,
            created_at: new Date().toISOString(),
          },
        ]);
        if (insertError) throw insertError;
      }

      setSucesso("Usuário cadastrado com sucesso! Verifique seu e-mail, se for necessário confirmar.");
      setNome("");
      setEmail("");
      setSenha("");
    } catch (err) {
      // mostra mensagem mais explícita
      setSucesso("Erro ao cadastrar: " + (err.message || JSON.stringify(err)));
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