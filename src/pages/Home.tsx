import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Portfolio from '../components/Portfolio';
import CaseStudies from '../components/CaseStudies';
import Clients from '../components/Clients';
import Contact from '../components/Contact';
import { Project, Skill, Experience as ExperienceType, CaseStudy, Client, Profile } from '../types';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
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
      setExperiences(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ExperienceType)));
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
  }, []);

  return (
    <div className="relative">
      <Hero profile={profile} />
      <Experience skills={skills} experiences={experiences} />
      <Portfolio projects={projects} />
      <CaseStudies studies={caseStudies} />
      <Clients clients={clients} />
      <Contact profile={profile} />
    </div>
  );
}
