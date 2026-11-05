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
  img: string | null;
  images?: Array<{ filename: string }>;
  isActive: boolean;
  category: Category;
  translations: TourTranslation[];
}

// Lo que arma el servicio sobre el tour de la API
export interface TourWithImages extends Tour {
  imageUrls: string[];
  imageUrl: string;
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
  async getTours(): Promise<TourWithImages[]> {
    const lang = i18n.language || 'es';
    const response = await fetch(`${API_URL}/tours?lang=${lang}`);
    if (!response.ok) {
      throw new Error('Error fetching tours');
    }
    const tours = await response.json();
    // Galería de la API (plan 006); si aún no la trae, solo la portada
    return tours.map((tour: Tour) => {
      const imageUrls = tour.images?.length
        ? tour.images.map((i) => getImageUrl(i.filename))
        : [getImageUrl(tour.img)];
      return { ...tour, imageUrls, imageUrl: imageUrls[0] };
    });
  }
}

export const toursService = new ToursService();
