import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

const ROWS = 15;
const COLS = 22;

// Assentos para cadeirantes (últimas 2 fileiras, colunas 0, 1, 20, 21)
const WHEELCHAIR_SEATS = [];
for (let row = ROWS - 2; row < ROWS; row++) {
  [0, 1, 20, 21].forEach(col => WHEELCHAIR_SEATS.push(`${row}-${col}`));
}

function SeatSelection() {
  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const horario = (location.state && location.state.horario) || '18:00';

  const [selected, setSelected] = useState([]);
  const [showNumbers, setShowNumbers] = useState(true);
  const [occupied, setOccupied] = useState([]);

  // Chave única para cada filme e horário
  const storageKey = `occupiedSeats_${id}_${horario}`;

  // Carrega assentos ocupados do localStorage ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) setOccupied(JSON.parse(stored));
    else setOccupied([
      '0-0', '0-1', '2-5', '5-10', '7-15', '10-20', '14-21', '13-0', '12-5', '11-10'
    ]);
    // eslint-disable-next-line
  }, [storageKey]);

  const toggleSeat = (row, col) => {
    const seatId = `${row}-${col}`;
    if (occupied.includes(seatId)) return;
    setSelected(prev =>
      prev.includes(seatId)
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handleConfirm = () => {
    const newOccupied = [...occupied, ...selected];
    localStorage.setItem(storageKey, JSON.stringify(newOccupied));
    history.push({
      pathname: '/pagamento',
      state: { seats: selected, horario, filmeId: id }
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #111 60%, #222 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem'
    }}>
      <h2 style={{
        color: '#FFD700',
        marginBottom: '2rem',
        letterSpacing: '1px',
        fontSize: '2rem',
        textShadow: '2px 2px 8px #000'
      }}>
        Escolha seu assento
      </h2>
      <button
        onClick={() => setShowNumbers(v => !v)}
        style={{
          marginBottom: '1.5rem',
          background: '#FFD700',
          color: '#222',
          border: 'none',
          borderRadius: '8px',
          padding: '0.5rem 1.2rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 2px 8px #0006'
        }}
      >
        {showNumbers ? 'Ocultar Números' : 'Mostrar Números'}
      </button>
      <div style={{
        background: '#222',
        padding: '2.5rem 2rem 2rem 2rem',
        borderRadius: '18px',
        boxShadow: '0 8px 32px #000a',
        display: 'inline-block',
        minWidth: 320,
        maxWidth: '100vw',
        overflowX: 'auto'
      }}>
        <div style={{
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: '#FFD700',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          letterSpacing: '2px',
          borderBottom: '2px solid #FFD700',
          paddingBottom: '0.5rem'
        }}>
          Tela
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          {[...Array(ROWS)].map((_, row) => (
            <div key={row} style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.4rem' }}>
              {[...Array(COLS)].map((_, col) => {
                const seatId = `${row}-${col}`;
                const isSelected = selected.includes(seatId);
                const isOccupied = occupied.includes(seatId);
                const isWheelchair = WHEELCHAIR_SEATS.includes(seatId);

                let content = '';
                if (isWheelchair) content = '🦽';
                else if (isOccupied) content = '❌';
                else if (showNumbers) content = `${String.fromCharCode(65 + row)}${col + 1}`;

                return (
                  <button
                    key={seatId}
                    onClick={() => toggleSeat(row, col)}
                    disabled={isOccupied}
                    style={{
                      width: 32,
                      height: 32,
                      margin: 3,
                      borderRadius: 8,
                      border: isSelected ? '2px solid #FFD700' : '2px solid #333',
                      background: isOccupied ? '#444' : isWheelchair ? '#00bcd4' : isSelected ? '#FFD700' : '#333',
                      color: isOccupied ? '#fff' : isWheelchair ? '#fff' : isSelected ? '#222' : '#fff',
                      cursor: isOccupied ? 'not-allowed' : 'pointer',
                      fontWeight: 'bold',
                      fontSize: isWheelchair ? '1.2rem' : '0.95rem',
                      boxShadow: isSelected ? '0 2px 8px #FFD70088' : '0 2px 8px #0006',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title={
                      isWheelchair
                        ? 'Assento para cadeirante'
                        : isOccupied
                        ? 'Assento ocupado'
                        : 'Assento livre'
                    }
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <button
          onClick={handleConfirm}
          style={{
            marginTop: '1.5rem',
            width: '100%',
            background: '#FFD700',
            color: '#222',
            border: 'none',
            borderRadius: '8px',
            padding: '0.9rem',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: selected.length === 0 ? 'not-allowed' : 'pointer',
            opacity: selected.length === 0 ? 0.6 : 1,
            boxShadow: '0 2px 8px #FFD70088',
            letterSpacing: '1px'
          }}
          disabled={selected.length === 0}
        >
          Confirmar Assentos
        </button>
      </div>
      <div style={{
        marginTop: '2rem',
        color: '#FFD700',
        fontWeight: 'bold',
        fontSize: '1rem',
        textAlign: 'center'
      }}>
        Clique nos assentos para selecionar ou desselecionar.<br />
        <span style={{ color: '#00bcd4' }}>🦽 Assento para cadeirante</span> &nbsp; 
        <span style={{ color: '#fff' }}>❌ Ocupado</span>
      </div>
    </div>
  );
}

export default SeatSelection;
