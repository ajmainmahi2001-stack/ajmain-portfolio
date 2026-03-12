import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { CaseStudy } from '../types';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CaseStudyPage() {
  const { slug } = useParams();
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudy = async () => {
      const q = query(collection(db, 'caseStudies'), where('slug', '==', slug));
      const snap = await getDocs(q);
      if (!snap.empty) {
        setStudy({ id: snap.docs[0].id, ...snap.docs[0].data() } as CaseStudy);
      }
      setLoading(false);
    };
    fetchStudy();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!study) return <div className="min-h-screen flex items-center justify-center text-white">Case Study not found.</div>;

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-accent hover:text-neon-highlight mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center gap-2 text-text-secondary text-sm">
              <Calendar size={16} /> {study.date}
            </span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span className="text-primary-accent text-sm font-bold uppercase tracking-widest">Case Study</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">{study.title}</h1>
          
          <div className="rounded-3xl overflow-hidden mb-12 border border-primary-accent/20">
            <img
              src={study.thumbnail}
              alt={study.title}
              className="w-full aspect-video object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="prose prose-invert prose-primary max-w-none">
            <div className="markdown-body text-text-secondary leading-relaxed space-y-6 text-lg">
              <ReactMarkdown>{study.content}</ReactMarkdown>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
            <div className="flex gap-4">
              <button className="p-3 bg-white/5 rounded-full hover:bg-primary-accent/20 transition-all text-white">
                <Share2 size={20} />
              </button>
            </div>
            <Link to="/" className="px-8 py-3 bg-primary-accent text-white rounded-full font-bold hover:bg-neon-highlight transition-all">
              Work with me
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
