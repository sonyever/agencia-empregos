// Tipos de usuários
export type UserType = 'candidate' | 'employer' | 'student' | 'admin';

export interface User {
  id: string;
  email: string;
  password?: string;
  type: UserType;
  createdAt: Date;
  updatedAt: Date;
}

// Candidato
export interface Candidate extends User {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth?: Date;
  address: Address;
  resume?: string; // URL do arquivo
  skills: string[];
  experience: Experience[];
  education: Education[];
  preferredSalary?: number;
  availability: 'immediate' | 'two-weeks' | 'one-month' | 'negotiable';
  profilePicture?: string;
  bio?: string;
  applications: JobApplication[];
  notifications: Notification[];
}

// Empregador
export interface Employer extends User {
  companyName: string;
  contactPerson: string;
  phone: string;
  website?: string;
  address: Address;
  industry: string;
  companySize: string;
  description: string;
  logo?: string;
  jobs: Job[];
  reviews: Review[];
}

// Estudante
export interface Student extends User {
  firstName: string;
  lastName: string;
  phone: string;
  address: Address;
  enrolledCourses: CourseEnrollment[];
  completedCourses: string[];
  certificates: Certificate[];
}

// Endereço
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Experiência profissional
export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  location: string;
}

// Educação
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  gpa?: number;
}

// Vaga de emprego
export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  employmentType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  location: string;
  remote: boolean;
  category: string;
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  employerId: string;
  employer?: Employer;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  status: 'active' | 'closed' | 'draft';
  applications: JobApplication[];
  tags: string[];
}

// Aplicação para vaga
export interface JobApplication {
  id: string;
  jobId: string;
  candidateId: string;
  job?: Job;
  candidate?: Candidate;
  status: 'pending' | 'reviewing' | 'interview' | 'rejected' | 'accepted';
  appliedAt: Date;
  coverLetter?: string;
  notes?: string;
  interviewDate?: Date;
}

// Curso
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number; // em horas
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  price: number;
  thumbnail: string;
  curriculum: Lesson[];
  enrollmentCount: number;
  rating: number;
  reviews: Review[];
  tags: string[];
  relatedJobs: string[]; // IDs de vagas relacionadas
  createdAt: Date;
  status: 'active' | 'coming-soon' | 'archived';
}

// Aula
export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  materials: string[];
  duration: number; // em minutos
  order: number;
}

// Matrícula em curso
export interface CourseEnrollment {
  id: string;
  courseId: string;
  studentId: string;
  course?: Course;
  student?: Student;
  enrolledAt: Date;
  progress: number; // 0-100
  completedLessons: string[];
  lastAccessedAt?: Date;
  certificateIssued: boolean;
}

// Certificado
export interface Certificate {
  id: string;
  courseId: string;
  studentId: string;
  course?: Course;
  issuedAt: Date;
  certificateUrl: string;
}

// Avaliação
export interface Review {
  id: string;
  rating: number; // 1-5
  comment: string;
  reviewerId: string;
  reviewerName: string;
  targetType: 'employer' | 'course';
  targetId: string;
  createdAt: Date;
}

// Notificação
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'job-match' | 'application-update' | 'course-update' | 'system';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

// Pesquisa
export interface SearchFilters {
  query?: string;
  category?: string;
  location?: string;
  salaryRange?: {
    min: number;
    max: number;
  };
  employmentType?: string[];
  experienceLevel?: string[];
  remote?: boolean;
  sortBy?: 'relevance' | 'date' | 'salary';
  sortOrder?: 'asc' | 'desc';
}

// Resultados de pesquisa
export interface SearchResults {
  jobs: Job[];
  candidates: Candidate[];
  courses: Course[];
  total: number;
  page: number;
  limit: number;
}

// Estatísticas
export interface Analytics {
  totalJobs: number;
  totalCandidates: number;
  totalEmployers: number;
  totalCourses: number;
  recentApplications: number;
  successfulMatches: number;
  popularCategories: { category: string; count: number }[];
  monthlyStats: { month: string; applications: number; hires: number }[];
}
