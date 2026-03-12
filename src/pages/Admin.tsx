import { useState, useEffect } from 'react';
import { auth, signInWithGoogle, db, handleFirestoreError, OperationType } from '../firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, setDoc } from 'firebase/firestore';
import { Project, Skill, Experience, CaseStudy, Client, Profile } from '../types';
import { Plus, Trash2, Edit2, LogOut, LayoutDashboard, Briefcase, Code, BookOpen, Users, UserCircle, Save, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Admin({ user, loading }: { user: any, loading: boolean }) {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) return;

    const unsubProfile = onSnapshot(collection(db, 'profile'), (snap) => {
      if (!snap.empty) {
        setProfile({ id: snap.docs[0].id, ...snap.docs[0].data() } as Profile);
      }
    });

    const unsubProjects = onSnapshot(query(collection(db, 'projects'), orderBy('order')), (snap) => {
      setProjects(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'projects');
    });
    const unsubSkills = onSnapshot(query(collection(db, 'skills'), orderBy('order')), (snap) => {
      setSkills(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Skill)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'skills');
    });
    const unsubExp = onSnapshot(query(collection(db, 'experience'), orderBy('order')), (snap) => {
      setExperiences(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Experience)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'experience');
    });
    const unsubCase = onSnapshot(collection(db, 'caseStudies'), (snap) => {
      setCaseStudies(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as CaseStudy)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'caseStudies');
    });
    const unsubClients = onSnapshot(query(collection(db, 'clients'), orderBy('order')), (snap) => {
      setClients(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'clients');
    });

    return () => {
      unsubProfile();
      unsubProjects();
      unsubSkills();
      unsubExp();
      unsubCase();
      unsubClients();
    };
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="glass-card p-12 rounded-3xl text-center max-w-md w-full mx-6">
          <div className="w-20 h-20 bg-primary-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <UserCircle size={48} className="text-primary-accent" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Admin Access</h1>
          <p className="text-text-secondary mb-8">Please sign in with your authorized Google account to manage your portfolio.</p>
          <button
            onClick={signInWithGoogle}
            className="w-full py-4 bg-primary-accent text-white rounded-xl font-bold hover:bg-neon-highlight transition-all flex items-center justify-center gap-3"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = Object.fromEntries(formData.entries());

    // Handle tags for projects
    if (activeTab === 'projects' && data.tags) {
      data.tags = data.tags.split(',').map((t: string) => t.trim());
    }
    // Handle number for order and percentage
    if (data.order) data.order = Number(data.order);
    if (data.percentage) data.percentage = Number(data.percentage);

    try {
      if (activeTab === 'profile') {
        const profileData = {
          ...data,
          location: 'Chattogram, Bangladesh',
          // Preserve existing fields if they are not in the form
          name: profile?.name || 'Ajmain Mahi',
          designation: profile?.designation || 'Full Stack Developer',
          bio: profile?.bio || 'Crafting robust, scalable, and high-performance web applications with modern technologies. Specializing in end-to-end development from database architecture to pixel-perfect UI.',
          email: profile?.email || 'ajmainmahi2001@gmail.com',
          phone: profile?.phone || '+8801926349081',
          github: profile?.github || 'https://github.com',
          linkedin: profile?.linkedin || 'https://linkedin.com',
          facebook: profile?.facebook || 'https://facebook.com',
        };
        if (profile?.id) {
          await updateDoc(doc(db, 'profile', profile.id), profileData);
        } else {
          await addDoc(collection(db, 'profile'), profileData);
        }
        toast.success('Profile updated successfully!');
      } else {
        if (editingItem?.id) {
          await updateDoc(doc(db, activeTab, editingItem.id), data);
          toast.success('Item updated successfully!');
        } else {
          await addDoc(collection(db, activeTab), data);
          toast.success('Item added successfully!');
        }
      }
      setShowModal(false);
      setEditingItem(null);
    } catch (err) {
      toast.error('Failed to save changes.');
      handleFirestoreError(err, editingItem?.id ? OperationType.UPDATE : OperationType.CREATE, activeTab);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDoc(doc(db, activeTab, id));
        toast.success('Item deleted successfully!');
      } catch (err) {
        toast.error('Failed to delete item.');
        handleFirestoreError(err, OperationType.DELETE, activeTab);
      }
    }
  };

  const tabs = [
    { id: 'projects', name: 'Projects', icon: LayoutDashboard },
    { id: 'skills', name: 'Skills', icon: Code },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'caseStudies', name: 'Case Studies', icon: BookOpen },
    { id: 'clients', name: 'Clients', icon: Users },
    { id: 'profile', name: 'Profile Settings', icon: Settings },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-text-secondary">Welcome back, {user.displayName}</p>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-red-500/20 hover:border-red-500/50 transition-all"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-medium transition-all ${activeTab === tab.id ? 'bg-primary-accent text-white shadow-lg' : 'text-text-secondary hover:bg-white/5'}`}
              >
                <tab.icon size={20} /> {tab.name}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-3xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold capitalize">{activeTab.replace(/([A-Z])/g, ' $1')}</h2>
                {activeTab !== 'profile' && (
                  <button
                    onClick={() => { setEditingItem(null); setShowModal(true); }}
                    className="p-3 bg-primary-accent text-white rounded-xl hover:bg-neon-highlight transition-all"
                  >
                    <Plus size={20} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {activeTab === 'profile' && (
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input name="photoUrl" label="Hero Section Image URL (Google Drive)" defaultValue={profile?.photoUrl} />
                      <Input name="resumeUrl" label="CV Drive Link (Google Drive)" defaultValue={profile?.resumeUrl} />
                    </div>
                    <div className="p-4 bg-primary-accent/5 rounded-2xl border border-primary-accent/20">
                      <p className="text-sm text-text-secondary">
                        Note: Name, Bio, Social links, and Location (Chattogram, Bangladesh) are set to default values and are not editable here.
                      </p>
                    </div>
                    <button type="submit" className="w-full py-4 bg-primary-accent text-white rounded-xl font-bold hover:bg-neon-highlight transition-all flex items-center justify-center gap-2">
                      <Save size={20} /> Save Profile
                    </button>
                  </form>
                )}

                {activeTab === 'projects' && projects.map(item => (
                  <ItemRow key={item.id} title={item.title} subtitle={item.tags.join(', ')} onEdit={() => { setEditingItem(item); setShowModal(true); }} onDelete={() => handleDelete(item.id!)} />
                ))}
                {activeTab === 'skills' && skills.map(item => (
                  <ItemRow key={item.id} title={item.name} subtitle={`${item.percentage}%`} onEdit={() => { setEditingItem(item); setShowModal(true); }} onDelete={() => handleDelete(item.id!)} />
                ))}
                {activeTab === 'experience' && experiences.map(item => (
                  <ItemRow key={item.id} title={item.role} subtitle={item.company} onEdit={() => { setEditingItem(item); setShowModal(true); }} onDelete={() => handleDelete(item.id!)} />
                ))}
                {activeTab === 'caseStudies' && caseStudies.map(item => (
                  <ItemRow key={item.id} title={item.title} subtitle={item.slug} onEdit={() => { setEditingItem(item); setShowModal(true); }} onDelete={() => handleDelete(item.id!)} />
                ))}
                {activeTab === 'clients' && clients.map(item => (
                  <ItemRow key={item.id} title={item.name} subtitle="Client" onEdit={() => { setEditingItem(item); setShowModal(true); }} onDelete={() => handleDelete(item.id!)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative glass-card w-full max-w-2xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">{editingItem ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}</h3>
                <button onClick={() => setShowModal(false)} className="text-text-secondary hover:text-white"><X size={24} /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                {activeTab === 'projects' && (
                  <>
                    <Input name="title" label="Title" defaultValue={editingItem?.title} required />
                    <Input name="description" label="Description" defaultValue={editingItem?.description} textarea />
                    <Input name="screenshotUrl" label="Screenshot URL (Google Drive)" defaultValue={editingItem?.screenshotUrl} required />
                    <Input name="liveUrl" label="Live Demo URL" defaultValue={editingItem?.liveUrl} />
                    <Input name="githubUrl" label="GitHub URL" defaultValue={editingItem?.githubUrl} />
                    <Input name="tags" label="Tags (comma separated)" defaultValue={editingItem?.tags?.join(', ')} />
                    <Input name="order" label="Order" type="number" defaultValue={editingItem?.order || 0} />
                  </>
                )}
                {activeTab === 'skills' && (
                  <>
                    <Input name="name" label="Skill Name" defaultValue={editingItem?.name} required />
                    <Input name="percentage" label="Percentage (0-100)" type="number" defaultValue={editingItem?.percentage || 0} required />
                    <Input name="category" label="Category" defaultValue={editingItem?.category} />
                    <Input name="iconUrl" label="Icon URL (Google Drive)" defaultValue={editingItem?.iconUrl} />
                    <Input name="order" label="Order" type="number" defaultValue={editingItem?.order || 0} />
                  </>
                )}
                {activeTab === 'experience' && (
                  <>
                    <Input name="company" label="Company" defaultValue={editingItem?.company} required />
                    <Input name="role" label="Role" defaultValue={editingItem?.role} required />
                    <Input name="duration" label="Duration (e.g. 2021 - Present)" defaultValue={editingItem?.duration} required />
                    <Input name="description" label="Description" defaultValue={editingItem?.description} textarea />
                    <Input name="order" label="Order" type="number" defaultValue={editingItem?.order || 0} />
                  </>
                )}
                {activeTab === 'caseStudies' && (
                  <>
                    <Input name="title" label="Title" defaultValue={editingItem?.title} required />
                    <Input name="slug" label="Slug (e.g. my-project-case-study)" defaultValue={editingItem?.slug} required />
                    <Input name="summary" label="Summary" defaultValue={editingItem?.summary} textarea />
                    <Input name="content" label="Content (Markdown)" defaultValue={editingItem?.content} textarea />
                    <Input name="thumbnail" label="Thumbnail URL" defaultValue={editingItem?.thumbnail} />
                    <Input name="date" label="Date" defaultValue={editingItem?.date} />
                  </>
                )}
                {activeTab === 'clients' && (
                  <>
                    <Input name="name" label="Client Name" defaultValue={editingItem?.name} required />
                    <Input name="logoUrl" label="Logo URL" defaultValue={editingItem?.logoUrl} required />
                    <Input name="testimonial" label="Testimonial" defaultValue={editingItem?.testimonial} textarea />
                    <Input name="order" label="Order" type="number" defaultValue={editingItem?.order || 0} />
                  </>
                )}

                <button type="submit" className="w-full py-4 bg-primary-accent text-white rounded-xl font-bold hover:bg-neon-highlight transition-all flex items-center justify-center gap-2">
                  <Save size={20} /> Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ItemRow({ title, subtitle, onEdit, onDelete }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-primary-accent/30 transition-all group">
      <div>
        <h4 className="font-bold text-white">{title}</h4>
        <p className="text-xs text-text-secondary">{subtitle}</p>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onEdit} className="p-2 text-text-secondary hover:text-primary-accent transition-colors"><Edit2 size={18} /></button>
        <button onClick={onDelete} className="p-2 text-text-secondary hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
      </div>
    </div>
  );
}

function Input({ name, label, type = 'text', defaultValue, required, textarea }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          required={required}
          rows={4}
          className="w-full bg-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-accent outline-none transition-all resize-none"
        />
      ) : (
        <input
          name={name}
          type={type}
          defaultValue={defaultValue}
          required={required}
          className="w-full bg-bg/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-accent outline-none transition-all"
        />
      )}
    </div>
  );
}
