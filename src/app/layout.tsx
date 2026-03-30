import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/Providers";
import { cn } from "@heroui/react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { headers } from "next/headers";
import type { ProfilePage, WebSite, WithContext } from "schema-dts";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  generator: "Next.js",
  applicationName: "Digital Resume - Aleksander Borgerød",
  referrer: "origin",
  title: "Digital Resume - Aleksander Borgerød",
  description:
    "Digital resume and portfolio of Aleksander Borgerød—showcasing projects, work experience and skills in full stack web development, design, and technology.",
  keywords: [
    "Aleksander Borgerød",
    "digital resume",
    "portfolio",
    "full stack developer",
    "web development",
    "UI/UX design",
    "JavaScript",
    "React",
    "Next.js",
    "TypeScript",
    "frontend",
    "backend",
    "software engineer",
    "technology",
    "projects",
    "work experience",
    "skills",
    "local and external rest APIs",
    "Cache",
    "Providers",
    "deep linking",
    "device detection",
    "responsive design",
    "dynamic layout algorithm,",
    "Threshold-based decision logic",
    "Seeded pseudo-randomization",
    "Permutation",
    "Greedy heuristics",
    "Brute force",
    "Custom utility and types",
    "Advanced data shaping (JSON)",
    "followingNative browser control styling",
    "Advanced UI Layering",
    "Glassmorphism Mastery",
    "Responsive Image Masking",
    "Logo design",
    "Figma design",
    "Bug reports",
    "Documented Debugging",
    "Github actions",
    "Descriptive documentation and commits",
    "Safe branching",
  ],
  creator: "Aleksander Borgerød",
  publisher: "Aleksander Borgerød",
  authors: [
    { name: "Aleksander Borgerød", url: "https://github.com/Borgerod" },
  ],
  openGraph: {
    title: "Digital Resume - Aleksander Borgerød",
    description:
      "Explore the digital resume and portfolio of Aleksander Borgerød, featuring projects, work experience, and skills in web development and design.",
    // url: "https://borgerod-github-io.vercel.app/",
    url: "https://borgerod.no",
    siteName: "Aleksander Borgerød Portfolio",
    images: [
      {
        // url: "https://borgerod-github-io.vercel.app/assets/images/previews/site-preview-2.png",
        url: "https://borgerod.no/assets/images/previews/site-preview-2.png",
        width: 781,
        height: 402,
        alt: "Aleksander Borgerød Preview-banner",
      },
    ],
    locale: "en_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Resume - Aleksander Borgerød",
    description:
      "Explore the digital resume and portfolio of Aleksander Borgerød, featuring projects, work experience, and skills in web development and design.",
    site: "@borgerod",
    creator: "@borgerod",
    images: [
      // "https://borgerod-github-io.vercel.app/assets/images/previews/site-preview-2.png",
      "https://borgerod.no/assets/images/previews/site-preview-2.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    // canonical: "https://borgerod-github-io.vercel.app",
    canonical: "https://borgerod.no",
  },
};

// const structuredData = {
const structuredData: WithContext<ProfilePage> = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Aleksander Borgerød",
    description:
      "Full stack developer specializing in web development, UI/UX design, and technology.",
    image: "https://borgerod.no/assets/images/previews/site-preview-2.png",
    jobTitle: "Full Stack Developer",
    sameAs: [
      "https://github.com/Borgerod",
      "https://www.linkedin.com/in/borgerod/",
      "https://www.facebook.com/aleksander.borgerod/",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bergen",
      addressRegion: "Vestland",
      postalCode: "5161",
      addressCountry: "NO",
    },
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Full Stack Development",
      "UI/UX Design",
      "Figma",
      "Python",
      "SQL",
      "AWS",
      "Search Engine Optimization",
      "Data Mining",
      "Business Administration",
    ],
  },
};
export const viewport = {
  themeColor: "#f2f2ec",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = (await headers()).get("x-nonce") ?? undefined; //? idk what to do here, i dont need it anywhere, but i need nonce to pass the lighthouse security-review.

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={cn(
          `@container/main ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`,
        )}
      >
        {/* 
        NOTE: Due to my current app structure; 
          background in body and body has a certain layout, and I cannot get path in layout, 
          I have to seperate the background code for body as a provider here.

          (ALT)
          the alternative is to restructure how body and main is layed out so that each page dictates the background image, 
          which would lead to less clutter. how ever it will require alot more work, 
          and I think that makes my app deviate from the NEXTjs template, 
          which i do not want to do for clarity. 
        */}
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
