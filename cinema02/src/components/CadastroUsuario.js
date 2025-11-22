import React, { useState } from "react";
import { db, auth } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";


export default function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSucesso(null);

    try {
      // Cria usuário no Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      // Salva os dados no Firestore, incluindo o uid do usuário criado
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        nome,
        email,
        criadoEm: new Date(),
      });
      setSucesso("Usuário cadastrado e autenticado com sucesso!");
      setNome("");
      setEmail("");
      setSenha("");      
    } catch (err) {
      setSucesso("Erro ao cadastrar: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 350, margin: "2rem auto", padding: 20, border: "1px solid #aaa", borderRadius: 8 }}>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome: <br />
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
        </label>
        <br /><br />
        <label>
          Email: <br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <br /><br />
        <label>
          Senha: <br />
          <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required minLength={6} />
        </label>
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      {sucesso && <p style={{ color: sucesso.startsWith("Usuário") ? "green" : "red", marginTop: 10 }}>{sucesso}</p>}
    </div>
  );
}