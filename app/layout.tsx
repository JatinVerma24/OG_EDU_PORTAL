import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OGEDU YouTube Study Hub | Find the Right YouTube Channel for Every Subject',
  description: 'Search by course code or subject name and discover verified university YouTube channels, playlists, and lecture series for B.Tech & BBA students.',
  keywords: [
    'B.Tech CSE YouTube channels',
    'CSE101 Computer Programming YouTube',
    'DBMS YouTube channel',
    'Data Structures YouTube',
    'Operating Systems YouTube',
    'Engineering Mathematics YouTube',
    'Programming in Java YouTube',
    'AI Essentials YouTube',
    'OGEDU AI'
  ],
  authors: [{ name: 'OGEDU AI' }],
  openGraph: {
    title: 'OGEDU YouTube Study Hub',
    description: 'Find the right YouTube channel for every university subject.',
    url: 'https://ogedu-portal.vercel.app/youtube-study-hub',
    siteName: 'OGEDU AI',
    locale: 'en_IN',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OGEDU YouTube Study Hub',
    description: 'Find the right YouTube channel for every subject.'
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
        <link rel="canonical" href="https://ogedu-portal.vercel.app/youtube-study-hub" />
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
