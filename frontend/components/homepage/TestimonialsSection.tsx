"use client";

import { useAppSelector } from "../../lib/hooks";
import type { RootState } from "../../lib/store";

export default function TestimonialsSection() {
  const { featuredTestimonials, loading, error } = useAppSelector(
    (state: RootState) => state.testimonials
  ) as any;

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Helper function to get avatar background color
  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-purple-600",
      "bg-yellow-400",
      "bg-green-500",
      "bg-blue-500",
      "bg-red-500",
      "bg-pink-500",
    ];
    return colors[index % colors.length];
  };

  // Helper function to get avatar text color
  const getAvatarTextColor = (index: number) => {
    const textColors = [
      "text-white",
      "text-purple-800",
      "text-white",
      "text-white",
      "text-white",
      "text-white",
    ];
    return textColors[index % textColors.length];
  };

  // Use only real data from Redux store
  const displayTestimonials = featuredTestimonials || [];

  // Generate dynamic stats based on testimonials data
  const generateStats = () => {
    if (featuredTestimonials.length > 0) {
      const avgRating =
        featuredTestimonials.reduce(
          (sum: number, t: any) => sum + t.rating,
          0
        ) / featuredTestimonials.length;
      return [
        {
          number: avgRating.toFixed(1),
          label: "Average Rating",
          extra: "⭐".repeat(Math.floor(avgRating)),
        },
        { number: "150+", label: "Happy Players" },
        { number: "95%", label: "Would Recommend" },
        {
          number: `${featuredTestimonials.length}+`,
          label: "Featured Reviews",
        },
      ];
    }

    // Fallback stats
    return [
      { number: "4.9", label: "Average Rating", extra: "⭐⭐⭐⭐⭐" },
      { number: "150+", label: "Happy Players" },
      { number: "95%", label: "Would Recommend" },
      { number: "200+", label: "Community Members" },
    ];
  };

  const stats = generateStats();

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-purple-600 mb-4 uppercase">
            What People Say
          </h2>
          <p className="text-gray-600 text-lg">
            Hear from our players, fans, and community members
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="animate-pulse">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                      <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-20 mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-3 text-center py-12">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Unable to Load Testimonials
              </h3>
              <p className="text-gray-600 mb-4">
                We're having trouble loading testimonials right now.
              </p>
              <p className="text-sm text-red-600">Error: {error}</p>
            </div>
          ) : displayTestimonials.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Featured Testimonials Yet
              </h3>
              <p className="text-gray-600">
                Be the first to share your experience with All Stars Helsinki!
              </p>
            </div>
          ) : (
            displayTestimonials.map((testimonial: any, index: number) => (
              <div
                key={testimonial.id || index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 ${getAvatarColor(
                      index
                    )} rounded-full flex items-center justify-center ${getAvatarTextColor(
                      index
                    )} font-bold text-xl mr-4`}
                  >
                    {getInitials(testimonial.name)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="text-yellow-400 mb-3">
                  {"⭐".repeat(testimonial.rating)}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))
          )}
        </div>

        {/* Testimonial Stats */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                {stat.extra && (
                  <div className="text-yellow-400 text-sm">{stat.extra}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
