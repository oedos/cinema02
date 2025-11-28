import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ROWS = 5;
const COLS = 8;

export default function SelecionarCadeira() {
  const { filmeId, shopping, horario } = useParams();
  const [selecionada, setSelecionada] = useState(null);
  const navigate = useNavigate();

  function handleSelecionar(row, col) {
    setSelecionada(`${String.fromCharCode(65 + row)}${col + 1}`);
  }

  function handleConfirmar() {
    alert(`Cadeira selecionada: ${selecionada}\nFilme: ${filmeId}\nShopping: ${decodeURIComponent(shopping)}\nHorário: ${horario}`);
    navigate(-1);
  }

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", background: "#232323", borderRadius: 14, padding: 24, color: "#fff", boxShadow: "0 4px 18px #000a" }}>
      <h2 style={{ color: "#ffd700", textAlign: "center" }}>Selecione sua cadeira</h2>
      <div style={{ margin: "1.2rem 0", textAlign: "center" }}>
        <b>Shopping:</b> {decodeURIComponent(shopping)}<br />
        <b>Horário:</b> {horario}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${COLS}, 32px)`, gap: "10px", justifyContent: "center", margin: "1.5rem 0" }}>
        {[...Array(ROWS)].map((_, row) =>
          [...Array(COLS)].map((_, col) => {
            const code = `${String.fromCharCode(65 + row)}${col + 1}`;
            return (
              <button
                key={code}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  border: selecionada === code ? "2px solid #a1072e" : "1.2px solid #ffd700",
                  background: selecionada === code ? "#ffd700" : "#1d1d1d",
                  color: selecionada === code ? "#a1072e" : "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}
                onClick={() => handleSelecionar(row, col)}
              >
                {code}
              </button>
            );
          })
        )}
      </div>
      <button
        style={{
          width: "100%",
          padding: "12px 0",
          borderRadius: 8,
          background: selecionada ? "linear-gradient(90deg, #a1072e 60%, #ffd700 100%)" : "#888",
          color: selecionada ? "#fff" : "#eee",
          fontWeight: "bold",
          fontSize: "1.08rem",
          border: "none",
          cursor: selecionada ? "pointer" : "not-allowed",
          marginTop: 10
        }}
        disabled={!selecionada}
        onClick={handleConfirmar}
      >
        Confirmar cadeira
      </button>
    </div>
  );
}
