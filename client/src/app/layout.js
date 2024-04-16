import './globals.css'

import Client from './components/Client'

export const metadata = {
  title: 'Wives GPT',
  description: 'A ChatGPT Clone',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Client>{children}</Client>
      </body>
    </html>
  )
}
