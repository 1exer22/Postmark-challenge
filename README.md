# EmailBeats - Studio de Musique par Email

EmailBeats est une application web innovante qui permet de créer de la musique simplement en envoyant un email. Les utilisateurs peuvent composer des beats en écrivant une séquence d'instruments dans un email et recevoir instantanément un lien pour écouter leur création.

## 🎵 Fonctionnalités

- **Composition par email** : Envoyez un email avec votre séquence musicale
- **Génération automatique** : L'IA transforme votre texte en beat musical
- **Lecture interactive** : Interface de lecture avec visualiseur audio
- **Partage facile** : Liens directs et QR codes pour partager vos créations
- **Galerie communautaire** : Découvrez les derniers beats créés par la communauté

## 🚀 Installation et Configuration

### Prérequis

- Node.js 18+
- Compte Supabase
- Compte Postmark (pour les emails)
- Compte Firebase (optionnel, pour l'hébergement)

### 1. Installation des dépendances

```bash
npm install
```

### 2. Configuration Supabase

1. Créez un projet sur [Supabase](https://supabase.com)
2. Créez une table `beats` avec la structure suivante :

```sql
CREATE TABLE beats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sequence TEXT NOT NULL,
  title TEXT NOT NULL,
  email TEXT NOT NULL,
  created TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS
ALTER TABLE beats ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique
CREATE POLICY "Allow public read" ON beats FOR SELECT USING (true);

-- Politique pour permettre l'insertion
CREATE POLICY "Allow insert" ON beats FOR INSERT WITH CHECK (true);
```

3. Configurez les variables d'environnement Supabase dans votre projet

### 3. Configuration Postmark

1. Créez un compte sur [Postmark](https://postmarkapp.com)
2. Créez un serveur et obtenez votre clé API
3. Configurez un webhook entrant pour recevoir les emails à `beat@votre-domaine.com`

### 4. Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# Supabase
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_publique_supabase

# Pour les fonctions Supabase Edge
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_supabase

# Postmark
POSTMARK_API_KEY=votre_cle_api_postmark

# URL publique de votre site
PUBLIC_SITE_URL=https://votre-site.com
```

### 5. Configuration Firebase (optionnel)

Si vous utilisez Firebase pour l'hébergement :

```env
VITE_FIREBASE_API_KEY=votre_cle_api_firebase
VITE_FIREBASE_AUTH_DOMAIN=votre-projet.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre-projet-id
VITE_FIREBASE_STORAGE_BUCKET=votre-projet.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
VITE_FIREBASE_APP_ID=votre_app_id
```

## 🛠️ Développement

### Démarrer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build pour la production

```bash
npm run build
```

### Prévisualiser le build

```bash
npm run preview
```

## 📧 Configuration des Emails

### Webhook Postmark

Configurez un webhook dans Postmark qui pointe vers votre fonction Supabase Edge :

- URL : `https://votre-projet.supabase.co/functions/v1/process-email`
- Méthode : POST
- Événements : Inbound Email

### Domaine Email

1. Configurez votre domaine dans Postmark
2. Ajoutez les enregistrements DNS nécessaires
3. Créez une adresse email `beat@votre-domaine.com`
4. Mettez à jour l'adresse email dans les composants Vue

## 🎼 Utilisation

### Créer un beat

1. Envoyez un email à `beat@votre-domaine.com`
2. Dans le corps de l'email, écrivez votre séquence d'instruments
3. Exemple : `kick snare kick kick snare hat hat hat`
4. Recevez instantanément un email avec le lien vers votre beat

### Instruments disponibles

- `kick` - Grosse caisse
- `snare` - Caisse claire
- `hat` - Charleston
- `clap` - Applaudissement
- `tom` - Tom
- `bass` - Basse

### Exemples de séquences

```
kick snare kick snare
kick kick snare hat kick snare hat hat
bass kick snare clap bass bass snare kick
```

## 🏗️ Architecture

### Frontend (Vue.js)

- **Vue 3** avec Composition API
- **TypeScript** pour la sécurité des types
- **Tailwind CSS** pour le styling
- **Vue Router** pour la navigation
- **Tone.js** pour la synthèse audio

### Backend (Supabase)

- **Supabase Database** pour le stockage des beats
- **Supabase Edge Functions** pour le traitement des emails
- **Postmark** pour l'envoi et la réception d'emails

### Structure des fichiers

```
src/
├── components/          # Composants Vue réutilisables
│   ├── BeatVisualizer.vue
│   ├── EmailBox.vue
│   └── HowItWorks.vue
├── pages/              # Pages de l'application
│   ├── HomePage.vue
│   ├── BeatPage.vue
│   └── NotFoundPage.vue
├── firebase/           # Configuration Firebase
├── types/              # Types TypeScript
└── supabase/
    └── functions/      # Fonctions Supabase Edge
        └── process-email/
```

## 🔧 Personnalisation

### Modifier les instruments

Pour ajouter de nouveaux instruments, modifiez :

1. La liste dans `HowItWorks.vue`
2. Le mapping dans `BeatPage.vue`
3. La validation dans `process-email/index.ts`

### Changer le style

Le projet utilise Tailwind CSS avec une palette de couleurs personnalisée définie dans `tailwind.config.js`.

### Ajouter des fonctionnalités

- Ajoutez de nouveaux composants dans `src/components/`
- Créez de nouvelles pages dans `src/pages/`
- Étendez les types dans `src/types/`

## 🚀 Déploiement

### Supabase Edge Functions

```bash
# Déployer la fonction de traitement des emails
supabase functions deploy process-email
```

### Frontend

Le frontend peut être déployé sur :

- **Netlify** (recommandé)
- **Vercel**
- **Firebase Hosting**
- **GitHub Pages**

## 🐛 Dépannage

### Problèmes courants

1. **Les emails ne sont pas reçus**

   - Vérifiez la configuration DNS de votre domaine
   - Assurez-vous que le webhook Postmark est correctement configuré

2. **Les sons ne se chargent pas**

   - Vérifiez que les URLs des samples audio sont accessibles
   - Testez dans un navigateur qui supporte Web Audio API

3. **Erreurs de base de données**
   - Vérifiez les clés API Supabase
   - Assurez-vous que les politiques RLS sont correctement configurées

### Logs et debugging

- Consultez les logs Supabase Edge Functions
- Utilisez les outils de développement du navigateur
- Vérifiez les logs Postmark pour les emails

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème :

- Ouvrez une issue sur GitHub
- Consultez la documentation Supabase
- Vérifiez la documentation Postmark

---

Créé avec ❤️ et Vue.js
