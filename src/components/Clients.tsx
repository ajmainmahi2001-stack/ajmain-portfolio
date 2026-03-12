import { motion } from 'framer-motion';
import { Client } from '../types';
import { getDirectDriveLink } from '../utils';

export default function Clients({ clients }: { clients: Client[] }) {
  if (clients.length === 0) return null;

  return (
    <section className="py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-sm font-bold text-text-secondary uppercase tracking-[0.3em] mb-16">Trusted by Innovative Companies</h2>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {clients.map((client, index) => (
            <motion.img
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              src={getDirectDriveLink(client.logoUrl)}
              alt={client.name}
              className="h-8 md:h-12 object-contain"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
