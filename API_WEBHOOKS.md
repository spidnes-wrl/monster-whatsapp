# 📚 Architecture & Webhooks Monster

## Architecture globale

```
┌─────────────────────────────────────────────────────────┐
│                   MONSTER.WRL                            │
│              (Frontend Next.js / Vercel)                 │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ✅ Page d'accueil + formulaire inscription               │
│  ✅ Dashboard utilisateur                                 │
│  ✅ Gestion profil & produits                             │
│  ✅ Affichage QR code                                     │
│                                                           │
└────────────┬────────────────────────┬────────────────────┘
             │                        │
             ▼                        ▼
      ┌────────────────┐      ┌──────────────────┐
      │   SUPABASE     │      │ WHATSAPP API     │
      │  (PostgreSQL)  │      │   (Webhooks)     │
      │                │      │                  │
      │ • users        │      │ • Messages in    │
      │ • products     │      │ • Status updates │
      │ • qr_codes     │      │ • Delivery       │
      │ • Realtime     │      │                  │
      └────────────────┘      └──────────────────┘
```

## API Routes (Backend Next.js)

### 🔐 Authentification & Utilisateurs

#### `POST /api/auth/signup`
Crée un nouvel utilisateur
```json
{
  "phone": "+33612345678",
  "name": "Jean Dupont",
  "username": "@jeandupont",
  "bio": "Vente de vêtements",
  "horaires": "Lun-Ven 9h-18h",
  "contact": "jean@email.com"
}
```

**Réponse** :
```json
{
  "id": "uuid",
  "phone": "+33612345678",
  "user_id": "uuid",
  "created_at": "2026-08-29T..."
}
```

---

#### `GET /api/auth/user/:userId`
Récupère le profil utilisateur

**Réponse** :
```json
{
  "id": "uuid",
  "phone": "+33612345678",
  "name": "Jean Dupont",
  "username": "@jeandupont",
  "bio": "Vente de vêtements",
  "horaires": "Lun-Ven 9h-18h",
  "contact": "jean@email.com",
  "connection_status": "connected",
  "qr_code": "data:image/png;base64,...",
  "created_at": "2026-08-29T..."
}
```

---

#### `PUT /api/auth/user/:userId`
Met à jour le profil utilisateur
```json
{
  "name": "Jean Dupont",
  "bio": "Vente de vêtements premium",
  "horaires": "Lun-Ven 10h-19h",
  "contact": "jean.dupont@email.com"
}
```

---

### 📦 Produits & Services

#### `GET /api/products/:userId`
Liste les produits de l'utilisateur

**Réponse** :
```json
{
  "products": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "name": "T-Shirt Bleu",
      "description": "Coton 100%, taille S-XL",
      "price": "25€",
      "created_at": "2026-08-29T..."
    }
  ]
}
```

---

#### `POST /api/products/:userId`
Ajoute un nouveau produit
```json
{
  "name": "T-Shirt Bleu",
  "description": "Coton 100%, taille S-XL",
  "price": "25€"
}
```

---

#### `DELETE /api/products/:productId`
Supprime un produit

---

### 🤖 Génération QR Code

#### `POST /api/qr-code/generate/:userId`
Génère un QR code pour la connexion WhatsApp

**Réponse** :
```json
{
  "qr_code": "data:image/png;base64,...",
  "expires_in": 300,
  "status": "pending"
}
```

---

## 🔔 Webhooks WhatsApp

### Configuration

**URL du webhook** : `https://monster.wrl/api/webhooks/whatsapp`

**Verify Token** : À générer (min 20 caractères)

### Événements gérés

#### `messages`
Quand un message arrive

```json
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "123456",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "33612345678",
              "phone_number_id": "123456789"
            },
            "messages": [
              {
                "from": "+33612345678",
                "id": "wamid.xxx",
                "timestamp": "1693276800",
                "type": "text",
                "text": {
                  "body": ".who"
                }
              }
            ]
          }
        }
      ]
    }
  ]
}
```

#### `message_status`
Quand le statut d'un message change (sent, delivered, read)

```json
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "changes": [
        {
          "value": {
            "messages": [
              {
                "id": "wamid.xxx",
                "status": "delivered"
              }
            ]
          }
        }
      ]
    }
  ]
}
```

---

### Logique de traitement des messages

```javascript
// Pseudo-code
if (message.startsWith(".")) {
  // C'est une commande → Monster répond
  const command = message.toLowerCase();
  
  if (command === ".who") {
    // Renvoie le profil utilisateur
    return user.name + " @" + user.username;
  }
  
  if (command === ".product") {
    // Renvoie la liste des produits
    return products.map(p => `${p.name} - ${p.price}`);
  }
  
  if (command === ".horaires") {
    // Renvoie les horaires
    return user.horaires;
  }
  
  if (command === ".contact") {
    // Renvoie le contact
    return user.contact;
  }
  
  if (command === ".help") {
    // Renvoie l'aide
    return "Commandes disponibles: .who .product .horaires .contact .help";
  }
} else {
  // Message personnel → Monster ignore (pas de réponse)
  console.log("Message personnel ignoré");
}
```

---

## 🔄 Realtime Supabase

Le frontend écoute les changements en temps réel :

```typescript
// subscription sur la table users
supabase
  .channel(`public:users:user_id=eq.${userId}`)
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'users' },
    (payload) => {
      // Mettre à jour le QR code / statut de connexion
      setQrCode(payload.new.qr_code);
      setConnectionStatus(payload.new.connection_status);
    }
  )
  .subscribe();
```

---

## 🚀 Déploiement & Monitoring

### Vercel Deployments
- Chaque push sur `main` → déploiement automatique
- Logs disponibles dans **Vercel Dashboard**

### Supabase Monitoring
- Logs des webhooks dans **Database → Logs**
- Monitoring des performances dans **Analytics**

### Erreurs courantes

| Erreur | Cause | Solution |
|--------|-------|----------|
| 401 Unauthorized | Token WhatsApp invalide | Régénérer le token |
| 400 Bad Request | Payload webhook malformé | Vérifier le format JSON |
| 404 Not Found | Utilisateur inexistant | Vérifier l'ID utilisateur |
| 500 Server Error | Erreur base de données | Vérifier logs Supabase |

---

## 📞 Support

- Docs WhatsApp : https://developers.facebook.com/docs/whatsapp
- Docs Supabase : https://supabase.com/docs
- Docs Vercel : https://vercel.com/docs

