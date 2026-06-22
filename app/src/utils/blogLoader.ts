import { blogArticles } from '../data/blogArticles';
import type { BlogArticle } from '../data/blogArticles';

export async function loadBlogs(): Promise<BlogArticle[]> {
  try {
    const res = await fetch('/blogs.json');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Could not load blogs.json, falling back to static blogs', err);
  }
  return blogArticles;
}
