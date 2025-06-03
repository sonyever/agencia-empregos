import {
  type Job,
  type Candidate,
  type Employer,
  type Course,
  JobApplication,
  Review,
  type Notification,
  type Analytics
} from '@/types';

// Empregadores simulados
export const mockEmployers: Employer[] = [
  {
    id: '1',
    email: 'contato@techinova.com',
    type: 'employer',
    companyName: 'TechNova Soluções',
    contactPerson: 'Maria Silva',
    phone: '(11) 99999-0001',
    website: 'https://techinova.com',
    address: {
      street: 'Av. Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-000',
      country: 'Brasil'
    },
    industry: 'Tecnologia',
    companySize: '51-200 funcionários',
    description: 'Empresa inovadora de tecnologia focada em soluções digitais para empresas.',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
    jobs: [],
    reviews: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-01')
  },
  {
    id: '2',
    email: 'rh@digitalmkt.com',
    type: 'employer',
    companyName: 'Digital Marketing Pro',
    contactPerson: 'João Santos',
    phone: '(11) 99999-0002',
    website: 'https://digitalmkt.com',
    address: {
      street: 'Rua Augusta, 500',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01305-000',
      country: 'Brasil'
    },
    industry: 'Marketing Digital',
    companySize: '11-50 funcionários',
    description: 'Agência especializada em marketing digital e estratégias online.',
    logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&h=200&fit=crop',
    jobs: [],
    reviews: [],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-12-01')
  }
];

// Vagas simuladas
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Desenvolvedor Frontend React',
    description: 'Buscamos um desenvolvedor frontend experiente para trabalhar com React, TypeScript e tecnologias modernas.',
    requirements: [
      '3+ anos de experiência com React',
      'Conhecimento em TypeScript',
      'Experiência com Next.js',
      'Conhecimento em CSS/SASS',
      'Git e metodologias ágeis'
    ],
    responsibilities: [
      'Desenvolver interfaces de usuário responsivas',
      'Colaborar com designers e backend',
      'Participar de code reviews',
      'Manter código limpo e documentado'
    ],
    salaryRange: { min: 8000, max: 12000 },
    employmentType: 'full-time',
    location: 'São Paulo, SP',
    remote: true,
    category: 'Tecnologia',
    experienceLevel: 'mid',
    employerId: '1',
    employer: mockEmployers[0],
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01'),
    expiresAt: new Date('2025-01-01'),
    status: 'active',
    applications: [],
    tags: ['React', 'TypeScript', 'Frontend', 'Remote']
  },
  {
    id: '2',
    title: 'Especialista em Marketing Digital',
    description: 'Profissional para gerenciar campanhas digitais e estratégias de marketing online.',
    requirements: [
      '2+ anos em marketing digital',
      'Google Ads e Facebook Ads',
      'SEO/SEM',
      'Analytics e métricas',
      'Inglês intermediário'
    ],
    responsibilities: [
      'Criar e gerenciar campanhas',
      'Análise de performance',
      'Otimização de conversões',
      'Relatórios mensais'
    ],
    salaryRange: { min: 6000, max: 9000 },
    employmentType: 'full-time',
    location: 'São Paulo, SP',
    remote: false,
    category: 'Marketing',
    experienceLevel: 'mid',
    employerId: '2',
    employer: mockEmployers[1],
    createdAt: new Date('2024-11-28'),
    updatedAt: new Date('2024-11-28'),
    expiresAt: new Date('2024-12-28'),
    status: 'active',
    applications: [],
    tags: ['Marketing Digital', 'Google Ads', 'SEO', 'Analytics']
  },
  {
    id: '3',
    title: 'Estágio em Desenvolvimento Web',
    description: 'Oportunidade de estágio para estudantes de tecnologia interessados em desenvolvimento web.',
    requirements: [
      'Cursando tecnologia ou áreas afins',
      'Conhecimento básico em HTML/CSS/JS',
      'Vontade de aprender',
      'Disponibilidade 6h/dia'
    ],
    responsibilities: [
      'Apoiar desenvolvimento de projetos',
      'Participar de treinamentos',
      'Manutenção de sites',
      'Documentação técnica'
    ],
    salaryRange: { min: 1500, max: 2000 },
    employmentType: 'internship',
    location: 'São Paulo, SP',
    remote: true,
    category: 'Tecnologia',
    experienceLevel: 'entry',
    employerId: '1',
    employer: mockEmployers[0],
    createdAt: new Date('2024-11-25'),
    updatedAt: new Date('2024-11-25'),
    expiresAt: new Date('2024-12-25'),
    status: 'active',
    applications: [],
    tags: ['Estágio', 'Web Development', 'Entry Level', 'Remote']
  }
];

