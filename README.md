# 🎯 Monster — Assistant WhatsApp Personnel

> **Un numéro. Un assistant. Un tri.**

Monster est un assistant WhatsApp intelligent qui répond automatiquement aux questions liées à votre activité (produits, disponibilités, contact) via des commandes, tout en laissant vos conversations personnelles tranquilles.

## ✨ Caractéristiques

- 🤖 **Réponses automatiques intelligentes** : Seules les commandes sont traitées (`.who`, `.product`, `.horaires`, `.contact`, `.help`)
- 📱 **Connexion simple** : Connectez votre numéro WhatsApp via QR code
- 📊 **Dashboard complet** : Gérez votre profil, produits et statut de connexion
- ⚡ **Temps réel** : Les changements se synchronisent instantanément via Supabase Realtime
- 🎨 **Design épuré** : Interface sombre, moderne et ergonomique
- 📱 **Mobile-first** : Parfait sur tous les appareils

## 🚀 Démarrage rapide

### 1. Installation locale

```bash
git clone https://github.com/spidnes-wrl/monster-whatsapp.git
cd monster-whatsapp
npm install
npm run dev
```

Visitez `http://localhost:3000`

### 2. Configuration Supabase

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez une nouvelle base de données
3. Exécutez le SQL depuis `INSTALLATION.md`
4. Copiez vos clés API dans `.env.local`

### 3. Déploiement sur Vercel

```bash
npm i -g vercel
vercel
```

Ou connectez directement votre repo GitHub à [vercel.com](https://vercel.com)

## 📚 Documentation

- **[INSTALLATION.md](./INSTALLATION.md)** — Guide d'installation complet
- **[Docs Next.js](https://nextjs.org/docs)** — Framework
- **[Docs Supabase](https://supabase.com/docs)** — Base de données

## 🎨 Design System

### Couleurs
- **Fond** : `#0F1613` (vert-encre très sombre)
- **Cartes** : `#161F1B`
- **Bordures** : `#283530`
- **Accent** : `#E8B33D` (ambre/or)
- **Statut positif** : `#6B9080` (sauge)
- **Texte** : `#EDF2EF` (blanc cassé)
- **Texte secondaire** : `#8B9992` (gris-vert)

### Typographie
- **Titres** : Space Grotesk
- **Texte** : Inter
- **Mono** : IBM Plex Mono

## 🔑 Commandes Monster

| Commande | Réponse | Exemple |
|----------|---------|---------|
| `.who` | Nom + identifiant | `Jean Dupont @jeandupont` |
| `.product` | Liste des produits | `T-Shirt Bleu - 25€` |
| `.horaires` | Disponibilités | `Lun-Ven 9h-18h` |
| `.contact` | Contact direct | `jean@email.com` |
| `.help` | Aide | `Commandes: .who .product ...` |

## 🛠️ Stack technique

- **Frontend** : Next.js 14, React 18, TypeScript
- **Styling** : Tailwind CSS
- **Base de données** : Supabase (PostgreSQL)
- **Temps réel** : Supabase Realtime
- **Hébergement** : Vercel
- **API WhatsApp** : Meta Business API

## 📝 Variables d'environnement

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
WHATSAPP_BUSINESS_PHONE_NUMBER_ID=your_phone_id
WHATSAPP_BUSINESS_ACCESS_TOKEN=your_access_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_verify_token
NEXT_PUBLIC_DOMAIN=https://monster.wrl
```

## 🚀 Déploiement en production

1. Connectez votre repo GitHub à [vercel.com](https://vercel.com)
2. Ajoutez les variables d'environnement
3. Chaque push sur `main` déclenche un déploiement automatique ✅

## 📞 Support

- 📧 Email : support@monster.wrl
- 🐙 GitHub : [github.com/spidnes-wrl/monster-whatsapp](https://github.com/spidnes-wrl/monster-whatsapp)
- 💬 WhatsApp : [Channel](https://whatsapp.com/channel/0029VbDsYvaFi8xZ72UR4O2F)

## 📄 Licence

MIT — Libre d'utilisation

---

**Monster** © 2026 — Un numéro. Un assistant. Un tri. 🎯
