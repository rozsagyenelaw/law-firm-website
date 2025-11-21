import GlassCard from './GlassCard'

export default function CTABox() {
  return (
    <aside className="no-print">
      <GlassCard className="sticky top-24">
        <div className="text-center">
          <div className="text-4xl mb-4">⚖️</div>
          <h3 className="font-playfair text-2xl text-white mb-3">
            Need Legal Guidance?
          </h3>
          <p className="text-white/90 mb-6 leading-relaxed">
            Schedule a free consultation with Attorney Rozsa Gyene to discuss your estate planning needs.
          </p>
          <a
            href="tel:8182916217"
            className="block w-full bg-accent-gold text-white py-3 px-6 rounded-full font-semibold hover:bg-[#b8982f] transition-all mb-3"
          >
            📞 (818) 291-6217
          </a>
          <a
            href="https://portal.livingtrust-attorneys.com/book"
            className="block w-full bg-white/10 text-white py-3 px-6 rounded-full font-semibold hover:bg-white/20 transition-all border border-white/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Consultation
          </a>
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-white/70 text-sm mb-2">
              <strong className="text-white">Office Location:</strong>
            </p>
            <p className="text-white/70 text-sm">
              450 N Brand Blvd Ste 600<br />
              Glendale, CA 91203
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-accent-gold text-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">25+ Years Experience</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </aside>
  )
}
