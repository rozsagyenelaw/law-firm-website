import GlassCard from './GlassCard'

export default function AuthorBio() {
  return (
    <GlassCard className="mt-12">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-blue to-accent-gold flex items-center justify-center text-4xl text-white">
            RG
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-playfair text-2xl text-white mb-2">
            Rozsa Gyene
          </h3>
          <p className="text-accent-gold font-semibold mb-4">
            Estate Planning Attorney
          </p>
          <p className="text-white/90 leading-relaxed mb-6">
            Attorney Rozsa Gyene has over 25 years of experience in estate planning, trust litigation,
            and probate law, serving families throughout Los Angeles County. She is dedicated to helping
            clients protect their assets and secure their family's future through comprehensive legal planning.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:8182916217"
              className="inline-flex items-center gap-2 bg-accent-gold text-white px-6 py-2 rounded-full hover:bg-[#b8982f] transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              (818) 291-6217
            </a>
            <a
              href="https://www.livingtrust-attorneys.com/about.html"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-2 rounded-full hover:bg-white/20 transition-colors font-semibold border border-white/30"
            >
              Learn More About Rozsa
            </a>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
