import crypto from "node:crypto";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Admin, Enquiry, FooterColumn, NavItem, Section, Settings } from "./types";
import { DEFAULT_SETTINGS, DEFAULT_SECTIONS, DEFAULT_NAV, DEFAULT_FOOTER } from "./defaults";

let client: SupabaseClient | null = null;
function sb(): SupabaseClient {
  if (client) return client;
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env var");
  client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return client;
}

function sha256(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

// Snake→camel for enquiry rows
type EnquiryRow = {
  id: string; name: string; email: string; phone: string | null;
  program: string | null; capital: string | null; message: string | null;
  source: string; status: string; created_at: string;
};
function rowToEnquiry(r: EnquiryRow): Enquiry {
  return {
    id: r.id, name: r.name, email: r.email, phone: r.phone || "",
    program: r.program || undefined, capital: r.capital || undefined,
    message: r.message || undefined,
    source: (r.source === "contact" ? "contact" : "modal"),
    status: (r.status as Enquiry["status"]),
    createdAt: r.created_at,
  };
}

export const supabaseBackend = {
  // ---------- Settings (single row id=1) ----------
  async getSettings(): Promise<Settings> {
    const { data, error } = await sb().from("settings").select("data").eq("id", 1).maybeSingle();
    if (error) throw error;
    if (!data) {
      await sb().from("settings").insert({ id: 1, data: DEFAULT_SETTINGS });
      return DEFAULT_SETTINGS;
    }
    return data.data as Settings;
  },
  async saveSettings(s: Settings) {
    const { error } = await sb().from("settings").upsert({ id: 1, data: s, updated_at: new Date().toISOString() });
    if (error) throw error;
  },

  // ---------- Sections ----------
  async getSections(): Promise<Section[]> {
    const { data, error } = await sb().from("sections").select("*").order("order", { ascending: true });
    if (error) throw error;
    if (!data || data.length === 0) {
      // seed defaults
      await sb().from("sections").insert(DEFAULT_SECTIONS);
      return DEFAULT_SECTIONS;
    }
    return data as Section[];
  },
  async saveSections(arr: Section[]) {
    // Replace-all pattern: upsert every row (keeps things simple)
    const { error } = await sb().from("sections").upsert(arr);
    if (error) throw error;
  },
  async updateSection(id: string, patch: Partial<Section>): Promise<Section | null> {
    const { data, error } = await sb().from("sections").update(patch).eq("id", id).select().maybeSingle();
    if (error) throw error;
    return (data as Section) || null;
  },
  async deleteSection(id: string) {
    const { error } = await sb().from("sections").delete().eq("id", id);
    if (error) throw error;
  },
  async addSection(input: { title?: string; key?: string; content?: Record<string, unknown> }) {
    const all = await this.getSections();
    const row: Section = {
      id: "sec-" + crypto.randomUUID().slice(0, 8),
      title: input.title || "New Section",
      key: input.key || "new-" + Date.now(),
      order: all.length + 1,
      visible: true,
      content: input.content || {},
    };
    const { error } = await sb().from("sections").insert(row);
    if (error) throw error;
  },

  // ---------- Nav (single row id=1, jsonb array of items) ----------
  async getNav(): Promise<NavItem[]> {
    const { data, error } = await sb().from("nav").select("items").eq("id", 1).maybeSingle();
    if (error) throw error;
    if (!data) {
      await sb().from("nav").insert({ id: 1, items: DEFAULT_NAV });
      return DEFAULT_NAV;
    }
    return data.items as NavItem[];
  },
  async saveNav(arr: NavItem[]) {
    const { error } = await sb().from("nav").upsert({ id: 1, items: arr, updated_at: new Date().toISOString() });
    if (error) throw error;
  },

  // ---------- Footer (single row id=1, jsonb array of columns) ----------
  async getFooter(): Promise<FooterColumn[]> {
    const { data, error } = await sb().from("footer").select("columns").eq("id", 1).maybeSingle();
    if (error) throw error;
    if (!data) {
      await sb().from("footer").insert({ id: 1, columns: DEFAULT_FOOTER });
      return DEFAULT_FOOTER;
    }
    return data.columns as FooterColumn[];
  },
  async saveFooter(arr: FooterColumn[]) {
    const { error } = await sb().from("footer").upsert({ id: 1, columns: arr, updated_at: new Date().toISOString() });
    if (error) throw error;
  },

  // ---------- Enquiries ----------
  async getEnquiries(): Promise<Enquiry[]> {
    const { data, error } = await sb().from("enquiries").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data as EnquiryRow[]).map(rowToEnquiry);
  },
  async addEnquiry(e: Omit<Enquiry, "id" | "createdAt" | "status">): Promise<Enquiry> {
    const { data, error } = await sb().from("enquiries").insert({
      name: e.name, email: e.email, phone: e.phone,
      program: e.program, capital: e.capital, message: e.message,
      source: e.source, status: "new",
    }).select().single();
    if (error) throw error;
    return rowToEnquiry(data as EnquiryRow);
  },
  async updateEnquiry(id: string, patch: Partial<Enquiry>): Promise<Enquiry | null> {
    // Enquiry patch might include createdAt (camelCase) — strip that; not editable
    const dbPatch: Record<string, unknown> = {};
    if (patch.status) dbPatch.status = patch.status;
    if (patch.name !== undefined) dbPatch.name = patch.name;
    if (patch.email !== undefined) dbPatch.email = patch.email;
    if (patch.phone !== undefined) dbPatch.phone = patch.phone;
    if (patch.program !== undefined) dbPatch.program = patch.program;
    if (patch.message !== undefined) dbPatch.message = patch.message;
    const { data, error } = await sb().from("enquiries").update(dbPatch).eq("id", id).select().maybeSingle();
    if (error) throw error;
    return data ? rowToEnquiry(data as EnquiryRow) : null;
  },
  async deleteEnquiry(id: string) {
    const { error } = await sb().from("enquiries").delete().eq("id", id);
    if (error) throw error;
  },

  // ---------- Admin ----------
  async getAdmin(): Promise<Admin> {
    const { data, error } = await sb().from("admin").select("username, password_hash").eq("id", 1).maybeSingle();
    if (error) throw error;
    if (!data) {
      const seed = { username: "admin", passwordHash: sha256("admin123") };
      await sb().from("admin").insert({ id: 1, username: seed.username, password_hash: seed.passwordHash });
      return seed;
    }
    return { username: data.username, passwordHash: data.password_hash };
  },
  async verifyAdmin(username: string, password: string): Promise<boolean> {
    const a = await this.getAdmin();
    return a.username === username && a.passwordHash === sha256(password);
  },
  async updatePassword(newPassword: string) {
    const { error } = await sb().from("admin").upsert({ id: 1, username: "admin", password_hash: sha256(newPassword), updated_at: new Date().toISOString() });
    if (error) throw error;
  },
};
