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
export const revalidate = 0;
export const fetchCache = "force-no-store";

async function safeLoad(): Promise<{
  settings: Settings;
  nav: NavItem[];
  footerCols: FooterColumn[];
  sections: Section[];
}> {
  const [settings, nav, footerCols, sections] = await Promise.all([
    getSettings().catch((e) => { console.error("[home] getSettings:", e?.message || e); return DEFAULT_SETTINGS; }),
    getNav().catch((e) => { console.error("[home] getNav:", e?.message || e); return DEFAULT_NAV; }),
    getFooter().catch((e) => { console.error("[home] getFooter:", e?.message || e); return DEFAULT_FOOTER; }),
    getSections().catch((e) => { console.error("[home] getSections:", e?.message || e); return DEFAULT_SECTIONS; }),
  ]);
  return { settings, nav, footerCols, sections };
}

function sectionContent(sections: Section[], key: string): Record<string, unknown> {
  return (sections.find((s) => s.key === key)?.content as Record<string, unknown>) || {};
}
function isVisible(sections: Section[], key: string): boolean {
  return sections.find((s) => s.key === key)?.visible !== false;
}

export default async function Home() {
  const { settings, nav: navRaw, footerCols, sections } = await safeLoad();
  const nav = navRaw.filter((n) => n.visible);

  return (
    <>
      <Nav
        nav={nav}
        siteName={settings.siteName}
        logoPath={settings.logoPath}
        logoFallback={settings.logoFallback}
      />
      <Hero hero={settings.hero} />
      {isVisible(sections, "about")        && <Firm     content={sectionContent(sections, "about")} />}
      {isVisible(sections, "services")     && <Services content={sectionContent(sections, "services")} />}
      {isVisible(sections, "markets")      && <Global   content={sectionContent(sections, "markets")} />}
      {isVisible(sections, "programs")     && <LHT      content={sectionContent(sections, "programs")} />}
      {isVisible(sections, "platform")     && <Platform content={sectionContent(sections, "platform")} />}
      {isVisible(sections, "traders")      && <Trader   stats={settings.stats} content={sectionContent(sections, "traders")} />}
      {isVisible(sections, "testimonials") && <Voices   content={sectionContent(sections, "testimonials")} />}
      {isVisible(sections, "insights")     && <Insights content={sectionContent(sections, "insights")} />}
      {isVisible(sections, "faq")          && <FAQ      content={sectionContent(sections, "faq")} />}
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
      <WhatsAppFab href={settings.contact.whatsappUrl || "https://wa.link/kw5nmi"} />
      <PopupTrigger enabled={settings.popup.enabled} delayMs={settings.popup.delayMs} />
    </>
  );
}
