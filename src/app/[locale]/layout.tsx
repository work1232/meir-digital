import type { Metadata } from "next";
import { Geist_Mono, Heebo, Rubik } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Dock } from "@/components/layout/dock";
import { Preloader } from "@/components/layout/preloader";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/lib/site";
import "../globals.css";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t("title"),
      template: "%s",
    },
    description: t("description"),
    openGraph: {
      siteName: site.name,
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const dir = locale === "he" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${rubik.variable} ${heebo.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-svh flex-col overflow-x-clip">
        <NextIntlClientProvider>
          <ThemeProvider>
            <MotionProvider>
            <AuthProvider>
              <Preloader />
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <Dock />
              <Toaster position="top-center" richColors />
            </AuthProvider>
            </MotionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
