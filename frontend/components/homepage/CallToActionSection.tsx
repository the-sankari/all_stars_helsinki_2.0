export default function CallToActionSection() {
  return (
    <section className="bg-yellow-400 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-purple-800 mb-6 uppercase">
          Ready to Join the Action?
        </h2>
        <p className="text-xl text-purple-700 mb-8 max-w-2xl mx-auto">
          Whether you&apos;re an experienced player or just starting your
          football journey, there&apos;s a place for you in All Stars Helsinki.
          Come be part of our football family!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/join"
            className="inline-block bg-purple-600 text-white font-bold py-4 px-10 rounded-full hover:bg-purple-700 transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            JOIN THE TEAM
          </a>
          <a
            href="/contact"
            className="inline-block border-2 border-purple-600 text-purple-600 font-bold py-4 px-10 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 text-lg"
          >
            GET IN TOUCH
          </a>
        </div>
        <div className="mt-8 text-purple-600">
          <p className="text-sm">
            📧 info@allstarshelsinki.fi &bull; 📞 +358 40 123 4567
          </p>
        </div>
      </div>
    </section>
  );
}
