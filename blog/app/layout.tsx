import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Law Offices of Rozsa Gyene',
    default: 'Estate Planning & Trust Law Blog | Law Offices of Rozsa Gyene',
  },
  description: 'Expert insights on estate planning, living trusts, probate, conservatorship, and trust litigation from experienced Glendale attorney Rozsa Gyene.',
  keywords: ['estate planning', 'living trust', 'probate', 'conservatorship', 'trust litigation', 'Glendale attorney', 'California law'],
  authors: [{ name: 'Rozsa Gyene', url: 'https://www.livingtrust-attorneys.com' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.livingtrust-attorneys.com/blog',
    siteName: 'Law Offices of Rozsa Gyene',
    images: [
      {
        url: '/images/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Law Offices of Rozsa Gyene - Estate Planning Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estate Planning & Trust Law Blog',
    description: 'Expert legal insights from Rozsa Gyene',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-gradient-blue min-h-screen">
        {/* Top Bar */}
        <div className="bg-primary-blue text-white py-2.5 text-sm">
          <div className="container-custom flex justify-between items-center">
            <div className="flex items-center gap-6">
              <span>Over 25 Years Serving Los Angeles County</span>
            </div>
            <a
              href="tel:8182916217"
              className="text-accent-gold font-semibold hover:underline"
            >
              (818) 291-6217
            </a>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="bg-transparent py-5">
          <div className="container-custom flex justify-between items-center">
            <a href="https://www.livingtrust-attorneys.com" className="flex items-center gap-3 text-white no-print">
              <div className="flex flex-col">
                <span className="font-playfair text-xl font-bold text-shadow-md">
                  Law Offices of Rozsa Gyene
                </span>
                <span className="text-sm text-accent-gold">Estate Planning & Trust Law Blog</span>
              </div>
            </a>

            <div className="flex items-center gap-4 no-print">
              <a
                href="https://www.livingtrust-attorneys.com"
                className="text-white hover:text-accent-gold transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="/"
                className="text-accent-gold font-semibold"
              >
                Blog
              </a>
              <a
                href="https://portal.livingtrust-attorneys.com/book"
                className="btn-primary text-base py-3 px-6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Free Consultation
              </a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-primary-blue text-white mt-20 no-print">
          <div className="container-custom py-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-playfair text-2xl mb-4">Law Offices of Rozsa Gyene</h3>
                <p className="text-white/80 mb-4">
                  Over 25 years of experience serving Los Angeles County families with comprehensive estate planning and trust services.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4 text-accent-gold">Contact</h4>
                <div className="space-y-2 text-white/80">
                  <p>450 N Brand Blvd Ste 600</p>
                  <p>Glendale, CA 91203</p>
                  <p className="mt-4">
                    <a href="tel:8182916217" className="text-accent-gold hover:underline">
                      (818) 291-6217
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-4 text-accent-gold">Practice Areas</h4>
                <ul className="space-y-2 text-white/80">
                  <li><a href="https://www.livingtrust-attorneys.com/living-trusts.html" className="hover:text-accent-gold transition-colors">Living Trusts</a></li>
                  <li><a href="https://www.livingtrust-attorneys.com/probate.html" className="hover:text-accent-gold transition-colors">Probate</a></li>
                  <li><a href="https://www.livingtrust-attorneys.com/trust-administration.html" className="hover:text-accent-gold transition-colors">Trust Administration</a></li>
                  <li><a href="https://www.livingtrust-attorneys.com/conservatorship.html" className="hover:text-accent-gold transition-colors">Conservatorship</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70 text-sm">
              <p>&copy; {new Date().getFullYear()} Law Offices of Rozsa Gyene. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
