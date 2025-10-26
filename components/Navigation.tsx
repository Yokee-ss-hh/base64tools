'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Terminal } from 'lucide-react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const tools = [
    { name: 'Text', href: '/' },
    { name: 'Image', href: '/image' },
    { name: 'File', href: '/file' },
    { name: 'URL', href: '/url' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border-light shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-turquoise to-accent-blue rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-text-primary">Base64Tools</span>
              <span className="text-xs text-accent-turquoise ml-1">.org</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="px-4 py-2 rounded-lg text-text-secondary hover:bg-bg-secondary hover:text-accent-turquoise transition-all font-medium"
              >
                {tool.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-bg-secondary text-text-secondary"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-light bg-white">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-secondary hover:text-accent-turquoise transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {tool.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}