import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from '@phosphor-icons/react';
import BlueprintGrid from '../components/BlueprintGrid';
import { useLanguage } from '../context/LanguageContext';

const blogPosts = [
  {
    id: 'ki-automatisierung-kmu',
    titleDe: 'KI-Automatisierung im kleinen Unternehmen',
    titleEn: 'AI Automation in Small Business',
    subtitleDe: 'Ein ehrlicher Blick auf die nächsten Jahre',
    subtitleEn: 'An honest look at the years ahead',
    excerptDe: 'KI entfaltet ihre größte Wirkung nicht dort, wo bereits alles digitalisiert ist. Sie wirkt dort am stärksten, wo noch viel Handarbeit im Büroalltag steckt. Und genau dort arbeiten die meisten kleinen Unternehmen.',
    excerptEn: 'AI has its greatest impact not where everything is already digitized. It works most powerfully where there\'s still a lot of manual work in daily office operations.',
    date: '2026-03-01',
    readTime: '15',
    categoryDe: 'KI für KMU',
    categoryEn: 'AI for SMB'
  },
  {
    id: 'produktivitaet-ki-erkenntnisse',
    titleDe: 'Von 41 % auf 92 % Produktivität',
    titleEn: 'From 41% to 92% Productivity',
    subtitleDe: '5 überraschende Erkenntnisse, die meine Arbeit mit KI für immer verändert haben',
    subtitleEn: '5 surprising insights that changed my work with AI forever',
    excerptDe: 'Der Fehler liegt nicht in der KI, sondern in unserem Ansatz. Dieser Artikel beschreibt einen radikal anderen Weg: einen systemischen Ansatz, der die KI von einem unzuverlässigen Werkzeug zu einem hochpräzisen strategischen Partner macht.',
    excerptEn: 'The problem isn\'t with AI, but with our approach. This article describes a radically different path: a systemic approach that transforms AI from an unreliable tool into a highly precise strategic partner.',
    date: '2026-03-01',
    readTime: '12',
    categoryDe: 'KI-Strategie',
    categoryEn: 'AI Strategy'
  },
  {
    id: 'neurodivergent-ki-partnerschaft',
    titleDe: 'Die fehlende Hälfte',
    titleEn: 'The Missing Half',
    subtitleDe: 'Wie eine KI-Partnerschaft das Potenzial eines neurodivergenten Gehirns entfesselt',
    subtitleEn: 'How an AI partnership unleashes the potential of a neurodivergent brain',
    excerptDe: 'Dies ist die Geschichte eines brillanten Verstandes, dessen Fähigkeiten in traditionellen Systemen lange unsichtbar blieben. Eine Analyse, die zeigt, wie ein kognitives Profil, das oft als hinderlich missverstanden wird, zur außergewöhnlichen Stärke werden kann.',
    excerptEn: 'This is the story of a brilliant mind whose abilities remained invisible in traditional systems for a long time. An analysis showing how a cognitive profile, often misunderstood as a hindrance, can become an extraordinary strength.',
    date: '2026-03-01',
    readTime: '10',
    categoryDe: 'Neurodivergenz',
    categoryEn: 'Neurodivergence'
  }
];

const BlogPage = () => {
  const { language } = useLanguage();
  
  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-32 bg-navy overflow-hidden">
        <BlueprintGrid opacity={0.02} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label-mono text-gold block mb-4"
          >
            Blog
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display text-4xl md:text-5xl lg:text-6xl text-offwhite mb-6"
          >
            {language === 'de' ? 'Gedanken & Erkenntnisse' : 'Thoughts & Insights'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-gray text-lg max-w-2xl mx-auto"
          >
            {language === 'de' 
              ? 'Strategische Perspektiven auf KI-Implementierung, Systemdenken und die Zukunft der Wissensarbeit.'
              : 'Strategic perspectives on AI implementation, systems thinking, and the future of knowledge work.'}
          </motion.p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="relative py-24 md:py-32 bg-navy-light overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="space-y-12">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/blog/${post.id}`} className="block">
                  <div className="relative p-8 md:p-10 bg-navy/40 border border-white/5 hover:border-gold/30 transition-all duration-500">
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-gold/20 group-hover:border-gold/50 transition-colors duration-500" aria-hidden="true" />
                    
                    {/* Category & Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-mono uppercase tracking-wider">
                        {language === 'de' ? post.categoryDe : post.categoryEn}
                      </span>
                      <div className="flex items-center gap-4 text-muted-gray text-sm">
                        <span className="flex items-center gap-2">
                          <Calendar size={14} weight="light" aria-hidden="true" />
                          {new Date(post.date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock size={14} weight="light" aria-hidden="true" />
                          {post.readTime} {language === 'de' ? 'min' : 'min'}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="heading-display text-2xl md:text-3xl lg:text-4xl text-offwhite mb-2 group-hover:text-gold transition-colors duration-300">
                      {language === 'de' ? post.titleDe : post.titleEn}
                    </h2>
                    <p className="text-muted-gray text-lg mb-6">
                      {language === 'de' ? post.subtitleDe : post.subtitleEn}
                    </p>

                    {/* Excerpt */}
                    <p className="text-muted-gray leading-relaxed mb-8">
                      {language === 'de' ? post.excerptDe : post.excerptEn}
                    </p>

                    {/* Read more */}
                    <div className="flex items-center gap-2 text-gold group-hover:gap-4 transition-all duration-300">
                      <span className="label-mono text-sm">{language === 'de' ? 'Weiterlesen' : 'Read more'}</span>
                      <ArrowRight size={16} weight="bold" aria-hidden="true" />
                    </div>

                    {/* Bottom line animation */}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500" aria-hidden="true" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
