import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// captura erros de chunk e tenta recuperar automaticamente
window.addEventListener('unhandledrejection', async (event) => {
  const reason = event.reason || {};
  const msg = (reason && (reason.message || reason.stack)) || '';
  if (msg && msg.toString().includes('Loading chunk')) {
    console.warn('ChunkLoadError detectado — limpando SW/cache e recarregando página...');
    try {
      // unregister service workers
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        for (const r of regs) await r.unregister();
      }
      // clear caches
      if (window.caches) {
        const names = await caches.keys();
        await Promise.all(names.map(n => caches.delete(n)));
      }
    } catch (e) {
      console.error('Erro ao limpar cache/SW:', e);
    }
    // reload
    window.location.reload(true);
  }
});