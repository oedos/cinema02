import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
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
        const q = query(collection(db, "users"), where("uid", "==", userUID));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0];
          setUserProfile({ ...docData.data(), docId: docData.id });
          setNome(docData.data().nome || "");
          setEmail(docData.data().email || "");
          setTipo(docData.data().tipo || "cliente");
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
    if (!userProfile?.docId) return;
    try {
      const userRef = doc(db, "users", userProfile.docId);
      await updateDoc(userRef, { nome, email, tipo });
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