// Candidatos simulados
export const mockCandidates: Candidate[] = [
  {
    id: '1',
    email: 'ana.oliveira@email.com',
    type: 'candidate',
    firstName: 'Ana',
    lastName: 'Oliveira',
    phone: '(11) 98888-0001',
    dateOfBirth: new Date('1995-05-15'),
    address: {
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil'
    },
    resume: '/resumes/ana-oliveira.pdf',
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Git'],
    experience: [
      {
        id: '1',
        company: 'StartupTech',
        position: 'Desenvolvedora Frontend',
        startDate: new Date('2022-01-15'),
        endDate: new Date('2024-10-30'),
        current: false,
        description: 'Desenvolvimento de aplicações web com React e TypeScript.',
        location: 'São Paulo, SP'
      }
    ],
    education: [
      {
        id: '1',
        institution: 'Universidade de São Paulo',
        degree: 'Bacharelado',
        field: 'Ciência da Computação',
        startDate: new Date('2018-02-01'),
        endDate: new Date('2021-12-15'),
        current: false,
        gpa: 8.5
      }
    ],
    preferredSalary: 10000,
    availability: 'two-weeks',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b9c88009?w=200&h=200&fit=crop&crop=face',
    bio: 'Desenvolvedora apaixonada por tecnologia com foco em criar experiências digitais incríveis.',
    applications: [],
    notifications: [],
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-12-01')
  },
  {
    id: '2',
    email: 'carlos.santos@email.com',
    type: 'candidate',
    firstName: 'Carlos',
    lastName: 'Santos',
    phone: '(11) 98888-0002',
    dateOfBirth: new Date('1992-08-22'),
    address: {
      street: 'Av. Brasil, 456',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '20000-000',
      country: 'Brasil'
    },
    skills: ['Marketing Digital', 'Google Ads', 'SEO', 'Analytics', 'Copywriting'],
    experience: [
      {
        id: '2',
        company: 'Agência Creative',
        position: 'Analista de Marketing',
        startDate: new Date('2020-03-01'),
        endDate: undefined,
        current: true,
        description: 'Gestão de campanhas digitais e análise de performance.',
        location: 'Rio de Janeiro, RJ'
      }
    ],
    education: [
      {
        id: '2',
        institution: 'UFRJ',
        degree: 'Bacharelado',
        field: 'Comunicação Social',
        startDate: new Date('2015-03-01'),
        endDate: new Date('2019-07-15'),
        current: false,
        gpa: 8.2
      }
    ],
    preferredSalary: 8000,
    availability: 'immediate',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    bio: 'Especialista em marketing digital com experiência em campanhas de alta performance.',
    applications: [],
    notifications: [],
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date('2024-12-01')
  }
];

