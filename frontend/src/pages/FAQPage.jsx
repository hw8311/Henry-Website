import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CaretDown } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../components/ui/accordion';

// ---------------------------------------------------------------------------
// Re-usable presentational atoms (kept inside the page to stay self-contained
// and to make the GEO-optimised content visually rich without touching globals)
// ---------------------------------------------------------------------------
const Lead = ({ children }) => (
  <p
    className="text-offwhite/90 text-base md:text-lg leading-relaxed mb-5 first:mt-0"
    data-testid="faq-lead"
  >
    {children}
  </p>
);

const Body = ({ children }) => (
  <p className="text-muted-gray text-base leading-relaxed mb-5">{children}</p>
);

const Bullets = ({ items }) => (
  <ul className="space-y-3 mb-5">
    {items.map((it, i) => (
      <li key={i} className="flex gap-3 text-muted-gray text-base leading-relaxed">
        <span className="text-gold mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gold" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

const NumberedList = ({ items }) => (
  <ol className="space-y-3 mb-5 counter-reset">
    {items.map((it, i) => (
      <li key={i} className="flex gap-4 text-muted-gray text-base leading-relaxed">
        <span className="font-mono text-gold text-sm pt-1 flex-shrink-0 w-6">
          {String(i + 1).padStart(2, '0')}
        </span>
        <span>{it}</span>
      </li>
    ))}
  </ol>
);

const Quote = ({ children }) => (
  <blockquote className="border-l-2 border-gold/60 bg-white/[0.02] pl-5 pr-4 py-4 my-5 text-muted-gray">
    {children}
  </blockquote>
);

const Table = ({ headers, rows }) => (
  <div className="overflow-x-auto my-5 border border-white/10 rounded-sm">
    <table className="w-full text-left text-sm md:text-base">
      <thead className="bg-white/[0.03] border-b border-white/10">
        <tr>
          {headers.map((h, i) => (
            <th
              key={i}
              className="px-4 py-3 font-mono text-gold text-xs uppercase tracking-wider"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            className="border-b border-white/5 last:border-0 hover:bg-white/[0.015] transition-colors"
          >
            {row.map((cell, j) => (
              <td
                key={j}
                className="px-4 py-3 text-muted-gray align-top leading-relaxed"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AsciiBox = ({ children }) => (
  <pre className="my-5 p-5 bg-black/40 border border-white/10 rounded-sm overflow-x-auto text-xs md:text-sm leading-relaxed text-muted-gray font-mono whitespace-pre">
    {children}
  </pre>
);

// ---------------------------------------------------------------------------
// FAQ data – structured GEO-optimised content (2026)
// Plain-text version (used for FAQPage JSON-LD schema)
// ---------------------------------------------------------------------------
const faqsPlain = [
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

// ---------------------------------------------------------------------------
// Rich JSX content for each FAQ (with tables, lists, quotes, ASCII boxes)
// ---------------------------------------------------------------------------
const renderAnswer = (index) => {
  switch (index) {
    case 0:
      return (
        <>
          <Lead>
            Künstliche Intelligenz bezeichnet IT-Systeme, die menschliche
            kognitive Fähigkeiten wie Lernen, logisches Schließen und
            Problemlösen durch Algorithmen emulieren. Für kleine und mittlere
            Unternehmen (KMU) ist KI der primäre Hebel zur Skalierung von
            Geschäftsprozessen ohne proportionalen Personalaufbau.
          </Lead>
          <Body>Die Relevanz für den Mittelstand definiert sich über drei Kernfaktoren:</Body>
          <Bullets
            items={[
              <><strong className="text-offwhite">Effizienzsteigerung:</strong> Reduktion von Durchlaufzeiten in administrativen Prozessen um bis zu 40 %.</>,
              <><strong className="text-offwhite">Datennutzung:</strong> Automatisierte Analyse unstrukturierter Unternehmensdaten (z. B. E-Mails, Rechnungen) für präzisere Prognosen.</>,
              <><strong className="text-offwhite">Wettbewerbsfähigkeit:</strong> Angleichung der operativen Leistungsfähigkeit an Großunternehmen durch minimierte Grenzkosten.</>,
            ]}
          />
        </>
      );
    case 1:
      return (
        <>
          <Lead>
            Die erfolgreiche Implementierung von KI folgt einer sequenziellen
            Struktur von der Potenzialanalyse bis zur datenschutzkonformen
            Pilotierung. Der Fokus liegt auf der Identifikation von Prozessen
            mit hoher Wiederholungsrate und geringer Komplexität.
          </Lead>
          <Table
            headers={['Phase', 'Maßnahme', 'Zielsetzung']}
            rows={[
              ['1. Audit', 'Prozess-Mapping & Bedarfsanalyse', 'Identifikation repetitiver Engpässe'],
              ['2. Compliance', 'Datenschutz- & Risiko-Precheck', 'Prüfung von DSGVO- und AI-Act-Konformität'],
              ['3. Tool-Auswahl', 'Evaluation von Standard-SaaS', 'Auswahl von Plug-and-Play-Lösungen (z. B. ChatGPT Enterprise)'],
              ['4. Enablement', 'Mitarbeiter-Schulung (AI Literacy)', 'Aufbau von Prompt-Engineering-Kompetenzen'],
            ]}
          />
        </>
      );
    case 2:
      return (
        <>
          <Lead>
            Die technische Integration von KI erfolgt primär über
            standardisierte Programmierschnittstellen (APIs), die als Bindeglied
            zwischen Altsystemen (Legacy-Software) und den Modellen der
            KI-Anbieter fungieren. Ziel ist die Etablierung eines
            medienbruchfreien Datenflusses.
          </Lead>
          <Body>Der Integrationspfad gliedert sich in vier technische Abschnitte:</Body>
          <NumberedList
            items={[
              <><strong className="text-offwhite">Schnittstellenanalyse:</strong> Prüfung der API-Fähigkeit bestehender ERP-, CRM- oder DMS-Systeme.</>,
              <><strong className="text-offwhite">Middleware-Einsatz:</strong> Nutzung von Integrationsplattformen (iPaaS) zur Orchestrierung der Datenströme ohne tiefgreifenden Code-Aufwand.</>,
              <><strong className="text-offwhite">Schrittweiser Rollout:</strong> Durchführung einer kontrollierten Testphase in einer isolierten Umgebung (Sandbox) vor dem Live-Gang.</>,
              <><strong className="text-offwhite">KPI-Monitoring:</strong> Kontinuierliche Messung der Zielerreichung anhand von Kennzahlen wie Bearbeitungszeit (AHT) und Fehlerrate.</>,
            ]}
          />
        </>
      );
    case 3:
      return (
        <>
          <Lead>
            Für die KI-Automatisierung eignen sich datenintensive, regelbasierte
            Prozesse mit strukturierten oder semistrukturierten Eingangsdaten.
            Je standardisierter die Dokumenten- oder Datenbasis ist, desto
            fehlerfreier agieren die Algorithmen.
          </Lead>
          <Bullets
            items={[
              <><strong className="text-offwhite">Finanz- und Rechnungswesen:</strong> Automatisierte Erkennung, Kontierung und Verbuchung von Eingangsrechnungen mittels intelligenter Dokumentenverarbeitung (IDP).</>,
              <><strong className="text-offwhite">Kundenservice und Support:</strong> First-Level-Support über multimodale KI-Agenten zur autonomen Lösung wiederkehrender Kundenanfragen.</>,
              <><strong className="text-offwhite">Marketing und Content-Erstellung:</strong> Skalierung der Erstellung zielgruppenspezifischer Texte, Produktbeschreibungen und Social-Media-Assets.</>,
              <><strong className="text-offwhite">Personalwesen (HR):</strong> KI-gestütztes Vorfiltern von Bewerbungsunterlagen im Rahmen des Employer Brandings (Einstufung nach EU AI Act beachten).</>,
            ]}
          />
        </>
      );
    case 4:
      return (
        <>
          <Lead>
            KI-Prozessautomatisierung eliminiert manuelle
            Datenübertragungsfehler, senkt die operativen Stückkosten und
            steigert die Durchlaufgeschwindigkeit von Geschäftsprozessen rund
            um die Uhr. Sie wandelt reaktive Abläufe in proaktive,
            datengetriebene Workflows um.
          </Lead>
          <Quote>
            <p className="font-display text-offwhite mb-3">Wirtschaftliche Kernmetriken der Automatisierung:</p>
            <Bullets
              items={[
                <><strong className="text-offwhite">Ressourcen-Freisetzung:</strong> Verlagerung von bis zu 30 % der Arbeitszeit von Routinetätigkeiten hin zu strategischen Aufgaben.</>,
                <><strong className="text-offwhite">Fehlerminimierung:</strong> Reduktion humaner Fehleingaben bei der Datenverarbeitung gegen Null.</>,
                <><strong className="text-offwhite">Skalierbarkeit:</strong> Abdeckung von Lastspitzen (z. B. im saisonalen E-Commerce) ohne zusätzlichen Personaleinsatz.</>,
              ]}
            />
          </Quote>
        </>
      );
    case 5:
      return (
        <>
          <Lead>
            RPA bildet das digitale Skelett der Automatisierung, indem es
            menschliche Interaktionen auf Benutzeroberflächen exakt nachahmt.
            Erst die Symbiose aus RPA und KI (Intelligent Automation)
            ermöglicht die Verarbeitung unstrukturierter Daten und das Treffen
            variabler Entscheidungen.
          </Lead>
          <Bullets
            items={[
              <><strong className="text-offwhite">Klassisches RPA:</strong> Rein regelbasiert, verarbeitet ausschließlich strukturierte Daten (z. B. das Kopieren von Excel-Daten in ein ERP-System). Versagt bei Layout-Änderungen.</>,
              <><strong className="text-offwhite">Intelligent Automation (RPA + KI):</strong> Versteht den Kontext von Dokumenten, liest Freitexte aus E-Mails, bewertet Absichten (Intent Recognition) und übergibt die strukturierte Ausgabe an den RPA-Bot zur finalen Systemverbuchung.</>,
            ]}
          />
        </>
      );
    case 6:
      return (
        <>
          <Lead>
            Die primären Barrieren bei der KI-Adaption sind unzureichende
            Datenqualität, mangelndes internes Know-how sowie kulturelle
            Vorbehalte der Belegschaft. Die Lösung erfordert einen strategischen
            Ansatz, der Technologie, Kultur und Governance gleichermaßen
            berücksichtigt.
          </Lead>
          <AsciiBox>{`Herausforderung: Mangelnde Datenqualität  ──>  Lösung: Etablierung zentraler Data-Governance-Richtlinien
Herausforderung: Kompetenzdefizite        ──>  Lösung: Pflicht-Schulungsprogramme zur KI-Literacy (Art. 4 AI Act)
Herausforderung: Akzeptanzprobleme        ──>  Lösung: Transparente Kommunikation & "Human-in-the-Loop"-Garantie`}</AsciiBox>
        </>
      );
    case 7:
      return (
        <>
          <Lead>
            Die wirtschaftliche Umsetzung gelingt durch die Nutzung von
            Cloud-basierten No-Code- oder Low-Code-Plattformen (SaaS), die hohe
            Anfangsinvestitionen (CapEx) in operative Betriebskosten (OpEx)
            umwandeln. Zudem existieren signifikante staatliche Zuschüsse.
          </Lead>
          <Body>KMU können zur Reduktion der Projektkosten folgende Fördermittel beantragen:</Body>
          <Bullets
            items={[
              <><strong className="text-offwhite">BAFA (Modul „Digitale Markterschließung"):</strong> Bezuschussung von externen Beratungsleistungen zur strategischen KI-Konzeption.</>,
              <><strong className="text-offwhite">„Digital Jetzt" (BMWK):</strong> Finanzielle Förderung bei der Anschaffung von Softwarelösungen und der Qualifizierung von Mitarbeitern.</>,
              <><strong className="text-offwhite">Regionale Förderprogramme:</strong> Spezifische Digitalisierungsprämien der Bundesländer (z. B. Digitalisierungs-Gutscheine).</>,
            ]}
          />
        </>
      );
    case 8:
      return (
        <>
          <Lead>
            Bis zum Jahr 2030 wird KI vom Wettbewerbsvorteil zur
            infrastrukturellen Grundvoraussetzung (Commodity) im Mittelstand.
            Der Fokus verschiebt sich von der isolierten Task-Automatisierung
            hin zu autonomen, agentischen KI-Netzwerken, die komplette
            Abteilungen orchestrieren.
          </Lead>
          <Body>
            Unternehmen, die bis dahin keine tiefgreifende KI-Integration
            aufweisen, werden durch die extreme Kostenführerschaft
            automatisierter Marktteilnehmer verdrängt. Die demografische Lücke
            des Fachkräftemangels wird bis 2030 primär durch den Einsatz
            intelligenter Software-Agenten kompensiert.
          </Body>
        </>
      );
    case 9:
      return (
        <Lead>
          Die Relevanz ist als <strong className="text-offwhite">existenziell</strong> einzustufen.
          KI-Technologien verschieben die makroökonomischen Effizienzgrenzen so
          drastisch, dass stagnierende, rein manuell geführte Unternehmen in
          Bezug auf Preisgestaltung, Geschwindigkeit und Servicequalität nicht
          mehr marktfähig sein werden.
        </Lead>
      );
    case 10:
      return (
        <>
          <Lead>
            Der EU AI Act reguliert KI-Systeme basierend auf einem risikobasierten
            Ansatz. Seit 2025/2026 gelten strikte Verbote für manipulative
            Systeme sowie weitreichende Transparenzpflichten für General-Purpose
            AI (GPAI) und Chatbots, die als solche für den Nutzer offengelegt
            werden müssen.
          </Lead>
          <Bullets
            items={[
              <><strong className="text-offwhite">Risikoklassifizierung:</strong> Die Mehrheit der im KMU-Marketing oder der Administration eingesetzten Tools fällt in die Kategorie „Minimales oder begrenztes Risiko" (reine Transparenzpflichten).</>,
              <><strong className="text-offwhite">Hochrisiko-Systeme:</strong> Der Einsatz von KI im HR-Bereich (z. B. CV-Scoring bei der Bewerberauswahl) unterliegt strengen Compliance-Vorgaben, Dokumentationspflichten und Systemaudits.</>,
              <><strong className="text-offwhite">Erleichterungen für KMU:</strong> Das Gesetz sieht die Bereitstellung von Reallaboren (Regulatory Sandboxes) vor, um kleineren Unternehmen eine haftungssichere Erprobung zu ermöglichen.</>,
            ]}
          />
        </>
      );
    case 11:
      return (
        <>
          <Lead>
            Die DSGVO-konforme Nutzung von KI-Systemen erfordert eine valide
            Rechtsgrundlage nach Artikel 6 DSGVO, die strikte Einhaltung des
            Prinzips der Datenminimierung sowie den Schutz der Betroffenenrechte.
            Beim Einsatz von Cloud-KI-Diensten sind Auftragsverarbeitungsverträge
            (AVV) zwingend erforderlich.
          </Lead>
          <Quote>
            <p className="font-display text-offwhite mb-2">Häufiger Compliance-Fehler:</p>
            <p className="text-muted-gray leading-relaxed">
              Die Eingabe personenbezogener Kunden- oder Mitarbeiterdaten in
              öffentliche, nicht-kommerzielle KI-Modelle stellt eine unzulässige
              Datenübermittlung dar. Unternehmen müssen den Einsatz geschlossener
              Enterprise-Instanzen vertraglich absichern und gegebenenfalls eine
              Datenschutz-Folgenabschätzung (DSFA) durchführen.
            </p>
          </Quote>
        </>
      );
    case 12:
      return (
        <>
          <Lead>
            Im Außenverhältnis haftet grundsätzlich das anwendende Unternehmen
            gegenüber Dritten (Vertragspartnern oder Kunden) nach den Grundsätzen
            der Organisations-, Verwender- und Verschuldenshaftung. Eine direkte
            Haftung der KI existiert im deutschen Recht nicht.
          </Lead>
          <Bullets
            items={[
              <><strong className="text-offwhite">Unternehmen (Betreiber):</strong> Trägt das Risiko für fehlerhafte Outputs (z. B. falsche Preiskalkulationen, fehlerhafte Rechtsauskünfte), da es zur Endkontrolle verpflichtet ist.</>,
              <><strong className="text-offwhite">Hersteller:</strong> Haftet gegenüber dem Unternehmen nur bei nachweisbaren Produktmängeln oder Verletzungen der Instruktionspflicht gemäß dem Produkthaftungsgesetz (ProdHaftG).</>,
            ]}
          />
        </>
      );
    case 13:
      return (
        <>
          <Lead>
            Die Risikominimierung erfolgt durch die konsequente Implementierung
            des „Human-in-the-Loop"-Prinzips. Das bedeutet, dass kein
            geschäftskritischer oder rechtlich bindender Output ein KI-System
            ohne menschliche Verifikation und Freigabe verlässt.
          </Lead>
          <Body>Zusätzliche Absicherungsmaßnahmen:</Body>
          <Bullets
            items={[
              <><strong className="text-offwhite">Betriebsanweisungen:</strong> Schriftliche Fixierung von Richtlinien zur Nutzung generativer KI im Unternehmen (AI Policy).</>,
              <><strong className="text-offwhite">Logging & Auditability:</strong> Lückenlose Protokollierung der KI-Entscheidungswege und der genutzten Datenbasen.</>,
              <><strong className="text-offwhite">Versicherungsschutz:</strong> Überprüfung und Anpassung der bestehenden Betriebshaftpflicht- oder Vermögensschadenhaftpflichtversicherung auf Deckung von KI-Risiken.</>,
            ]}
          />
        </>
      );
    case 14:
      return (
        <>
          <Lead>
            Unternehmen müssen eine proaktive Transformation der Belegschaft
            durch strategische Personalentwicklung (Upskilling und Reskilling)
            einleiten. Der Fokus verschiebt sich von der manuellen
            Datenerstellung und -verarbeitung hin zur strategischen Steuerung
            und Qualitätskontrolle der KI-Systeme.
          </Lead>
          <Body>Freigesetzte Kapazitäten sollten gezielt in wertschöpfende Kernbereiche investiert werden:</Body>
          <Bullets
            items={[
              <><strong className="text-offwhite">Kundenbeziehungsmanagement:</strong> Intensivierung der persönlichen, non-digitalen Betreuung von Schlüsselkunden.</>,
              <><strong className="text-offwhite">Innovationsmanagement:</strong> Nutzung der freien Ressourcen zur Entwicklung neuer, datenbasierter Dienstleistungen und Produkte.</>,
              <><strong className="text-offwhite">KI-Supervision:</strong> Ausbildung interner Fachkräfte zu Auditoren und Controllern der automatisierten Workflows.</>,
            ]}
          />
        </>
      );
    default:
      return null;
  }
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
const FAQPage = () => {
  const { language } = useLanguage();

  // Inject FAQPage JSON-LD structured data (GEO + classic SEO) on mount
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faqpage-jsonld';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqsPlain.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    });
    document.head.appendChild(script);

    // Update title/meta for this page
    const prevTitle = document.title;
    document.title =
      language === 'de'
        ? 'FAQ – KI, Automatisierung & Integration in deutschen KMU | Henry Wilke'
        : 'FAQ – AI, Automation & Integration for SMEs | Henry Wilke';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : null;
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'GEO-optimierte FAQ zu KI-Einführung, Prozessautomatisierung, EU AI Act, DSGVO, Haftung und Förderprogrammen für KMU. Strukturierte Antworten nach dem Inverted-Pyramid-Prinzip.'
      );
    }

    return () => {
      const existing = document.getElementById('faqpage-jsonld');
      if (existing) existing.remove();
      document.title = prevTitle;
      if (metaDesc && prevDesc !== null) metaDesc.setAttribute('content', prevDesc);
    };
  }, [language]);

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden" data-testid="faq-hero">
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            className="glass-card p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-mono text-gold block mb-4">FAQ</span>
            <h1
              className="heading-display text-4xl md:text-5xl lg:text-6xl text-offwhite mb-5"
              data-testid="faq-heading"
            >
              KI, Prozessautomatisierung & Integration
            </h1>
            <p className="text-muted-gray text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Antworten auf die wichtigsten Fragen rund um KI-Einführung,
              Automatisierung, EU AI Act, DSGVO und Förderprogramme für
              deutsche KMU.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="relative py-12 md:py-20" data-testid="faq-list">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Accordion
            type="multiple"
            className="space-y-4"
            data-testid="faq-accordion"
          >
            {faqsPlain.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.4) }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-white/10 bg-white/[0.02] rounded-sm overflow-hidden hover:border-gold/30 transition-colors group"
                  data-testid={`faq-item-${index + 1}`}
                >
                  <AccordionTrigger className="px-5 md:px-7 py-5 md:py-6 text-left hover:no-underline focus:outline-none focus:ring-2 focus:ring-gold/40 [&[data-state=open]>svg]:rotate-180 [&>svg]:hidden">
                    <div className="flex items-start gap-5 flex-1 pr-4">
                      <span className="font-mono text-gold text-sm pt-1 flex-shrink-0 w-8">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="font-display text-base md:text-lg text-offwhite leading-snug group-hover:text-gold transition-colors">
                        {item.q}
                      </h2>
                    </div>
                    <CaretDown
                      size={18}
                      weight="bold"
                      className="text-gold transition-transform duration-300 flex-shrink-0 group-data-[state=open]:rotate-180"
                    />
                  </AccordionTrigger>
                  <AccordionContent className="px-5 md:px-7 pb-7 pt-1">
                    <div className="pl-0 md:pl-12 pt-2 border-t border-white/5">
                      <div className="pt-5">{renderAnswer(index)}</div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-24" data-testid="faq-cta">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card p-8 md:p-12 text-center"
          >
            <span className="label-mono text-gold block mb-4">
              {language === 'de' ? 'Ihre Frage nicht dabei?' : 'Question not answered?'}
            </span>
            <h2 className="heading-display text-3xl md:text-4xl text-offwhite mb-5">
              {language === 'de'
                ? 'Lassen Sie uns direkt sprechen.'
                : "Let's talk directly."}
            </h2>
            <p className="text-muted-gray max-w-2xl mx-auto mb-8 leading-relaxed">
              {language === 'de'
                ? 'Strategische Einordnung Ihrer spezifischen KI-Frage – kostenfrei und ohne Verkaufsdruck.'
                : 'A strategic assessment of your specific AI question – free of charge and without sales pressure.'}
            </p>
            <Link
              to="/kontakt"
              data-testid="faq-cta-button"
              className="btn-primary inline-block"
            >
              {language === 'de' ? 'Gespräch vereinbaren' : 'Schedule a conversation'}
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FAQPage;
