import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ReactNode } from 'react'
import { Header } from './components/Header'
import { ReactQueryProvider } from './ReactQueryProvider'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'RagnaHub',
  description:
    'Um site para você pesquisar monstros do ragnarok de forma prática e rápida.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.variable} h-screen bg-zinc-950 font-sans text-zinc-200`}
      >
        <main>
          <ReactQueryProvider>
            <Header />
            {children}
          </ReactQueryProvider>
        </main>
      </body>
    </html>
  )
}
