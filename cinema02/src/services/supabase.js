import { createClient } from '@supabase/supabase-js';

// Substitua pelos valores do seu projeto Supabase
const SUPABASE_URL = 'https://aeictdrnigagnwjhcbii.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaWN0ZHJuaWdhZ253amhjYmlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MDU1MzAsImV4cCI6MjA4MDA4MTUzMH0.7DasVfHzKTfeyCEGZv5k6itMFw7gjnKCTFk28GldW3A';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Agora você pode usar `supabase` para autenticação, banco e storage
