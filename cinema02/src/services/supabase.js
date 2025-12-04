import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://aeictdrnigagnwjhcbii.supabase.co';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaWN0ZHJuaWdhZ253amhjYmlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MDU1MzAsImV4cCI6MjA4MDA4MTUzMH0.7DasVfHzKTfeyCEGZv5k6itMFw7gjnKCTFk28GldW3A';

// define explicit schema 'public' (evita ambiguidades / cache)
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  db: { schema: 'public' }
});

// helper opcional para debug: lista algumas tabelas/rows
export async function testeConexao() {
  try {
    // tenta selecionar uma linha qualquer da tabela profiles para validar
    const { data, error } = await supabase.from('profiles').select('id').limit(1);
    if (error) {
      console.error('testeConexao error:', error);
      return { ok: false, error };
    }
    return { ok: true, data };
  } catch (err) {
    console.error('testeConexao exception:', err);
    return { ok: false, error: err };
  }
}
