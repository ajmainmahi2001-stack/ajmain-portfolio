import { motion } from 'framer-motion';
import { Skill, Experience as ExperienceType } from '../types';
import { getDirectDriveLink } from '../utils';

export default function Experience({ skills, experiences }: { skills: Skill[], experiences: ExperienceType[] }) {
  return (
    <section id="skills" className="py-24 bg-card-bg/30 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skills Section */}
          <div>
            <h2 className="text-3xl font-bold mb-12 flex items-center">
              <span className="w-12 h-1 bg-primary-accent mr-4 rounded-full" />
              Technical Skills
            </h2>
            <div className="space-y-8">
              {skills.sort((a, b) => a.order - b.order).map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2 items-center">
                    <div className="flex items-center gap-3">
                      {skill.iconUrl && (
                        <img 
                          src={getDirectDriveLink(skill.iconUrl)} 
                          alt={skill.name} 
                          className="w-6 h-6 object-contain"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <span className="font-medium text-white">{skill.name}</span>
                    </div>
                    <span className="text-primary-accent">{skill.percentage}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary-accent to-neon-highlight"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h2 className="text-3xl font-bold mb-12 flex items-center">
              <span className="w-12 h-1 bg-neon-highlight mr-4 rounded-full" />
              Work Experience
            </h2>
            <div className="space-y-8 relative before:absolute before:left-0 before:top-0 before:w-px before:h-full before:bg-primary-accent/20">
              {experiences.sort((a, b) => a.order - b.order).map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="pl-8 relative"
                >
                  <div className="absolute left-0 top-2 -translate-x-1/2 w-3 h-3 bg-primary-accent rounded-full border-4 border-bg" />
                  <span className="text-sm text-primary-accent font-medium">{exp.duration}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{exp.role}</h3>
                  <p className="text-neon-highlight text-sm mb-3">{exp.company}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
