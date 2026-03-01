import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from '@phosphor-icons/react';
import BlueprintGrid from '../components/BlueprintGrid';

const blogPosts = [
  {
    id: 'produktivitaet-ki-erkenntnisse',
    title: 'Von 41 % auf 92 % Produktivität',
    subtitle: '5 überraschende Erkenntnisse, die meine Arbeit mit KI für immer verändert haben',
    excerpt: 'Der Fehler liegt nicht in der KI, sondern in unserem Ansatz. Dieser Artikel beschreibt einen radikal anderen Weg: einen systemischen Ansatz, der die KI von einem unzuverlässigen Werkzeug zu einem hochpräzisen strategischen Partner macht.',
    date: '2026-03-01',
    readTime: '12 min',
    category: 'KI-Strategie'
  },
  {
    id: 'neurodivergent-ki-partnerschaft',
    title: 'Die fehlende Hälfte',
    subtitle: 'Wie eine KI-Partnerschaft das Potenzial eines neurodivergenten Gehirns entfesselt',
    excerpt: 'Dies ist die Geschichte eines brillanten Verstandes, dessen Fähigkeiten in traditionellen Systemen lange unsichtbar blieben. Eine Analyse, die zeigt, wie ein kognitives Profil, das oft als hinderlich missverstanden wird, zur außergewöhnlichen Stärke werden kann.',
    date: '2026-03-01',
    readTime: '10 min',
    category: 'Neurodivergenz'
  }
];

const BlogPage = () => {
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
            Gedanken & Erkenntnisse
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-gray text-lg max-w-2xl mx-auto"
          >
            Strategische Perspektiven auf KI-Implementierung, Systemdenken und die Zukunft der Wissensarbeit.
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
                        {post.category}
                      </span>
                      <div className="flex items-center gap-4 text-muted-gray text-sm">
                        <span className="flex items-center gap-2">
                          <Calendar size={14} weight="light" aria-hidden="true" />
                          {new Date(post.date).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock size={14} weight="light" aria-hidden="true" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="heading-display text-2xl md:text-3xl lg:text-4xl text-offwhite mb-2 group-hover:text-gold transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="text-muted-gray text-lg mb-6">
                      {post.subtitle}
                    </p>

                    {/* Excerpt */}
                    <p className="text-muted-gray leading-relaxed mb-8">
                      {post.excerpt}
                    </p>

                    {/* Read more */}
                    <div className="flex items-center gap-2 text-gold group-hover:gap-4 transition-all duration-300">
                      <span className="label-mono text-sm">Weiterlesen</span>
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
