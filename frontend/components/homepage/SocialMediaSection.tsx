"use client";

import { useAppSelector } from "../../lib/hooks";
import type { RootState } from "../../lib/store";
import type { SocialMediaPost } from "../../lib/types";

interface SocialMediaState {
  latestPosts: SocialMediaPost[];
  loading: boolean;
  error: string | null;
}
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Globe,
  Heart,
  MessageCircle,
  Share2,
  Target,
  Trophy,
  Users,
  Zap,
  Dumbbell,
  Star,
  Smartphone,
  Wifi,
} from "lucide-react";

export default function SocialMediaSection() {
  const { latestPosts, loading, error } = useAppSelector(
    (state: RootState) => state.socialMedia
  ) as SocialMediaState;

  // Helper function to format time ago
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Helper function to get platform icon and colors
  const getPlatformInfo = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return {
          icon: <Instagram className="w-5 h-5" />,
          bg: "bg-gradient-to-r from-purple-600 to-pink-600",
          handle: "@AllStarsHelsinki",
          linkText: "View on Instagram →",
        };
      case "facebook":
        return {
          icon: <Facebook className="w-5 h-5" />,
          bg: "bg-blue-600",
          handle: "@AllStarsHelsinki",
          linkText: "View on Facebook →",
        };
      case "twitter":
      case "x":
        return {
          icon: <Twitter className="w-5 h-5" />,
          bg: "bg-black",
          handle: "@AllStarsHKI",
          linkText: "Follow us on X →",
        };
      case "youtube":
        return {
          icon: <Youtube className="w-5 h-5" />,
          bg: "bg-red-600",
          handle: "All Stars Helsinki",
          linkText: "Watch on YouTube →",
        };
      default:
        return {
          icon: <Globe className="w-5 h-5" />,
          bg: "bg-gray-600",
          handle: "@AllStarsHelsinki",
          linkText: "View Post →",
        };
    }
  };
  // Dynamic social links based on available posts
  const socialLinks = [
    {
      icon: <Instagram className="w-5 h-5" />,
      bg: "bg-purple-600 hover:bg-purple-700",
      label: "Instagram",
      url: "#",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      bg: "bg-black hover:bg-gray-800",
      label: "X (Twitter)",
      url: "#",
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      bg: "bg-blue-600 hover:bg-blue-700",
      label: "Facebook",
      url: "#",
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      bg: "bg-red-600 hover:bg-red-700",
      label: "YouTube",
      url: "#",
    },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-purple-600 mb-4 uppercase">
            Follow Our Journey
          </h2>
          <p className="text-gray-600 text-lg">
            Stay connected with us on social media for daily updates and
            behind-the-scenes content
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {loading ? (
            // Loading skeletons
            [1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="animate-pulse">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <div className="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                      <div className="h-3 bg-gray-300 rounded w-20"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded w-24"></div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-2 text-center py-12">
              <div className="text-red-500 mb-4">
                <Wifi className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Unable to Load Social Media
              </h3>
              <p className="text-gray-600 mb-4">
                We&apos;re having trouble loading social media posts right now.
              </p>
              <p className="text-sm text-red-600">Error: {error}</p>
            </div>
          ) : latestPosts.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <div className="text-gray-400 mb-4">
                <Smartphone className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Recent Posts
              </h3>
              <p className="text-gray-600">
                Check back soon for our latest social media updates!
              </p>
            </div>
          ) : (
            latestPosts.slice(0, 2).map((post: SocialMediaPost) => {
              const platformInfo = getPlatformInfo(post.platform);
              return (
                <div
                  key={post.id}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-10 h-10 ${platformInfo.bg} rounded-full flex items-center justify-center text-white font-bold mr-3`}
                    >
                      {platformInfo.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {platformInfo.handle}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {post.platform}
                      </p>
                    </div>
                  </div>

                  {post.platform.toLowerCase() === "instagram" ? (
                    // Instagram-style layout
                    <>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          {
                            icon: <Target className="w-6 h-6" />,
                            bg: "bg-purple-200",
                            color: "text-purple-600",
                          },
                          {
                            icon: <Trophy className="w-6 h-6" />,
                            bg: "bg-yellow-200",
                            color: "text-yellow-600",
                          },
                          {
                            icon: <Users className="w-6 h-6" />,
                            bg: "bg-green-200",
                            color: "text-green-600",
                          },
                          {
                            icon: <Zap className="w-6 h-6" />,
                            bg: "bg-blue-200",
                            color: "text-blue-600",
                          },
                          {
                            icon: <Dumbbell className="w-6 h-6" />,
                            bg: "bg-red-200",
                            color: "text-red-600",
                          },
                          {
                            icon: <Star className="w-6 h-6" />,
                            bg: "bg-orange-200",
                            color: "text-orange-600",
                          },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className={`aspect-square ${item.bg} rounded-lg flex items-center justify-center ${item.color} hover:scale-105 transition-transform cursor-pointer`}
                          >
                            {item.icon}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm text-gray-600">
                          Latest: &ldquo;{post.content.slice(0, 50)}...&rdquo;
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" /> {post.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="w-3 h-3 mr-1" />{" "}
                            {post.comments}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Twitter/Facebook-style layout
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-700">
                          &ldquo;{post.content}&rdquo;
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs text-gray-500">
                            {getTimeAgo(post.postedAt)}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Heart className="w-3 h-3 mr-1" /> {post.likes}
                            </span>
                            <span className="flex items-center">
                              <MessageCircle className="w-3 h-3 mr-1" />{" "}
                              {post.comments}
                            </span>
                            <span className="flex items-center">
                              <Share2 className="w-3 h-3 mr-1" /> {post.shares}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <a
                    href={post.postUrl || "#"}
                    className="text-purple-600 font-medium hover:underline inline-block mt-4"
                  >
                    {platformInfo.linkText}
                  </a>
                </div>
              );
            })
          )}
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              className={`${social.bg} text-white p-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
