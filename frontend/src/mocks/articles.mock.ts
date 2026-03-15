import { Article } from '../types/article.types';

const author1 = { _id: 'author-1', name: 'Anis Zarrouk', avatar: 'https://i.pravatar.cc/150?img=11' };
const author2 = { _id: 'author-2', name: 'Sara Benali', avatar: 'https://i.pravatar.cc/150?img=5' };
const author3 = { _id: 'author-3', name: 'Karim Mrad', avatar: 'https://i.pravatar.cc/150?img=3' };

export const MOCK_ARTICLES: Article[] = [
  {
    _id: 'art-1',
    title: 'L\'essor de l\'intelligence artificielle en 2025',
    slug: 'essor-intelligence-artificielle-2025',
    summary: 'Comment l\'IA a transformé nos métiers, nos habitudes et notre façon de penser le monde numérique en seulement quelques années.',
    content: `<h2>Une révolution silencieuse</h2>
<p>L'intelligence artificielle n'est plus réservée aux laboratoires de recherche. En 2025, elle s'est glissée dans nos smartphones, nos voitures, nos hôpitaux et nos salles de classe.</p>
<h2>Les modèles de langage au quotidien</h2>
<p>Des assistants comme Claude, GPT ou Gemini sont devenus des outils de travail incontournables pour des millions de professionnels. Ils rédigent des emails, analysent des données, génèrent du code et même créent des designs.</p>
<h2>Les défis éthiques</h2>
<p>Cette progression fulgurante soulève des questions fondamentales : qui contrôle ces systèmes ? Quelles données utilisent-ils ? Comment garantir leur transparence et leur équité ?</p>
<p>Le débat est ouvert, et il concerne chacun d'entre nous.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    category: 'tech-news',
    tags: ['IA', 'technologie', 'futur', 'machine learning'],
    author: author1,
    status: 'published',
    averageRating: 4.7,
    ratingsCount: 134,
    viewsCount: 4820,
    commentsCount: 47,
    isFeatured: true,
    createdAt: '2025-02-10T09:00:00Z',
    updatedAt: '2025-02-10T09:00:00Z',
  },
  {
    _id: 'art-2',
    title: 'La chute de Constantinople : la fin d\'un empire',
    slug: 'chute-constantinople-fin-empire',
    summary: 'Le 29 mai 1453, les troupes ottomanes entrent dans Constantinople. Une date qui marque la fin de l\'Empire byzantin et le début d\'une nouvelle ère.',
    content: `<h2>Un empire millénaire à son crépuscule</h2>
<p>L'Empire byzantin, héritier direct de Rome, avait survécu plus de mille ans après la chute de l'Empire romain d'Occident. En 1453, il ne contrôlait plus que la ville de Constantinople et quelques enclaves.</p>
<h2>Le siège</h2>
<p>Le sultan Mehmed II mobilisa une armée de 80 000 hommes et des canons géants capables de pulvériser les murailles légendaires de la ville. Le siège dura 53 jours.</p>
<h2>La défaite de Constantin XI</h2>
<p>L'Empereur Constantin XI mourut en combattant, refusant de fuir. Sa mort symbolisa la fin d'une civilisation. Istanbul, l'ancienne Constantinople, devint la capitale de l'Empire ottoman.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
    category: 'history',
    tags: ['histoire', 'empire byzantin', 'ottoman', 'moyen-âge'],
    author: author2,
    status: 'published',
    averageRating: 4.9,
    ratingsCount: 98,
    viewsCount: 3200,
    commentsCount: 31,
    isFeatured: true,
    createdAt: '2025-01-20T10:30:00Z',
    updatedAt: '2025-01-20T10:30:00Z',
  },
  {
    _id: 'art-3',
    title: 'Comprendre React en 2025 : hooks, context et state',
    slug: 'comprendre-react-2025-hooks-context-state',
    summary: 'Un guide complet pour maîtriser les concepts fondamentaux de React et construire des applications modernes, performantes et maintenables.',
    content: `<h2>Pourquoi React reste incontournable</h2>
<p>Malgré l'émergence de frameworks comme Vue, Svelte ou SolidJS, React reste le choix numéro un des entreprises pour les interfaces web complexes.</p>
<h2>Les hooks fondamentaux</h2>
<p><strong>useState</strong> : gère l'état local d'un composant.<br/>
<strong>useEffect</strong> : gère les effets de bord (API, DOM, timers).<br/>
<strong>useCallback / useMemo</strong> : optimise les re-renders coûteux.</p>
<h2>Redux Toolkit vs Context API</h2>
<p>Pour les petites applications, le Context API suffit. Pour les applications complexes avec beaucoup d'état partagé, Redux Toolkit reste la solution la plus robuste.</p>
<pre><code>const counter = useAppSelector(s => s.counter.value);</code></pre>`,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    category: 'training',
    tags: ['react', 'javascript', 'frontend', 'hooks'],
    author: author1,
    status: 'published',
    averageRating: 4.5,
    ratingsCount: 210,
    viewsCount: 7100,
    commentsCount: 63,
    isFeatured: false,
    createdAt: '2025-01-15T08:00:00Z',
    updatedAt: '2025-01-15T08:00:00Z',
  },
  {
    _id: 'art-4',
    title: 'Le Sahara : mer de sable et civilisations oubliées',
    slug: 'sahara-mer-sable-civilisations-oubliees',
    summary: 'Plus grand désert chaud du monde, le Sahara cache des trésors archéologiques et des cultures millénaires méconnues du grand public.',
    content: `<h2>Un désert vivant</h2>
<p>Le Sahara s'étend sur 9 millions de km² à travers 11 pays africains. Malgré les apparences, il est loin d'être vide de vie ou d'histoire.</p>
<h2>Les peintures rupestres du Tassili</h2>
<p>Dans le massif du Tassili n'Ajjer (Algérie), des milliers de peintures rupestres témoignent d'une époque où le Sahara était verdoyant, peuplé de girafes, d'éléphants et de communautés humaines florissantes.</p>
<h2>Les routes caravanières</h2>
<p>Pendant des siècles, les caravanes traversaient le Sahara transportant or, sel et esclaves entre l'Afrique subsaharienne et le Maghreb. Ces routes ont façonné des empires entiers.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
    category: 'geography',
    tags: ['sahara', 'afrique', 'désert', 'archéologie'],
    author: author3,
    status: 'published',
    averageRating: 4.3,
    ratingsCount: 76,
    viewsCount: 2900,
    commentsCount: 22,
    isFeatured: false,
    createdAt: '2025-01-05T14:00:00Z',
    updatedAt: '2025-01-05T14:00:00Z',
  },
  {
    _id: 'art-5',
    title: 'Street art : quand la rue devient galerie',
    slug: 'street-art-quand-rue-devient-galerie',
    summary: 'Du tag au pochoir, le street art a conquis les musées et les maisons de vente aux enchères. Retour sur l\'histoire d\'un art qui refuse encore les frontières.',
    content: `<h2>Des murs comme toile</h2>
<p>Né dans les années 70 dans le Bronx new-yorkais, le graffiti s'est transformé en mouvement artistique mondial. Banksy, Shepard Fairey, JR... ces artistes ont fait de la rue leur terrain d'expression.</p>
<h2>La reconnaissance institutionnelle</h2>
<p>En 2021, une œuvre de Banksy a été vendue aux enchères pour 23 millions de dollars. Ce qui était illégal est devenu collector. Cette institutionnalisation fait débat dans la communauté.</p>
<h2>Le paradoxe du street art</h2>
<p>En intégrant les galeries, le street art perd-il son essence ? Pour beaucoup d'artistes, la rue reste le seul espace de liberté véritable, sans curatrice, sans compromis.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80',
    category: 'art',
    tags: ['street art', 'graffiti', 'banksy', 'culture urbaine'],
    author: author2,
    status: 'published',
    averageRating: 4.1,
    ratingsCount: 54,
    viewsCount: 1850,
    commentsCount: 18,
    isFeatured: false,
    createdAt: '2024-12-28T11:00:00Z',
    updatedAt: '2024-12-28T11:00:00Z',
  },
  {
    _id: 'art-6',
    title: 'Les bases de TypeScript pour les développeurs JavaScript',
    slug: 'bases-typescript-developpeurs-javascript',
    summary: 'TypeScript n\'est plus optionnel dans les projets modernes. Voici tout ce qu\'il faut savoir pour passer de JS à TS sans douleur.',
    content: `<h2>Pourquoi TypeScript ?</h2>
<p>JavaScript est dynamique et flexible, mais cette liberté a un coût : des bugs difficiles à détecter avant l'exécution. TypeScript ajoute un système de types statiques qui attrape les erreurs dès l'écriture du code.</p>
<h2>Les types de base</h2>
<pre><code>let age: number = 25;
let name: string = "Anis";
let isActive: boolean = true;</code></pre>
<h2>Les interfaces</h2>
<pre><code>interface User {
  _id: string;
  name: string;
  role: 'admin' | 'author' | 'reader';
}</code></pre>
<h2>Les génériques</h2>
<p>Les génériques permettent d'écrire des fonctions et des composants réutilisables tout en gardant la sécurité des types.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
    category: 'training',
    tags: ['typescript', 'javascript', 'développement', 'frontend'],
    author: author1,
    status: 'published',
    averageRating: 4.8,
    ratingsCount: 189,
    viewsCount: 6400,
    commentsCount: 55,
    isFeatured: true,
    createdAt: '2024-12-15T08:00:00Z',
    updatedAt: '2024-12-15T08:00:00Z',
  },
  {
    _id: 'art-7',
    title: 'Le jazz : naissance d\'un langage universel',
    slug: 'jazz-naissance-langage-universel',
    summary: 'Né dans les quartiers noirs de La Nouvelle-Orléans, le jazz a traversé les siècles et les frontières pour devenir l\'un des langages musicaux les plus riches du monde.',
    content: `<h2>Les racines du jazz</h2>
<p>Le jazz est né à la fin du XIXe siècle, à la croisée des musiques africaines, des negro spirituals, du blues et de la musique européenne. La Nouvelle-Orléans, avec ses bals et ses funérailles musicales, fut son berceau.</p>
<h2>Miles Davis et le cool jazz</h2>
<p>Dans les années 50, Miles Davis révolutionna le genre avec son album <em>Kind of Blue</em>, l'album de jazz le plus vendu de tous les temps. Il inventa le "cool jazz" : plus lent, plus atmosphérique, plus introspectif.</p>
<h2>Le jazz aujourd'hui</h2>
<p>Des artistes comme Kamasi Washington ou Snarky Puppy prouvent que le jazz est vivant et se réinvente constamment, absorbant le hip-hop, l'électronique et la musique du monde.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80',
    category: 'culture',
    tags: ['jazz', 'musique', 'histoire', 'culture'],
    author: author3,
    status: 'published',
    averageRating: 4.6,
    ratingsCount: 88,
    viewsCount: 3100,
    commentsCount: 29,
    isFeatured: false,
    createdAt: '2024-12-01T16:00:00Z',
    updatedAt: '2024-12-01T16:00:00Z',
  },
  {
    _id: 'art-8',
    title: 'Node.js et Express : construire une API REST en 30 minutes',
    slug: 'nodejs-express-api-rest-30-minutes',
    summary: 'Un tutoriel pratique pour créer une API REST complète avec Node.js, Express et MongoDB, de zéro à déploiement.',
    content: `<h2>Initialisation du projet</h2>
<pre><code>npm init -y
npm install express mongoose dotenv
npm install -D typescript ts-node @types/express</code></pre>
<h2>Créer le serveur</h2>
<pre><code>import express from 'express';
const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(3000, () => console.log('Server running'));</code></pre>
<h2>Connecter MongoDB</h2>
<p>Utilisez Mongoose pour définir vos schémas et interagir avec MongoDB de façon simple et sécurisée.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    category: 'training',
    tags: ['nodejs', 'express', 'API', 'backend', 'mongodb'],
    author: author1,
    status: 'published',
    averageRating: 4.4,
    ratingsCount: 143,
    viewsCount: 5200,
    commentsCount: 41,
    isFeatured: false,
    createdAt: '2024-11-20T09:00:00Z',
    updatedAt: '2024-11-20T09:00:00Z',
  },
];

export const MOCK_FEATURED = MOCK_ARTICLES.filter((a) => a.isFeatured);
export const MOCK_TOP_RATED = [...MOCK_ARTICLES].sort((a, b) => b.averageRating - a.averageRating).slice(0, 5);
