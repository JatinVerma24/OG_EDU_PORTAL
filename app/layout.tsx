import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OGEDU AI — Student Tools, Learning Resources & Academic Guides',
  description: 'Free academic platform for university students. Calculate CGPA, TGPA, and attendance, verify exam passing criteria, and access curated study resources.',
  keywords: [
    'B.Tech CSE study tools',
    'Midterm safe marks predictor',
    'CGPA calculator',
    '75% attendance calculator',
    'University study hub',
    'OGEDU AI'
  ],
  authors: [{ name: 'OGEDU AI' }],
  openGraph: {
    title: 'OGEDU AI — Student Tools & Study Hub',
    description: 'Free academic platform for university students.',
    url: 'https://ogedu-portal.vercel.app/',
    siteName: 'OGEDU AI',
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OGEDU AI — Academic Suite',
    description: 'Free academic tools, guides, and study materials.'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2034578803232828"
          crossOrigin="anonymous"
        />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZT0FTDEWMH" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZT0FTDEWMH');
            `
          }}
        />
        {/* Tailwind CSS CDN fallback for 100% styling guarantee */}
        <script src="https://cdn.tailwindcss.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: 'class',
                theme: {
                  extend: {
                    colors: {
                      brand: {
                        50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe',
                        400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce',
                        800: '#6b21a8', 900: '#581c87', 950: '#3b0764',
                      },
                      surface: {
                        base: '#09090b', card: '#121215', elevated: '#18181b',
                        border: '#27272a', 'border-subtle': '#1e1e24', 'border-hover': '#3f3f46',
                      }
                    },
                    fontFamily: {
                      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                      display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
                      mono: ['"JetBrains Mono"', 'monospace'],
                    }
                  }
                }
              };
            `
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface-base text-zinc-100 min-h-screen relative selection:bg-brand-500/20 selection:text-brand-300">
        {/* Background Grid & Spotlight matching OGEDU brand */}
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0" />
        <div className="fixed inset-0 spotlight-beam pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
