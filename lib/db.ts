import { fsBackend } from "./db-fs";
import { supabaseBackend } from "./db-supabase";

// Auto-select backend: Supabase if env vars are present, otherwise local JSON files.
const useSupabase = !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
const backend = useSupabase ? supabaseBackend : fsBackend;

export const dbBackend: "supabase" | "fs" = useSupabase ? "supabase" : "fs";

export const getSettings   = () => backend.getSettings();
export const saveSettings  = (s: Parameters<typeof fsBackend.saveSettings>[0]) => backend.saveSettings(s);

export const getSections   = () => backend.getSections();
export const saveSections  = (arr: Parameters<typeof fsBackend.saveSections>[0]) => backend.saveSections(arr);
export const addSection    = (input: Parameters<typeof fsBackend.addSection>[0]) => backend.addSection(input);
export const updateSection = (id: string, patch: Parameters<typeof fsBackend.updateSection>[1]) => backend.updateSection(id, patch);
export const deleteSection = (id: string) => backend.deleteSection(id);

export const getNav        = () => backend.getNav();
export const saveNav       = (arr: Parameters<typeof fsBackend.saveNav>[0]) => backend.saveNav(arr);

export const getFooter     = () => backend.getFooter();
export const saveFooter    = (arr: Parameters<typeof fsBackend.saveFooter>[0]) => backend.saveFooter(arr);

export const getEnquiries  = () => backend.getEnquiries();
export const addEnquiry    = (e: Parameters<typeof fsBackend.addEnquiry>[0]) => backend.addEnquiry(e);
export const updateEnquiry = (id: string, patch: Parameters<typeof fsBackend.updateEnquiry>[1]) => backend.updateEnquiry(id, patch);
export const deleteEnquiry = (id: string) => backend.deleteEnquiry(id);

export const getAdmin      = () => backend.getAdmin();
export const verifyAdmin   = (u: string, p: string) => backend.verifyAdmin(u, p);
export const updatePassword= (p: string) => backend.updatePassword(p);
