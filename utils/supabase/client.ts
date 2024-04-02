import { createClient } from "@supabase/supabase-js";

import type { Database } from "./type/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
