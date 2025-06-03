import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Briefcase,
  User,
  GraduationCap,
  FileText,
  Shield,
  HelpCircle
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Para Candidatos',
      icon: User,
      links: [
        { label: 'Buscar Vagas', href: '/jobs' },
        { label: 'Criar Perfil', href: '/candidate/register' },
        { label: 'Meu Dashboard', href: '/candidate/dashboard' },
        { label: 'Upload de Currículo', href: '/candidate/profile' },
        { label: 'Notificações', href: '/candidate/notifications' },
      ]
    },
    {
      title: 'Para Empregadores',
      icon: Briefcase,
      links: [
        { label: 'Publicar Vaga', href: '/employer/jobs/new' },
        { label: 'Buscar Candidatos', href: '/candidates' },
        { label: 'Dashboard Empresa', href: '/employer/dashboard' },
        { label: 'Planos e Preços', href: '/employer/pricing' },
        { label: 'Gestão de Vagas', href: '/employer/jobs' },
      ]
    },
    {
      title: 'Cursos',
      icon: GraduationCap,
      links: [
        { label: 'Catálogo de Cursos', href: '/courses' },
        { label: 'Meus Cursos', href: '/student/courses' },
        { label: 'Certificados', href: '/student/certificates' },
        { label: 'Portal do Aluno', href: '/student/dashboard' },
        { label: 'Suporte Acadêmico', href: '/student/support' },
      ]
    },
    {
      title: 'Recursos',
      icon: FileText,
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Central de Ajuda', href: '/help' },
        { label: 'Dicas de Carreira', href: '/blog/career-tips' },
        { label: 'Tendências do Mercado', href: '/blog/market-trends' },
        { label: 'Guias Profissionais', href: '/guides' },
      ]
    },
    {
      title: 'Empresa',
      icon: Shield,
      links: [
        { label: 'Sobre Nós', href: '/about' },
        { label: 'Nossa Missão', href: '/mission' },
        { label: 'Contato', href: '/contact' },
        { label: 'Trabalhe Conosco', href: '/careers' },
        { label: 'Imprensa', href: '/press' },
      ]
    },
    {
      title: 'Suporte',
      icon: HelpCircle,
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Política de Privacidade', href: '/privacy' },
        { label: 'Termos de Uso', href: '/terms' },
        { label: 'LGPD', href: '/lgpd' },
        { label: 'Denúncias', href: '/report' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/agenciaempregos', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/agenciaempregos', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/agenciaempregos', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/agenciaempregos', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Seção Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center space-x-2">
                <section.icon className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold text-lg">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Seção de Contato e Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informações de Contato */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Fale Conosco</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    Av. Paulista, 1000 - Bela Vista<br />
                    São Paulo, SP - CEP: 01310-100
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">(11) 3000-0000</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">contato@agenciaempregos.com.br</span>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="pt-4">
                <h4 className="text-lg font-medium text-white mb-3">Siga-nos</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Newsletter</h3>
              <p className="text-gray-300 text-sm">
                Receba as melhores oportunidades de emprego e dicas de carreira diretamente no seu e-mail.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Assinar Newsletter
                </button>
              </form>
              <p className="text-xs text-gray-400">
                Ao assinar, você concorda com nossa política de privacidade.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AE</span>
              </div>
              <span className="font-bold text-xl">AgênciaEmpregos</span>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <span>© {currentYear} AgênciaEmpregos. Todos os direitos reservados.</span>
              <div className="flex space-x-4">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacidade
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Termos
                </Link>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
