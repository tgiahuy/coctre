export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  project: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
}

export const testimonials: Testimonial[] = [];

