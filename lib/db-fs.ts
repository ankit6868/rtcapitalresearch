import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { Admin, Enquiry, FooterColumn, NavItem, Section, Settings } from "./types";
import { DEFAULT_SETTINGS, DEFAULT_SECTIONS, DEFAULT_NAV, DEFAULT_FOOTER } from "./defaults";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}
function file(name: string) {
  return path.join(DATA_DIR, name + ".json");
}
function read<T>(name: string, fallback: T): T {
  ensureDir();
  const p = file(name);
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, JSON.stringify(fallback, null, 2), "utf8");
    return fallback;
  }
  try {
    return JSON.parse(fs.readFileSync(p, "utf8")) as T;
  } catch {
    return fallback;
  }
}
function write<T>(name: string, data: T) {
  ensureDir();
  fs.writeFileSync(file(name), JSON.stringify(data, null, 2), "utf8");
}
function sha256(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

export const fsBackend = {
  async getSettings(): Promise<Settings> { return read("settings", DEFAULT_SETTINGS); },
  async saveSettings(s: Settings) { write("settings", s); },

  async getSections(): Promise<Section[]> { return read("sections", DEFAULT_SECTIONS); },
  async saveSections(arr: Section[]) { write("sections", arr); },
  async updateSection(id: string, patch: Partial<Section>): Promise<Section | null> {
    const all = read<Section[]>("sections", DEFAULT_SECTIONS);
    const i = all.findIndex((s) => s.id === id);
    if (i < 0) return null;
    all[i] = { ...all[i], ...patch };
    write("sections", all);
    return all[i];
  },
  async deleteSection(id: string) {
    write("sections", read<Section[]>("sections", DEFAULT_SECTIONS).filter((s) => s.id !== id));
  },
  async addSection(input: { title?: string; key?: string; content?: Record<string, unknown> }) {
    const all = read<Section[]>("sections", DEFAULT_SECTIONS);
    all.push({
      id: "sec-" + crypto.randomUUID().slice(0, 8),
      title: input.title || "New Section",
      key: input.key || "new-" + Date.now(),
      order: all.length + 1,
      visible: true,
      content: input.content || {},
    });
    write("sections", all);
  },

  async getNav(): Promise<NavItem[]> { return read("nav", DEFAULT_NAV); },
  async saveNav(arr: NavItem[]) { write("nav", arr); },

  async getFooter(): Promise<FooterColumn[]> { return read("footer", DEFAULT_FOOTER); },
  async saveFooter(arr: FooterColumn[]) { write("footer", arr); },

  async getEnquiries(): Promise<Enquiry[]> {
    return read<Enquiry[]>("enquiries", []).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  async addEnquiry(e: Omit<Enquiry, "id" | "createdAt" | "status">): Promise<Enquiry> {
    const all = read<Enquiry[]>("enquiries", []);
    const rec: Enquiry = { ...e, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: "new" };
    all.unshift(rec);
    write("enquiries", all);
    return rec;
  },
  async updateEnquiry(id: string, patch: Partial<Enquiry>): Promise<Enquiry | null> {
    const all = read<Enquiry[]>("enquiries", []);
    const i = all.findIndex((x) => x.id === id);
    if (i < 0) return null;
    all[i] = { ...all[i], ...patch };
    write("enquiries", all);
    return all[i];
  },
  async deleteEnquiry(id: string) {
    write("enquiries", read<Enquiry[]>("enquiries", []).filter((x) => x.id !== id));
  },

  async getAdmin(): Promise<Admin> {
    return read("admin", { username: "admin", passwordHash: sha256("admin123") });
  },
  async verifyAdmin(username: string, password: string): Promise<boolean> {
    const a = read<Admin>("admin", { username: "admin", passwordHash: sha256("admin123") });
    return a.username === username && a.passwordHash === sha256(password);
  },
  async updatePassword(newPassword: string) {
    const a = read<Admin>("admin", { username: "admin", passwordHash: sha256("admin123") });
    write("admin", { ...a, passwordHash: sha256(newPassword) });
  },
};
