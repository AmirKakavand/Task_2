// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { TodoProvider } from '../context/todo-context'

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
          {children}
        </TodoProvider>
      </body>
    </html>
  )
}
