import React from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'hover' | 'light'
  padding?: 'sm' | 'md' | 'lg'
}

export default function GlassCard({
  children,
  className = '',
  variant = 'default',
  padding = 'md'
}: GlassCardProps) {
  const baseClasses = 'glass-card'

  const variantClasses = {
    default: 'glass-card',
    hover: 'glass-card-hover',
    light: 'glass-card-light',
  }

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12',
  }

  return (
    <div className={`
      ${variantClasses[variant]}
      ${paddingClasses[padding]}
      ${className}
    `}>
      {children}
    </div>
  )
}
