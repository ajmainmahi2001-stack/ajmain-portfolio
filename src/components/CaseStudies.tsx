import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CaseStudy } from '../types';
import { getDirectDriveLink } from '../utils';

export default function CaseStudies({ studies }: { studies: CaseStudy[] }) {
  return (
    <section id="case-studies" className="py-24 bg-card-bg/20">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">Case <span className="text-neon-highlight">Studies</span></h2>
            <p className="text-text-secondary max-w-xl">
              In-depth analysis of complex problems and the strategic solutions I implemented to solve them.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {studies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-3xl overflow-hidden flex flex-col md:flex-row"
            >
              <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
                <img
                  src={getDirectDriveLink(study.thumbnail)}
                  alt={study.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 md:w-3/5 flex flex-col justify-center">
                <span className="text-xs font-bold text-primary-accent uppercase tracking-widest mb-2">{study.date}</span>
                <h3 className="text-2xl font-bold mb-4 text-white">{study.title}</h3>
                <p className="text-text-secondary text-sm mb-6 line-clamp-3">{study.summary}</p>
                <Link
                  to={`/case-study/${study.slug}`}
                  className="flex items-center gap-2 text-primary-accent font-semibold hover:text-neon-highlight transition-colors"
                >
                  Read Full Case Study <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
