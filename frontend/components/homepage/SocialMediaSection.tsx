export default function SocialMediaSection() {
  const socialLinks = [
    { icon: "📷", bg: "bg-purple-600 hover:bg-purple-700", label: "Instagram" },
    { icon: "𝕏", bg: "bg-black hover:bg-gray-800", label: "X (Twitter)" },
    { icon: "📘", bg: "bg-blue-600 hover:bg-blue-700", label: "Facebook" },
    { icon: "📺", bg: "bg-red-600 hover:bg-red-700", label: "YouTube" },
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
          {/* Instagram Feed Mock */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                📷
              </div>
              <div>
                <h3 className="font-bold text-gray-800">@AllStarsHelsinki</h3>
                <p className="text-sm text-gray-500">Instagram</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="aspect-square bg-purple-200 rounded-lg flex items-center justify-center text-purple-600 text-2xl">
                ⚽
              </div>
              <div className="aspect-square bg-yellow-200 rounded-lg flex items-center justify-center text-yellow-600 text-2xl">
                🏆
              </div>
              <div className="aspect-square bg-green-200 rounded-lg flex items-center justify-center text-green-600 text-2xl">
                👥
              </div>
              <div className="aspect-square bg-blue-200 rounded-lg flex items-center justify-center text-blue-600 text-2xl">
                🎯
              </div>
              <div className="aspect-square bg-red-200 rounded-lg flex items-center justify-center text-red-600 text-2xl">
                💪
              </div>
              <div className="aspect-square bg-orange-200 rounded-lg flex items-center justify-center text-orange-600 text-2xl">
                🌟
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Latest: "Victory celebrations after our amazing win! 🎉"
            </p>
            <a href="#" className="text-purple-600 font-medium hover:underline">
              View on Instagram →
            </a>
          </div>

          {/* Twitter/X Feed Mock */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold mr-3">
                𝕏
              </div>
              <div>
                <h3 className="font-bold text-gray-800">@AllStarsHKI</h3>
                <p className="text-sm text-gray-500">X (Twitter)</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  "🔥 What a performance today! Our team spirit was unmatched.
                  Thank you to all the fans who came out to support us!
                  #AllStarsHelsinki #FootballFamily"
                </p>
                <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  "Training session highlight: Amazing teamwork in today's
                  practice! Ready for the big tournament 💪 #TrainingDay"
                </p>
                <p className="text-xs text-gray-500 mt-2">1 day ago</p>
              </div>
            </div>
            <a
              href="#"
              className="text-purple-600 font-medium hover:underline inline-block mt-4"
            >
              Follow us on X →
            </a>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href="#"
              className={`${social.bg} text-white p-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
              aria-label={social.label}
            >
              <span className="text-xl">{social.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
