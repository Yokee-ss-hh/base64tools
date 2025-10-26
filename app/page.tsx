'use client'

import { useState } from 'react'
import { Copy, Check, Zap, Shield, Code } from 'lucide-react'
import Link from 'next/link'
import ToolCard from '@/components/ToolCard'

const tools = [
  {
    title: 'Image Base64',
    description: 'Convert images to/from Base64 with live preview',
    icon: '🖼️',
    gradient: 'from-purple-500 to-pink-500',
    href: '/image'
  },
  {
    title: 'File Base64',
    description: 'Encode and decode any file type instantly',
    icon: '📁',
    gradient: 'from-green-500 to-emerald-500',
    href: '/file'
  },
  {
    title: 'URL-Safe Base64',
    description: 'URL-safe encoding for JWT and web applications',
    icon: '🔗',
    gradient: 'from-orange-500 to-red-500',
    href: '/url'
  },
]

export default function Home() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [copied, setCopied] = useState(false)

  const handleProcess = () => {
    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(inputText)))
        setOutputText(encoded)
      } else {
        const decoded = decodeURIComponent(escape(atob(inputText)))
        setOutputText(decoded)
      }
    } catch (e) {
      setOutputText(`Error: Invalid ${mode === 'encode' ? 'input text' : 'Base64 string'}`)
    }
  }

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClear = () => {
    setInputText('')
    setOutputText('')
  }

  const handleModeChange = (newMode: 'encode' | 'decode') => {
    setMode(newMode)
    setInputText('')
    setOutputText('')
    setCopied(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16 relative">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-bg-secondary rounded-full border border-border-light mb-4 md:mb-6 text-xs md:text-sm">
            <Zap className="w-3 h-3 md:w-4 md:h-4 text-accent-turquoise" />
            <span className="text-text-secondary">Lightning Fast • Privacy First • Zero Config</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-accent-turquoise via-accent-blue to-accent-purple bg-clip-text text-transparent px-4">
            Free Online Base64 Encoder and Decoder Tool
          </h1>
          
          <p className="text-base md:text-xl lg:text-2xl text-text-secondary mb-4 max-w-3xl mx-auto px-4">
            Convert text to Base64 and decode Base64 strings instantly. 100% client-side processing for maximum privacy and security.
          </p>
          
          <div className="flex items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-text-tertiary">
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 md:w-4 md:h-4 text-accent-green" />
              <span>No Signup Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-3 h-3 md:w-4 md:h-4 text-accent-purple" />
              <span>Open Source</span>
            </div>
          </div>
        </div>

        {/* Main Tool */}
        <div className="bg-white rounded-2xl md:rounded-3xl border border-border-light shadow-lg p-4 md:p-8 mb-12">
          
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6 bg-bg-secondary p-1.5 md:p-2 rounded-xl w-full md:w-fit mx-auto">
            <button
              onClick={() => handleModeChange('encode')}
              className={`flex-1 md:flex-none px-4 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${
                mode === 'encode'
                  ? 'bg-gradient-to-r from-accent-turquoise to-accent-blue text-white shadow-md'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              🔒 Encode
            </button>
            <button
              onClick={() => handleModeChange('decode')}
              className={`flex-1 md:flex-none px-4 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${
                mode === 'decode'
                  ? 'bg-gradient-to-r from-accent-green to-accent-turquoise text-white shadow-md'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              🔓 Decode
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
            {/* Input */}
            <div>
              <label className="block text-xs md:text-sm font-semibold text-text-primary mb-2 md:mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-turquoise rounded-full"></span>
                {mode === 'encode' ? 'Input Text' : 'Base64 Input'}
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-48 md:h-64 p-3 md:p-4 bg-bg-secondary border-2 border-border-light rounded-xl focus:border-accent-turquoise focus:ring-2 focus:ring-accent-turquoise/20 transition-all resize-none font-mono text-xs md:text-sm text-text-primary placeholder-text-tertiary"
                placeholder={mode === 'encode' 
                  ? "Type or paste your text here...\n\nExample:\nHello, World!"
                  : "Paste your Base64 encoded text here...\n\nExample:\nSGVsbG8sIFdvcmxkIQ=="
                }
              />
            </div>

            {/* Output */}
            <div>
              <label className="block text-xs md:text-sm font-semibold text-text-primary mb-2 md:mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-green rounded-full"></span>
                {mode === 'encode' ? 'Base64 Output' : 'Decoded Output'}
              </label>
              <div className="relative">
                <textarea
                  value={outputText}
                  readOnly
                  className="w-full h-48 md:h-64 p-3 md:p-4 bg-bg-secondary border-2 border-border-light rounded-xl resize-none font-mono text-xs md:text-sm text-accent-green placeholder-text-tertiary"
                  placeholder={`${mode === 'encode' ? 'Encoded' : 'Decoded'} result will appear here...`}
                />
                {outputText && (
                  <button
                    onClick={handleCopy}
                    className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 bg-white hover:bg-bg-secondary rounded-lg border border-border-light transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent-green" /> : <Copy className="w-3.5 h-3.5 md:w-4 md:h-4 text-text-secondary" />}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button
              onClick={handleProcess}
              className={`flex-1 ${
                mode === 'encode'
                  ? 'bg-gradient-to-r from-accent-turquoise to-accent-blue'
                  : 'bg-gradient-to-r from-accent-green to-accent-turquoise'
              } text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm md:text-base`}
            >
              <Zap className="w-4 h-4 md:w-5 md:h-5" />
              {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
            </button>
            <button
              onClick={handleCopy}
              className="sm:flex-none bg-bg-secondary hover:bg-bg-tertiary text-text-primary font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all border border-border-light flex items-center justify-center gap-2 text-sm md:text-base"
            >
              {copied ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : <Copy className="w-4 h-4 md:w-5 md:h-5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handleClear}
              className="sm:flex-none bg-bg-secondary hover:bg-bg-tertiary text-text-secondary font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all border border-border-light text-sm md:text-base"
            >
              Clear
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border-light">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-accent-turquoise">{inputText.length}</div>
              <div className="text-xs text-text-tertiary">Input Chars</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-accent-green">{outputText.length}</div>
              <div className="text-xs text-text-tertiary">Output Chars</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-accent-purple">&lt;1ms</div>
              <div className="text-xs text-text-tertiary">Processing</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-accent-pink">∞</div>
              <div className="text-xs text-text-tertiary">Privacy</div>
            </div>
          </div>
        </div>

        {/* Other Tools Grid */}
        <div className="mt-16 md:mt-20">
          <div className="text-center mb-8 md:mb-12 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3 md:mb-4">
              More Base64 Tools
            </h2>
            <p className="text-sm md:text-base text-text-secondary">
              Specialized tools for images, files, and URLs
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-20 bg-white rounded-2xl border border-border-light p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
            Why Use Base64 Encoding?
          </h2>
          
          <div className="prose max-w-none text-text-secondary space-y-6">
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-3">What is Base64?</h3>
              <p className="text-sm md:text-base">
                Base64 is a binary-to-text encoding scheme that converts binary data into an ASCII string format. 
                It's essential for developers working with data transmission over text-based protocols, email systems, 
                and web applications.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-3">Common Use Cases</h3>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li><strong>Email Attachments:</strong> MIME encoding for safe email transmission</li>
                <li><strong>Data URIs:</strong> Embedding images directly in HTML/CSS</li>
                <li><strong>API Integration:</strong> Encoding credentials for Basic Authentication</li>
                <li><strong>Web Development:</strong> Safe transmission of binary data in JSON/XML</li>
                <li><strong>JWT Tokens:</strong> Encoding headers and payloads for web security</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-semibold text-text-primary mb-3">Why Choose Base64Tools.org?</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-bg-secondary rounded-lg p-4">
                  <h4 className="font-semibold text-text-primary mb-2 text-sm md:text-base">🔒 100% Private</h4>
                  <p className="text-xs md:text-sm">All processing happens in your browser. Your data never touches our servers.</p>
                </div>
                <div className="bg-bg-secondary rounded-lg p-4">
                  <h4 className="font-semibold text-text-primary mb-2 text-sm md:text-base">⚡ Lightning Fast</h4>
                  <p className="text-xs md:text-sm">Instant encoding and decoding with optimized algorithms.</p>
                </div>
                <div className="bg-bg-secondary rounded-lg p-4">
                  <h4 className="font-semibold text-text-primary mb-2 text-sm md:text-base">📱 Mobile Friendly</h4>
                  <p className="text-xs md:text-sm">Works perfectly on all devices - desktop, tablet, and mobile.</p>
                </div>
                <div className="bg-bg-secondary rounded-lg p-4">
                  <h4 className="font-semibold text-text-primary mb-2 text-sm md:text-base">🆓 Always Free</h4>
                  <p className="text-xs md:text-sm">No registration, no limits, no hidden fees.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mt-6 bg-white rounded-2xl border border-border-light p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
            How to Use the Base64 Encoder and Decoder
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                <span className="text-2xl">🔒</span> Encoding Text to Base64
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-text-secondary">
                <li>Click the "Encode" button</li>
                <li>Paste or type your text in the input field</li>
                <li>Click "Encode to Base64" button</li>
                <li>Your Base64 encoded string appears in the output</li>
                <li>Click "Copy" to copy the result to clipboard</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                <span className="text-2xl">🔓</span> Decoding Base64 to Text
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-text-secondary">
                <li>Click the "Decode" button</li>
                <li>Paste your Base64 string in the input field</li>
                <li>Click "Decode from Base64" button</li>
                <li>Your decoded text appears in the output</li>
                <li>Click "Copy" to copy the decoded text</li>
              </ol>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-6 bg-white rounded-2xl border border-border-light p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
            Frequently Asked Questions About Base64 Encoding
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                What is Base64 encoding used for?
              </h3>
              <p className="text-sm text-text-secondary">
                Base64 encoding is used to convert binary data into text format for safe transmission over text-based protocols. 
                Common uses include email attachments (MIME), embedding images in HTML/CSS (data URIs), API authentication, 
                and encoding data for JSON/XML transmission.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Is Base64 encoding secure?
              </h3>
              <p className="text-sm text-text-secondary">
                Base64 is NOT encryption - it's simply an encoding method. Anyone can decode Base64 strings. 
                Never use Base64 alone for sensitive data. For secure data, use proper encryption methods like AES or RSA.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Can I encode images to Base64?
              </h3>
              <p className="text-sm text-text-secondary">
                Yes! Use our <Link href="/image" className="text-accent-turquoise hover:underline">Image to Base64 converter</Link> to 
                encode PNG, JPG, GIF, or SVG images into Base64 data URIs.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Is my data safe when using this tool?
              </h3>
              <p className="text-sm text-text-secondary">
                Absolutely! All encoding and decoding happens 100% in your browser using JavaScript. 
                Your data never leaves your computer or gets sent to our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
