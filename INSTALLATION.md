# 📖 Guide d'Installation Monster

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+ et npm/yarn
- Un compte Supabase (gratuit)
- Un compte Vercel (gratuit)
- Un compte WhatsApp Business (pour les webhooks)

---

## 1️⃣ Installation locale

### Cloner le repo
```bash
git clone https://github.com/spidnes-wrl/monster-whatsapp.git
cd monster-whatsapp
npm install
```

### Configuration Supabase

#### Créer les tables
1. Accédez à votre dashboard Supabase
2. Allez dans **SQL Editor** → **New Query**
3. Collez ce SQL :

```sql
-- Table users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  bio TEXT,
  horaires TEXT,
  contact TEXT,
  connection_status TEXT DEFAULT 'disconnected',
  qr_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexs pour performance
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_products_user_id ON products(user_id);
```

#### Configurer Realtime
1. Dans **Settings** → **Database** → **Realtime**
2. Activez les réplications pour les tables `users` et `products`

#### Clés API
1. Allez dans **Settings** → **API**
2. Copiez :
   - `Project URL`
   - `anon public key`

### Variables d'environnement

Créez un fichier `.env.local` à la racine :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
WHATSAPP_BUSINESS_ACCOUNT_ID=votre_account_id
WHATSAPP_BUSINESS_PHONE_NUMBER_ID=votre_phone_id
WHATSAPP_BUSINESS_ACCESS_TOKEN=votre_access_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=generate_random_token
NEXT_PUBLIC_DOMAIN=http://localhost:3000
```

### Lancer le dev server
```bash
npm run dev
```

Visitez `http://localhost:3000` 🎉

---

## 2️⃣ Configuration WhatsApp Business

### Obtenir les credentials

1. **Créer un app WhatsApp Business**
   - Allez sur [developers.facebook.com](https://developers.facebook.com)
   - Créez une nouvelle app → **Business**
   - Ajoutez le produit **WhatsApp**

2. **Récupérer les clés**
   - `Account ID` : Dans Settings → Business accounts
   - `Phone Number ID` : Dans WhatsApp → Phone numbers
   - `Access Token` : Générez depuis **System User Access Tokens**

3. **Configurer le Webhook**
   - URL de callback : `https://votre-domaine.com/api/webhooks/whatsapp`
   - Verify Token : Générez un token aléatoire (min 20 caractères)
   - Événements à souscrire : `messages`, `message_status`

---

## 3️⃣ Déploiement sur Vercel

### Option A : Via GitHub (recommandé)
```bash
# Push sur GitHub (déjà fait)
git push origin main
```

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre compte GitHub
3. Importez le repo `monster-whatsapp`
4. **Dans les variables d'environnement** :
   - Ajoutez toutes les clés `.env.local`
5. Cliquez **Deploy** 🚀

### Option B : CLI Vercel
```bash
npm i -g vercel
vercel login
vercel
```

---

## 4️⃣ Configuration du domaine

### Avec un domaine personnalisé

#### Sur Vercel
1. Allez dans **Project Settings** → **Domains**
2. Ajoutez votre domaine (ex: `monster.com`)
3. Suivez les instructions DNS

#### Chez votre registraire (GoDaddy, Namecheap, etc.)
Ajoutez ces enregistrements DNS :

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.132
```

**Attendre 24-48h** pour la propagation DNS ⏳

### Sans domaine personnalisé
Votre site sera accessible à : `monster-whatsapp.vercel.app`

---

## 5️⃣ Tests & Validation

### Tester l'inscription
1. Visitez la page d'accueil
2. Entrez un numéro WhatsApp (format: +33612345678)
3. Remplissez le formulaire
4. Cliquez **Créer mon assistant**

### Tester la génération QR
1. Depuis le dashboard, cliquez **Générer le QR code**
2. Scannez depuis WhatsApp → Appareils connectés
3. Le statut devrait passer à **connecté** ✅

### Tester les produits
1. Ajoutez des produits dans le dashboard
2. Ils doivent s'afficher en temps réel (grâce à Realtime Supabase)

---

## 6️⃣ Troubleshooting

### "Failed to connect to Supabase"
- Vérifiez les variables d'environnement
- Vérifiez que la base est bien initialisée
- Vérifiez les CORS settings dans Supabase

### "Webhook not working"
- Vérifiez que Vercel est bien déployé (HTTPS)
- Testez via Postman : `POST /api/webhooks/whatsapp`
- Vérifiez le token de vérification

### "QR code ne s'affiche pas"
- Vérifiez que le champ `qr_code` est bien rempli en base
- Actualisez la page (ou attendez le Realtime)

---

## 📚 Ressources utiles

- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)
- [Vercel Docs](https://vercel.com/docs)

---

**Questions ?** Créez une issue sur le repo ! 🎯
