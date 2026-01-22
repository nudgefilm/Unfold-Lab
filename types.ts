
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SiteSettings {
  brandName: string;
  heroTitle: string;
  heroDescription: string;
  labIntroTitle: string;
  labIntroDescription: string;
  labStat1Value: string;
  labStat1Label: string;
  labStat2Value: string;
  labStat2Label: string;
  labStat3Value: string;
  labStat3Label: string;
  services: Service[];
  accentColor: string;
  contactEmail: string;
  contactAddress: string;
  footerDescription: string;
  seoTitle: string;
  seoDescription: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
}

export type ViewType = 'home' | 'lab' | 'services' | 'blog' | 'contact' | 'settings';
