import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingContact() {
  const whatsappNumber = "+8801926349081";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card-bg/80 backdrop-blur-md border border-primary-accent/30 p-3 rounded-xl shadow-2xl hidden md:block"
      >
        <p className="text-[10px] font-bold text-primary-accent uppercase tracking-widest mb-0.5">Work with me</p>
        <p className="text-xs text-white font-medium">Available for new projects</p>
      </motion.div>
      
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 md:w-16 md:h-16 bg-primary-accent text-white rounded-full flex items-center justify-center shadow-2xl neon-border relative group"
      >
        <MessageCircle size={24} className="md:w-8 md:h-8" />
        <span className="absolute right-full mr-4 px-3 py-1.5 bg-primary-accent text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Hire Me
        </span>
      </motion.a>
    </div>
  );
}
