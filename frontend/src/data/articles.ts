export interface Article {
  id: string;
  slug: string;
  title: string;
  category: "Kỹ thuật thi công" | "Kinh nghiệm chọn cọc" | "Kiến thức nền móng" | "Tin công trình";
  coverImage: string;
  publishDate: string;
  author: string;
  readTime: string;
  excerpt: string;
  tableOfContents: {
    id: string;
    text: string;
  }[];
  content: string; // Markdown or rich HTML-like paragraphs
  tags: string[];
  featured?: boolean;
}

export const articles: Article[] = [];


export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string, limit = 3): Article[] {
  return articles.filter((a) => a.slug !== currentSlug).slice(0, limit);
}
