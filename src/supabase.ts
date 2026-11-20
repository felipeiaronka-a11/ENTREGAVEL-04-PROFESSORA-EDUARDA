import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xrzrhnafwcwbbsvcozvx.supabase.co";
const supabaseAnonKey = "sb_publishable_-onKBzre_HIyB-9D0v0oGQ_MvD9urty";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
