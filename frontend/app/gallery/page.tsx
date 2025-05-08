import Image from "next/image";

export default function Gallery() {
  // Using placeholder images from picsum.photos
  const images = [
    "https://picsum.photos/500/300?random=1",
    "https://picsum.photos/500/300?random=2",
    "https://picsum.photos/500/300?random=3",
    "https://picsum.photos/500/300?random=4",
    "https://picsum.photos/500/300?random=5",
    "https://picsum.photos/500/300?random=6",
    "https://picsum.photos/500/300?random=7",
  ];

  return (
    <section className="bg-[#0A2342] text-white font-body py-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-7xl md:text-8xl font-extrabold text-yellow-400 mb-4">
            Gallery
          </h1>
          <p className="italic text-2xl text-white">
            Through our lens, the spirit of a team.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[0, 1, 2, 3].map((col) => (
            <div className="grid gap-4" key={col}>
              {[0, 1, 2].map((row) => {
                const idx = col * 3 + row;
                const src = images[idx % images.length];
                return (
                  <div key={row}>
                    <Image
                      className="h-auto max-w-full rounded-lg"
                      src={src}
                      alt={`Gallery ${idx + 1}`}
                      width={500}
                      height={300}
                      unoptimized
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer Quote */}
        <div className="text-center mt-12 italic text-2xl text-white">
          It starts with a dream. Let&apos;s make it a reality.
        </div>
      </div>
    </section>
  );
}