// Cursos simulados
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Desenvolvimento Web Completo',
    description: 'Curso completo de desenvolvimento web do básico ao avançado, incluindo HTML, CSS, JavaScript, React e Node.js.',
    category: 'Tecnologia',
    duration: 120,
    level: 'beginner',
    instructor: 'Prof. Ricardo Silva',
    price: 599,
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    curriculum: [
      {
        id: '1',
        title: 'Introdução ao HTML',
        description: 'Fundamentos da linguagem HTML',
        duration: 60,
        order: 1,
        materials: ['slides.pdf', 'exercicios.zip']
      },
      {
        id: '2',
        title: 'CSS Avançado',
        description: 'Estilização avançada com CSS',
        duration: 90,
        order: 2,
        materials: ['exemplos.zip']
      }
    ],
    enrollmentCount: 1250,
    rating: 4.8,
    reviews: [],
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    relatedJobs: ['1', '3'],
    createdAt: new Date('2024-01-01'),
    status: 'active'
  },
  {
    id: '2',
    title: 'Marketing Digital Avançado',
    description: 'Estratégias avançadas de marketing digital, incluindo SEO, SEM, redes sociais e analytics.',
    category: 'Marketing',
    duration: 80,
    level: 'intermediate',
    instructor: 'Prof. Amanda Costa',
    price: 449,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    curriculum: [
      {
        id: '3',
        title: 'SEO Fundamentals',
        description: 'Otimização para mecanismos de busca',
        duration: 45,
        order: 1,
        materials: ['guia-seo.pdf']
      }
    ],
    enrollmentCount: 890,
    rating: 4.6,
    reviews: [],
    tags: ['SEO', 'SEM', 'Google Ads', 'Analytics', 'Social Media'],
    relatedJobs: ['2'],
    createdAt: new Date('2024-02-01'),
    status: 'active'
  },
  {
    id: '3',
    title: 'Python para Análise de Dados',
    description: 'Aprenda Python aplicado à análise de dados com pandas, numpy e matplotlib.',
    category: 'Dados',
    duration: 60,
    level: 'intermediate',
    instructor: 'Prof. Lucas Ferreira',
    price: 399,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    curriculum: [],
    enrollmentCount: 650,
    rating: 4.7,
    reviews: [],
    tags: ['Python', 'Pandas', 'NumPy', 'Data Analysis', 'Matplotlib'],
    relatedJobs: [],
    createdAt: new Date('2024-03-01'),
    status: 'active'
  }
];

// Notificações simuladas
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Nova vaga compatível!',
    message: 'Encontramos uma vaga que combina com seu perfil: Desenvolvedor Frontend React',
    type: 'job-match',
    read: false,
    createdAt: new Date('2024-12-01T10:00:00'),
    actionUrl: '/jobs/1'
  },
  {
    id: '2',
    userId: '1',
    title: 'Candidatura atualizada',
    message: 'Sua candidatura para Desenvolvedor Frontend React foi visualizada pelo empregador',
    type: 'application-update',
    read: false,
    createdAt: new Date('2024-11-30T15:30:00'),
    actionUrl: '/dashboard/applications'
  }
];

// Analytics simuladas
export const mockAnalytics: Analytics = {
  totalJobs: 150,
  totalCandidates: 1250,
  totalEmployers: 85,
  totalCourses: 45,
  recentApplications: 89,
  successfulMatches: 23,
  popularCategories: [
    { category: 'Tecnologia', count: 45 },
    { category: 'Marketing', count: 32 },
    { category: 'Vendas', count: 28 },
    { category: 'Design', count: 18 },
    { category: 'Administração', count: 15 }
  ],
  monthlyStats: [
    { month: 'Jan', applications: 120, hires: 15 },
    { month: 'Fev', applications: 135, hires: 18 },
    { month: 'Mar', applications: 145, hires: 22 },
    { month: 'Abr', applications: 160, hires: 25 },
    { month: 'Mai', applications: 175, hires: 28 },
    { month: 'Jun', applications: 180, hires: 30 }
  ]
};

// Função para buscar dados simulados
export const searchMockData = (query: string, type?: 'jobs' | 'candidates' | 'courses') => {
  const searchTerms = query.toLowerCase().split(' ');

  const searchJobs = () => mockJobs.filter(job =>
    searchTerms.some(term =>
      job.title.toLowerCase().includes(term) ||
      job.description.toLowerCase().includes(term) ||
      job.tags.some(tag => tag.toLowerCase().includes(term)) ||
      job.category.toLowerCase().includes(term)
    )
  );

  const searchCandidates = () => mockCandidates.filter(candidate =>
    searchTerms.some(term =>
      `${candidate.firstName} ${candidate.lastName}`.toLowerCase().includes(term) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(term)) ||
      candidate.bio?.toLowerCase().includes(term)
    )
  );

  const searchCourses = () => mockCourses.filter(course =>
    searchTerms.some(term =>
      course.title.toLowerCase().includes(term) ||
      course.description.toLowerCase().includes(term) ||
      course.tags.some(tag => tag.toLowerCase().includes(term)) ||
      course.category.toLowerCase().includes(term)
    )
  );

  if (type === 'jobs') return { jobs: searchJobs(), candidates: [], courses: [] };
  if (type === 'candidates') return { jobs: [], candidates: searchCandidates(), courses: [] };
  if (type === 'courses') return { jobs: [], candidates: [], courses: searchCourses() };

  return {
    jobs: searchJobs(),
    candidates: searchCandidates(),
    courses: searchCourses()
  };
};
