import axios from "axios";
import {
  Player,
  Match,
  News,
  TeamStats,
  GalleryItem,
  TrainingSession,
  Sponsor,
  SocialMediaPost,
  Testimonial,
} from "./types";

// Mock data import - in production, this would be actual API calls
import mockData from "../../mock_database.json";

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Mock API responses using the JSON data
class ApiService {
  // Players API
  async getPlayers(): Promise<Player[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockData.players as Player[];
  }

  async getFeaturedPlayer(): Promise<Player | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const featuredPlayer = mockData.players.find((player) => player.isFeatured);
    return (featuredPlayer as Player) || null;
  }

  async getPlayerById(id: string): Promise<Player | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const player = mockData.players.find((player) => player.id === id);
    return (player as Player) || null;
  }

  // Matches API
  async getMatches(): Promise<Match[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockData.matches as Match[];
  }

  async getUpcomingMatches(): Promise<Match[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const upcoming = mockData.matches.filter(
      (match) => match.status === "upcoming"
    );
    return upcoming as Match[];
  }

  async getRecentMatches(): Promise<Match[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const recent = mockData.matches
      .filter((match) => match.status === "completed")
      .sort(
        (a, b) =>
          new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
      )
      .slice(0, 3);
    return recent as Match[];
  }

  async getNextMatch(): Promise<Match | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const upcoming = mockData.matches
      .filter((match) => match.status === "upcoming")
      .sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
    return (upcoming[0] as Match) || null;
  }

  // News API
  async getNews(): Promise<News[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockData.news as News[];
  }

  async getPublishedNews(): Promise<News[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const published = mockData.news
      .filter((article) => article.status === "published")
      .sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );
    return published as News[];
  }

  async getLatestNews(limit: number = 3): Promise<News[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const latest = mockData.news
      .filter((article) => article.status === "published")
      .sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      )
      .slice(0, limit);
    return latest as News[];
  }

  // Team Stats API
  async getTeamStats(): Promise<TeamStats> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockData.team_stats as TeamStats;
  }

  // Gallery API
  async getGallery(): Promise<GalleryItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockData.gallery as GalleryItem[];
  }

  async getFeaturedGallery(): Promise<GalleryItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const featured = mockData.gallery.filter((item) => item.isFeatured);
    return featured as GalleryItem[];
  }

  // Training API
  async getTrainingSessions(): Promise<TrainingSession[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockData.training_sessions as TrainingSession[];
  }

  async getUpcomingTraining(): Promise<TrainingSession[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const upcoming = mockData.training_sessions
      .filter((session) => session.status === "scheduled")
      .sort(
        (a, b) =>
          new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
    return upcoming as TrainingSession[];
  }

  // Sponsors API
  async getSponsors(): Promise<Sponsor[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const activeSponsors = mockData.sponsors
      .filter((sponsor) => sponsor.isActive && sponsor.displayOnWebsite)
      .sort((a, b) => a.displayOrder - b.displayOrder);
    return activeSponsors as Sponsor[];
  }

  // Social Media API
  async getSocialMediaPosts(): Promise<SocialMediaPost[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const posts = mockData.social_media
      .filter((post) => post.isActive)
      .sort(
        (a, b) =>
          new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      );
    return posts as SocialMediaPost[];
  }

  async getLatestSocialPosts(limit: number = 6): Promise<SocialMediaPost[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const latest = mockData.social_media
      .filter((post) => post.isActive)
      .sort(
        (a, b) =>
          new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      )
      .slice(0, limit);
    return latest as SocialMediaPost[];
  }

  // Testimonials API
  async getTestimonials(): Promise<Testimonial[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockData.testimonials as Testimonial[];
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const featured = mockData.testimonials
      .filter((testimonial) => testimonial.isApproved && testimonial.isFeatured)
      .sort((a, b) => a.displayOrder - b.displayOrder);
    return featured as Testimonial[];
  }

  // Newsletter API
  async subscribeNewsletter(
    email: string
  ): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Mock newsletter subscription
    console.log(`Newsletter subscription for: ${email}`);
    return {
      success: true,
      message: "Successfully subscribed to newsletter!",
    };
  }
}

export const apiService = new ApiService();
export default api;
