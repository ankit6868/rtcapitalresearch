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

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, navRaw, footerCols, sections] = await Promise.all([
    getSettings(),
    getNav(),
    getFooter(),
    getSections(),
  ]);
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
