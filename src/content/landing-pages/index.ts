import { heatpumpPages } from "./heatpump";
import { solarPages } from "./solar";
import { electricalPages } from "./electrical";
export const landingPages = [...heatpumpPages, ...solarPages, ...electricalPages];
export const getLandingPage = (slug: string) => landingPages.find(page => page.slug === slug);
