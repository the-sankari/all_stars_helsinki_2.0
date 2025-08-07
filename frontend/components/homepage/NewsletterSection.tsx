"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      // Here you would normally send the email to your backend
      console.log("Newsletter subscription:", email);
    }
  };

  return (
    <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 uppercase">
            Stay in the Loop
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Get the latest updates on matches, training sessions, and team news
            delivered straight to your inbox.
          </p>

          {subscribed ? (
            <div className="max-w-md mx-auto">
              <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
                ✅ Thank you for subscribing! Check your inbox for confirmation.
              </div>
              <button
                onClick={() => setSubscribed(false)}
                className="text-purple-200 hover:text-white text-sm underline"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-yellow-400 outline-none text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-purple-200 text-sm mt-4">
                📧 Weekly updates • 🎁 Exclusive content • 🔒 No spam, ever
              </p>
            </form>
          )}

          <div className="grid grid-cols-3 gap-4 mt-8 max-w-sm mx-auto text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-400">500+</div>
              <div className="text-xs text-purple-200">Subscribers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">Weekly</div>
              <div className="text-xs text-purple-200">Updates</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">0</div>
              <div className="text-xs text-purple-200">Spam</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
