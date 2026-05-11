const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://danielmb-api.vercel.app/api";
const API_ASSET_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

export const resolveMediaUrl = (
  url: string | undefined,
  fallback = "/placeholder.svg",
) => {
  if (!url) return fallback;

  const cleanUrl = url.trim();
  if (!cleanUrl) return fallback;
  if (/^(https?:)?\/\//.test(cleanUrl) || cleanUrl.startsWith("data:")) {
    return cleanUrl;
  }

  if (cleanUrl.startsWith("/uploads/")) {
    return `${API_ASSET_BASE_URL}${cleanUrl}`;
  }

  if (cleanUrl.startsWith("uploads/")) {
    return `${API_ASSET_BASE_URL}/${cleanUrl}`;
  }

  return cleanUrl.startsWith("/") ? cleanUrl : `/${cleanUrl}`;
};

// Types pour l'API
export interface PersonalInfo {
  id?: number;
  nom_complet: string;
  profession: string;
  localisation: string;
  description_courte: string;
  photo_profil?: string;
  email_contact: string;
  github_url?: string;
  linkedin_url?: string;
  facebook_url?: string;
}

export interface Project {
  id?: number;
  _id?: string;
  titre: string;
  description: string;
  technologies: string[];
  image_url?: string;
  github_url?: string;
  demo_url?: string;
  statut: "actif" | "inactif";
}

export interface Skill {
  id?: number;
  nom: string;
  niveau: number;
  categorie: string;
  icone?: string;
}

export interface Contact {
  _id?: string;
  nom: string;
  email: string;
  message: string;
  createdAt?: string;
  is_read?: boolean;
  ip_address?: string;
}

export interface AuthUser {
  id: number;
  email: string;
  nom: string;
  role: string;
}

export interface RegisterData {
  nom: string;
  email: string;
  password: string;
}

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem("admin_token");
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Authentication
  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: AuthUser }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erreur de connexion");
    }

    const data = await response.json();
    this.token = data.token;
    localStorage.setItem("admin_token", data.token);
    return data;
  }

  async register(
    registerData: RegisterData,
  ): Promise<{ token: string; user: AuthUser }> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erreur lors de l'inscription");
    }

    const data = await response.json();
    this.token = data.token;
    localStorage.setItem("admin_token", data.token);
    return data;
  }

  async logout(): Promise<void> {
    this.token = null;
    localStorage.removeItem("admin_token");
  }

  async verifyToken(): Promise<{ valid: boolean; user?: AuthUser }> {
    if (!this.token) return { valid: false };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: this.getHeaders(),
      });
      return await response.json();
    } catch {
      return { valid: false };
    }
  }

  // Portfolio public
  async getPersonalInfo(): Promise<PersonalInfo> {
    const response = await fetch(`${API_BASE_URL}/portfolio/info`);
    return await response.json();
  }

  async getProjects(): Promise<Project[]> {
    const response = await fetch(`${API_BASE_URL}/portfolio/projects`);
    return await response.json();
  }

  async getProjectById(id: string): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/portfolio/projects/${id}`);
    if (!response.ok) {
      throw new Error("Projet non trouvé");
    }
    return await response.json();
  }

  async getSkills(): Promise<Record<string, Skill[]>> {
    const response = await fetch(`${API_BASE_URL}/portfolio/skills`);
    return await response.json();
  }

  // Contact
  async sendContact(
    contact: Omit<Contact, "_id" | "createdAt" | "is_read" | "ip_address">,
  ): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi du message");
    }
  }

  // Admin - Personal Info
  async updatePersonalInfo(data: PersonalInfo): Promise<PersonalInfo> {
    const response = await fetch(`${API_BASE_URL}/admin/personal-info`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour");
    }

    return await response.json();
  }

  // Admin - Projects
  async getAllProjects(): Promise<Project[]> {
    const response = await fetch(`${API_BASE_URL}/admin/projects`, {
      headers: this.getHeaders(),
    });
    return await response.json();
  }

  async createProject(project: Omit<Project, "_id">): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/admin/projects`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la création");
    }

    return await response.json();
  }

  async updateProject(id: string, project: Partial<Project>): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour");
    }
  }

  async deleteProject(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression");
    }
  }

  // Admin - Skills
  async getAllSkills(): Promise<Record<string, Skill[]>> {
    const response = await fetch(`${API_BASE_URL}/admin/skills`, {
      headers: this.getHeaders(),
    });
    return await response.json();
  }

  async createSkill(skill: Omit<Skill, "id">): Promise<Skill> {
    const response = await fetch(`${API_BASE_URL}/admin/skills`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(skill),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la création");
    }

    return await response.json();
  }

  async updateSkill(id: number, skill: Partial<Skill>): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/skills/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(skill),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour");
    }
  }

  async deleteSkill(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/skills/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression");
    }
  }

  // Admin - Contacts
  async getContacts(
    page = 1,
    limit = 20,
  ): Promise<{ contacts: Contact[]; unreadCount: number }> {
    const response = await fetch(
      `${API_BASE_URL}/admin/contacts?page=${page}&limit=${limit}`,
      {
        headers: this.getHeaders(),
      },
    );
    return await response.json();
  }

  async markContactAsRead(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/contacts/${id}/read`, {
      method: "PUT",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Erreur lors du marquage");
    }
  }

  async deleteContact(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/contacts/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression");
    }
  }

  // Upload
  async uploadImage(file: File): Promise<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${API_BASE_URL}/admin/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'upload");
    }

    return await response.json();
  }

  // Generic methods for flexibility
  async get<T = unknown>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erreur lors de la requête");
    }

    return await response.json();
  }

  async post<T = unknown>(
    endpoint: string,
    data: Record<string, unknown>,
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erreur lors de la requête");
    }

    return await response.json();
  }

  async put<T = unknown>(
    endpoint: string,
    data: Record<string, unknown>,
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erreur lors de la requête");
    }

    return await response.json();
  }

  async delete<T = unknown>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Erreur lors de la requête");
    }

    return await response.json();
  }
}

export default new ApiService();
