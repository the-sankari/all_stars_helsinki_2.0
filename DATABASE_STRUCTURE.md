# 🗄️ All Stars Helsinki - Firebase Database Structure

## 📋 Overview

This document outlines the complete Firebase Firestore database structure for the All Stars Helsinki team management system. The database is designed to support all features shown on the homepage and throughout the application.

## 🏗️ Database Architecture

### **Firebase Services Used:**

- **Firestore** - Main database for structured data
- **Firebase Auth** - User authentication and authorization
- **Firebase Storage** - File and media storage
- **Firebase Functions** - Server-side logic (future implementation)

---

## 📊 Visual Database Architecture

### **Entity Relationship Diagram**

erDiagram
    PLAYERS {
        string id PK
        string name
        int number
        string position
        string email
        string phone
        int age
        string nationality
        object stats
        string profileImage
        boolean isActive
        datetime createdAt
        datetime updatedAt
    }

    MATCHES {
        string id PK
        string opponent
        string tournament
        datetime dateTime
        string location
        object venue
        string status
        boolean isHomeGame
        object result
        object lineup
        array events
        array images
        string matchReport
        datetime createdAt
        datetime updatedAt
    }

    NEWS {
        string id PK
        string title
        string content
        string excerpt
        string category
        array tags
        string featuredImage
        string status
        datetime publishDate
        string author
        string authorId
        int views
        int likes
        datetime createdAt
        datetime updatedAt
    }

    TRAINING_SESSIONS {
        string id PK
        string title
        string description
        datetime dateTime
        int duration
        string location
        string type
        array focus
        string intensity
        object attendance
        array exercises
        string status
        boolean isPublic
        datetime createdAt
        string createdBy
    }

    GALLERY {
        string id PK
        string title
        string description
        string type
        string url
        string thumbnailUrl
        string category
        array tags
        string matchId FK
        object dimensions
        int fileSize
        string format
        int views
        int likes
        boolean isPublic
        boolean isFeatured
        datetime uploadedAt
        string uploadedBy
    }

    TEAM_STATS {
        string id PK
        string season
        object matches
        object league
        array achievements
        object topScorer
        object topAssists
        datetime lastUpdated
    }

    SPONSORS {
        string id PK
        string name
        string description
        string logo
        string website
        string contactEmail
        string sponsorshipLevel
        string sponsorshipType
        date contractStart
        date contractEnd
        boolean isActive
        boolean displayOnWebsite
        int displayOrder
        array benefits
        datetime createdAt
        datetime updatedAt
    }

    SOCIAL_MEDIA {
        string id PK
        string platform
        string postId
        string content
        string imageUrl
        string postUrl
        int likes
        int comments
        int shares
        datetime postedAt
        datetime syncedAt
        boolean isActive
    }

    NEWSLETTER_SUBSCRIBERS {
        string id PK
        string email
        datetime subscriptionDate
        boolean isActive
        object preferences
        int emailsReceived
        int emailsOpened
        datetime lastEmailOpened
        datetime createdAt
        datetime updatedAt
    }

    TESTIMONIALS {
        string id PK
        string name
        string role
        string content
        int rating
        string photo
        boolean isApproved
        boolean isFeatured
        int displayOrder
        datetime submittedAt
        datetime approvedAt
        string approvedBy
    }

    USERS {
        string uid PK
        string email
        string displayName
        string role
        array permissions
        boolean teamAccess
    }

    %% Relationships
    PLAYERS ||--o{ MATCHES : "plays_in"
    MATCHES ||--o{ GALLERY : "has_media"
    PLAYERS ||--o{ TRAINING_SESSIONS : "attends"
    USERS ||--o{ NEWS : "creates"
    USERS ||--o{ TRAINING_SESSIONS : "creates"
    USERS ||--o{ GALLERY : "uploads"
    USERS ||--o{ TESTIMONIALS : "approves"
    PLAYERS ||--o{ TEAM_STATS : "contributes_to"

### **System Architecture Flow**

graph TB
    subgraph "Frontend (Next.js)"
        A[Homepage Components] --> B[HeroSection]
        A --> C[TeamStatsSection]
        A --> D[NewsSection]
        A --> E[PlayerSpotlight]
        A --> F[MatchCard]
        A --> G[SocialMedia]
        A --> H[Newsletter]
        A --> I[Sponsors]
    end

    subgraph "Backend API (Express.js)"
        J[API Routes] --> K[/api/players]
        J --> L[/api/matches]
        J --> M[/api/news]
        J --> N[/api/training]
        J --> O[/api/gallery]
        J --> P[/api/stats]
        J --> Q[/api/social-media]
        J --> R[/api/newsletter]
        J --> S[/api/sponsors]
        J --> T[/api/testimonials]
    end

    subgraph "Firebase Services"
        U[(Firestore Database)]
        V[Firebase Auth]
        W[Firebase Storage]
        X[Firebase Functions]
    end

    subgraph "Database Collections"
        U --> U1[(players)]
        U --> U2[(matches)]
        U --> U3[(news)]
        U --> U4[(training_sessions)]
        U --> U5[(gallery)]
        U --> U6[(team_stats)]
        U --> U7[(social_media)]
        U --> U8[(newsletter_subscribers)]
        U --> U9[(sponsors)]
        U --> U10[(testimonials)]
    end

    %% Frontend to Backend connections
    B --> K
    B --> L
    C --> P
    D --> M
    E --> K
    F --> L
    G --> Q
    H --> R
    I --> S

    %% Backend to Firebase connections
    K --> U1
    L --> U2
    M --> U3
    N --> U4
    O --> U5
    O --> W
    P --> U6
    Q --> U7
    R --> U8
    S --> U9
    T --> U10

    %% Authentication flow
    V --> J

    %% Storage connections
    W --> U5
    W --> U1
    W --> U3

    %% Styling
    classDef frontend fill:#e1f5fe
    classDef backend fill:#f3e5f5
    classDef firebase fill:#fff3e0
    classDef database fill:#e8f5e8

    class A,B,C,D,E,F,G,H,I frontend
    class J,K,L,M,N,O,P,Q,R,S,T backend
    class U,V,W,X firebase
    class U1,U2,U3,U4,U5,U6,U7,U8,U9,U10 database

### **Data Flow Diagram**

sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant DB as Firestore
    participant Auth as Firebase Auth
    participant S as Storage

    Note over U,S: Homepage Load Sequence

    U->>F: Visit Homepage
    F->>A: GET /api/matches/upcoming
    A->>DB: Query matches collection
    DB-->>A: Return next match data
    A-->>F: Match data + countdown
    F->>F: Render MatchCard component

    F->>A: GET /api/stats/team
    A->>DB: Query team_stats collection
    DB-->>A: Return season statistics
    A-->>F: Team performance data
    F->>F: Render TeamStatsSection

    F->>A: GET /api/news/published
    A->>DB: Query news collection (status=published)
    DB-->>A: Return latest articles
    A-->>F: News articles
    F->>F: Render NewsSection

    F->>A: GET /api/players (featured)
    A->>DB: Query players collection
    DB-->>A: Return featured player
    A-->>F: Player spotlight data
    F->>F: Render PlayerSpotlight

    Note over U,S: Admin Operations

    U->>F: Login as Admin
    F->>Auth: Authenticate user
    Auth-->>F: Auth token + custom claims

    U->>F: Add new player
    F->>A: POST /api/players (with auth token)
    A->>Auth: Verify token + role
    Auth-->>A: Authorized
    A->>DB: Create player document
    DB-->>A: Success
    A-->>F: Player created
    F->>F: Update UI

    Note over U,S: Media Upload

    U->>F: Upload player photo
    F->>S: Upload image file
    S-->>F: Storage URL
    F->>A: PATCH /api/players/:id (with image URL)
    A->>DB: Update player document
    DB-->>A: Success
    A-->>F: Updated player data

### **Security & Access Control Flow**

graph LR
    subgraph "User Roles"
        A[Public User]
        B[Player]
        C[Coach]
        D[Moderator]
        E[Admin]
    end

    subgraph "Firebase Auth"
        F[Authentication]
        G[Custom Claims]
    end

    subgraph "Firestore Security Rules"
        H[Read Rules]
        I[Write Rules]
    end

    subgraph "Collections Access"
        J[players - Read: All, Write: Coach+]
        K[matches - Read: All, Write: Coach+]
        L[news - Read: Public only, Write: Moderator+]
        M[training - Read: Player+, Write: Coach+]
        N[gallery - Read: All, Write: Moderator+]
        O[team_stats - Read: All, Write: Admin only]
        P[social_media - Read: All, Write: Admin only]
        Q[newsletter - Read: Admin only, Write: Public]
        R[sponsors - Read: All, Write: Admin only]
        S[testimonials - Read: Approved only, Write: All]
    end

    A --> F
    B --> F
    C --> F
    D --> F
    E --> F

    F --> G
    G --> H
    G --> I

    H --> J
    H --> K
    H --> L
    H --> M
    H --> N
    H --> O
    H --> P
    H --> Q
    H --> R
    H --> S

    I --> J
    I --> K
    I --> L
    I --> M
    I --> N
    I --> O
    I --> P
    I --> Q
    I --> R
    I --> S

    classDef public fill:#e3f2fd
    classDef player fill:#f3e5f5
    classDef coach fill:#fff3e0
    classDef moderator fill:#e8f5e8
    classDef admin fill:#ffebee

    class A public
    class B player
    class C coach
    class D moderator
    class E admin
```

## 📊 Collections Structure

### 1. **`players` Collection**

**Purpose**: Store all team player information and statistics

```javascript
// Document ID: auto-generated
{
  // Basic Information
  id: "auto-generated-id",
  name: "John Doe",
  number: 10,
  position: "Forward", // Forward, Midfielder, Defender, Goalkeeper
  email: "john.doe@email.com",
  phone: "+358 123 456 789",

  // Profile Details
  age: 25,
  nationality: "Finnish",
  height: "180cm",
  weight: "75kg",
  joinDate: "2024-01-15", // ISO date string

  // Statistics
  stats: {
    gamesPlayed: 15,
    goals: 8,
    assists: 5,
    yellowCards: 2,
    redCards: 0,
    minutesPlayed: 1350
  },

  // Media
  profileImage: "gs://bucket/players/john-doe-profile.jpg", // Firebase Storage path

  // Status
  isActive: true,
  isInjured: false,
  injuryDetails: null,

  // Metadata
  createdAt: "2024-01-15T10:00:00.000Z",
  updatedAt: "2024-08-07T14:30:00.000Z",
  createdBy: "admin-user-id"
}
```

### 2. **`matches` Collection**

**Purpose**: Store all match information, schedules, and results

```javascript
// Document ID: auto-generated
{
  // Basic Match Info
  id: "auto-generated-id",
  opponent: "Helsinki United",
  tournament: "Finn-Bangla Tournament", // optional

  // Schedule
  dateTime: "2025-08-15T10:00:00.000Z", // ISO datetime
  location: "Helsinki Sports Center",
  venue: {
    name: "Helsinki Sports Center",
    address: "Example Street 1, Helsinki, Finland",
    coordinates: {
      lat: 60.1699,
      lng: 24.9384
    }
  },

  // Match Status
  status: "upcoming", // upcoming, live, completed, cancelled, postponed
  isHomeGame: true,

  // Results (only for completed matches)
  result: {
    homeScore: 2,
    awayScore: 1,
    finalScore: "2-1",
    winner: "home" // home, away, draw
  },

  // Team Lineup
  lineup: {
    starting11: ["player-id-1", "player-id-2", "..."],
    substitutes: ["player-id-8", "player-id-9", "..."],
    formation: "4-4-2"
  },

  // Match Events
  events: [
    {
      type: "goal", // goal, yellow_card, red_card, substitution
      playerId: "player-id-1",
      minute: 23,
      description: "Header from corner kick"
    }
  ],

  // Media
  images: ["gs://bucket/matches/match-1-photo1.jpg"],
  matchReport: "Great performance by the team...",

  // Metadata
  createdAt: "2024-08-01T09:00:00.000Z",
  updatedAt: "2024-08-15T12:00:00.000Z"
}
```

### 3. **`news` Collection**

**Purpose**: Team news, announcements, and articles

```javascript
// Document ID: auto-generated
{
  id: "auto-generated-id",
  title: "Team Prepares for Championship Final",
  content: "The All Stars Helsinki team has been training intensively...",
  excerpt: "Short summary for homepage display",

  // Content Details
  category: "match-preview", // match-preview, team-news, player-spotlight, training
  tags: ["championship", "training", "final"],

  // Media
  featuredImage: "gs://bucket/news/news-1-featured.jpg",
  images: ["gs://bucket/news/news-1-gallery1.jpg"],

  // Publishing
  status: "published", // draft, published, archived
  publishDate: "2024-08-07T10:00:00.000Z",
  author: "Coach Mike Johnson",
  authorId: "admin-user-id",

  // Engagement
  views: 245,
  likes: 32,

  // Metadata
  createdAt: "2024-08-06T15:30:00.000Z",
  updatedAt: "2024-08-07T10:00:00.000Z"
}
```

### 4. **`training_sessions` Collection**

**Purpose**: Training schedules and session details

```javascript
// Document ID: auto-generated
{
  id: "auto-generated-id",
  title: "Weekly Team Training",
  description: "Focus on attacking formations and set pieces",

  // Schedule
  dateTime: "2024-08-10T18:00:00.000Z",
  duration: 90, // minutes
  location: "Training Ground A",

  // Training Details
  type: "team-training", // team-training, individual, fitness, tactical
  focus: ["attacking", "set-pieces", "fitness"],
  intensity: "high", // low, medium, high

  // Attendance
  attendance: {
    required: ["player-id-1", "player-id-2"],
    attended: ["player-id-1"],
    absent: ["player-id-2"],
    excused: []
  },

  // Training Plan
  exercises: [
    {
      name: "Passing Drill",
      duration: 15,
      description: "Short passing in small groups"
    }
  ],

  // Status
  status: "scheduled", // scheduled, completed, cancelled
  isPublic: true,

  // Metadata
  createdAt: "2024-08-05T12:00:00.000Z",
  updatedAt: "2024-08-07T16:00:00.000Z",
  createdBy: "coach-user-id"
}
```

### 5. **`gallery` Collection**

**Purpose**: Team photos, match highlights, and media content

```javascript
// Document ID: auto-generated
{
  id: "auto-generated-id",
  title: "Championship Final Highlights",
  description: "Best moments from our championship victory",

  // Media Details
  type: "photo", // photo, video, album
  url: "gs://bucket/gallery/championship-final-photo1.jpg",
  thumbnailUrl: "gs://bucket/gallery/thumbs/championship-final-photo1.jpg",

  // Organization
  category: "match", // match, training, team-event, player-spotlight
  tags: ["championship", "victory", "celebration"],
  matchId: "match-id-reference", // optional reference

  // Media Metadata
  dimensions: {
    width: 1920,
    height: 1080
  },
  fileSize: 2048000, // bytes
  format: "jpg",

  // Engagement
  views: 156,
  likes: 28,

  // Visibility
  isPublic: true,
  isFeatured: false,

  // Metadata
  uploadedAt: "2024-08-07T20:00:00.000Z",
  uploadedBy: "admin-user-id",
  createdAt: "2024-08-07T20:00:00.000Z"
}
```

### 6. **`team_stats` Collection**

**Purpose**: Overall team statistics and performance metrics

```javascript
// Document ID: "current_season" or year-based
{
  id: "season_2024",
  season: "2024",

  // Team Performance
  matches: {
    played: 15,
    won: 10,
    drawn: 3,
    lost: 2,
    goalsFor: 28,
    goalsAgainst: 12,
    goalDifference: 16,
    points: 33
  },

  // League Position
  league: {
    name: "Helsinki Premier League",
    position: 2,
    totalTeams: 12
  },

  // Achievements
  achievements: [
    {
      title: "League Runner-up",
      date: "2024-07-15",
      description: "Finished 2nd in Helsinki Premier League"
    }
  ],

  // Top Performers
  topScorer: {
    playerId: "player-id-1",
    goals: 8
  },
  topAssists: {
    playerId: "player-id-2",
    assists: 5
  },

  // Updated
  lastUpdated: "2024-08-07T18:00:00.000Z"
}
```

### 7. **`sponsors` Collection**

**Purpose**: Sponsor information and partnership details

```javascript
// Document ID: auto-generated
{
  id: "auto-generated-id",
  name: "Helsinki Sports Store",
  description: "Football gear and training materials",

  // Contact & Branding
  logo: "gs://bucket/sponsors/helsinki-sports-logo.png",
  website: "https://helsinkisports.fi",
  contactEmail: "partnership@helsinkisports.fi",

  // Partnership Details
  sponsorshipLevel: "gold", // platinum, gold, silver, bronze
  sponsorshipType: "financial", // financial, equipment, venue, services
  contractStart: "2024-01-01",
  contractEnd: "2024-12-31",

  // Visibility
  isActive: true,
  displayOnWebsite: true,
  displayOrder: 1,

  // Benefits
  benefits: [
    "Logo on team jerseys",
    "Stadium advertising",
    "Social media mentions"
  ],

  // Metadata
  createdAt: "2024-01-01T10:00:00.000Z",
  updatedAt: "2024-08-07T14:00:00.000Z"
}
```

### 8. **`social_media` Collection**

**Purpose**: Social media posts and engagement tracking

```javascript
// Document ID: auto-generated
{
  id: "auto-generated-id",
  platform: "instagram", // instagram, facebook, twitter, tiktok
  postId: "instagram-post-123456",

  // Content
  content: "Training session highlight: Amazing teamwork! 💪 #TrainingDay",
  imageUrl: "gs://bucket/social/training-highlight.jpg",
  postUrl: "https://instagram.com/p/xyz123",

  // Engagement
  likes: 145,
  comments: 23,
  shares: 8,

  // Metadata
  postedAt: "2024-08-07T16:30:00.000Z",
  syncedAt: "2024-08-07T17:00:00.000Z",
  isActive: true
}
```

### 9. **`newsletter_subscribers` Collection**

**Purpose**: Newsletter subscription management

```javascript
// Document ID: email-based
{
  id: "user-email-hash",
  email: "fan@example.com",

  // Subscription Details
  subscriptionDate: "2024-08-07T12:00:00.000Z",
  isActive: true,

  // Preferences
  preferences: {
    matchNotifications: true,
    newsUpdates: true,
    trainingUpdates: false
  },

  // Engagement
  emailsReceived: 15,
  emailsOpened: 12,
  lastEmailOpened: "2024-08-05T10:00:00.000Z",

  // Metadata
  createdAt: "2024-06-15T14:00:00.000Z",
  updatedAt: "2024-08-07T12:00:00.000Z"
}
```

### 10. **`testimonials` Collection**

**Purpose**: Fan and player testimonials

```javascript
// Document ID: auto-generated
{
  id: "auto-generated-id",
  name: "Sarah Johnson",
  role: "Long-time Fan", // Fan, Player, Coach, Parent

  // Content
  content: "All Stars Helsinki has been my favorite team for 5 years...",
  rating: 5, // 1-5 stars

  // Media
  photo: "gs://bucket/testimonials/sarah-johnson.jpg",

  // Display
  isApproved: true,
  isFeatured: true,
  displayOrder: 1,

  // Metadata
  submittedAt: "2024-07-20T11:00:00.000Z",
  approvedAt: "2024-07-21T09:00:00.000Z",
  approvedBy: "admin-user-id"
}
```

---

## 🔐 Authentication & User Roles

### **Firebase Auth Users**

```javascript
// Firebase Auth + Custom Claims
{
  uid: "firebase-auth-uid",
  email: "admin@allstarshelsinki.com",
  displayName: "John Admin",

  // Custom Claims (set via Firebase Admin SDK)
  customClaims: {
    role: "admin", // admin, coach, player, moderator
    permissions: ["read", "write", "delete"],
    teamAccess: true
  }
}
```

### **User Roles:**

1. **Admin** - Full access to all data and features
2. **Coach** - Manage players, training, matches
3. **Player** - View-only access, update own profile
4. **Moderator** - Manage content, news, gallery
5. **Public** - Read-only access to public data

---

## 🗂️ Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for certain collections
    match /players/{playerId} {
      allow read: if true;
      allow write: if request.auth != null &&
        (request.auth.token.role == 'admin' ||
         request.auth.token.role == 'coach');
    }

    match /matches/{matchId} {
      allow read: if true;
      allow write: if request.auth != null &&
        request.auth.token.role in ['admin', 'coach'];
    }

    match /news/{newsId} {
      allow read: if resource.data.status == 'published';
      allow write: if request.auth != null &&
        request.auth.token.role in ['admin', 'moderator'];
    }

    // Protected admin-only collections
    match /team_stats/{statId} {
      allow read: if true;
      allow write: if request.auth != null &&
        request.auth.token.role == 'admin';
    }
  }
}
```

---

## 📈 Data Flow & Integration

### **Homepage Components → Database Mapping:**

1. **HeroSection** → `matches` (next match countdown)
2. **TeamStatsSection** → `team_stats` (current season stats)
3. **NewsSection** → `news` (latest articles)
4. **TrainingScheduleSection** → `training_sessions` (upcoming sessions)
5. **TestimonialsSection** → `testimonials` (featured reviews)
6. **PlayerSpotlightSection** → `players` (featured player)
7. **RecentMatchesSection** → `matches` (recent results)
8. **SocialMediaSection** → `social_media` (latest posts)
9. **NewsletterSection** → `newsletter_subscribers` (subscription)
10. **SponsorsSection** → `sponsors` (active sponsors)

### **API Endpoints Needed:**

```bash
# Players
GET /api/players
POST /api/players
PUT /api/players/:id
DELETE /api/players/:id

# Matches
GET /api/matches
GET /api/matches/upcoming
GET /api/matches/recent
POST /api/matches
PUT /api/matches/:id

# News
GET /api/news
GET /api/news/published
POST /api/news
PUT /api/news/:id

# Training
GET /api/training
POST /api/training
PUT /api/training/:id

# Stats
GET /api/stats/team
GET /api/stats/players

# Gallery
GET /api/gallery
POST /api/gallery
DELETE /api/gallery/:id

# Social Media
GET /api/social-media

# Newsletter
POST /api/newsletter/subscribe
DELETE /api/newsletter/unsubscribe

# Sponsors
GET /api/sponsors

# Testimonials
GET /api/testimonials/approved
POST /api/testimonials
```

---

## 🚀 Implementation Priority

### **Phase 1: Core Features (Current)**

- ✅ Players management
- ✅ Basic authentication
- 🔄 Matches system

### **Phase 2: Content Management**

- News & announcements
- Training schedule
- Gallery system

### **Phase 3: Engagement Features**

- Newsletter system
- Testimonials
- Social media integration

### **Phase 4: Advanced Features**

- Real-time match updates
- Player statistics dashboard
- Advanced analytics

---

## 🛠️ Development Notes

### **Firebase Project Configuration:**

- **Project ID**: `all-stars-helsinki`
- **Region**: `europe-west1` (recommended for Finland)
- **Firestore Mode**: Native mode
- **Storage Bucket**: `all-stars-helsinki.appspot.com`

### **Environment Variables Needed:**

```env
# Frontend (.env.local)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=all-stars-helsinki.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=all-stars-helsinki
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=all-stars-helsinki.appspot.com

# Backend (.env)
FIREBASE_PROJECT_ID=all-stars-helsinki
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@all-stars-helsinki.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```

---

## 📝 Next Steps

1. **Set up Firestore collections** with initial data
2. **Configure security rules** for proper access control
3. **Implement API endpoints** for each collection
4. **Create data seeding scripts** for development
5. **Set up Firebase Storage** for media files
6. **Implement real-time listeners** for live updates

This database structure provides a solid foundation for the All Stars Helsinki team management system, supporting all current features and allowing for future expansion.
