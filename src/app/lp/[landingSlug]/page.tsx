import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPage from "@/components/landing/LandingPage";
import LandingPageModern from "@/components/landing/LandingPageModern";
import { getLandingPage, landingPages } from "@/content/landing-pages";

export const dynamicParams = false;
export function generateStaticParams() { return landingPages.map(page => ({ landingSlug: page.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ landingSlug: string }> }): Promise<Metadata> {
  const page = getLandingPage((await params).landingSlug);
  if (!page) notFound();
  const url = `https://www.alabenergiesysteme.de/lp/${page.slug}`;
  return {
    title: { absolute: page.title }, description: page.description,
    alternates: { canonical: url }, robots: { index: false, follow: true },
    openGraph: { title: page.title, description: page.description, url, type: "website", locale: "de_DE", siteName: "ALAB Energiesysteme", images: [{ url: page.heroImage, alt: page.heroAlt }] },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [page.heroImage] },
  };
}

export default async function Page({ params }: { params: Promise<{ landingSlug: string }> }) {
  const page = getLandingPage((await params).landingSlug);
  if (!page) notFound();
  return page.design === "modern" ? <LandingPageModern page={page} /> : <LandingPage page={page} />;
}
