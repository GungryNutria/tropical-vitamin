const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface TourTranslation {
  title: string;
  category: string;
  description: string;
  duration: string;
}

export interface Tour {
  id: number;
  location: string;
  price: number;
  tourTranslations: TourTranslation[];
}

class ToursService {
  async getTours(lang: string): Promise<Tour[]> {
    const response = await fetch(`${API_URL}/tours?lang=${lang}`);
    if (!response.ok) {
      throw new Error('Error fetching tours');
    }
    return response.json();
  }
}

export const toursService = new ToursService();
