"use client";

import { useAppSelector } from "../../lib/hooks";
import type { RootState } from "../../lib/store";
import {
  Building2,
  Zap,
  Utensils,
  Car,
  Heart,
  Star,
  Globe,
  ExternalLink,
  Crown,
  Medal,
  Trophy,
} from "lucide-react";

// Types for sponsor data
interface Sponsor {
  id: string;
  name: string;
  sponsorshipLevel: string;
  sponsorshipType: string;
  description?: string;
  website?: string;
}

interface SponsorsState {
  sponsors: Sponsor[];
  loading: boolean;
  error: string | null;
}

export default function SponsorsSection() {
  const { sponsors, loading, error } = useAppSelector(
    (state: RootState) => state.sponsors
  ) as SponsorsState;

  // Helper function to get icon based on sponsorship type or name
  const getSponsorIcon = (sponsor: Sponsor) => {
    const type = sponsor.sponsorshipType?.toLowerCase() || "";
    const name = sponsor.name?.toLowerCase() || "";

    if (
      type.includes("equipment") ||
      name.includes("sports") ||
      name.includes("gear")
    ) {
      return <Building2 className="w-8 h-8" />;
    } else if (
      type.includes("nutrition") ||
      name.includes("nutrition") ||
      name.includes("food")
    ) {
      return <Utensils className="w-8 h-8" />;
    } else if (
      type.includes("transport") ||
      name.includes("transport") ||
      name.includes("car")
    ) {
      return <Car className="w-8 h-8" />;
    } else if (type.includes("services")) {
      return <Zap className="w-8 h-8" />;
    } else {
      return <Building2 className="w-8 h-8" />;
    }
  };

  // Helper function to get sponsorship level icon and color
  const getSponsorshipLevelInfo = (level: string) => {
    switch (level?.toLowerCase()) {
      case "gold":
        return {
          icon: <Crown className="w-4 h-4" />,
          color: "text-yellow-500",
          bgColor: "bg-yellow-50 border-yellow-200",
        };
      case "silver":
        return {
          icon: <Medal className="w-4 h-4" />,
          color: "text-gray-500",
          bgColor: "bg-gray-50 border-gray-200",
        };
      case "bronze":
        return {
          icon: <Trophy className="w-4 h-4" />,
          color: "text-orange-600",
          bgColor: "bg-orange-50 border-orange-200",
        };
      default:
        return {
          icon: <Star className="w-4 h-4" />,
          color: "text-purple-500",
          bgColor: "bg-purple-50 border-purple-200",
        };
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Sponsors
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Proud partners supporting our journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-lg p-6 text-center animate-pulse"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Sponsors
            </h2>
            <p className="text-red-600 mb-4">
              Unable to load sponsors at this time. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Sponsors
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Proud partners supporting our journey to excellence
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sponsors.map((sponsor: Sponsor, index: number) => {
            const levelInfo = getSponsorshipLevelInfo(sponsor.sponsorshipLevel);

            return (
              <div
                key={sponsor.id || index}
                className={`bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 border-2 ${levelInfo.bgColor}`}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className={`text-gray-600 ${levelInfo.color}`}>
                    {getSponsorIcon(sponsor)}
                  </div>
                  <div className={`ml-2 ${levelInfo.color} flex items-center`}>
                    {levelInfo.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {sponsor.name}
                </h3>
                <p
                  className={`text-sm font-semibold mb-2 capitalize ${levelInfo.color}`}
                >
                  {sponsor.sponsorshipLevel} Sponsor
                </p>
                <p className="text-gray-600 mb-4 text-sm">
                  {sponsor.sponsorshipType}
                </p>
                {sponsor.description && (
                  <p className="text-gray-500 text-sm mb-4">
                    {sponsor.description}
                  </p>
                )}
                {sponsor.website && (
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center text-sm font-medium hover:underline ${levelInfo.color}`}
                  >
                    <Globe className="w-4 h-4 mr-1" />
                    Visit Website
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {sponsors.length === 0 && (
          <div className="text-center py-8">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              We&apos;re always looking for amazing partners to join our
              journey!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
