
export interface PersonalInfo {
  id?: number;
  name: string;
  title: string;
  bio: string;
  profileImage: string;
  email: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface Project {
  id?: number;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt?: string;
}

export interface Skill {
  id?: number;
  name: string;
  category: string;
  level: number; // 1-5
  icon?: string;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
  read?: boolean;
}

export interface User {
  id?: number;
  email: string;
  password?: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}
