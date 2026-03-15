import { Article } from '../types/article.types';

const author1 = { _id: 'author-1', name: 'Anis Zarrouk', avatar: 'https://i.pravatar.cc/150?img=11' };
const author2 = { _id: 'author-2', name: 'Sara Benali', avatar: 'https://i.pravatar.cc/150?img=5' };
const author3 = { _id: 'author-3', name: 'Karim Mrad', avatar: 'https://i.pravatar.cc/150?img=3' };
const author4 = { _id: 'author-4', name: 'Leila Hamdi', avatar: 'https://i.pravatar.cc/150?img=9' };

export const MOCK_ARTICLES: Article[] = [
  {
    _id: 'art-1',
    title: "L'essor de l'intelligence artificielle en 2025",
    slug: 'essor-intelligence-artificielle-2025',
    summary: "Comment l'IA a transformé nos métiers, nos habitudes et notre façon de penser le monde numérique en seulement quelques années.",
    content: `<h2>Une révolution silencieuse</h2>
<p>L'intelligence artificielle n'est plus réservée aux laboratoires de recherche. En 2025, elle s'est glissée dans nos smartphones, nos voitures, nos hôpitaux et nos salles de classe.</p>
<h2>Les modèles de langage au quotidien</h2>
<p>Des assistants comme Claude, GPT ou Gemini sont devenus des outils de travail incontournables pour des millions de professionnels. Ils rédigent des emails, analysent des données, génèrent du code et même créent des designs.</p>
<h2>Les défis éthiques</h2>
<p>Cette progression fulgurante soulève des questions fondamentales : qui contrôle ces systèmes ? Quelles données utilisent-ils ? Comment garantir leur transparence et leur équité ?</p>`,
    coverImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
    category: 'tech-news',
    tags: ['IA', 'technologie', 'futur', 'machine learning'],
    author: author1,
    status: 'published',
    averageRating: 4.7,
    ratingsCount: 134,
    viewsCount: 4820,
    commentsCount: 47,
    isFeatured: true,
    createdAt: '2025-03-10T09:00:00Z',
    updatedAt: '2025-03-10T09:00:00Z',
  },
  {
    _id: 'art-2',
    title: "La chute de Constantinople : la fin d'un empire",
    slug: 'chute-constantinople-fin-empire',
    summary: "Le 29 mai 1453, les troupes ottomanes entrent dans Constantinople. Une date qui marque la fin de l'Empire byzantin et le début d'une nouvelle ère.",
    content: `<h2>Un empire millénaire à son crépuscule</h2>
<p>L'Empire byzantin, héritier direct de Rome, avait survécu plus de mille ans après la chute de l'Empire romain d'Occident. En 1453, il ne contrôlait plus que la ville de Constantinople et quelques enclaves.</p>
<h2>Le siège</h2>
<p>Le sultan Mehmed II mobilisa une armée de 80 000 hommes et des canons géants capables de pulvériser les murailles légendaires de la ville. Le siège dura 53 jours.</p>
<h2>La défaite de Constantin XI</h2>
<p>L'Empereur Constantin XI mourut en combattant, refusant de fuir. Sa mort symbolisa la fin d'une civilisation.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80',
    category: 'history',
    tags: ['histoire', 'empire byzantin', 'ottoman', 'moyen-âge'],
    author: author2,
    status: 'published',
    averageRating: 4.9,
    ratingsCount: 98,
    viewsCount: 3200,
    commentsCount: 31,
    isFeatured: true,
    createdAt: '2025-03-05T10:30:00Z',
    updatedAt: '2025-03-05T10:30:00Z',
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
<p>Pour les petites applications, le Context API suffit. Pour les applications complexes avec beaucoup d'état partagé, Redux Toolkit reste la solution la plus robuste.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80',
    category: 'training',
    tags: ['react', 'javascript', 'frontend', 'hooks'],
    author: author1,
    status: 'published',
    averageRating: 4.5,
    ratingsCount: 210,
    viewsCount: 7100,
    commentsCount: 63,
    isFeatured: false,
    createdAt: '2025-02-28T08:00:00Z',
    updatedAt: '2025-02-28T08:00:00Z',
  },
  {
    _id: 'art-4',
    title: 'Le Sahara : mer de sable et civilisations oubliées',
    slug: 'sahara-mer-sable-civilisations-oubliees',
    summary: "Plus grand désert chaud du monde, le Sahara cache des trésors archéologiques et des cultures millénaires méconnues du grand public.",
    content: `<h2>Un désert vivant</h2>
<p>Le Sahara s'étend sur 9 millions de km² à travers 11 pays africains. Malgré les apparences, il est loin d'être vide de vie ou d'histoire.</p>
<h2>Les peintures rupestres du Tassili</h2>
<p>Dans le massif du Tassili n'Ajjer (Algérie), des milliers de peintures rupestres témoignent d'une époque où le Sahara était verdoyant, peuplé de girafes, d'éléphants et de communautés humaines florissantes.</p>
<h2>Les routes caravanières</h2>
<p>Pendant des siècles, les caravanes traversaient le Sahara transportant or, sel et esclaves entre l'Afrique subsaharienne et le Maghreb.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80',
    category: 'geography',
    tags: ['sahara', 'afrique', 'désert', 'archéologie'],
    author: author3,
    status: 'published',
    averageRating: 4.3,
    ratingsCount: 76,
    viewsCount: 2900,
    commentsCount: 22,
    isFeatured: false,
    createdAt: '2025-02-20T14:00:00Z',
    updatedAt: '2025-02-20T14:00:00Z',
  },
  {
    _id: 'art-5',
    title: 'Street art : quand la rue devient galerie',
    slug: 'street-art-quand-rue-devient-galerie',
    summary: "Du tag au pochoir, le street art a conquis les musées et les maisons de vente aux enchères. Retour sur l'histoire d'un art qui refuse encore les frontières.",
    content: `<h2>Des murs comme toile</h2>
<p>Né dans les années 70 dans le Bronx new-yorkais, le graffiti s'est transformé en mouvement artistique mondial. Banksy, Shepard Fairey, JR... ces artistes ont fait de la rue leur terrain d'expression.</p>
<h2>La reconnaissance institutionnelle</h2>
<p>En 2021, une œuvre de Banksy a été vendue aux enchères pour 23 millions de dollars.</p>
<h2>Le paradoxe du street art</h2>
<p>En intégrant les galeries, le street art perd-il son essence ? Pour beaucoup d'artistes, la rue reste le seul espace de liberté véritable.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=1200&q=80',
    category: 'art',
    tags: ['street art', 'graffiti', 'banksy', 'culture urbaine'],
    author: author2,
    status: 'published',
    averageRating: 4.1,
    ratingsCount: 54,
    viewsCount: 1850,
    commentsCount: 18,
    isFeatured: false,
    createdAt: '2025-02-14T11:00:00Z',
    updatedAt: '2025-02-14T11:00:00Z',
  },
  {
    _id: 'art-6',
    title: 'Les bases de TypeScript pour les développeurs JavaScript',
    slug: 'bases-typescript-developpeurs-javascript',
    summary: "TypeScript n'est plus optionnel dans les projets modernes. Voici tout ce qu'il faut savoir pour passer de JS à TS sans douleur.",
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
}</code></pre>`,
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&q=80',
    category: 'training',
    tags: ['typescript', 'javascript', 'développement', 'frontend'],
    author: author1,
    status: 'published',
    averageRating: 4.8,
    ratingsCount: 189,
    viewsCount: 6400,
    commentsCount: 55,
    isFeatured: true,
    createdAt: '2025-02-08T08:00:00Z',
    updatedAt: '2025-02-08T08:00:00Z',
  },
  {
    _id: 'art-7',
    title: "Le jazz : naissance d'un langage universel",
    slug: 'jazz-naissance-langage-universel',
    summary: "Né dans les quartiers noirs de La Nouvelle-Orléans, le jazz a traversé les siècles et les frontières pour devenir l'un des langages musicaux les plus riches du monde.",
    content: `<h2>Les racines du jazz</h2>
<p>Le jazz est né à la fin du XIXe siècle, à la croisée des musiques africaines, des negro spirituals, du blues et de la musique européenne.</p>
<h2>Miles Davis et le cool jazz</h2>
<p>Dans les années 50, Miles Davis révolutionna le genre avec son album <em>Kind of Blue</em>, l'album de jazz le plus vendu de tous les temps.</p>
<h2>Le jazz aujourd'hui</h2>
<p>Des artistes comme Kamasi Washington ou Snarky Puppy prouvent que le jazz est vivant et se réinvente constamment, absorbant le hip-hop, l'électronique et la musique du monde.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200&q=80',
    category: 'art',
    tags: ['jazz', 'musique', 'histoire', 'culture'],
    author: author3,
    status: 'published',
    averageRating: 4.6,
    ratingsCount: 88,
    viewsCount: 3100,
    commentsCount: 29,
    isFeatured: false,
    createdAt: '2025-01-30T16:00:00Z',
    updatedAt: '2025-01-30T16:00:00Z',
  },
  {
    _id: 'art-8',
    title: 'Node.js et Express : construire une API REST en 30 minutes',
    slug: 'nodejs-express-api-rest-30-minutes',
    summary: 'Un tutoriel pratique pour créer une API REST complète avec Node.js, Express et MongoDB, de zéro à déploiement.',
    content: `<h2>Initialisation du projet</h2>
<pre><code>npm init -y
npm install express mongoose dotenv</code></pre>
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
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
    category: 'training',
    tags: ['nodejs', 'express', 'API', 'backend', 'mongodb'],
    author: author1,
    status: 'published',
    averageRating: 4.4,
    ratingsCount: 143,
    viewsCount: 5200,
    commentsCount: 41,
    isFeatured: false,
    createdAt: '2025-01-22T09:00:00Z',
    updatedAt: '2025-01-22T09:00:00Z',
  },
  {
    _id: 'art-9',
    title: 'Le minimalisme japonais : wabi-sabi et art du vide',
    slug: 'minimalisme-japonais-wabi-sabi-art-vide',
    summary: "Le wabi-sabi, philosophie de la beauté dans l'imperfection et l'impermanence, influence profondément le design, l'architecture et le mode de vie japonais.",
    content: `<h2>Qu'est-ce que le wabi-sabi ?</h2>
<p>Le wabi-sabi est un concept esthétique japonais qui trouve la beauté dans les choses imparfaites, incomplètes et éphémères. Un bol de céramique fissuré, une planche de bois usée par le temps...</p>
<h2>L'influence sur le design moderne</h2>
<p>Aujourd'hui, le wabi-sabi influence des designers du monde entier. On le retrouve dans les intérieurs épurés, les matériaux naturels, les couleurs terreuses et les formes organiques.</p>
<h2>Vivre wabi-sabi</h2>
<p>Au-delà de l'esthétique, c'est une façon d'accepter l'impermanence de toute chose et de trouver la paix dans l'inachevé.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80',
    category: 'art',
    tags: ['japon', 'design', 'philosophie', 'minimalisme'],
    author: author4,
    status: 'published',
    averageRating: 4.5,
    ratingsCount: 67,
    viewsCount: 2400,
    commentsCount: 20,
    isFeatured: false,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    _id: 'art-10',
    title: "La Révolution française : mythe et réalité",
    slug: 'revolution-francaise-mythe-realite',
    summary: "Entre idéaux des Lumières et Terreur sanguinaire, la Révolution française reste l'événement fondateur de la modernité politique occidentale.",
    content: `<h2>1789 : une rupture radicale</h2>
<p>La prise de la Bastille le 14 juillet 1789 est devenue le symbole d'une rupture avec l'Ancien Régime. Mais la Révolution est bien plus complexe qu'une simple journée.</p>
<h2>Les idéaux des Lumières</h2>
<p>Liberté, Égalité, Fraternité — ces trois mots résument l'ambition des révolutionnaires, inspirés par Voltaire, Rousseau et Montesquieu.</p>
<h2>La Terreur</h2>
<p>Entre 1793 et 1794, sous Robespierre, la Révolution dévora ses propres enfants. Plus de 16 000 personnes furent guillotinées au nom de la République.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
    category: 'history',
    tags: ['france', 'révolution', 'histoire', 'politique'],
    author: author2,
    status: 'published',
    averageRating: 4.7,
    ratingsCount: 112,
    viewsCount: 4100,
    commentsCount: 38,
    isFeatured: true,
    createdAt: '2025-01-08T14:00:00Z',
    updatedAt: '2025-01-08T14:00:00Z',
  },
  {
    _id: 'art-11',
    title: 'Docker et Kubernetes : orchestrer ses conteneurs',
    slug: 'docker-kubernetes-orchestrer-conteneurs',
    summary: "De la conteneurisation avec Docker au déploiement à grande échelle avec Kubernetes — guide pratique pour les développeurs qui veulent passer au DevOps.",
    content: `<h2>Pourquoi Docker ?</h2>
<p>Docker permet de packager une application et toutes ses dépendances dans un conteneur portable. Plus de "ça marche sur ma machine" — ça marche partout.</p>
<h2>Commandes Docker essentielles</h2>
<pre><code>docker build -t mon-app .
docker run -p 3000:3000 mon-app
docker-compose up -d</code></pre>
<h2>Kubernetes pour la production</h2>
<p>Kubernetes automatise le déploiement, la mise à l'échelle et la gestion des conteneurs. C'est la solution de référence pour les applications critiques en production.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=80',
    category: 'tech-news',
    tags: ['docker', 'kubernetes', 'devops', 'cloud'],
    author: author1,
    status: 'published',
    averageRating: 4.6,
    ratingsCount: 156,
    viewsCount: 5800,
    commentsCount: 49,
    isFeatured: false,
    createdAt: '2024-12-28T09:00:00Z',
    updatedAt: '2024-12-28T09:00:00Z',
  },
  {
    _id: 'art-12',
    title: "L'Amazonie : poumon vert de la planète en danger",
    slug: 'amazonie-poumon-vert-planete-danger',
    summary: "La forêt amazonienne couvre 5,5 millions de km² et abrite 10% de toutes les espèces vivantes. Mais la déforestation menace cet écosystème irremplaçable.",
    content: `<h2>Un écosystème unique au monde</h2>
<p>L'Amazonie est la plus grande forêt tropicale de la planète. Elle produit 20% de l'oxygène terrestre et régule le climat mondial grâce à ses cycles de précipitation.</p>
<h2>La déforestation galopante</h2>
<p>Entre 2000 et 2020, l'Amazonie a perdu 513 000 km² de forêt — soit l'équivalent de la France entière. Les principales causes : l'élevage bovin, l'agriculture intensive et l'exploitation minière.</p>
<h2>Les peuples autochtones en première ligne</h2>
<p>Plus de 400 groupes indigènes vivent en Amazonie. Leur survie est directement liée à celle de la forêt qu'ils protègent depuis des millénaires.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=80',
    category: 'geography',
    tags: ['amazonie', 'environnement', 'forêt', 'déforestation'],
    author: author4,
    status: 'published',
    averageRating: 4.4,
    ratingsCount: 93,
    viewsCount: 3500,
    commentsCount: 34,
    isFeatured: false,
    createdAt: '2024-12-18T11:00:00Z',
    updatedAt: '2024-12-18T11:00:00Z',
  },
  {
    _id: 'art-13',
    title: 'Tailwind CSS v4 : tout ce qui change',
    slug: 'tailwind-css-v4-tout-ce-qui-change',
    summary: "Tailwind CSS v4 repense complètement son architecture avec un moteur basé sur Rust, une configuration zero-config et de nouvelles utilities. Tour d'horizon complet.",
    content: `<h2>Un nouveau moteur ultra-rapide</h2>
<p>Tailwind v4 est construit sur Oxide, un moteur écrit en Rust. Les builds sont jusqu'à 5x plus rapides qu'en v3, même sur de grands projets.</p>
<h2>CSS-first configuration</h2>
<p>Fini le tailwind.config.js. La configuration se fait désormais directement dans le CSS avec des variables CSS natives :</p>
<pre><code>@import "tailwindcss";

@theme {
  --color-primary: oklch(0.6 0.2 260);
  --font-display: "Figtree", sans-serif;
}</code></pre>
<h2>Nouvelles utilities</h2>
<p>text-balance, field-sizing, starting-style pour les animations d'entrée... Tailwind v4 intègre les dernières APIs CSS modernes.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    category: 'training',
    tags: ['tailwind', 'css', 'frontend', 'design'],
    author: author1,
    status: 'published',
    averageRating: 4.9,
    ratingsCount: 201,
    viewsCount: 8200,
    commentsCount: 72,
    isFeatured: true,
    createdAt: '2024-12-10T08:00:00Z',
    updatedAt: '2024-12-10T08:00:00Z',
  },
  {
    _id: 'art-14',
    title: 'La photographie de rue : capturer l\'instant vrai',
    slug: 'photographie-rue-capturer-instant-vrai',
    summary: "De Cartier-Bresson à Vivian Maier, la photographie de rue est un art à part entière. Techniques, éthique et regard : tout ce qu'il faut savoir pour commencer.",
    content: `<h2>L'instant décisif</h2>
<p>Henri Cartier-Bresson a inventé la notion d'"instant décisif" — ce moment fugace où la géométrie, la lumière et l'émotion se rejoignent en une image parfaite.</p>
<h2>Matériel et discrétion</h2>
<p>Un appareil compact ou un smartphone suffisent. L'objectif est de se fondre dans la foule, d'observer sans être observé. Le 35mm et le 50mm sont les focales de référence.</p>
<h2>L'éthique du photographe de rue</h2>
<p>En France, photographier dans l'espace public est légal. Mais le respect des personnes photographiées reste une obligation morale essentielle.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80',
    category: 'art',
    tags: ['photographie', 'street', 'art', 'technique'],
    author: author4,
    status: 'published',
    averageRating: 4.3,
    ratingsCount: 71,
    viewsCount: 2700,
    commentsCount: 25,
    isFeatured: false,
    createdAt: '2024-12-02T15:00:00Z',
    updatedAt: '2024-12-02T15:00:00Z',
  },
  {
    _id: 'art-15',
    title: "Les civilisations précolombiennes : au-delà des Aztèques",
    slug: 'civilisations-precolumbiennes-au-dela-azteques',
    summary: "Mayas, Incas, Olmèques, Toltèques... L'Amérique précolombienne regorge de civilisations fascinantes dont nous ne connaissons souvent qu'une infime partie.",
    content: `<h2>Les Olmèques, mère de toutes les civilisations</h2>
<p>Bien avant les Aztèques et les Mayas, les Olmèques (1500-400 av. J.-C.) ont posé les bases de la civilisation mésoaméricaine : calendrier, écriture, jeu de balle sacré.</p>
<h2>L'empire Inca : ingénieurs hors pair</h2>
<p>L'empire Inca s'étendait sur 4 000 km le long des Andes. Sans roue ni animal de trait pour le transport lourd, les Incas construisirent 40 000 km de routes et des cités perchées à 3 000 mètres d'altitude.</p>
<h2>Les Mayas et leur astronomie</h2>
<p>Les Mayas avaient calculé la durée de l'année solaire avec une précision supérieure au calendrier grégorien, et avaient prédit les éclipses des siècles à l'avance.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=1200&q=80',
    category: 'history',
    tags: ['mayas', 'incas', 'histoire', 'archéologie', 'amérique'],
    author: author3,
    status: 'published',
    averageRating: 4.8,
    ratingsCount: 104,
    viewsCount: 3900,
    commentsCount: 43,
    isFeatured: false,
    createdAt: '2024-11-25T13:00:00Z',
    updatedAt: '2024-11-25T13:00:00Z',
  },
  {
    _id: 'art-16',
    title: 'Git avancé : rebase, cherry-pick et gestion des conflits',
    slug: 'git-avance-rebase-cherry-pick-conflits',
    summary: "Maîtriser Git au-delà du commit/push. Apprenez à réécrire l'historique, gérer les branches complexes et résoudre les conflits comme un pro.",
    content: `<h2>Le rebase interactif</h2>
<p>Le rebase interactif permet de réécrire l'historique de commits : fusionner, réécrire, réordonner ou supprimer des commits avant de pusher.</p>
<pre><code>git rebase -i HEAD~5</code></pre>
<h2>Cherry-pick : sélectionner des commits</h2>
<p>Cherry-pick permet d'appliquer un commit précis d'une branche sur une autre, sans merger toute la branche.</p>
<pre><code>git cherry-pick abc1234</code></pre>
<h2>Résoudre les conflits de merge</h2>
<p>Un conflit survient quand deux branches modifient la même ligne. Git marque les conflits avec des balises, à vous de choisir quelle version garder ou de combiner les deux.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1200&q=80',
    category: 'training',
    tags: ['git', 'versioning', 'développement', 'workflow'],
    author: author1,
    status: 'published',
    averageRating: 4.7,
    ratingsCount: 178,
    viewsCount: 6900,
    commentsCount: 58,
    isFeatured: false,
    createdAt: '2024-11-15T09:00:00Z',
    updatedAt: '2024-11-15T09:00:00Z',
  },
];

export const MOCK_FEATURED = MOCK_ARTICLES.filter((a) => a.isFeatured);
export const MOCK_TOP_RATED = [...MOCK_ARTICLES].sort((a, b) => b.averageRating - a.averageRating).slice(0, 5);
