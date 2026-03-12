export interface Project {
  id?: string;
  title: string;
  description: string;
  screenshotUrl: string;
  liveUrl: string;
  githubUrl: string;
  tags: string[];
  order: number;
}

export interface Skill {
  id?: string;
  name: string;
  percentage: number;
  category: string;
  iconUrl?: string;
  order: number;
}

export interface Experience {
  id?: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  order: number;
}

export interface CaseStudy {
  id?: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  date: string;
  summary: string;
}

export interface Client {
  id?: string;
  name: string;
  logoUrl: string;
  testimonial: string;
  order: number;
}

export interface Profile {
  id?: string;
  name: string;
  designation: string;
  bio: string;
  email: string;
  phone: string;
  resumeUrl: string;
  photoUrl: string;
  github: string;
  linkedin: string;
  facebook: string;
  location?: string;
}
