// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { TodoProvider } from '../context/todo-context'
import Navigation from './components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ToDo App',
  description: 'Simple task manager',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TodoProvider>
          <main className="max-w-2xl mx-auto p-6">
            <Navigation />
            {children}
          </main>
        </TodoProvider>
      </body>
    </html>
  )
}
