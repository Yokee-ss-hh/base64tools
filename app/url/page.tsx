'use client'

import { useState } from 'react'
import { Copy, Check, Zap, Link2 } from 'lucide-react'

export default function URLPage() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [copied, setCopied] = useState(false)

  const handleProcess = () => {
    try {
      if (mode === 'encode') {
        const base64 = btoa(unescape(encodeURIComponent(inputText)))
        const urlSafe = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
        setOutputText(urlSafe)
      } else {
        // Decode URL-safe Base64
        let base64 = inputText.replace(/-/g, '+').replace(/_/g, '/')
        while (base64.length % 4) {
          base64 += '='
        }
        const decoded = decodeURIComponent(escape(atob(base64)))
        setOutputText(decoded)
      }
    } catch (e) {
      setOutputText('Error: Invalid input')
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent-pink via-accent-purple to-accent-blue bg-clip-text text-transparent">
            URL-Safe Base64
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto">
            Encode and decode URL-safe Base64 for JWT and web applications
          </p>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-3xl border border-dark-600 shadow-2xl p-8 mb-12">
          
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6 bg-dark-900 p-2 rounded-xl w-fit mx-auto">
            <button
              onClick={() => setMode('encode')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                mode === 'encode'
                  ? 'bg-gradient-to-r from-accent-pink to-accent-purple text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🔗 URL Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                mode === 'decode'
                  ? 'bg-gradient-to-r from-accent-blue to-accent-green text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🔓 URL Decode
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-pink rounded-full"></span>
                {mode === 'encode' ? 'Input Text' : 'URL-Safe Base64 Input'}
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-64 p-4 bg-dark-900 border-2 border-dark-600 rounded-xl focus:border-accent-pink focus:ring-2 focus:ring-accent-pink/20 transition-all resize-none font-mono text-sm text-gray-200 placeholder-gray-600"
                placeholder={mode === 'encode' ? 'Type your text here...' : 'Paste URL-safe Base64 here...'}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-blue rounded-full"></span>
                {mode === 'encode' ? 'URL-Safe Base64 Output' : 'Decoded Output'}
              </label>
              <div className="relative">
                <textarea
                  value={outputText}
                  readOnly
                  className="w-full h-64 p-4 bg-dark-900 border-2 border-dark-600 rounded-xl resize-none font-mono text-sm text-accent-blue placeholder-gray-600"
                  placeholder="Result will appear here..."
                />
                {outputText && (
                  <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 p-2 bg-dark-800 hover:bg-dark-700 rounded-lg border border-dark-600 transition-all"
                  >
                    {copied ? <Check className="w-4 h-4 text-accent-green" /> : <Copy className="w-4 h-4 text-gray-400" />}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleProcess}
              className="flex-1 min-w-[200px] bg-gradient-to-r from-accent-pink to-accent-purple text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-2"
            >
              <Link2 className="w-5 h-5" />
              {mode === 'encode' ? 'Encode URL-Safe' : 'Decode URL-Safe'}
            </button>
            <button
              onClick={handleCopy}
              className="bg-dark-700 hover:bg-dark-600 text-white font-semibold py-4 px-8 rounded-xl border border-dark-600 flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handleClear}
              className="bg-dark-700 hover:bg-dark-600 text-gray-300 font-semibold py-4 px-8 rounded-xl border border-dark-600"
            >
              Clear
            </button>
          </div>

          <div className="mt-6 bg-dark-900 rounded-xl p-4 border border-dark-600">
            <p className="text-sm text-gray-400">
              <strong className="text-accent-pink">URL-Safe:</strong> Replaces <code className="text-accent-blue">+</code>→<code className="text-accent-blue">-</code>, <code className="text-accent-blue">/</code>→<code className="text-accent-blue">_</code>, removes <code className="text-accent-blue">=</code> padding
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}