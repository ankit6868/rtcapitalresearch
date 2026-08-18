import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Firm from "@/components/Firm";
import Services from "@/components/Services";
import Global from "@/components/Global";
import LHT from "@/components/LHT";
import Platform from "@/components/Platform";
import Trader from "@/components/Trader";
import Voices from "@/components/Voices";
import Insights from "@/components/Insights";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import PopupTrigger from "@/components/PopupTrigger";
import { getSettings, getNav, getFooter, getSections } from "@/lib/db";
import { DEFAULT_SETTINGS, DEFAULT_NAV, DEFAULT_FOOTER, DEFAULT_SECTIONS } from "@/lib/defaults";
import type { Settings, NavItem, FooterColumn, Section } from "@/lib/types";

export const dynamic = "force-dynamic";

async function safeLoad(): Promise<{
  settings: Settings;
  nav: NavItem[];
  footerCols: FooterColumn[];
  sections: Section[];
}> {
  try {
    const [settings, nav, footerCols, sections] = await Promise.all([
      getSettings().catch((e) => { console.error("[home] getSettings:", e?.message || e); return DEFAULT_SETTINGS; }),
      getNav().catch((e) => { console.error("[home] getNav:", e?.message || e); return DEFAULT_NAV; }),
      getFooter().catch((e) => { console.error("[home] getFooter:", e?.message || e); return DEFAULT_FOOTER; }),
      getSections().catch((e) => { console.error("[home] getSections:", e?.message || e); return DEFAULT_SECTIONS; }),
    ]);
    return { settings, nav, footerCols, sections };
  } catch (e) {
    console.error("[home] Fatal load error, using all defaults:", (e as Error)?.message || e);
    return {
      settings: DEFAULT_SETTINGS,
      nav: DEFAULT_NAV,
      footerCols: DEFAULT_FOOTER,
      sections: DEFAULT_SECTIONS,
    };
  }
}

export default async function Home() {
  const { settings, nav: navRaw, footerCols, sections } = await safeLoad();
  const nav = navRaw.filter((n) => n.visible);
  const visible = (key: string) => sections.find((s) => s.key === key)?.visible !== false;

  return (
    <>
      <Nav
        nav={nav}
        siteName={settings.siteName}
        logoPath={settings.logoPath}
        logoFallback={settings.logoFallback}
      />
      <Hero hero={settings.hero} />
      {visible("about") && <Firm />}
      {visible("services") && <Services />}
      {visible("markets") && <Global />}
      {visible("programs") && <LHT />}
      {visible("platform") && <Platform />}
      {visible("traders") && <Trader stats={settings.stats} />}
      {visible("testimonials") && <Voices />}
      {visible("insights") && <Insights />}
      {visible("faq") && <FAQ />}
      <Contact
        phoneDisplay={settings.contact.phoneDisplay}
        email={settings.contact.email}
        udaipurAddress={settings.contact.udaipurAddress}
      />
      <Footer
        siteName={settings.siteName}
        logoPath={settings.logoPath}
        logoFallback={settings.logoFallback}
        columns={footerCols}
        copyright={settings.footerText.copyright}
        disclaimer={settings.footerText.disclaimer}
      />
      <WhatsAppFab />
      <PopupTrigger enabled={settings.popup.enabled} delayMs={settings.popup.delayMs} />
    </>
  );
}
