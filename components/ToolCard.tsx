'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ToolCardProps {
  title: string
  description: string
  icon: string
  gradient: string
  href: string
}

export default function ToolCard({ title, description, icon, gradient, href }: ToolCardProps) {
  return (
    <Link href={href}>
      <div className="group relative bg-white rounded-2xl border border-border-light hover:border-accent-turquoise/50 p-6 h-full transition-all duration-300 hover:shadow-xl cursor-pointer overflow-hidden">
        {/* Gradient Background on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        <div className="relative z-10">
          <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent-turquoise transition-colors">
            {title}
          </h3>
          <p className="text-text-secondary text-sm mb-4">
            {description}
          </p>
          <div className="flex items-center text-accent-turquoise text-sm font-semibold">
            Try it now
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}