'use client'

import { useState } from 'react'
import GlassCard from './GlassCard'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Placeholder for newsletter signup - in production, connect to your email service
    // (Mailchimp, ConvertKit, etc.)
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setEmail('')
      setName('')
    }, 1000)
  }

  if (submitted) {
    return (
      <GlassCard className="text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="font-playfair text-2xl text-white mb-3">
          Thank You for Subscribing!
        </h3>
        <p className="text-white/90">
          You'll receive our latest estate planning insights and legal updates directly in your inbox.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-accent-gold hover:underline"
        >
          Subscribe another email
        </button>
      </GlassCard>
    )
  }

  return (
    <GlassCard>
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">📬</div>
        <h3 className="font-playfair text-2xl text-white mb-2">
          Stay Informed
        </h3>
        <p className="text-white/80">
          Subscribe to receive expert estate planning tips and legal updates
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newsletter-name" className="block text-white font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="newsletter-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-accent-gold transition-colors"
            placeholder="Your name"
            aria-label="Your name"
          />
        </div>

        <div>
          <label htmlFor="newsletter-email" className="block text-white font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="newsletter-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-accent-gold transition-colors"
            placeholder="your@email.com"
            aria-label="Your email address"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-accent-gold text-white py-3 px-6 rounded-full font-semibold transition-all ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#b8982f] hover:-translate-y-1'
          }`}
        >
          {loading ? 'Subscribing...' : 'Subscribe Now'}
        </button>

        <p className="text-white/60 text-sm text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>

      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-white/70 text-sm text-center">
          <strong className="text-white">Need immediate assistance?</strong><br />
          Call us at{' '}
          <a href="tel:8182916217" className="text-accent-gold hover:underline font-semibold">
            (818) 291-6217
          </a>
        </p>
      </div>
    </GlassCard>
  )
}
