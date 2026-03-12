import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';
import { getDirectDriveLink } from '../utils';

export default function Portfolio({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured <span className="text-primary-accent">Projects</span></h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            A selection of my recent works, ranging from complex web applications to sleek UI designs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.sort((a, b) => a.order - b.order).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-3xl overflow-hidden group"
            >
              {/* Hover Scroll Image Container */}
              <div className="h-64 hover-scroll-container bg-bg">
                <img
                  src={getDirectDriveLink(project.screenshotUrl)}
                  alt={project.title}
                  className="w-full hover-scroll-image object-top"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 bg-primary-accent/10 text-primary-accent rounded-full border border-primary-accent/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-accent transition-colors">{project.title}</h3>
                <p className="text-text-secondary text-sm mb-6 line-clamp-2">{project.description}</p>
                
                <div className="flex gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-accent text-white rounded-xl text-sm font-semibold hover:bg-neon-highlight transition-all"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-primary-accent/30 text-white rounded-xl hover:bg-primary-accent/10 transition-all"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
