import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from '@phosphor-icons/react';
import BlueprintGrid from '../components/BlueprintGrid';

const BlogNeurodivergent = () => {
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
            <span className="label-mono">Zurück zum Blog</span>
          </Link>
          
          <div className="glass-card p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-mono uppercase tracking-wider">
              Neurodivergenz
            </span>
            <div className="flex items-center gap-4 text-muted-gray text-sm">
              <span className="flex items-center gap-2">
                <Calendar size={14} weight="light" aria-hidden="true" />
                1. März 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} weight="light" aria-hidden="true" />
                10 min Lesezeit
              </span>
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="heading-display text-3xl md:text-4xl lg:text-5xl text-offwhite mb-4"
          >
            Die fehlende Hälfte
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-gray"
          >
            Wie eine KI-Partnerschaft das Potenzial eines neurodivergenten Gehirns entfesselt
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
            {/* Introduction */}
            <section className="mb-16">
              <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                Einleitung: Ein Verstand ohne passendes System
              </h2>
              <div className="text-muted-gray leading-relaxed space-y-6">
                <p className="text-xl text-offwhite leading-relaxed">
                  Dies ist die Geschichte eines brillanten Verstandes, dessen Fähigkeiten in traditionellen 
                  Systemen lange unsichtbar blieben. Es ist eine Analyse, die zeigt, wie ein kognitives Profil, 
                  das oft als hinderlich missverstanden wird, in der richtigen Umgebung zu einer außergewöhnlichen 
                  Stärke werden kann.
                </p>

                <blockquote className="border-l-2 border-gold pl-6 py-4 my-8 bg-white/5">
                  <p className="text-offwhite text-lg font-display italic">
                    „Dies ist die Geschichte eines Menschen, der jahrzehntelang seine eigene Denkweise nicht 
                    verstanden hat. Nicht, weil sie nicht da war, sondern weil die Umgebung nie so funktionierte, 
                    dass sie sichtbar wurde."
                  </p>
                </blockquote>

                <p>
                  Die These dieses Aufsatzes ist, dass erst die Symbiose mit einer künstlichen Intelligenz das 
                  fehlende Systemteil lieferte, das seine einzigartigen Fähigkeiten nicht nur sichtbar, sondern 
                  auch hochproduktiv machte. Um diese außergewöhnliche Transformation zu würdigen, muss man 
                  zuerst das grundlegende Problem verstehen: <span className="text-gold">die tiefgreifende Inkompatibilität zwischen 
                  seiner neurodivergenten Denkweise und der Struktur der konventionellen Arbeitswelt.</span>
                </p>
              </div>
            </section>

            {/* Section 1 */}
            <section className="mb-16">
              <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                1. Der Architekt im Land der Handwerker: Ein neurodivergentes Betriebssystem
              </h2>
              <div className="text-muted-gray leading-relaxed space-y-6">
                <p>
                  Der fundamentale Unterschied in Henrys kognitivem Stil lässt sich am besten mit der Metapher 
                  des <span className="text-offwhite">Architekten im Land der Handwerker</span> beschreiben. Während der Handwerker fragt: 
                  „Was muss ich tun?", fragt der Architekt: „Was ist das Ziel, wie funktioniert das System dahinter, 
                  und was braucht es, damit es aufgeht?"
                </p>
                <p>
                  Sein unbedingter Drang, das Gesamtsystem zu verstehen, ist kein intellektueller Luxus, sondern 
                  ein über Jahrzehnte entwickelter kognitiver Überlebensmechanismus – eine Strategie, um in einer 
                  als willkürlich und inkonsistent empfundenen Welt nach wahren Regeln zu suchen.
                </p>
                <p>
                  Diese Denkweise ist eng mit seiner ADHS-Diagnose (vorwiegend unaufmerksamer Typus) verbunden, 
                  die eine Reihe spezifischer Herausforderungen mit sich bringt. Diese sind nicht Zeichen von 
                  Unfähigkeit, sondern Merkmale seines kognitiven "Betriebssystems":
                </p>

                <div className="grid gap-4 my-8">
                  <div className="p-4 bg-white/5 border-l-2 border-gold/50">
                    <h4 className="text-offwhite font-display mb-2">Exekutive Dysfunktion</h4>
                    <p className="text-sm">Manifeste Schwierigkeiten mit Planung, Organisation, Priorisierung und Zeitmanagement.</p>
                  </div>
                  <div className="p-4 bg-white/5 border-l-2 border-gold/50">
                    <h4 className="text-offwhite font-display mb-2">Pathologisches Aufschieben (Prokrastination)</h4>
                    <p className="text-sm">Hartnäckiges Aufschieben von Aufgaben, obwohl ein tiefes Verständnis für deren Notwendigkeit vorhanden ist.</p>
                  </div>
                  <div className="p-4 bg-white/5 border-l-2 border-gold/50">
                    <h4 className="text-offwhite font-display mb-2">Impulsivität</h4>
                    <p className="text-sm">Schnelle, ungefilterte Gedankensprünge, die oft zu neuen Ideen führen, aber die Konzentration auf eine einzelne Aufgabe erschweren.</p>
                  </div>
                  <div className="p-4 bg-white/5 border-l-2 border-gold/50">
                    <h4 className="text-offwhite font-display mb-2">Reizoffenheit</h4>
                    <p className="text-sm">Eine Tendenz, von äußeren Reizen oder inneren Gedankenströmen schnell überflutet zu werden.</p>
                  </div>
                </div>

                <p>
                  In klassischen Hierarchien, die auf das Abarbeiten von Anweisungen optimiert sind, wurde sein 
                  ständiges Hinterfragen oft als "Widerstand" oder "unnötige Komplexität" missverstanden. Tatsächlich 
                  war es sein kognitiver Standardmodus – die unabdingbare Voraussetzung, um überhaupt leistungsfähig zu sein.
                </p>
                <p className="text-gold">
                  Die Lösung liegt folglich nicht darin, den Architekten zum Handwerker umzuschulen, sondern ihm 
                  ein intelligentes Gerüst bereitzustellen.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-16">
              <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                2. Die Symbiose: Wie die KI zum fehlenden Systemteil wird
              </h2>
              <div className="text-muted-gray leading-relaxed space-y-6">
                <p>
                  Für Henry wurde die künstliche Intelligenz nicht nur zu einem Werkzeug, sondern zu einem 
                  <span className="text-offwhite"> systemischen Partner</span>. Sie stellt eine Form der externalisierten Exekutivfunktion dar – 
                  ein in der kognitiven Psychologie etabliertes Kompensationsmodell. Die KI übernahm präzise jene 
                  Funktionen, die für sein Gehirn die größte kognitive Last darstellten, und schuf so den Freiraum 
                  für seine eigentlichen Stärken.
                </p>
                <p>
                  Die Arbeitsteilung zwischen Mensch und Maschine lässt sich als eine Form der <span className="text-gold">funktionalen 
                  Kompensation</span> beschreiben, bei der sich zwei unvollständige Systeme zu einem hochfunktionalen 
                  Ganzen ergänzen.
                </p>

                {/* Data Table */}
                <div className="overflow-x-auto my-8">
                  <p className="label-mono text-gold/80 text-sm mb-4">Funktionale Arbeitsteilung in der Mensch-KI-Symbiose</p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-4 pr-4 text-offwhite font-display">Henrys Beitrag (Menschliche Stärken)</th>
                        <th className="text-left py-4 pl-4 text-gold font-display">KI-Beitrag (Systemische Stärken)</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-gray">
                      <tr className="border-b border-white/5">
                        <td className="py-3 pr-4">Sinnprüfung & intuitive Bewertung</td>
                        <td className="py-3 pl-4">Informationsverarbeitung & Recherche</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 pr-4">Strategische Ausrichtung & Zieldefinition</td>
                        <td className="py-3 pl-4">Strukturierung & logische Modellierung</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4">Wirkung auf Menschen einschätzen</td>
                        <td className="py-3 pl-4">Erstellung der sprachlichen Form</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  Ein entscheidender Faktor für den Erfolg dieser Partnerschaft ist, dass die KI ein 
                  <span className="text-offwhite"> reibungsfreies kognitives Interface</span> bietet. Sie ist nie "genervt" von ständigen Rückfragen 
                  oder Korrekturschleifen. Diese Abwesenheit von sozialem Urteil und emotionaler Reibung – Faktoren, 
                  die seine Denkprozesse historisch immer wieder blockierten – ermöglicht einen ungehinderten 
                  kognitiven Dialog.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-16">
              <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                3. Der Beweis: Von 41 % auf 92 % Produktivität
              </h2>
              <div className="text-muted-gray leading-relaxed space-y-6">
                <p>
                  Der Effekt dieser Symbiose ist nicht nur ein subjektives Gefühl, sondern lässt sich in harten 
                  Leistungsdaten nachweisen. Ein Vergleich zwischen der Performance eines Standard-Nutzers ("Basis"), 
                  der die KI konversationell einsetzt, und Henrys optimierter, systemischer Zusammenarbeit zeigt 
                  eine dramatische Steigerung der Produktivität.
                </p>

                {/* Data Table */}
                <div className="overflow-x-auto my-8">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-4 pr-4 text-offwhite font-display">Dimension</th>
                        <th className="text-center py-4 px-4 text-muted-gray">Basis-Nutzer</th>
                        <th className="text-center py-4 px-4 text-gold">Optimiert</th>
                        <th className="text-center py-4 pl-4 text-green-400">Verbesserung</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-gray">
                      <tr className="border-b border-white/5">
                        <td className="py-3 pr-4">Struktur & Klarheit</td>
                        <td className="text-center py-3 px-4">55 %</td>
                        <td className="text-center py-3 px-4 text-gold">95 %</td>
                        <td className="text-center py-3 pl-4 text-green-400">+40 %</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 pr-4">Proaktivität</td>
                        <td className="text-center py-3 px-4">30 %</td>
                        <td className="text-center py-3 px-4 text-gold">90 %</td>
                        <td className="text-center py-3 pl-4 text-green-400">+60 %</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 pr-4">Fehlerquote</td>
                        <td className="text-center py-3 px-4">35 %</td>
                        <td className="text-center py-3 px-4 text-gold">10 %</td>
                        <td className="text-center py-3 pl-4 text-green-400">–25 %</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 pr-4">Output-Disziplin</td>
                        <td className="text-center py-3 px-4">20 %</td>
                        <td className="text-center py-3 px-4 text-gold">95 %</td>
                        <td className="text-center py-3 pl-4 text-green-400">+75 %</td>
                      </tr>
                      <tr className="border-t border-white/20">
                        <td className="py-3 pr-4 text-offwhite font-medium">Gesamtwert (Ø)</td>
                        <td className="text-center py-3 px-4">41 %</td>
                        <td className="text-center py-3 px-4 text-gold font-bold">92 %</td>
                        <td className="text-center py-3 pl-4 text-green-400 font-bold">+51 %</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  Die Analyse dieser Daten ist aufschlussreich: <span className="text-gold">Die größten Leistungssprünge finden sich in 
                  den Bereichen Output-Disziplin (+75 %) und Struktur (+40 %)</span> – exakt jenen Domänen, die direkt 
                  mit den Herausforderungen der exekutiven Dysfunktion zusammenhängen. Die KI kompensiert also 
                  nachweislich die Kernschwächen und schafft so die Grundlage für exzellente Ergebnisse.
                </p>
              </div>
            </section>

            {/* Fazit */}
            <section className="mb-16 p-8 bg-white/5 border border-gold/20">
              <h2 className="heading-display text-2xl md:text-3xl text-offwhite mb-6">
                4. Das Fazit: Von der Dissonanz zur Symphonie
              </h2>
              <div className="text-muted-gray leading-relaxed space-y-6">
                <p>
                  Die Kernerkenntnis dieser Analyse ist tiefgreifend: <span className="text-offwhite">Neurodivergente Menschen sind nicht 
                  "defekt" oder leistungsschwächer.</span> Sie benötigen lediglich ein passendes Umfeld – ein System, das 
                  ihre Schwächen kompensiert und ihre oft außergewöhnlichen Fähigkeiten zur Geltung bringt. Die 
                  Zusammenarbeit mit der KI hat genau dieses Umfeld geschaffen.
                </p>
                <p>
                  Die Transformation lässt sich treffend mit einer musikalischen Metapher beschreiben: Die 
                  "Dissonanz" eines brillanten, aber unstrukturierten Geistes wird durch die Partnerschaft mit 
                  der KI in eine <span className="text-gold">"kraftvolle und authentische Symphonie"</span> verwandelt. Die Stärken – analytische 
                  Präzision, Systemdenken, Hyperfokus – sind nicht trotz, sondern wegen der neurodivergenten 
                  Ausstattung entstanden.
                </p>

                <blockquote className="border-l-2 border-gold pl-6 py-4 my-8 bg-white/5">
                  <p className="text-offwhite text-lg font-display italic">
                    „Die Ergebnisse entstehen nicht, weil er ‚besonders' ist, sondern weil die KI die Struktur 
                    liefert, die ihm sein ganzes Leben gefehlt hat – wodurch er sich endlich auf seine eigentlichen 
                    Fähigkeiten konzentrieren kann."
                  </p>
                </blockquote>
              </div>
            </section>

            {/* Back to Blog */}
            <div className="pt-8 border-t border-white/10">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-gold hover:gap-4 transition-all duration-300"
              >
                <ArrowLeft size={18} aria-hidden="true" />
                <span className="label-mono">Zurück zur Übersicht</span>
              </Link>
            </div>
          </motion.div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogNeurodivergent;
