# SecKC Mobile App

A mobile application for the Security Professionals of Kansas City (SecKC) community, built with Ionic React and Firebase.

## Features

### 🎯 Event Management
- **Browse Events**: View upcoming and past security events
- **Event Details**: Complete event information including speakers, location, and descriptions
- **RSVP System**: Register for events directly through the app
- **Multiple Speakers**: Support for events with multiple presenters
- **Location Integration**: Click addresses to open in Google Maps
- **Event Links**: Direct links to full event details on SecKC website

### 👥 Speaker Information
- **Speaker Profiles**: Detailed speaker information with bios and titles
- **Multiple Speaker Display**: Clean presentation of events with multiple speakers
- **Speaker Search**: Find events by speaker name

### 🏢 Sponsor Integration
- **Sponsor Display**: Prominent sponsor recognition on event pages
- **Clickable Sponsors**: Direct links to sponsor websites
- **Ordered Display**: Configurable sponsor ordering for priority placement
- **Visual Indicators**: Clear link icons for clickable sponsors

### 🔍 Search & Filtering
- **Smart Search**: Search by event title, speaker names, or topics
- **Category Filtering**: Filter by upcoming, past, or bookmarked events
- **Topic Tags**: Visual topic categorization with colored chips
- **Pull-to-Refresh**: Easy content updates

### 🔐 Authentication
- **Firebase Auth**: Secure user authentication
- **User Profiles**: Personalized user experience
- **Preferences**: Customizable user settings

### 📱 Mobile Experience
- **Ionic Framework**: Native mobile feel on iOS and Android
- **Responsive Design**: Optimized for all screen sizes
- **Offline Support**: Works with cached content
- **Push Notifications**: Stay updated on new events (future feature)

## Tech Stack

- **Frontend**: Ionic React with TypeScript
- **Backend**: Firebase (Authentication + Firestore)
- **Build Tool**: Vite
- **Testing**: Cypress (E2E), Vitest (Unit)
- **Linting**: ESLint
- **Deployment**: Capacitor for mobile apps

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd seckcapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Set up Firebase**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Firestore Database
   - Enable Authentication (Email/Password)
   - Configure security rules (see [Firebase Setup](#firebase-setup))

5. **Start development server**
   ```bash
   npm run dev
   ```

### Firebase Setup

#### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // For development only
    }
  }
}
```

#### Sample Data
To populate your database with sample events:
```javascript
// In browser console
createSampleEventsWithMultipleSpeakers()
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, etc.)
├── pages/              # Main app pages
│   ├── Events.tsx      # Events listing page
│   ├── Home.tsx        # Dashboard/home page
│   ├── Resources.tsx   # Security resources
│   ├── Social.tsx      # Social media integration
│   └── Settings.tsx    # User preferences
├── services/           # API and Firebase services
│   ├── api.ts          # Legacy API service
│   ├── firebaseService.ts  # Firebase operations
│   └── types.ts        # TypeScript interfaces
├── utils/              # Utility functions and sample data
├── config/             # App configuration
└── theme/              # Styling and themes
```

## Data Models

### Event
```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  endDate?: string;
  location?: string;
  address?: string;
  isVirtual: boolean;
  speakerNames?: string[];
  speakerTitle?: string;
  topics: string[];
  sponsorLinks?: { [key: string]: string };
  sponsorOrder?: string[];
  eventUrl?: string;
  attendeeCount: number;
  // ... additional fields
}
```

### Sponsor Management
```typescript
// Example sponsor configuration
sponsorLinks: {
  "Google": "https://www.google.com",
  "Microsoft": "https://www.microsoft.com"
}
sponsorOrder: ["Microsoft", "Google"] // Controls display order
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test.unit` - Run unit tests
- `npm run test.e2e` - Run E2E tests

## Building for Mobile

### iOS
```bash
npx cap add ios
npx cap run ios
```

### Android
```bash
npx cap add android
npx cap run android
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security Considerations

- Environment variables are properly configured for Vite
- Firebase security rules should be restrictive in production
- User authentication is required for RSVP functionality
- All external links open in new tabs for security

## Future Enhancements

- [ ] Push notifications for new events
- [ ] Calendar integration
- [ ] Event feedback and ratings
- [ ] Social media sharing
- [ ] Offline event caching
- [ ] Advanced search filters
- [ ] User event history
- [ ] QR code check-ins

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in this repository
- Contact the SecKC team at https://seckc.org
- Join the SecKC community discussions

---

Built with ❤️ for the Kansas City security community