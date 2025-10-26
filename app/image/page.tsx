'use client'

import { useState } from 'react'
import { Upload, Copy, Check, Download, Image as ImageIcon } from 'lucide-react'

export default function ImagePage() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [imageName, setImageName] = useState('')
  const [outputText, setOutputText] = useState('')
  const [copied, setCopied] = useState(false)
  const [preview, setPreview] = useState('')
  const [base64Input, setBase64Input] = useState('')
  const [error, setError] = useState('')

  // Encode: Image to Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setImageName(file.name)
      setError('')
      
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        setOutputText(base64)
        setPreview(base64)
      }
      reader.readAsDataURL(file)
    } else {
      setError('Please upload a valid image file')
    }
  }

  // Decode: Base64 to Image - FIXED
  const handleDecode = () => {
    try {
      setError('')
      let base64String = base64Input.trim()
      
      // Check if it's already a data URI
      if (base64String.startsWith('data:image')) {
        setPreview(base64String)
      } 
      // If it's just the base64 part without data URI prefix
      else if (base64String.length > 0) {
        // Try to detect image type or default to PNG
        const isPNG = base64String.startsWith('iVBOR')
        const isJPEG = base64String.startsWith('/9j/')
        const isGIF = base64String.startsWith('R0lGOD')
        
        let mimeType = 'image/png'
        if (isJPEG) mimeType = 'image/jpeg'
        if (isGIF) mimeType = 'image/gif'
        
        setPreview(`data:${mimeType};base64,${base64String}`)
      } else {
        setError('Please paste a Base64 string')
      }
    } catch (e) {
      setError('Invalid Base64 image string. Please check your input.')
    }
  }

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (preview) {
      try {
        // Create a temporary link element
        const link = document.createElement('a')
        link.href = preview
        
        // Extract file extension from mime type or default to png
        const mimeMatch = preview.match(/data:image\/(\w+);/)
        const extension = mimeMatch ? mimeMatch[1] : 'png'
        
        link.download = `decoded-image.${extension}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (e) {
        setError('Failed to download image')
      }
    }
  }

  const handleClear = () => {
    setImageName('')
    setOutputText('')
    setPreview('')
    setBase64Input('')
    setError('')
    setCopied(false)
  }

  const handleModeChange = (newMode: 'encode' | 'decode') => {
    setMode(newMode)
    handleClear()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue bg-clip-text text-transparent">
            Image Base64 Tools
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto">
            Convert images to/from Base64 with live preview
          </p>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-700 rounded-3xl border border-dark-600 shadow-2xl p-8 mb-12">
          
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6 bg-dark-900 p-2 rounded-xl w-fit mx-auto">
            <button
              onClick={() => handleModeChange('encode')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                mode === 'encode'
                  ? 'bg-gradient-to-r from-accent-purple to-accent-pink text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📤 Image to Base64
            </button>
            <button
              onClick={() => handleModeChange('decode')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                mode === 'decode'
                  ? 'bg-gradient-to-r from-accent-blue to-accent-green text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📥 Base64 to Image
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Encode Mode */}
          {mode === 'encode' && (
            <>
              <div className="border-2 border-dashed border-dark-600 rounded-xl p-12 text-center mb-6 hover:border-accent-purple transition-all">
                <ImageIcon className="w-16 h-16 text-accent-purple mx-auto mb-4" />
                <label className="cursor-pointer">
                  <span className="text-lg font-semibold text-white mb-2 block">
                    Upload Image
                  </span>
                  <span className="text-sm text-gray-400">
                    PNG, JPG, GIF, SVG • Max 5MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {preview && (
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Preview
                    </label>
                    <div className="bg-dark-900 rounded-xl p-4 border-2 border-dark-600">
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="w-full rounded-lg"
                        onError={() => setError('Failed to load image preview')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Base64 Output
                    </label>
                    <textarea
                      value={outputText}
                      readOnly
                      className="w-full h-64 p-4 bg-dark-900 border-2 border-dark-600 rounded-xl resize-none font-mono text-xs text-accent-green"
                    />
                  </div>
                </div>
              )}

              {outputText && (
                <button
                  onClick={handleCopy}
                  className="w-full bg-gradient-to-r from-accent-purple to-accent-pink text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? 'Copied!' : 'Copy Base64 to Clipboard'}
                </button>
              )}
            </>
          )}

          {/* Decode Mode - FIXED */}
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
                  placeholder="Paste your Base64 image string here...&#10;&#10;Supported formats:&#10;• Full data URI: data:image/png;base64,iVBOR...&#10;• Base64 only: iVBOR...&#10;&#10;The image will preview automatically after decoding."
                />
              </div>

              <button
                onClick={handleDecode}
                className="w-full bg-gradient-to-r from-accent-blue to-accent-green text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-2 mb-6"
              >
                <ImageIcon className="w-5 h-5" />
                Decode & Preview Image
              </button>

              {preview && (
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Decoded Image Preview
                  </label>
                  <div className="bg-dark-900 rounded-xl p-6 border-2 border-dark-600 mb-6">
                    <img 
                      src={preview} 
                      alt="Decoded" 
                      className="w-full max-w-2xl mx-auto rounded-xl"
                      onError={() => {
                        setError('Failed to load image. Please check your Base64 string.')
                        setPreview('')
                      }}
                    />
                  </div>
                  <button
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-accent-green to-accent-blue text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Image
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}