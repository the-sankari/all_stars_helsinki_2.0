export default function SponsorsSection() {
  const sponsors = [
    {
      icon: "🏢",
      name: "Helsinki Sports",
      role: "Equipment Partner",
      description: "Providing quality sports equipment for our team",
    },
    {
      icon: "⚽",
      name: "Nordic Football",
      role: "Official Supplier",
      description: "Football gear and training materials",
    },
    {
      icon: "🍕",
      name: "Pizza Palace",
      role: "Team Meals",
      description: "Fueling our team with delicious meals",
    },
    {
      icon: "🚗",
      name: "City Transport",
      role: "Travel Partner",
      description: "Safe and reliable team transportation",
    },
  ];

  return (
    <section className="bg-white py-16 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 mb-4 uppercase">
            Our Proud Sponsors
          </h2>
          <p className="text-gray-600">
            Thank you to our amazing sponsors who make our journey possible
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-all duration-300 text-center group cursor-pointer"
              title={sponsor.description}
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {sponsor.icon}
              </div>
              <div className="font-bold text-gray-700">{sponsor.name}</div>
              <div className="text-sm text-gray-500">{sponsor.role}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Interested in sponsoring our team?
          </p>
          <a
            href="/sponsors"
            className="inline-block border-2 border-purple-600 text-purple-600 font-bold py-2 px-6 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  );
}
