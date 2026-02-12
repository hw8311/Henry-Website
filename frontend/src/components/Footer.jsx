import React from 'react';
import { motion } from 'framer-motion';
import content from '../data/content.json';

export const Footer = () => {
  const { footer } = content;

  return (
    <footer 
      data-testid="footer"
      className="relative py-12 bg-navy border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-display text-lg text-offwhite mb-1">
              Henry Wilke
            </p>
            <p className="label-mono text-muted-gray">
              {footer.tagline}
            </p>
          </motion.div>

          {/* Copyright */}
          <motion.p 
            className="text-muted-gray text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            data-testid="footer-copyright"
          >
            {footer.copyright}
          </motion.p>
        </div>

        {/* Decorative Line */}
        <motion.div 
          className="mt-8 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
    </footer>
  );
};

export default Footer;
