import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://base64tools.org'),
  title: {
    default: 'Base64 Encoder & Decoder for Developers',
    template: '%s | Base64Tools.org'
  },
  description: 'Lightning-fast Base64 encoding and decoding tools built for developers. Encode text, images, files with zero latency. 100% client-side processing. Privacy-first.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-bg-primary`}>
        <div className="relative min-h-screen">
          {/* Subtle Background Accents */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-turquoise/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
          </div>
          
          <Navigation />
          <main className="relative z-10">
            {children}
          </main>
          
          {/* Footer - Compact Version */}
          <footer className="relative z-10 bg-bg-secondary border-t border-border-light mt-20">
            <div className="container mx-auto px-4 py-8">
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                {/* Left: Brand + Tools */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent-turquoise to-accent-blue rounded-lg flex items-center justify-center text-sm text-white font-bold">
                      B64
                    </div>
                    <div>
                      <h3 className="text-text-primary font-bold">Base64Tools.org</h3>
                      <p className="text-xs text-text-tertiary">Privacy-First Developer Tools</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <Link href="/" className="text-text-secondary hover:text-accent-turquoise transition-colors">
                      Text
                    </Link>
                    <span className="text-border-medium">•</span>
                    <Link href="/image" className="text-text-secondary hover:text-accent-turquoise transition-colors">
                      Image
                    </Link>
                    <span className="text-border-medium">•</span>
                    <Link href="/file" className="text-text-secondary hover:text-accent-turquoise transition-colors">
                      File
                    </Link>
                    <span className="text-border-medium">•</span>
                    <Link href="/url" className="text-text-secondary hover:text-accent-turquoise transition-colors">
                      URL
                    </Link>
                  </div>
                </div>

                {/* Right: Privacy Features */}
                <div>
                  <h4 className="text-text-primary font-semibold mb-3 text-sm">Why Choose Us?</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-text-secondary">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent-green rounded-full"></span>
                      100% Client-side
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent-turquoise rounded-full"></span>
                      No Data Stored
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent-purple rounded-full"></span>
                      No Tracking
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent-pink rounded-full"></span>
                      Open Source
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Bar - Single Line */}
              <div className="border-t border-border-light pt-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
                <p className="text-text-tertiary text-center md:text-left">
                  © 2025 Base64Tools.org
                </p>
                <a 
                  href="mailto:bollineniyokesh@gmail.com" 
                  className="text-accent-turquoise hover:text-accent-blue transition-colors font-medium"
                >
                  bollineniyokesh@gmail.com
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
