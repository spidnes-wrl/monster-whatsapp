# Installation complète — Monster WhatsApp

## 🚀 Démarrage local

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte Supabase
- Compte Vercel (pour le déploiement)

### Étape 1 : Cloner le repo

```bash
git clone https://github.com/spidnes-wrl/monster-whatsapp.git
cd monster-whatsapp
npm install
```

### Étape 2 : Configuration Supabase

#### Créer la base de données

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Allez dans **SQL Editor** et exécutez ce script :

```sql
-- Créer la table users
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  bio TEXT,
  horaires TEXT,
  contact TEXT,
  connection_status TEXT DEFAULT 'disconnected',
  qr_code TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Créer la table products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Indexes
CREATE INDEX idx_products_user_id ON public.products(user_id);
CREATE INDEX idx_users_phone ON public.users(phone);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policies (permettre l'accès public pour la démo)
CREATE POLICY "users_select" ON public.users FOR SELECT USING (true);
CREATE POLICY "users_insert" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "users_update" ON public.users FOR UPDATE USING (true);
CREATE POLICY "products_select" ON public.products FOR SELECT USING (true);
CREATE POLICY "products_insert" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "products_delete" ON public.products FOR DELETE USING (true);
```

#### Récupérer les clés API

1. Allez dans **Settings → API**
2. Copiez :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### Étape 3 : Configuration locale

Créez un fichier `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
WHATSAPP_BUSINESS_PHONE_NUMBER_ID=your_phone_id
WHATSAPP_BUSINESS_ACCESS_TOKEN=your_access_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_verify_token

NEXT_PUBLIC_DOMAIN=http://localhost:3000
```

### Étape 4 : Lancer le serveur local

```bash
npm run dev
```

Visitez `http://localhost:3000` 🚀

---

## 🌍 Déploiement sur Vercel

### Option A : Déploiement rapide (recommandé)

```bash
npm i -g vercel
vercel
```

Suivez les instructions du CLI.

### Option B : Connexion GitHub

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez **New Project**
3. Sélectionnez votre repo GitHub
4. Cliquez **Import**

### Configuration des variables d'environnement

Dans **Vercel Dashboard → Project Settings → Environment Variables** :

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
WHATSAPP_BUSINESS_PHONE_NUMBER_ID=your_phone_id
WHATSAPP_BUSINESS_ACCESS_TOKEN=your_access_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_verify_token

NEXT_PUBLIC_DOMAIN=https://your-domain.vercel.app
```

### Déploiement automatique

Chaque **push sur `main`** déclenche un déploiement automatique ✅

---

## 🔑 Configuration WhatsApp Business

### Créer une app WhatsApp

1. Allez sur [developers.facebook.com](https://developers.facebook.com)
2. Créez une nouvelle app
3. Allez dans **WhatsApp → Getting Started**
4. Sélectionnez **API Access**

### Récupérer les credentials

- **Account ID** : Visible dans WhatsApp → Settings
- **Phone Number ID** : WhatsApp → Phone Numbers
- **Access Token** : Générer un token temporaire et créer un token long terme

### Configurer le webhook

1. Allez dans **Webhooks**
2. Mettez à jour l'URL callback :
   ```
   https://monster.wrl/api/webhooks/whatsapp
   ```
3. Ajoutez le **Verify Token** (min 20 caractères)
4. Sélectionnez les événements :
   - `messages`
   - `message_status`

---

## 📋 Checklist d'installation

- [ ] Repo cloné
- [ ] Node.js 18+ installé
- [ ] Base Supabase créée et SQL exécuté
- [ ] `.env.local` rempli avec les clés
- [ ] `npm run dev` fonctionne
- [ ] Site accessible sur `http://localhost:3000`
- [ ] Vercel configuré pour déploiement automatique
- [ ] Variables d'environnement ajoutées dans Vercel
- [ ] WhatsApp Business app créée
- [ ] Webhook WhatsApp configuré

---

## 🐛 Problèmes courants

### "Cannot find module @supabase/supabase-js"
```bash
npm install @supabase/supabase-js
```

### "Supabase connection failed"
- Vérifiez que `NEXT_PUBLIC_SUPABASE_URL` est correct
- Vérifiez que `NEXT_PUBLIC_SUPABASE_ANON_KEY` est correct
- Testez la connexion dans la console : `console.log(supabase)`

### "RLS policy error"
- Vérifiez que les policies Supabase sont activées
- Exécutez le script SQL complet

### "Vercel deployment failed"
- Vérifiez les logs : `vercel logs`
- Vérifiez que toutes les variables d'environnement sont définis
- Vérifiez que `NEXT_PUBLIC_DOMAIN` pointe vers le bon domaine

---

## 📞 Support

- Docs Supabase : https://supabase.com/docs
- Docs Vercel : https://vercel.com/docs
- Docs WhatsApp : https://developers.facebook.com/docs/whatsapp

