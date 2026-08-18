import { fsBackend } from "./db-fs";
import { supabaseBackend } from "./db-supabase";

/**
 * Backend selection is done PER CALL (not at module init) so that env vars
 * added late in the request lifecycle are picked up correctly, and so the
 * choice always reflects the current environment.
 */
function pickBackend() {
  const useSupabase = !!(
    (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  return useSupabase ? supabaseBackend : fsBackend;
}

export function currentBackend(): "supabase" | "fs" {
  return pickBackend() === supabaseBackend ? "supabase" : "fs";
}

export const getSettings   = () => pickBackend().getSettings();
export const saveSettings  = (s: Parameters<typeof fsBackend.saveSettings>[0]) => pickBackend().saveSettings(s);

export const getSections   = () => pickBackend().getSections();
export const saveSections  = (arr: Parameters<typeof fsBackend.saveSections>[0]) => pickBackend().saveSections(arr);
export const addSection    = (input: Parameters<typeof fsBackend.addSection>[0]) => pickBackend().addSection(input);
export const updateSection = (id: string, patch: Parameters<typeof fsBackend.updateSection>[1]) => pickBackend().updateSection(id, patch);
export const deleteSection = (id: string) => pickBackend().deleteSection(id);

export const getNav        = () => pickBackend().getNav();
export const saveNav       = (arr: Parameters<typeof fsBackend.saveNav>[0]) => pickBackend().saveNav(arr);

export const getFooter     = () => pickBackend().getFooter();
export const saveFooter    = (arr: Parameters<typeof fsBackend.saveFooter>[0]) => pickBackend().saveFooter(arr);

export const getEnquiries  = () => pickBackend().getEnquiries();
export const addEnquiry    = (e: Parameters<typeof fsBackend.addEnquiry>[0]) => pickBackend().addEnquiry(e);
export const updateEnquiry = (id: string, patch: Parameters<typeof fsBackend.updateEnquiry>[1]) => pickBackend().updateEnquiry(id, patch);
export const deleteEnquiry = (id: string) => pickBackend().deleteEnquiry(id);

export const getAdmin      = () => pickBackend().getAdmin();
export const verifyAdmin   = (u: string, p: string) => pickBackend().verifyAdmin(u, p);
export const updatePassword= (p: string) => pickBackend().updatePassword(p);
