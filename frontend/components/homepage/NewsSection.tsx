export default function NewsSection() {
  const newsItems = [
    {
      category: "Match Result",
      categoryColor: "bg-yellow-400 text-purple-800",
      title: "Victory Against Helsinki United",
      content:
        "Our team secured a fantastic 3-1 victory in last weekend's match, showcasing excellent teamwork and strategy.",
      date: "August 1, 2025",
    },
    {
      category: "Training",
      categoryColor: "bg-purple-600 text-white",
      title: "New Training Schedule Released",
      content:
        "Check out our updated training schedule for August. We've added extra sessions to prepare for the upcoming tournament.",
      date: "July 28, 2025",
    },
    {
      category: "New Player",
      categoryColor: "bg-green-500 text-white",
      title: "Welcome New Team Members",
      content:
        "We're excited to welcome 3 new talented players to our squad. Get to know them in our player profiles section.",
      date: "July 25, 2025",
    },
  ];

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
        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
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
