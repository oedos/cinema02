import React, { useState } from "react";
import { supabase } from "../services/supabase"; // troque para supabase
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
      if (error) {
        setErro("Email ou senha inválidos.");
      } else {
        setErro(null);
        navigate("/home"); // Redireciona para Home ao logar com sucesso
      }
    } catch (error) {
      setErro("Erro ao fazer login.");
    }
    setLoading(false);
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <h2 className="login-title">🎬 Login no Cinema</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label>
            Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>
            Senha:
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
          </label>
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <button type="button" className="login-btn" style={{ background: "#222", color: "#dab300", marginTop: "12px" }} onClick={() => navigate("/cadastro")}>Criar conta
         </button>
        </form>
        {erro && <div className="login-error">{erro}</div>}
      </div>
    </div>
  );
}