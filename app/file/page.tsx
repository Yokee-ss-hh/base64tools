'use client'

import { useState } from 'react'
import { Upload, Download, Copy, Check, FileText } from 'lucide-react'

export default function FilePage() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState(0)
  const [outputText, setOutputText] = useState('')
  const [copied, setCopied] = useState(false)
  const [base64Input, setBase64Input] = useState('')

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setFileSize(file.size)
      
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        setOutputText(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDecode = () => {
    setOutputText(base64Input)
  }

  const handleDownload = () => {
    if (outputText) {
      const link = document.createElement('a')
      link.href = outputText
      link.download = 'decoded-file'
      link.click()
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
    setFileName('')
    setFileSize(0)
    setOutputText('')
    setBase64Input('')
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent-green via-accent-blue to-accent-purple bg-clip-text text-transparent">
            File Base64 Tools
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto">
            Encode and decode any file type instantly
          </p>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-3xl border border-dark-600 shadow-2xl p-8 mb-12">
          
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6 bg-dark-900 p-2 rounded-xl w-fit mx-auto">
            <button
              onClick={() => {
                setMode('encode')
                handleClear()
              }}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                mode === 'encode'
                  ? 'bg-gradient-to-r from-accent-green to-accent-blue text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📤 File to Base64
            </button>
            <button
              onClick={() => {
                setMode('decode')
                handleClear()
              }}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                mode === 'decode'
                  ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📥 Base64 to File
            </button>
          </div>

          {/* Encode Mode */}
          {mode === 'encode' && (
            <>
              <div className="border-2 border-dashed border-dark-600 rounded-xl p-12 text-center mb-6 hover:border-accent-green transition-all">
                <Upload className="w-16 h-16 text-accent-green mx-auto mb-4" />
                <label className="cursor-pointer">
                  <span className="text-lg font-semibold text-white mb-2 block">
                    Upload File
                  </span>
                  <span className="text-sm text-gray-400">
                    Any file type • Max 10MB
                  </span>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {fileName && (
                <div className="bg-dark-900 rounded-xl p-4 mb-6 flex items-center gap-4">
                  <FileText className="w-8 h-8 text-accent-green" />
                  <div className="flex-1">
                    <div className="text-white font-semibold">{fileName}</div>
                    <div className="text-sm text-gray-400">{(fileSize / 1024).toFixed(2)} KB</div>
                  </div>
                </div>
              )}

              {outputText && (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Base64 Output
                    </label>
                    <textarea
                      value={outputText}
                      readOnly
                      className="w-full h-48 p-4 bg-dark-900 border-2 border-dark-600 rounded-xl resize-none font-mono text-xs text-accent-green"
                    />
                  </div>

                  <button
                    onClick={handleCopy}
                    className="w-full bg-gradient-to-r from-accent-green to-accent-blue text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-2"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </button>
                </>
              )}
            </>
          )}

          {/* Decode Mode */}
          {mode === 'decode' && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Paste Base64 String
                </label>
                <textarea
                  value={base64Input}
                  onChange={(e) => setBase64Input(e.target.value)}
                  className="w-full h-48 p-4 bg-dark-900 border-2 border-dark-600 rounded-xl focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all resize-none font-mono text-sm text-gray-200 placeholder-gray-600"
                  placeholder="Paste your Base64 file string here (including data URI prefix)..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleDecode}
                  className="flex-1 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-2"
                >
                  🔓 Prepare Download
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!outputText}
                  className="flex-1 bg-gradient-to-r from-accent-green to-accent-blue text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Download className="w-5 h-5" />
                  Download File
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}