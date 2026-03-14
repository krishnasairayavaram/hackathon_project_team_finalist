import './globals.css'
import ClientLayoutWrapper from './ClientLayoutWrapper'

export const metadata = {
  title: 'QuickBite - Premium Food Ordering Menu',
  description: 'Order your favorite food with a crispy UI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen font-sans antialiased flex flex-col">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  )
}
