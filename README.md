# EmailBeats - Music Studio via Email

EmailBeats is an innovative web application that allows you to create music simply by sending an email. Users can compose beats by writing a sequence of instruments in an email and instantly receive a link to listen to their creation.

## 🎵 Features

- **Composition by email**: Send an email with your musical sequence
- **Automatic generation**: AI transforms your text into a musical beat
- **Interactive playback**: Playback interface with audio visualizer
- **Easy sharing**: Direct links and QR codes to share your creations
- **Community gallery**: Discover the latest beats created by the community

## 🚀 Installation and Configuration

### Prerequisites

- Node.js 18+
- Supabase account
- Postmark account (for emails)
- Firebase account (optional, for hosting)

### 1. Installing dependencies

```bash
npm install
```



### 5. Firebase configuration 

If you are using Firebase for hosting:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🛠️ Development

### Start the development server

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`

### Build for production

```bash
npm run build
```

### Preview the build

```bash
npm run preview
```

## 📧 Email configuration

### Postmark webhook

Configure a webhook in Postmark that points to your Supabase Edge function:

- Method: POST
- Events: Inbound Email

### Email domain

1. Configure your domain in Postmark
2. Add the necessary DNS records
3. Create an email address `beat@votre-domaine.com`
4. Update the email address in the Vue components

## 🎼 Usage

### Create a beat

1. Send an email to `beat@votre-domaine.com`
2. In the body of the email, write your instrument sequence
3. Example: `kick snare kick kick snare hat hat hat`
4. Instantly receive an email with the link to your beat

### Available instruments

- `kick` - Bass drum
- `snare` - Snare drum
- `hat` - Hi-hat
- `clap` - Clap
- `tom` - Tom
- `bass` - Bass

### Sequence examples

```
kick snare kick snare
kick kick snare hat kick snare hat hat
bass kick snare clap bass bass snare kick
```

## 🏗️ Architecture

### Frontend (Vue.js)

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Vue Router** for navigation
- **Tone.js** for audio synthesis

### Backend (Supabase)

- **Supabase Database** for storing beats
- **Supabase Edge Functions** for processing emails
- **Postmark** for sending and receiving emails

### File structure

```
src/
├── components/          # Reusable Vue components
│   ├── BeatVisualizer.vue
│   ├── EmailBox.vue
│   └── HowItWorks.vue
├── pages/              # Application pages
│   ├── HomePage.vue
│   ├── BeatPage.vue
│   └── NotFoundPage.vue
├── firebase/           # Firebase configuration
├── types/              # TypeScript types
└── supabase/
    └── functions/      # Supabase Edge functions
        └── process-email/
```

## 🔧 Customization

### Modify instruments

To add new instruments, modify:

1. The list in `HowItWorks.vue`
2. The mapping in `BeatPage.vue`
3. The validation in `process-email/index.ts`

### Change the style

The project uses Tailwind CSS with a custom color palette defined in `tailwind.config.js`.


Created with ❤️ and Vue.js

Translated with DeepL.com (free version)
