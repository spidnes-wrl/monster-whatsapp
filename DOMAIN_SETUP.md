# 🌐 Configuration Domaine Monster.wrl

## Déploiement sur Vercel avec domaine personnalisé

### Étape 1 : Préparer Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec GitHub
3. Importez le repo `spidnes-wrl/monster-whatsapp`
4. Dans **Environment Variables**, ajoutez :

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
WHATSAPP_BUSINESS_PHONE_NUMBER_ID=your_phone_id
WHATSAPP_BUSINESS_ACCESS_TOKEN=your_access_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_verify_token
NEXT_PUBLIC_DOMAIN=https://monster.wrl
```

5. Cliquez **Deploy** ✅

### Étape 2 : Ajouter le domaine monster.wrl

Après le déploiement initial :

1. Allez dans **Project Settings** → **Domains**
2. Cliquez **Add Domain**
3. Entrez : `monster.wrl`
4. Vercel vous donnera les enregistrements DNS à ajouter

### Étape 3 : Configuration DNS chez le registraire .wrl

Allez chez votre registraire .wrl (ex: Namecheap, GoDaddy, OVH) et ajoutez :

#### Option A : DNS simple (recommandé)
```
Type: CNAME
Name: monster
Value: cname.vercel-dns.com
```

#### Option B : DNS avancé (racine)
```
Type: A
Name: @
Value: 76.76.19.132

Type: AAAA
Name: @
Value: 2610:7f8:fb::f
```

### Étape 4 : SSL/TLS automatique

Vercel génère automatiquement un certificat SSL gratuit via Let's Encrypt. 
Attendez 5-10 minutes après l'ajout du domaine. ✅

---

## 📋 Checklist

- [ ] Repo pushé sur GitHub
- [ ] Variables Supabase configurées
- [ ] Projet créé sur Vercel
- [ ] Domaine `monster.wrl` ajouté dans Vercel
- [ ] Enregistrements DNS propagés (24-48h max)
- [ ] Site accessible à `https://monster.wrl` 🎉

---

## 🔗 Liens utiles

- **Votre site** : https://monster.wrl
- **Dashboard Vercel** : https://vercel.com/dashboard
- **Gestion DNS** : Votre registraire .wrl

