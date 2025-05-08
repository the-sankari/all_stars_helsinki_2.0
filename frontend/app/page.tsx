import Image from "next/image";

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative bg-primary text-light font-heading min-h-[70vh] flex items-center justify-center hero-image"
        style={{
          backgroundImage: "url(/img/hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 z-0" />
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 pt-24 pb-12">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex flex-col items-center">
              <Image
                src="/img/logo.png"
                alt="All Stars Helsinki"
                width={300}
                height={300}
                className="w-[300px] h-[300px]"
              />
            </div>
          </div>
          {/* Next Match Card */}
          <div className="absolute right-4 left-auto -bottom-16 md:right-24 md:-bottom-12 bg-[#16335B] text-light rounded-xl shadow-lg px-8 py-6 w-[320px] max-w-full text-left border-4 border-[#16335B]">
            <div className="font-bold text-md mb-2 tracking-wide uppercase">
              Next Match
            </div>
            <div className="text-2xl font-bold mb-1 leading-tight">
              Finn-Bangla
              <br />
              Tournament
            </div>
            <div className="text-base mt-2">
              August 15, 2025 &bull; 10:00 AM
            </div>
          </div>
        </div>
      </section>

      {/* WELCOME SECTION */}
      <section className="bg-light py-20 font-body">
        <div className="max-w-2xl mx-auto px-4 text-left">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4 uppercase leading-tight">
            Welcome to
            <br />
            All Stars Helsinki
          </h2>
          <p className="text-lg text-dark mb-8">
            All Stars Helsinki is an amateur football team driven by passion,
            teamwork, and the love of the game.
          </p>
          <a
            href="/join"
            className="inline-block border-2 border-yellow-400 text-primary font-bold py-3 px-10 rounded-full hover:bg-yellow-400 hover:text-dark transition text-lg shadow-sm tracking-wide"
          >
            JOIN US
          </a>
        </div>
      </section>
    </>
  );
}
