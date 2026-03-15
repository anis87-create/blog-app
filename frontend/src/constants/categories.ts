import { Category } from '../types/article.types';

export const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: 'tech-news', label: 'Tech & Numérique', emoji: '💻' },
  { value: 'history', label: 'Histoire', emoji: '🏛️' },
  { value: 'art', label: 'Art & Créativité', emoji: '🎨' },
  { value: 'geography', label: 'Géographie', emoji: '🌍' },
  { value: 'training', label: 'Formation', emoji: '📚' },
  { value: 'culture', label: 'Culture Générale', emoji: '🎭' },
];

export const getCategoryLabel = (value: Category): string =>
  CATEGORIES.find((c) => c.value === value)?.label ?? value;

export const getCategoryEmoji = (value: Category): string =>
  CATEGORIES.find((c) => c.value === value)?.emoji ?? '';
