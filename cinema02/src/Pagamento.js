import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Pagamento = () => {
  const [pagamento, setPagamento] = useState('');
  const navigate = useNavigate();

  const handlePagamentoChange = (e) => {
    setPagamento(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para processar o pagamento

    // Redirecionar após o pagamento
    navigate('/pagina-de-confirmacao');
  };

  return (
    <div>
      <h1>Pagamento</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Método de Pagamento:
          <select value={pagamento} onChange={handlePagamentoChange}>
            <option value="">Selecione</option>
            <option value="cartao-credito">Cartão de Crédito</option>
            <option value="paypal">PayPal</option>
            <option value="boleto">Boleto</option>
          </select>
        </label>
        <button type="submit">Pagar</button>
      </form>
    </div>
  );
};

export default Pagamento;