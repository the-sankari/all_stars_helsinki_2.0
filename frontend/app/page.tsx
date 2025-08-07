"use client";

import Head from "next/head";
import { useEffect } from "react";

// Redux imports
import { useAppDispatch } from "../lib/hooks";
import { fetchFeaturedPlayer } from "../lib/features/playersSlice";
import {
  fetchNextMatch,
  fetchRecentMatches,
} from "../lib/features/matchesSlice";
import { fetchLatestNews } from "../lib/features/newsSlice";
import { fetchTeamStats } from "../lib/features/teamStatsSlice";
import { fetchFeaturedGallery } from "../lib/features/gallerySlice";
import { fetchSponsors } from "../lib/features/sponsorsSlice";
import { fetchLatestSocialPosts } from "../lib/features/socialMediaSlice";
import { fetchFeaturedTestimonials } from "../lib/features/testimonialsSlice";
import { fetchUpcomingTraining } from "../lib/features/trainingSlice";

// Import all homepage components
import HeroSection from "@/components/homepage/HeroSection";
import WelcomeSection from "@/components/homepage/WelcomeSection";
import TeamStatsSection from "@/components/homepage/TeamStatsSection";
import NewsSection from "@/components/homepage/NewsSection";
import TrainingScheduleSection from "@/components/homepage/TrainingScheduleSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import PlayerSpotlightSection from "@/components/homepage/PlayerSpotlightSection";
import CallToActionSection from "@/components/homepage/CallToActionSection";
import RecentMatchesSection from "@/components/homepage/RecentMatchesSection";
import SocialMediaSection from "@/components/homepage/SocialMediaSection";
import NewsletterSection from "@/components/homepage/NewsletterSection";
import SponsorsSection from "@/components/homepage/SponsorsSection";
import BackToTopButton from "@/components/shared/BackToTopButton";

export default function HomePage() {
  const dispatch = useAppDispatch();

  // Fetch all data when component mounts
  useEffect(() => {
    // Fetch data for all homepage sections
    dispatch(fetchFeaturedPlayer());
    dispatch(fetchNextMatch());
    dispatch(fetchRecentMatches());
    dispatch(fetchLatestNews(3));
    dispatch(fetchTeamStats());
    dispatch(fetchFeaturedGallery());
    dispatch(fetchSponsors());
    dispatch(fetchLatestSocialPosts(6));
    dispatch(fetchFeaturedTestimonials());
    dispatch(fetchUpcomingTraining());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>
          All Stars Helsinki - Amateur Football Team | For the Love of the Game
        </title>
        <meta
          name="description"
          content="Join All Stars Helsinki, an amateur football team in Helsinki driven by passion, teamwork, and the love of the game. Training sessions, matches, and community events."
        />
        <meta
          name="keywords"
          content="All Stars Helsinki, football team, amateur football, Helsinki sports, football training, team sports, football community"
        />
        <meta name="author" content="All Stars Helsinki" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://allstarshelsinki.fi/" />
        <meta
          property="og:title"
          content="All Stars Helsinki - Amateur Football Team"
        />
        <meta
          property="og:description"
          content="Join our passionate football community in Helsinki. Training, matches, and team spirit for the love of the game."
        />
        <meta property="og:image" content="/img/hero.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://allstarshelsinki.fi/" />
        <meta
          property="twitter:title"
          content="All Stars Helsinki - Amateur Football Team"
        />
        <meta
          property="twitter:description"
          content="Join our passionate football community in Helsinki. Training, matches, and team spirit for the love of the game."
        />
        <meta property="twitter:image" content="/img/hero.png" />

        <link rel="canonical" href="https://allstarshelsinki.fi/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* All Homepage Sections */}
      <HeroSection />
      <WelcomeSection />
      <TeamStatsSection />
      <NewsSection />
      <TrainingScheduleSection />
      <TestimonialsSection />
      <PlayerSpotlightSection />
      <CallToActionSection />
      <RecentMatchesSection />
      <SocialMediaSection />
      <NewsletterSection />
      <SponsorsSection />

      {/* Back to Top Button */}
      <BackToTopButton />
    </>
  );
}
