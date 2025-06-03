import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientBody from './ClientBody'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgênciaEmpregos - Conectando Talentos e Oportunidades',
  description: 'Plataforma completa para candidatos, empregadores e cursos profissionalizantes. Encontre sua próxima oportunidade ou o talento ideal.',
  keywords: 'empregos, vagas, carreiras, cursos, capacitação, recrutamento, RH',
  authors: [{ name: 'AgênciaEmpregos' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'AgênciaEmpregos - Conectando Talentos e Oportunidades',
    description: 'Plataforma completa para candidatos, empregadores e cursos profissionalizantes.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <ClientBody className={inter.className}>
        {children}
      </ClientBody>
    </html>
  )
}
