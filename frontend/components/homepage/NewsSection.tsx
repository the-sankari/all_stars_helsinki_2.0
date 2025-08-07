"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import { fetchLatestNews } from "../../lib/features/newsSlice";
import type { RootState } from "../../lib/store";

export default function NewsSection() {
  const dispatch = useAppDispatch();
  const { latestNews, loading, error } = useAppSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(fetchLatestNews(3)); // Fetch latest 3 news articles
  }, [dispatch]);

  // Helper function to get category color based on news category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "match-preview":
        return "bg-yellow-400 text-purple-800";
      case "team-news":
        return "bg-blue-500 text-white";
      case "player-spotlight":
        return "bg-green-500 text-white";
      default:
        return "bg-purple-600 text-white";
    }
  };

  // Format news data for display
  const displayNews = latestNews.map((article) => ({
    category: article.category
      .replace("-", " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    categoryColor: getCategoryColor(article.category),
    title: article.title,
    content: article.excerpt,
    date: new Date(article.publishDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }));

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-purple-600 mb-4 uppercase">
            Latest News
          </h2>
          <p className="text-gray-600 text-lg">
            Stay updated with our recent activities and upcoming events
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-20 mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-600 bg-red-100 px-4 py-2 rounded-lg inline-block">
              Error loading news: {error}
            </p>
          </div>
        ) : latestNews.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 bg-gray-100 px-4 py-2 rounded-lg inline-block">
              No news articles available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {displayNews.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div
                  className={`${item.categoryColor} text-xs font-bold px-3 py-1 rounded-full inline-block mb-4 uppercase`}
                >
                  {item.category}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.content}</p>
                <div className="text-sm text-gray-500">{item.date}</div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="/news"
            className="inline-block border-2 border-purple-600 text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300"
          >
            View All News
          </a>
        </div>
      </div>
    </section>
  );
}
