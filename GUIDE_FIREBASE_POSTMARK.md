# 🔥 Guide Configuration Firebase + Postmark pour EmailBeats

## 📋 Vue d'ensemble

EmailBeats utilise :

- **Firebase Firestore** pour stocker les beats
- **Firebase Functions** pour traiter les emails
- **Firebase Hosting** pour héberger l'application
- **Postmark** pour recevoir et envoyer les emails

## 1. 🔧 Configuration Postmark

### Étape 1.1 : Configuration du serveur Postmark

1. Connectez-vous à [Postmark](https://postmarkapp.com)
2. Allez dans **Servers** → votre serveur
3. Récupérez votre **Server API Token** (vous en aurez besoin plus tard)

### Étape 1.2 : Configuration du domaine

1. Dans Postmark, allez dans **Domains**
2. Ajoutez le domaine `latechnova.com`
3. Ajoutez ces enregistrements DNS chez votre hébergeur :

```dns
Type: TXT
Name: @
Value: [Token fourni par Postmark pour vérification]

Type: MX
Name: @
Value: inbound.postmarkapp.com
Priority: 10
```

### Étape 1.3 : Configuration des emails entrants

1. Dans Postmark, allez dans **Inbound**
2. Créez un hook pour `beats@latechnova.com`
3. URL du webhook : `https://us-central1-webrtisan-b012d.cloudfunctions.net/processEmail`
4. Méthode : POST
5. Cochez "Include raw email content in JSON payload"

## 2. 🔥 Configuration Firebase

### Étape 2.1 : Vérifier la configuration Firebase

Votre projet Firebase est déjà configuré : `webrtisan-b012d`

### Étape 2.2 : Configurer Firestore

1. Allez dans la [Console Firebase](https://console.firebase.google.com)
2. Sélectionnez votre projet `webrtisan-b012d`
3. Allez dans **Firestore Database**
4. Si pas encore créé, cliquez "Create database"
5. Choisissez "Start in test mode" (on configurera les règles après)

### Étape 2.3 : Règles de sécurité Firestore

Dans Firestore > Rules, remplacez par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permettre la lecture publique des beats
    match /beats/{beatId} {
      allow read: if true;
      allow create: if true; // Pour les Firebase Functions
    }
  }
}
```

## 3. 🚀 Déploiement

### Étape 3.1 : Variables d'environnement

1. Copiez `env.example` vers `.env`
2. Remplissez vos vraies valeurs :

```env
# Postmark
POSTMARK_API_KEY=votre-cle-api-postmark

# Site URL (après déploiement)
PUBLIC_SITE_URL=https://webrtisan-b012d.web.app
```

### Étape 3.2 : Configuration des Firebase Functions

1. Allez dans le dossier functions :

```bash
cd functions
```

2. Définissez les variables d'environnement pour les fonctions :

```bash
firebase functions:config:set postmark.api_key="VOTRE_CLE_POSTMARK"
firebase functions:config:set app.public_url="https://webrtisan-b012d.web.app"
```

### Étape 3.3 : Déployer les Firebase Functions

```bash
firebase deploy --only functions
```

Après le déploiement, vous aurez une URL comme :
`https://us-central1-webrtisan-b012d.cloudfunctions.net/processEmail`

**⚠️ Important :** Copiez cette URL et utilisez-la dans la configuration Postmark (Étape 1.3)

### Étape 3.4 : Déployer l'application web

```bash
npm run build
firebase deploy --only hosting
```

Votre site sera disponible sur : `https://webrtisan-b012d.web.app`

## 4. ✅ Test de la configuration

### Test 1 : Envoyer un email

1. Envoyez un email à `beats@latechnova.com`
2. Corps de l'email : `kick snare kick kick snare`
3. Vous devriez recevoir une réponse avec un lien

### Test 2 : Vérifier Firestore

1. Allez dans Firebase Console > Firestore
2. Vérifiez qu'un nouveau document apparaît dans la collection `beats`

### Test 3 : Écouter le beat

1. Cliquez sur le lien reçu par email
2. Le beat devrait se charger et être jouable

## 5. 🐛 Dépannage

### Problème : Les emails ne sont pas reçus

- Vérifiez les enregistrements DNS MX
- Vérifiez que le domaine est validé dans Postmark
- Testez avec l'outil de test DNS de Postmark

### Problème : Firebase Function ne répond pas

- Vérifiez les logs : `firebase functions:log`
- Vérifiez que la clé Postmark est bien configurée
- Vérifiez l'URL du webhook dans Postmark

### Problème : Les beats ne s'affichent pas

- Vérifiez les règles Firestore
- Vérifiez la configuration Firebase dans le frontend
- Regardez la console du navigateur pour les erreurs

## 6. 📧 Format des emails

### Instruments supportés :

- `kick` - Grosse caisse
- `snare` - Caisse claire
- `hat` - Charleston
- `clap` - Applaudissement
- `tom` - Tom
- `bass` - Basse

### Exemples de séquences :

```
kick snare kick snare
kick kick snare hat kick snare hat hat
bass kick snare clap bass bass snare kick
```

## 7. 🔗 URLs importantes

- **Site web** : https://webrtisan-b012d.web.app
- **Firebase Console** : https://console.firebase.google.com/project/webrtisan-b012d
- **Postmark Dashboard** : https://postmarkapp.com
- **Email pour créer des beats** : beats@latechnova.com

---

🎵 **Votre studio de musique par email est maintenant prêt !**
