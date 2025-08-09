// Player Types
export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  email: string;
  phone: string;
  age: number;
  nationality: string;
  height: string;
  weight: string;
  joinDate: string;
  stats: {
    gamesPlayed: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    minutesPlayed: number;
    cleanSheets?: number;
    saves?: number;
  };
  profileImage: string;
  isActive: boolean;
  isInjured: boolean;
  injuryDetails: string | null;
  isFeatured: boolean;
  bio: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// Match Types
export interface Match {
  id: string;
  opponent: string;
  opponentLogo?: string;
  tournament: string;
  dateTime: string;
  location: string;
  venue: {
    name: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  status: "upcoming" | "live" | "completed" | "cancelled" | "postponed";
  isHomeGame: boolean;
  result?: {
    homeScore: number;
    awayScore: number;
    finalScore: string;
    winner: "home" | "away" | "draw";
  } | null;
  lineup?: {
    starting11: string[];
    substitutes: string[];
    formation: string;
  } | null;
  events: {
    type: string;
    playerId: string;
    minute: number;
    description: string;
  }[];
  images: string[];
  matchReport?: string | null;
  ticketPrice?: string;
  importance?: string;
  createdAt: string;
  updatedAt: string;
}

// News Types
export interface News {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  featuredImage: string;
  images: string[];
  status: "draft" | "published" | "archived";
  publishDate: string;
  author: string;
  authorId: string;
  views: number;
  likes: number;
  isHighlighted: boolean;
  createdAt: string;
  updatedAt: string;
}

// Team Stats Types
export interface TeamStats {
  id: string;
  season: string;
  matches: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
  };
  league: {
    name: string;
    position: number;
    totalTeams: number;
  };
  achievements: {
    title: string;
    date: string;
    description: string;
  }[];
  topScorer: {
    playerId: string;
    name: string;
    goals: number;
  };
  topAssists: {
    playerId: string;
    name: string;
    assists: number;
  };
  lastUpdated: string;
}

// Gallery Types
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  type: "photo" | "video" | "album";
  url: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  matchId?: string | null;
  dimensions: {
    width: number;
    height: number;
  };
  fileSize: number;
  format: string;
  views: number;
  likes: number;
  isPublic: boolean;
  isFeatured: boolean;
  uploadedAt: string;
  uploadedBy: string;
  createdAt: string;
}

// Training Types
export interface TrainingSession {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  duration: number;
  location: string;
  type: string;
  focus: string[];
  intensity: "low" | "medium" | "high";
  attendance: {
    required: string[];
    attended: string[];
    absent: string[];
    excused: string[];
  };
  exercises: {
    name: string;
    duration: number;
    description: string;
  }[];
  status: "scheduled" | "completed" | "cancelled";
  isPublic: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// Sponsor Types
export interface Sponsor {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  contactEmail: string;
  sponsorshipLevel: "platinum" | "gold" | "silver" | "bronze";
  sponsorshipType: string;
  contractStart: string;
  contractEnd: string;
  isActive: boolean;
  displayOnWebsite: boolean;
  displayOrder: number;
  benefits: string[];
  createdAt: string;
  updatedAt: string;
}

// Social Media Types
export interface SocialMediaPost {
  id: string;
  platform: "instagram" | "facebook" | "twitter" | "tiktok";
  postId: string;
  content: string;
  imageUrl: string;
  postUrl: string;
  likes: number;
  comments: number;
  shares: number;
  postedAt: string;
  syncedAt: string;
  isActive: boolean;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  photo: string;
  isApproved: boolean;
  isFeatured: boolean;
  displayOrder: number;
  submittedAt: string;
  approvedAt: string;
  approvedBy: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Loading States
export interface LoadingState {
  loading: boolean;
  error: string | null;
}
