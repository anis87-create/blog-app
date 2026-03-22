# Guide de Déploiement — Blog App sur Vercel

Ce projet est un monorepo avec deux applications distinctes à déployer séparément sur Vercel :

- **Frontend** → app React/Vite (dossier `frontend/`)
- **Backend** → API Express/MongoDB (dossier `backend/`)

---

## Pré-requis

- Un compte [Vercel](https://vercel.com)
- Une base de données MongoDB Atlas (ou autre MongoDB cloud)
- Un compte [Cloudinary](https://cloudinary.com) pour les images
- Optionnel : credentials Google OAuth et/ou Facebook OAuth

---

## 1. Déployer le Backend

### Depuis le dashboard Vercel

1. **New Project** → importer le repo GitHub
2. **Root Directory** → sélectionner `backend`
3. **Framework Preset** → `Other`
4. Ajouter les variables d'environnement (voir `backend.env.example`)
5. **Deploy**

### Variables d'environnement requises (backend)

Copier le contenu de `deploy/backend.env.example` dans les Settings > Environment Variables de Vercel.

> Une fois déployé, note l'URL du backend (ex: `https://blog-api-xxx.vercel.app`)

---

## 2. Déployer le Frontend

### Depuis le dashboard Vercel

1. **New Project** → même repo GitHub
2. **Root Directory** → sélectionner `frontend`
3. **Framework Preset** → `Vite`
4. **Build Command** → `npm run build`
5. **Output Directory** → `dist`
6. Ajouter les variables d'environnement (voir `frontend.env.example`)
7. **Deploy**

### Variables d'environnement requises (frontend)

```
VITE_API_URL=https://<ton-backend>.vercel.app/api
```

---

## 3. Configurer le CORS (Backend)

Après le déploiement du frontend, mettre à jour la variable `CLIENT_URL` dans le backend Vercel :

```
CLIENT_URL=https://<ton-frontend>.vercel.app
```

Redéployer le backend pour appliquer le changement.

---

## 4. Configurer les OAuth Callbacks

Si tu utilises Google/Facebook OAuth, mettre à jour les callback URLs :

**Google Cloud Console :**
```
https://<ton-backend>.vercel.app/api/auth/google/callback
```

**Facebook Developer Console :**
```
https://<ton-backend>.vercel.app/api/auth/facebook/callback
```

Et mettre à jour dans les variables d'environnement backend :
```
GOOGLE_CALLBACK_URL=https://<ton-backend>.vercel.app/api/auth/google/callback
FACEBOOK_CALLBACK_URL=https://<ton-backend>.vercel.app/api/auth/facebook/callback
```

---

## Structure des fichiers de config Vercel

```
frontend/vercel.json   → Config Vite + SPA routing
backend/vercel.json    → Config serverless Express
backend/api/index.js   → Point d'entrée serverless (connexion MongoDB lazy)
```

---

## Déploiement via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer le backend
cd backend
vercel --prod

# Déployer le frontend
cd ../frontend
vercel --prod
```
