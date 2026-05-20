import { useEffect } from 'react';

/**
 * FAQ JSON-LD schema for /faq route.
 *
 * Renders nothing visible. On mount, injects a <script type="application/ld+json">
 * tag into <head>; removes it on unmount so Google's Rich Results Test sees
 * exactly one FAQPage schema per page.
 *
 * Single source of truth for the FAQ Q&A pairs (plain-text mirror of the
 * visual content on /faq).
 */

const faqs = [
  {
    q: 'Was ist Künstliche Intelligenz (KI) und warum ist sie für KMU relevant?',
    a: 'Künstliche Intelligenz bezeichnet IT-Systeme, die menschliche kognitive Fähigkeiten wie Lernen, logisches Schließen und Problemlösen durch Algorithmen emulieren. Für kleine und mittlere Unternehmen (KMU) ist KI der primäre Hebel zur Skalierung von Geschäftsprozessen ohne proportionalen Personalaufbau. Die drei Kernfaktoren sind: Effizienzsteigerung (Reduktion von Durchlaufzeiten um bis zu 40 %), automatisierte Analyse unstrukturierter Daten und Angleichung der operativen Leistungsfähigkeit an Großunternehmen.',
  },
  {
    q: 'Was sind die ersten Schritte zur KI-Einführung im Unternehmen?',
    a: 'Die erfolgreiche Implementierung von KI folgt einer sequenziellen Struktur von der Potenzialanalyse bis zur datenschutzkonformen Pilotierung: 1. Audit (Prozess-Mapping & Bedarfsanalyse), 2. Compliance (Datenschutz- & Risiko-Precheck inkl. DSGVO und AI Act), 3. Tool-Auswahl (Evaluation von Standard-SaaS wie ChatGPT Enterprise), 4. Enablement (Mitarbeiter-Schulung in AI Literacy und Prompt Engineering).',
  },
  {
    q: 'Wie integriert man KI-Lösungen in bestehende Geschäftsprozesse?',
    a: 'Die technische Integration von KI erfolgt primär über standardisierte Programmierschnittstellen (APIs) als Bindeglied zwischen Altsystemen (Legacy-Software) und den Modellen der KI-Anbieter. Ziel ist ein medienbruchfreier Datenfluss: Schnittstellenanalyse (API-Fähigkeit von ERP-, CRM-, DMS-Systemen), Middleware-Einsatz (iPaaS), schrittweiser Rollout in einer Sandbox und KPI-Monitoring (AHT, Fehlerrate).',
  },
  {
    q: 'Welche Prozesse eignen sich am besten für eine KI-Automatisierung?',
    a: 'Für die KI-Automatisierung eignen sich datenintensive, regelbasierte Prozesse mit strukturierten oder semistrukturierten Eingangsdaten. Konkret: Finanz- und Rechnungswesen (Intelligent Document Processing für Eingangsrechnungen), First-Level-Kundenservice über multimodale KI-Agenten, Marketing und Content-Erstellung sowie das KI-gestützte Vorfiltern von Bewerbungsunterlagen im HR (mit Einstufung nach EU AI Act).',
  },
  {
    q: 'Welche konkreten Vorteile bietet die KI-Prozessautomatisierung?',
    a: 'KI-Prozessautomatisierung eliminiert manuelle Datenübertragungsfehler, senkt operative Stückkosten und steigert die Durchlaufgeschwindigkeit rund um die Uhr. Kernmetriken: Verlagerung von bis zu 30 % der Arbeitszeit von Routinetätigkeiten hin zu strategischen Aufgaben, Reduktion humaner Fehleingaben gegen Null und Abdeckung von Lastspitzen ohne zusätzlichen Personaleinsatz.',
  },
  {
    q: 'Welche Rolle spielt RPA (Robotic Process Automation) in Kombination mit KI?',
    a: 'RPA bildet das digitale Skelett der Automatisierung, indem es menschliche Interaktionen auf Benutzeroberflächen exakt nachahmt. Erst die Symbiose aus RPA und KI (Intelligent Automation) ermöglicht die Verarbeitung unstrukturierter Daten und das Treffen variabler Entscheidungen. Klassisches RPA ist rein regelbasiert; Intelligent Automation versteht Kontext, liest Freitexte aus E-Mails, erkennt Intents und übergibt strukturierte Outputs an den RPA-Bot.',
  },
  {
    q: 'Was sind die Haupt-Herausforderungen bei der KI-Einführung und wie werden sie gelöst?',
    a: 'Die primären Barrieren sind unzureichende Datenqualität, mangelndes internes Know-how und kulturelle Vorbehalte. Lösungsansätze: zentrale Data-Governance-Richtlinien, verpflichtende KI-Literacy-Schulungen gemäß Artikel 4 EU AI Act sowie transparente Kommunikation mit Human-in-the-Loop-Garantie für Akzeptanz in der Belegschaft.',
  },
  {
    q: 'Wie lässt sich KI und Robotik in KMU kostengünstig umsetzen?',
    a: 'Die wirtschaftliche Umsetzung gelingt durch Cloud-basierte No-Code- oder Low-Code-Plattformen (SaaS), die CapEx in OpEx umwandeln. Förderprogramme: BAFA „Digitale Markterschließung" (externe Beratung), „Digital Jetzt" des BMWK (Software & Qualifizierung) sowie regionale Digitalisierungs-Gutscheine der Bundesländer.',
  },
  {
    q: 'Wie sieht die Zukunft der KI-Automatisierung für KMU bis 2030 aus?',
    a: 'Bis 2030 wird KI vom Wettbewerbsvorteil zur infrastrukturellen Grundvoraussetzung (Commodity) im Mittelstand. Der Fokus verschiebt sich von isolierter Task-Automatisierung hin zu autonomen, agentischen KI-Netzwerken, die komplette Abteilungen orchestrieren. Unternehmen ohne tiefgreifende KI-Integration werden durch automatisierte Marktteilnehmer verdrängt.',
  },
  {
    q: 'Wie relevant ist KI für die langfristige Überlebensfähigkeit von KMU?',
    a: 'Die Relevanz ist als existenziell einzustufen. KI-Technologien verschieben die makroökonomischen Effizienzgrenzen so drastisch, dass stagnierende, rein manuell geführte Unternehmen in Bezug auf Preisgestaltung, Geschwindigkeit und Servicequalität nicht mehr marktfähig sein werden.',
  },
  {
    q: 'Welche regulatorischen Anforderungen stellt der EU AI Act (KI-Verordnung)?',
    a: 'Der EU AI Act reguliert KI-Systeme nach einem risikobasierten Ansatz. Seit 2025/2026 gelten strikte Verbote für manipulative Systeme sowie Transparenzpflichten für General-Purpose AI (GPAI) und Chatbots. Die Mehrheit der KMU-Tools fällt in „Minimales/begrenztes Risiko". Hochrisiko-Systeme (z. B. CV-Scoring im HR) unterliegen strengen Compliance-Vorgaben. Für KMU existieren regulatorische Sandboxes.',
  },
  {
    q: 'Wie lässt sich der Einsatz von KI mit der DSGVO vereinbaren?',
    a: 'DSGVO-konforme KI-Nutzung erfordert eine valide Rechtsgrundlage nach Artikel 6 DSGVO, Datenminimierung und den Schutz der Betroffenenrechte. Bei Cloud-KI sind Auftragsverarbeitungsverträge (AVV) zwingend. Häufiger Fehler: die Eingabe personenbezogener Daten in öffentliche KI-Modelle. Lösung: geschlossene Enterprise-Instanzen und ggf. eine Datenschutz-Folgenabschätzung (DSFA).',
  },
  {
    q: 'Wer haftet bei Fehlern, die durch den Einsatz von KI entstehen?',
    a: 'Im Außenverhältnis haftet das anwendende Unternehmen gegenüber Dritten nach den Grundsätzen der Organisations-, Verwender- und Verschuldenshaftung. Eine direkte Haftung der KI existiert im deutschen Recht nicht. Hersteller haften nur bei nachweisbaren Produktmängeln oder Verletzung der Instruktionspflicht gemäß Produkthaftungsgesetz (ProdHaftG).',
  },
  {
    q: 'Mit welchen Maßnahmen lassen sich KI-bezogene Haftungsrisiken minimieren?',
    a: 'Risikominimierung erfolgt durch konsequente Implementierung des „Human-in-the-Loop"-Prinzips: kein geschäftskritischer Output verlässt die KI ohne menschliche Verifikation. Zusätzlich: schriftliche AI Policy als Betriebsanweisung, lückenloses Logging und Auditability sowie Anpassung der Betriebshaftpflicht- oder Vermögensschadenhaftpflichtversicherung.',
  },
  {
    q: 'Was müssen Unternehmen tun, wenn KI bestehende Arbeitsplätze verdrängt?',
    a: 'Unternehmen müssen eine proaktive Transformation der Belegschaft durch Upskilling und Reskilling einleiten. Der Fokus verschiebt sich von manueller Datenverarbeitung hin zur strategischen Steuerung und Qualitätskontrolle der KI-Systeme. Freigesetzte Kapazitäten sollten in Kundenbeziehungsmanagement, Innovationsmanagement und KI-Supervision investiert werden.',
  },
];

const SCRIPT_ID = 'faqpage-jsonld';

const FAQSchema = () => {
  useEffect(() => {
    // Remove any previous instance (defensive against React Strict-Mode double-mount)
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = SCRIPT_ID;
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    });
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(SCRIPT_ID);
      if (el) el.remove();
    };
  }, []);

  return null;
};

export default FAQSchema;
