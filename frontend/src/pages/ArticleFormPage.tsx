import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/store';
import { fetchArticleBySlug, createArticle, updateArticle, ArticleFormData } from '../features/articles/articlesSlice';
import { CATEGORIES } from '../constants/categories';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Category } from '../types/article.types';

export default function ArticleFormPage() {
  const { slug } = useParams<{ slug?: string }>();
  const isEditing = Boolean(slug);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((s) => s.auth);
  const { current, saving, error } = useAppSelector((s) => s.articles);

  const [form, setForm] = useState<ArticleFormData>({
    title: '',
    summary: '',
    content: '',
    coverImage: '',
    category: 'tech-news',
    tags: [],
    status: 'draft',
  });
  const [tagsInput, setTagsInput] = useState('');


  // Load article if editing
  useEffect(() => {
    if (isEditing && slug) {
      dispatch(fetchArticleBySlug(slug));
    }
  }, [slug]);

  // Pre-fill form when article is loaded
  useEffect(() => {
    if (isEditing && current) {
      setForm({
        title: current.title,
        summary: current.summary,
        content: current.content,
        coverImage: current.coverImage ?? '',
        category: current.category,
        tags: current.tags ?? [],
        status: current.status === 'archived' ? 'draft' : current.status,
      });
      setTagsInput((current.tags ?? []).join(', '));
    }
  }, [current?._id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    const payload = { ...form, tags };

    if (isEditing && current) {
      const result = await dispatch(updateArticle({ id: current._id, formData: payload }));
      if (updateArticle.fulfilled.match(result)) {
        navigate(`/article/${result.payload.slug}`);
      }
    } else {
      const result = await dispatch(createArticle(payload));
      if (createArticle.fulfilled.match(result)) {
        navigate(`/article/${result.payload.slug}`);
      }
    }
  };

  return (
    <div className="container py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Modifier l\'article' : 'Nouvel article'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div className="space-y-1.5">
          <Label htmlFor="title">Titre</Label>
          <Input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Titre de l'article"
          />
        </div>

        {/* Summary */}
        <div className="space-y-1.5">
          <Label htmlFor="summary">Résumé</Label>
          <Textarea
            id="summary"
            name="summary"
            value={form.summary}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Brève description de l'article..."
          />
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          <Label htmlFor="content">Contenu (HTML accepté)</Label>
          <Textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={12}
            placeholder="<p>Contenu de l'article...</p>"
            className="font-mono text-sm"
          />
        </div>

        {/* Cover Image */}
        <div className="space-y-1.5">
          <Label htmlFor="coverImage">URL de l'image de couverture</Label>
          <Input
            id="coverImage"
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            placeholder="https://..."
          />
          {form.coverImage && (
            <img src={form.coverImage} alt="preview" className="mt-2 h-40 w-full object-cover rounded-lg" />
          )}
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <Label htmlFor="category">Catégorie</Label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="space-y-1.5">
          <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
          <Input
            id="tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="javascript, react, web..."
          />
        </div>

        {/* Status */}
        <div className="space-y-1.5">
          <Label htmlFor="status">Statut</Label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
          </select>
        </div>

        {/* Error */}
        {error && <p className="text-sm text-destructive">{error}</p>}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={saving}>
            {saving ? 'Enregistrement...' : isEditing ? 'Enregistrer' : 'Publier'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(isEditing && current ? `/article/${current.slug}` : '/')}
          >
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}
