import i18n from '../i18n';
import noImage from '../assets/no-image.webp';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Category {
  id: number;
  adminName: string;
  translations: Array<{ name: string }>;
}

export interface Language {
  code: string;
  name: string;
}

export interface TourTranslation {
  id: number;
  title: string;
  description: string;
  language: Language;
}

export interface Tour {
  id: number;
  price: number;
  location: string;
  duration: number;
  img: string | null;
  isActive: boolean;
  category: Category;
  translations: TourTranslation[];
}

// Helper to get proper image URL - proxy through API for presigned URLs
function getImageUrl(img: string | null): string {
  if (!img) return noImage;
  // Extract filename from any URL format
  const filename = img.split('/').pop();
  // Use API proxy endpoint which generates presigned URLs
  return `${API_URL}/upload/${filename}`;
}

class ToursService {
  async getTours(): Promise<Tour[]> {
    const lang = i18n.language || 'es';
    const response = await fetch(`${API_URL}/tours?lang=${lang}`);
    if (!response.ok) {
      throw new Error('Error fetching tours');
    }
    const tours = await response.json();
    // Add getImageUrl helper to each tour
    return tours.map((tour: Tour) => ({
      ...tour,
      imageUrl: getImageUrl(tour.img),
    }));
  }
}

export const toursService = new ToursService();
