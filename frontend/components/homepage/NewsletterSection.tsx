"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import { apiService } from "../../lib/api";
import {
  Mail,
  Check,
  Send,
  Gift,
  Shield,
  Clock,
  Users,
  Calendar,
  Loader2,
} from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get newsletter stats from mock data
  const getNewsletterStats = () => {
    // In a real app, this would come from Redux store
    // For now, using realistic numbers based on our mock data
    const today = new Date();
    const currentMonth = today.toLocaleDateString("en-US", { month: "long" });

    return {
      subscribers: "542", // More realistic number
      frequency: "Weekly",
      spam: "0",
      openRate: "78%",
      lastUpdate: `${currentMonth} ${today.getDate()}`,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.subscribeNewsletter(email);
      if (response.success) {
        setSubscribed(true);
        setEmail("");
      } else {
        setError("Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error("Newsletter subscription error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          <div className="flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-yellow-400 mr-3" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white uppercase">
              Stay in the Loop
            </h2>
          </div>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Get the latest updates on matches, training sessions, and team news
            delivered straight to your inbox.
          </p>

          {subscribed ? (
            <div className="max-w-md mx-auto">
              <div className="bg-green-500 text-white p-4 rounded-lg mb-4 flex items-center">
                <Check className="w-5 h-5 mr-2" />
                Thank you for subscribing! Check your inbox for confirmation.
              </div>
              <button
                onClick={() => setSubscribed(false)}
                className="text-purple-200 hover:text-white text-sm underline flex items-center justify-center mx-auto"
              >
                <Mail className="w-4 h-4 mr-1" />
                Subscribe another email
              </button>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              {error && (
                <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null); // Clear error when user starts typing
                    }}
                    placeholder="Enter your email address"
                    required
                    disabled={loading}
                    className="flex-1 px-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-yellow-400 outline-none text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Subscribe
                      </>
                    )}
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-center text-purple-200 text-sm mt-4 space-x-4">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Weekly updates
                </span>
                <span className="flex items-center">
                  <Gift className="w-4 h-4 mr-1" />
                  Exclusive content
                </span>
                <span className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  No spam, ever
                </span>
              </div>
              <p className="text-purple-300 text-xs mt-2">
                Last newsletter: {getNewsletterStats().lastUpdate}
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mt-8 max-w-sm mx-auto text-center">
            <div className="flex flex-col items-center">
              <Users className="w-5 h-5 text-yellow-400 mb-1" />
              <div className="text-2xl font-bold text-yellow-400">
                {getNewsletterStats().subscribers}
              </div>
              <div className="text-xs text-purple-200">Subscribers</div>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-5 h-5 text-yellow-400 mb-1" />
              <div className="text-2xl font-bold text-yellow-400">
                {getNewsletterStats().frequency}
              </div>
              <div className="text-xs text-purple-200">Updates</div>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-5 h-5 text-yellow-400 mb-1" />
              <div className="text-2xl font-bold text-yellow-400">
                {getNewsletterStats().spam}
              </div>
              <div className="text-xs text-purple-200">Spam</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
