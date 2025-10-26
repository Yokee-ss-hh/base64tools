'use client'

import { useState } from 'react'
import { Copy, Check, Zap, Shield, Code } from 'lucide-react'
import { Metadata } from 'next'

export default function DecodePage() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [copied, setCopied] = useState(false)

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(inputText)))
      setOutputText(decoded)
    } catch (e) {
      setOutputText('Error: Invalid Base64 string')
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
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-700 rounded-full border border-accent-blue/30 mb-6">
            <Zap className="w-4 h-4 text-accent-blue" />
            <span className="text-sm text-gray-300">Lightning Fast • Privacy First • Zero Config</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent-green via-accent-blue to-accent-purple bg-clip-text text-transparent">
            Base64 Decoder
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto">
            Decode Base64 strings back to original text with <span className="text-accent-green font-semibold">zero latency</span> and <span className="text-accent-blue font-semibold">complete privacy</span>
          </p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent-green" />
              <span>100% Client-side</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-accent-purple" />
              <span>No Tracking</span>
            </div>
          </div>
        </div>

        {/* Main Decoder Tool */}
        <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-3xl border border-dark-600 shadow-2xl p-8 mb-12 backdrop-blur-xl">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-blue rounded-full"></span>
                Base64 Input
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-64 p-4 bg-dark-900 border-2 border-dark-600 rounded-xl focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all resize-none font-mono text-sm text-gray-200 placeholder-gray-600"
                placeholder="Paste your Base64 encoded text here...&#10;&#10;Example:&#10;SGVsbG8sIFdvcmxkIQ=="
              />
            </div>

            {/* Output */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-green rounded-full"></span>
                Decoded Output
              </label>
              <div className="relative">
                <textarea
                  value={outputText}
                  readOnly
                  className="w-full h-64 p-4 bg-dark-900 border-2 border-dark-600 rounded-xl resize-none font-mono text-sm text-accent-green placeholder-gray-600"
                  placeholder="Decoded result will appear here..."
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

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleDecode}
              className="flex-1 min-w-[200px] bg-gradient-to-r from-accent-green to-accent-blue hover:from-accent-green/90 hover:to-accent-blue/90 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-accent-green/50 flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Decode from Base64
            </button>
            <button
              onClick={handleCopy}
              className="bg-dark-700 hover:bg-dark-600 text-white font-semibold py-4 px-8 rounded-xl transition-all border border-dark-600 flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handleClear}
              className="bg-dark-700 hover:bg-dark-600 text-gray-300 font-semibold py-4 px-8 rounded-xl transition-all border border-dark-600"
            >
              Clear
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-dark-600">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-blue">{inputText.length}</div>
              <div className="text-xs text-gray-500">Input Characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-green">{outputText.length}</div>
              <div className="text-xs text-gray-500">Output Characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-purple">&lt;1ms</div>
              <div className="text-xs text-gray-500">Processing Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-pink">∞</div>
              <div className="text-xs text-gray-500">Privacy Level</div>
            </div>
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>
    </div>
  )
}
