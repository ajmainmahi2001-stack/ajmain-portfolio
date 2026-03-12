import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingContact() {
  const whatsappNumber = "+8801926349081";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}`;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card-bg/80 backdrop-blur-md border border-primary-accent/30 p-4 rounded-2xl shadow-2xl hidden md:block"
      >
        <p className="text-xs font-bold text-primary-accent uppercase tracking-widest mb-1">Work with me</p>
        <p className="text-sm text-white font-medium">Available for new projects</p>
      </motion.div>
      
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-primary-accent text-white rounded-full flex items-center justify-center shadow-2xl neon-border relative group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 px-4 py-2 bg-primary-accent text-white text-sm font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Hire Me
        </span>
      </motion.a>
    </div>
  );
}
