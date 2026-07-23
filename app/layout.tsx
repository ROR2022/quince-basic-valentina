import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cinzel, Cormorant_Garamond, Great_Vibes, Montserrat } from 'next/font/google'
import './globals.css'

// Títulos elegantes
const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})

// Subtítulos / detalles serif
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

// Nombre de la quinceañera (script)
const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
})

// Texto general
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mis XV Años · Una Noche Mágica',
  description:
    'Invitación digital para una noche mágica de XV años en un bosque encantado.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#16382C',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${cormorant.variable} ${greatVibes.variable} ${montserrat.variable} bg-background`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
