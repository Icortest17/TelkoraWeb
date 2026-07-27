const { createClient } = require('@supabase/supabase-js');

let client;

function getSupabase() {
  if (!client) {
    client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
    });
  }
  return client;
}

module.exports = { getSupabase };
