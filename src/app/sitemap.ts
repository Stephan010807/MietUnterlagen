import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/formular', '/datenschutz', '/impressum'].map((path) => ({
    url: SITE_CONFIG.url + path,
  }));
}
