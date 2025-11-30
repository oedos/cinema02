import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
import "./ProfilePage.css";

// Use o mesmo UID fixo do exemplo
const userUID = "OQXhNyiUgQgHpS1lwm7E68PTr083";

export default function EditProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState("cliente");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("uid", userUID)
          .single();
        if (data) {
          setUserProfile(data);
          setNome(data.nome || "");
          setEmail(data.email || "");
          setTipo(data.tipo || "cliente");
        }
      } catch (err) {
        setMsg("Erro ao carregar perfil.");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    if (!userProfile?.uid) return;
    try {
      const { error } = await supabase
        .from("users")
        .update({ nome, email, tipo })
        .eq("uid", userProfile.uid);
      if (error) throw error;
      setMsg("Perfil atualizado com sucesso!");
    } catch (err) {
      setMsg("Erro ao atualizar perfil.");
    }
  }

  if (loading) return <div>Carregando...</div>;
  if (!userProfile) return <div>Perfil não encontrado.</div>;

  return (
    <div className="profilepage-bg">
      <div className="profilepage-container">
        <h1 className="profilepage-title">Editar Perfil</h1>
        <form className="profilepage-form" onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Tipo:
            <select value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="cliente">Cliente / Comprador</option>
              <option value="produtor">Produtor</option>
            </select>
          </label>
          <div style={{marginTop: 20, display: "flex", gap: 10}}>
            <button className="profilepage-editbtn" type="submit">Salvar</button>
            <button className="profilepage-logoutbtn" type="button" onClick={() => navigate(-1)}>Cancelar</button>
          </div>
        </form>
        {msg && <div style={{marginTop: 10, color: msg.startsWith("Perfil atualizado") ? "green" : "red"}}>{msg}</div>}
      </div>
    </div>
  );
}
