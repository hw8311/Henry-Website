import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

const BlogKMU = () => {
  const { language } = useLanguage();
  
  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-muted-gray hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft size={20} aria-hidden="true" />
            <span className="label-mono">{language === 'de' ? 'Zurück zum Blog' : 'Back to blog'}</span>
          </Link>
          
          <div className="glass-card p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-mono uppercase tracking-wider">
                {language === 'de' ? 'KI für KMU' : 'AI for SMB'}
              </span>
              <div className="flex items-center gap-4 text-muted-gray text-sm">
                <span className="flex items-center gap-2">
                  <Calendar size={14} weight="light" aria-hidden="true" />
                  {language === 'de' ? '1. März 2026' : 'March 1, 2026'}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} weight="light" aria-hidden="true" />
                  {language === 'de' ? '15 min Lesezeit' : '15 min read'}
                </span>
              </div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite mb-4"
            >
              {language === 'de' 
                ? 'KI-Automatisierung im kleinen Unternehmen'
                : 'AI Automation in Small Business'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-gray"
            >
              {language === 'de'
                ? 'Ein ehrlicher Blick auf die nächsten Jahre'
                : 'An honest look at the years ahead'}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="relative py-12 md:py-16 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <div className="glass-card p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {language === 'de' ? (
              <>
                {/* German Content */}
                <div className="text-muted-gray leading-relaxed space-y-6 mb-12">
                  <p className="text-xl text-offwhite leading-relaxed">
                    Wenn man über künstliche Intelligenz spricht, entstehen schnell große Bilder. Man denkt an 
                    hochmoderne Büros, vollautomatisierte Prozesse, riesige Datenzentren und Unternehmen, in denen 
                    scheinbar alles digital perfekt ineinandergreift. Die Medien zeichnen oft genau dieses Bild: 
                    KI als Technologie für Konzerne, Tech-Startups und hochspezialisierte IT-Teams.
                  </p>
                  <p className="text-gold text-lg">
                    Doch wenn wir ehrlich sind, sieht es in den meisten kleinen und mittleren Unternehmen ganz anders aus.
                  </p>
                  <p>
                    Viele Betriebe arbeiten noch mit einem Windows-Rechner im Büro, einer Excel-Liste für den 
                    Überblick und E-Mails als zentrale Kommunikationszentrale. Dokumente werden gespeichert, 
                    kopiert, weitergeschickt, manchmal noch ausgedruckt und unterschrieben. PowerPoint ist in 
                    manchen Unternehmen bereits eine kleine Besonderheit. Und das ist kein Problem – es ist 
                    schlicht die Realität.
                  </p>
                  <p>
                    Gerade deshalb wird die Entwicklung rund um künstliche Intelligenz für kleine Unternehmen 
                    so interessant. <span className="text-offwhite">Denn KI entfaltet ihre größte Wirkung nicht dort, wo bereits 
                    alles digitalisiert ist. Sie wirkt dort am stärksten, wo noch viel Handarbeit im Büroalltag steckt.</span>
                  </p>
                </div>

                {/* Section: Der typische Betrieb */}
                <section className="mb-16">
                  <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                    Der typische Betrieb – und sein Alltag
                  </h2>
                  <div className="text-muted-gray leading-relaxed space-y-6">
                    <p>
                      Nehmen wir ein Beispiel, das man in fast jeder Stadt findet: einen Gebrauchtwagenhändler 
                      am Stadtrand.
                    </p>
                    <p>
                      Der Betrieb ist überschaubar. Vielleicht stehen dort rund fünfzig Fahrzeuge auf dem Platz. 
                      Der Inhaber kümmert sich um Einkauf, Verkauf und Organisation. Ein Mitarbeiter unterstützt 
                      im Vertrieb. Die Werkstatt wird über einen Partnerbetrieb organisiert.
                    </p>
                    <p>
                      Der Tag besteht aus vielen kleinen Aufgaben: Fahrzeuge einstellen, Anzeigen schreiben, 
                      Kundenanfragen beantworten, Preise vergleichen, Termine koordinieren, Rechnungen erstellen, 
                      Dokumente vorbereiten und natürlich Verkaufsgespräche führen.
                    </p>
                    <p>
                      Keine dieser Tätigkeiten ist außergewöhnlich kompliziert. Aber zusammen ergeben sie eine 
                      enorme Menge Arbeit.
                    </p>
                    <p className="text-gold">
                      Viele dieser Aufgaben haben eines gemeinsam: Sie bestehen aus Informationen, Texten, Daten 
                      und Kommunikation. Genau dort hat künstliche Intelligenz ihre größte Stärke.
                    </p>
                  </div>
                </section>

                {/* Section: Warum KI interessant wird */}
                <section className="mb-16">
                  <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                    Warum KI gerade für kleine Unternehmen interessant wird
                  </h2>
                  <div className="text-muted-gray leading-relaxed space-y-6">
                    <p>
                      In den letzten Jahren hat sich ein wichtiger technologischer Wandel vollzogen. Früher 
                      bedeutete Wachstum fast immer: mehr Mitarbeiter einstellen. Mehr Umsatz brauchte mehr Personal.
                    </p>
                    <p className="text-offwhite text-lg">
                      Mit KI verändert sich dieses Verhältnis.
                    </p>
                    <p>
                      Ein großer Teil klassischer Büroarbeit lässt sich inzwischen automatisieren oder zumindest 
                      stark beschleunigen. Texte erstellen, Daten analysieren, Anfragen beantworten oder 
                      Informationen strukturieren – all das kann heute bereits von KI unterstützt werden.
                    </p>
                    <p>
                      Das bedeutet nicht, dass Menschen ersetzt werden. Aber viele Aufgaben lassen sich deutlich 
                      effizienter erledigen.
                    </p>
                    <blockquote className="border-l-2 border-gold pl-6 py-4 my-8 bg-white/5">
                      <p className="text-offwhite text-lg font-display italic">
                        Ein kleines Team kann plötzlich Leistungen erbringen, für die früher ein deutlich größerer 
                        Mitarbeiterstab notwendig gewesen wäre.
                      </p>
                    </blockquote>
                  </div>
                </section>

                {/* Section: Ein Blick auf den Autohändler */}
                <section className="mb-16">
                  <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                    Ein Blick auf den Autohändler – mit KI
                  </h2>
                  <div className="text-muted-gray leading-relaxed space-y-6">
                    <p>
                      Bleiben wir bei unserem Beispiel des Gebrauchtwagenhändlers.
                    </p>
                    <p>
                      Heute bedeutet jedes neue Fahrzeug im Bestand zunächst Arbeit: Fotos sortieren, eine 
                      Anzeige formulieren, technische Daten ergänzen, Preise vergleichen und die Anzeige auf 
                      Verkaufsplattformen veröffentlichen.
                    </p>
                    <p className="text-offwhite">
                      Mit KI kann ein großer Teil dieser Arbeit automatisiert werden.
                    </p>
                    <p>
                      Die Fahrzeugdaten werden einmal eingegeben oder ausgelesen. Anschließend kann ein KI-System 
                      daraus eine vollständige Anzeige formulieren – inklusive Beschreibung, Ausstattungsdetails 
                      und suchmaschinenoptimierter Texte.
                    </p>
                    <p className="text-gold">
                      Was früher vielleicht eine halbe Stunde gedauert hat, lässt sich innerhalb weniger Minuten erledigen.
                    </p>
                    <p>
                      Ähnlich sieht es bei Kundenanfragen aus. Viele Interessenten stellen ähnliche Fragen: 
                      Ist das Fahrzeug noch verfügbar? Gibt es eine Finanzierung? Wann ist eine Probefahrt möglich?
                    </p>
                    <p>
                      Ein intelligentes System kann solche Anfragen bereits heute vorstrukturieren oder teilweise 
                      automatisch beantworten. Termine lassen sich automatisch koordinieren. Informationen können 
                      sofort bereitgestellt werden.
                    </p>
                  </div>
                </section>

                {/* Section: Daten statt Bauchgefühl */}
                <section className="mb-16">
                  <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                    Daten statt Bauchgefühl
                  </h2>
                  <div className="text-muted-gray leading-relaxed space-y-6">
                    <p>
                      Ein weiterer Bereich, der sich stark verändern wird, ist die Preisgestaltung und Bestandsplanung.
                    </p>
                    <p>
                      Viele kleinere Betriebe treffen Entscheidungen aus Erfahrung und Marktgefühl. Das funktioniert 
                      oft erstaunlich gut. Trotzdem bleiben Unsicherheiten: Ist der Preis zu hoch? Verkauft sich 
                      dieses Modell gerade schlecht? Steht das Fahrzeug zu lange im Bestand?
                    </p>
                    <p>
                      KI kann solche Fragen anhand von Marktdaten analysieren. Preise vergleichbarer Fahrzeuge, 
                      Nachfrageentwicklungen und Standzeiten lassen sich automatisch auswerten.
                    </p>
                    <p className="text-offwhite">
                      Das Ergebnis sind keine endgültigen Entscheidungen – aber sehr gute Hinweise. Der Unternehmer 
                      bleibt weiterhin der Entscheider. Er bekommt jedoch deutlich bessere Informationen als Grundlage.
                    </p>
                  </div>
                </section>

                {/* Section: KI-Agenten */}
                <section className="mb-16">
                  <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                    Der nächste Schritt: KI, die Aufgaben selbst erledigt
                  </h2>
                  <div className="text-muted-gray leading-relaxed space-y-6">
                    <p>
                      Im Moment sprechen viele Menschen über KI als Assistenz. Ein System hilft beim Schreiben, 
                      Recherchieren oder Auswerten.
                    </p>
                    <p className="text-gold">
                      In den nächsten Jahren wird sich diese Rolle weiterentwickeln.
                    </p>
                    <p>
                      Die nächste Generation von KI-Systemen wird zunehmend ganze Aufgabenketten übernehmen können. 
                      Man spricht hier häufig von sogenannten „KI-Agenten".
                    </p>
                    <p>
                      Statt nur eine einzelne Aufgabe auszuführen, kann ein solcher Agent mehrere Schritte 
                      selbstständig koordinieren.
                    </p>
                    <div className="p-6 bg-white/5 border border-gold/20 my-8">
                      <p className="text-offwhite mb-4">Ein Beispiel aus unserem Autohändler-Szenario:</p>
                      <p className="text-muted-gray">
                        Ein neues Fahrzeug wird aufgenommen. Das System erstellt automatisch eine Anzeige, lädt 
                        Bilder hoch, veröffentlicht sie auf Verkaufsplattformen, beobachtet die Nachfrage und 
                        gibt Empfehlungen zur Preisentwicklung.
                      </p>
                      <p className="text-gold mt-4">
                        Der Mensch kontrolliert den Prozess – aber er muss ihn nicht mehr vollständig selbst durchführen.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section: Branchenführer */}
                <section className="mb-16">
                  <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                    Was Branchenführer dazu sagen
                  </h2>
                  <div className="text-muted-gray leading-relaxed space-y-6">
                    <p>
                      Viele führende Stimmen aus der Technologiebranche erwarten, dass künstliche Intelligenz 
                      die Produktivität von Unternehmen stark verändern wird.
                    </p>
                    <blockquote className="border-l-2 border-gold pl-6 py-4 my-8 bg-white/5">
                      <p className="text-offwhite text-lg font-display italic">
                        Der OpenAI-Chef Sam Altman beschreibt KI häufig als Werkzeug, das es kleinen Teams ermöglicht, 
                        Leistungen zu erbringen, für die früher ganze Abteilungen nötig waren.
                      </p>
                    </blockquote>
                    <p>
                      Auch Technologieinvestoren wie Frank Thelen sprechen davon, dass KI eine der größten 
                      Produktivitätssteigerungen seit der Einführung des Internets auslösen könnte.
                    </p>
                    <p>
                      Der Grund dafür ist relativ einfach: Wissen und Informationsarbeit lassen sich durch 
                      Software skalieren. Und ein Großteil moderner Unternehmen basiert genau auf dieser Art von Arbeit.
                    </p>
                  </div>
                </section>

                {/* Section: Der Wandel braucht Zeit */}
                <section className="mb-16">
                  <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                    Der Wandel kommt – aber er passiert nicht über Nacht
                  </h2>
                  <div className="text-muted-gray leading-relaxed space-y-6">
                    <p>
                      Bei all diesen Entwicklungen ist eines wichtig: Veränderungen brauchen Zeit.
                    </p>
                    <p>
                      Viele kleine Unternehmen stehen noch am Anfang dieser Entwicklung. Neue Technologien müssen 
                      verstanden, ausprobiert und sinnvoll integriert werden. Es braucht Erfahrung, Vertrauen und 
                      manchmal auch ein wenig Geduld.
                    </p>
                    <p>
                      Aber es ist sehr wahrscheinlich, dass dieser Wandel Schritt für Schritt auf fast alle 
                      Branchen zukommen wird.
                    </p>
                    <p className="text-offwhite">
                      Wer langfristig wettbewerbsfähig bleiben möchte, wird sich früher oder später mit diesen 
                      Möglichkeiten beschäftigen müssen.
                    </p>
                    <p>
                      Das bedeutet jedoch nicht, dass kleine Unternehmen überfordert sein werden. Ganz im Gegenteil.
                    </p>
                    <p className="text-gold">
                      Viele der neuen Werkzeuge sind bewusst so entwickelt, dass sie ohne große IT-Abteilungen 
                      genutzt werden können. Oft reicht bereits ein normaler Bürocomputer und eine Internetverbindung.
                    </p>
                  </div>
                </section>

                {/* Section: Neue Stärke */}
                <section className="mb-16">
                  <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                    Eine neue Stärke kleiner Teams
                  </h2>
                  <div className="text-muted-gray leading-relaxed space-y-6">
                    <p>
                      Vielleicht ist genau das die spannendste Entwicklung der nächsten Jahre.
                    </p>
                    <p>
                      Früher hatten große Unternehmen einen klaren Vorteil: mehr Kapital, mehr Mitarbeiter, mehr Ressourcen.
                    </p>
                    <p className="text-offwhite text-lg">
                      Mit künstlicher Intelligenz verändert sich dieses Verhältnis.
                    </p>
                    <p>
                      Kleine Teams können heute Werkzeuge nutzen, die früher nur großen Organisationen zur Verfügung 
                      standen. Analysen, Automatisierung, digitale Prozesse – vieles davon wird zunehmend zugänglich.
                    </p>
                    <p>
                      Das bedeutet nicht, dass große Unternehmen verschwinden. Aber der Abstand zwischen großen 
                      und kleinen Organisationen könnte deutlich kleiner werden.
                    </p>
                  </div>
                </section>

                {/* Section: Ausblick 2030 */}
                <section className="mb-16">
                  <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                    Ein realistischer Ausblick bis 2030
                  </h2>
                  <div className="text-muted-gray leading-relaxed space-y-6">
                    <p>
                      Wenn man die aktuellen Entwicklungen betrachtet, ist es wahrscheinlich, dass sich die 
                      nächsten Jahre in mehreren Schritten entwickeln werden.
                    </p>
                    <div className="grid gap-4 my-8">
                      <div className="p-4 bg-white/5 border-l-2 border-gold/50">
                        <p className="text-offwhite">Zunächst</p>
                        <p className="text-sm mt-1">werden KI-Assistenten immer stärker in den Büroalltag integriert. Sie helfen beim Schreiben, Auswerten und Strukturieren von Informationen.</p>
                      </div>
                      <div className="p-4 bg-white/5 border-l-2 border-gold/50">
                        <p className="text-offwhite">Darauf folgt</p>
                        <p className="text-sm mt-1">eine Phase stärkerer Automatisierung. Ganze Arbeitsabläufe werden digital unterstützt oder teilweise übernommen.</p>
                      </div>
                      <div className="p-4 bg-white/5 border-l-2 border-gold/50">
                        <p className="text-offwhite">Später</p>
                        <p className="text-sm mt-1">werden autonome Systeme entstehen, die bestimmte Aufgabenketten selbstständig durchführen können.</p>
                      </div>
                      <div className="p-4 bg-white/5 border-l-2 border-gold/50">
                        <p className="text-offwhite">Irgendwann</p>
                        <p className="text-sm mt-1">wird es völlig normal sein, dass ein kleines Unternehmen mit wenigen Mitarbeitern von mehreren intelligenten Software-Systemen unterstützt wird.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Fazit */}
                <section className="mb-16 p-8 bg-white/5 border border-gold/20">
                  <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                    Fazit
                  </h2>
                  <div className="text-muted-gray leading-relaxed space-y-6">
                    <p>
                      Die KI-Revolution passiert nicht nur in Silicon Valley oder großen Technologieunternehmen.
                    </p>
                    <p className="text-offwhite text-lg">
                      Sie passiert auch im kleinen Büro, im Handwerksbetrieb und auf dem Autoplatz am Stadtrand.
                    </p>
                    <p>
                      Gerade dort, wo heute noch viel manuelle Büroarbeit stattfindet, können intelligente 
                      Systeme enorme Entlastung schaffen.
                    </p>
                    <p>
                      Es wird Zeit brauchen, bis sich diese Veränderungen vollständig durchsetzen. Aber sie werden kommen.
                    </p>
                    <p className="text-gold text-xl font-display mt-8">
                      Und wer flexibel bleibt, neue Werkzeuge ausprobiert und bereit ist zu lernen, hat in 
                      dieser neuen technologischen Landschaft eine sehr gute Ausgangsposition.
                    </p>
                  </div>
                </section>
              </>
            ) : (
              <>
                {/* English Content */}
                <div className="text-muted-gray leading-relaxed space-y-6 mb-12">
                  <p className="text-xl text-offwhite leading-relaxed">
                    When we talk about artificial intelligence, big pictures quickly emerge. We think of ultra-modern 
                    offices, fully automated processes, huge data centers, and companies where everything seems to 
                    mesh perfectly digitally. The media often paint exactly this picture: AI as technology for 
                    corporations, tech startups, and highly specialized IT teams.
                  </p>
                  <p className="text-gold text-lg">
                    But if we're honest, things look quite different in most small and medium-sized businesses.
                  </p>
                  <p>
                    Many businesses still work with a Windows computer in the office, an Excel spreadsheet for 
                    overview, and emails as the central communication hub. Documents are saved, copied, forwarded, 
                    sometimes still printed and signed. PowerPoint is already a special feature in some companies. 
                    And that's not a problem – it's simply reality.
                  </p>
                  <p>
                    That's precisely why the development around AI becomes so interesting for small businesses. 
                    <span className="text-offwhite"> Because AI doesn't have its greatest impact where everything is already digitized. 
                    It works most powerfully where there's still a lot of manual work in daily office operations.</span>
                  </p>
                </div>

                {/* Section: The Typical Business */}
                <section className="mb-16">
                  <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                    The Typical Business – and Its Daily Routine
                  </h2>
                  <div className="text-muted-gray leading-relaxed space-y-6">
                    <p>
                      Let's take an example you can find in almost any city: a used car dealer on the outskirts.
                    </p>
                    <p>
                      The operation is manageable. Maybe there are about fifty vehicles on the lot. The owner 
                      handles purchasing, sales, and organization. One employee supports sales. The workshop 
                      is organized through a partner business.
                    </p>
                    <p>
                      The day consists of many small tasks: listing vehicles, writing ads, answering customer 
                      inquiries, comparing prices, coordinating appointments, creating invoices, preparing 
                      documents, and of course conducting sales conversations.
                    </p>
                    <p className="text-gold">
                      Many of these tasks have one thing in common: They consist of information, texts, data, 
                      and communication. That's exactly where AI has its greatest strength.
                    </p>
                  </div>
                </section>

                {/* Section: Why AI is Interesting */}
                <section className="mb-16">
                  <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                    Why AI is Becoming Interesting for Small Businesses
                  </h2>
                  <div className="text-muted-gray leading-relaxed space-y-6">
                    <p>
                      An important technological shift has occurred in recent years. Growth used to almost 
                      always mean: hire more employees. More revenue needed more staff.
                    </p>
                    <p className="text-offwhite text-lg">
                      With AI, this relationship is changing.
                    </p>
                    <p>
                      A large part of classic office work can now be automated or at least significantly 
                      accelerated. Creating texts, analyzing data, answering inquiries, or structuring 
                      information – all of this can already be supported by AI today.
                    </p>
                    <blockquote className="border-l-2 border-gold pl-6 py-4 my-8 bg-white/5">
                      <p className="text-offwhite text-lg font-display italic">
                        A small team can suddenly deliver performance that previously required a much larger staff.
                      </p>
                    </blockquote>
                  </div>
                </section>

                {/* Fazit English */}
                <section className="mb-16 p-8 bg-white/5 border border-gold/20">
                  <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                    Conclusion
                  </h2>
                  <div className="text-muted-gray leading-relaxed space-y-6">
                    <p>
                      The AI revolution isn't just happening in Silicon Valley or large technology companies.
                    </p>
                    <p className="text-offwhite text-lg">
                      It's also happening in small offices, craft businesses, and car lots on the outskirts of town.
                    </p>
                    <p>
                      Especially where a lot of manual office work still takes place today, intelligent 
                      systems can provide enormous relief.
                    </p>
                    <p className="text-gold text-xl font-display mt-8">
                      And those who remain flexible, try new tools, and are willing to learn have a very 
                      good starting position in this new technological landscape.
                    </p>
                  </div>
                </section>
              </>
            )}

            {/* Back to Blog */}
            <div className="pt-8 border-t border-white/10">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-gold hover:gap-4 transition-all duration-300"
              >
                <ArrowLeft size={18} aria-hidden="true" />
                <span className="label-mono">{language === 'de' ? 'Zurück zur Übersicht' : 'Back to overview'}</span>
              </Link>
            </div>
          </motion.div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogKMU;
