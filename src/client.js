import { createClient } from '@supabase/supabase-js';

const URL = 'https://hdmipoljhopeiagwhaso.supabase.co';
const API_KEY = 'sb_publishable_py6F671RzC4wnee4l0rItw_z82cZLug';

export const supabase = createClient(URL, API_KEY);