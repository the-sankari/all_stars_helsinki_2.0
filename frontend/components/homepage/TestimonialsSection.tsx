export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Korhonen",
      role: "Team Captain",
      avatar: "A",
      avatarBg: "bg-purple-600",
      rating: 5,
      content:
        "Being part of All Stars Helsinki has been incredible. The team spirit and dedication here is unlike anywhere else. We're not just teammates, we're family.",
    },
    {
      name: "Sarah Virtanen",
      role: "Team Supporter",
      avatar: "S",
      avatarBg: "bg-yellow-400",
      avatarText: "text-purple-800",
      rating: 5,
      content:
        "As a long-time supporter, I've watched this team grow and achieve amazing things. Their commitment to the community and sportsmanship is inspiring.",
    },
    {
      name: "Jari Mäkinen",
      role: "New Member",
      avatar: "J",
      avatarBg: "bg-green-500",
      rating: 5,
      content:
        "Joined last month and already feel at home. The coaching is excellent and everyone is so welcoming. Best decision I've made this year!",
    },
  ];

  const stats = [
    { number: "4.9", label: "Average Rating", extra: "⭐⭐⭐⭐⭐" },
    { number: "150+", label: "Happy Players" },
    { number: "95%", label: "Would Recommend" },
    { number: "200+", label: "Community Members" },
  ];

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
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div
                  className={`w-12 h-12 ${
                    testimonial.avatarBg
                  } rounded-full flex items-center justify-center ${
                    testimonial.avatarText || "text-white"
                  } font-bold text-xl mr-4`}
                >
                  {testimonial.avatar}
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
          ))}
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
