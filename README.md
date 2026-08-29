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

### 4. Configuration domaine monster.wrl

Voir `DOMAIN_SETUP.md` pour les détails complets

## 📚 Documentation

- **[INSTALLATION.md](./INSTALLATION.md)** — Guide d'installation complet
- **[DOMAIN_SETUP.md](./DOMAIN_SETUP.md)** — Configuration du domaine
- **[API_WEBHOOKS.md](./API_WEBHOOKS.md)** — Architecture & endpoints API

## 🎨 Design System

### Couleurs
- **Fond** : `#0F1613` (vert-encre très sombre)
- **Cartes** : `#161F1B`
- **Bordures** : `#283530`
- **Accent** : `#E8B33D` (ambre/or) — Signaux, actif
- **Statut positif** : `#6B9080` (sauge) — Connecté
- **Texte** : `#EDF2EF` (blanc cassé)
- **Texte secondaire** : `#8B9992` (gris-vert)

### Typographie
- **Titres** : Space Grotesk (gras, moderne)
- **Texte** : Inter
- **Mono** : IBM Plex Mono (commandes, numéros)

## 📋 Structure du projet

```
monster-whatsapp/
├── app/
│   ├── layout.tsx           # Layout global
│   ├── page.tsx             # Page d'accueil
│   ├── dashboard/
│   │   └── page.tsx         # Dashboard utilisateur
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup.ts
│   │   │   └── user.ts
│   │   ├── products/
│   │   │   └── route.ts
│   │   ├── qr-code/
│   │   │   └── route.ts
│   │   └── webhooks/
│   │       └── whatsapp.ts
│   └── styles/
│       └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SignupForm.tsx
│   ├── DashboardHeader.tsx
│   ├── ConnectionCard.tsx
│   ├── ProfileCard.tsx
│   ├── ProductsCard.tsx
│   └── CommandsCard.tsx
├── lib/
│   ├── supabase.ts          # Client Supabase
│   ├── whatsapp.ts          # Intégration WhatsApp
│   └── utils.ts
├── types/
│   └── index.ts             # Types TypeScript
├── public/
│   ├── favicon.ico
│   └── logo.svg
├── .env.local               # Variables d'environnement
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── INSTALLATION.md
├── DOMAIN_SETUP.md
├── API_WEBHOOKS.md
└── README.md
```

## 🔑 Commandes Monster

Les utilisateurs peuvent utiliser ces commandes :

| Commande | Réponse | Exemple |
|----------|---------|---------|
| `.who` | Nom + identifiant | `Jean Dupont @jeandupont` |
| `.product` | Liste des produits | `T-Shirt Bleu - 25€\nJean Noir - 45€` |
| `.horaires` | Disponibilités | `Lun-Ven 9h-18h` |
| `.contact` | Contact direct | `jean@email.com` |
| `.help` | Aide | `Commandes: .who .product .horaires .contact .help` |

Les messages qui ne commencent pas par `.` sont **ignorés** (conversations personnelles).

## 🔄 Flux de connexion

```
1. Utilisateur visite monster.wrl
2. Remplit le formulaire d'inscription
3. Clique "Créer mon assistant"
4. Accède au dashboard
5. Clique "Générer le QR code"
6. Scanne depuis WhatsApp → Appareils connectés
7. Status passe à "Connecté" ✅
8. Monster commence à répondre aux commandes
```

## 🛠️ Stack technique

- **Frontend** : Next.js 14, React 18, TypeScript
- **Styling** : Tailwind CSS
- **Base de données** : Supabase (PostgreSQL)
- **Temps réel** : Supabase Realtime
- **Hébergement** : Vercel
- **API WhatsApp** : Meta Business API
- **QR Code** : qrcode.react

## 📱 Variables d'environnement

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# WhatsApp Business
WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
WHATSAPP_BUSINESS_PHONE_NUMBER_ID=your_phone_id
WHATSAPP_BUSINESS_ACCESS_TOKEN=your_access_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_verify_token

# App
NEXT_PUBLIC_DOMAIN=https://monster.wrl
```

## 🚀 Déploiement en production

### Vercel (recommandé)

1. Connectez votre repo GitHub à [vercel.com](https://vercel.com)
2. Ajoutez les variables d'environnement dans **Settings → Environment Variables**
3. Chaque push sur `main` déclenche un déploiement automatique

### Configuration WhatsApp

1. Allez sur [developers.facebook.com](https://developers.facebook.com)
2. Créez une app WhatsApp Business
3. Configurez le webhook : `https://monster.wrl/api/webhooks/whatsapp`
4. Ajoutez les événements : `messages`, `message_status`

## 🐛 Troubleshooting

### "Failed to connect to Supabase"
- Vérifiez les variables d'environnement
- Vérifiez que la base existe et est initialisée

### "Webhook not working"
- Vérifiez que le domaine HTTPS est valide
- Testez le token de vérification
- Vérifiez les logs Supabase

### "QR code ne s'affiche pas"
- Actualisez la page
- Vérifiez que le champ `qr_code` est rempli en base
- Attendez la synchronisation Realtime (max 5s)

## 📞 Support & Contact

- 📧 Email : support@monster.wrl
- 🐙 GitHub : [github.com/spidnes-wrl/monster-whatsapp](https://github.com/spidnes-wrl/monster-whatsapp)
- 💬 Suivre les actus : [WhatsApp Channel](https://whatsapp.com/channel/0029VbDsYvaFi8xZ72UR4O2F)

## 📄 Licence

MIT — Libre d'utilisation

---

**Monster** © 2026 — Un numéro. Un assistant. Un tri. 🎯
