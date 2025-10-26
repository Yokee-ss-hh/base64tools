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
    default: 'Base64Tools.org - Professional Base64 Encoder & Decoder for Developers',
    template: '%s | Base64Tools.org'
  },
  description: 'Lightning-fast Base64 encoding and decoding tools built for developers. Encode text, images, files with zero latency. 100% client-side processing. Privacy-first.',
  keywords: 'base64 encoder, base64 decoder, encode base64, decode base64, base64 converter, online base64, base64 tool',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://base64tools.org',
    siteName: 'Base64Tools.org',
    title: 'Base64Tools.org - Professional Base64 Tools',
    description: 'Lightning-fast Base64 encoding and decoding. Built for developers who demand speed and privacy.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Base64Tools.org' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base64Tools.org - Developer Tools',
    description: 'Lightning-fast Base64 tools for developers',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Base64Tools.org',
              description: 'Free online Base64 encoder and decoder tools for developers',
              url: 'https://base64tools.org',
              applicationCategory: 'UtilitiesApplication',
              operatingSystem: 'Any',
              browserRequirements: 'Requires JavaScript. Requires HTML5.',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              creator: {
                '@type': 'Person',
                name: 'Yokesh Chowdary',
                email: 'bollineniyokesh@gmail.com',
              },
              featureList: [
                'Base64 Text Encoder',
                'Base64 Text Decoder',
                'Image to Base64 Converter',
                'Base64 to Image Decoder',
                'File to Base64 Encoder',
                'URL-Safe Base64 Encoder',
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-bg-primary`}>
        <div className="relative min-h-screen">
          <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-turquoise/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
          </div>
          
          <Navigation />
          <main className="relative z-10">
            {children}
          </main>
          
          {/* Compact Footer */}
          <footer className="relative z-10 bg-bg-secondary border-t border-border-light mt-12">
            <div className="container mx-auto px-4 py-6">
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent-turquoise to-accent-blue rounded-lg flex items-center justify-center text-sm text-white font-bold">
                      B64
                    </div>
                    <div>
                      <h3 className="text-text-primary font-bold text-sm">Base64Tools.org</h3>
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

                <div>
                  <h4 className="text-text-primary font-semibold mb-2 text-sm">Why Choose Us?</h4>
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

              {/* Compact Bottom Bar */}
              <div className="border-t border-border-light pt-3 flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
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