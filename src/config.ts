// Brand details and contact channels, shared across pages.
export const SITE = {
  url: 'https://handiomacrame.com',
  name: 'HANDIO',
  slogan: 'Make it yourself, make it special',
  tagline: 'Creating memories you can hold',
  email: 'contact.handio@gmail.com',
  instagram: 'https://www.instagram.com/handiomacrame',
  facebook: 'https://www.facebook.com/handiomacrame',
  messenger: 'https://m.me/handiomacrame',
};

// Images live in a Cloudflare R2 bucket served from this domain (also allowed in astro.config.mjs).
export const CDN = 'https://cdn.handiomacrame.com';
export const PRODUCT_IMG = `${CDN}/products`;
export const LOGO = `${CDN}/FullLogo.jpg`;
