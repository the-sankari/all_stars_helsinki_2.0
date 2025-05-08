import { Mail, MapPin, Phone } from "lucide-react"; // Optional: Install lucide-react

export default function Contact() {
  return (
    <section className="bg-[var(--color-primary)] text-[var(--color-white)] font-body py-16 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold text-[var(--color-yellow)] tracking-wide mb-2">
            CONTACT US
          </h1>
        </div>

        {/* Main Grid: Form + Info */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Form */}
          <div>
            <h2 className="text-[var(--color-yellow)] text-2xl font-bold mb-6 tracking-wide">
              GET IN TOUCH
            </h2>
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-transparent border border-[var(--color-white)] py-3 px-4 rounded placeholder-[var(--color-white)]"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border border-[var(--color-white)] py-3 px-4 rounded placeholder-[var(--color-white)]"
              />
              <textarea
                placeholder="Message"
                rows={5}
                className="w-full bg-transparent border border-[var(--color-white)] py-3 px-4 rounded placeholder-[var(--color-white)]"
              />
              <button
                type="submit"
                className="bg-[var(--color-yellow)] text-[var(--color-primary)] w-full py-3 font-bold rounded hover:bg-[var(--color-yellow-hover)] transition"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="space-y-6 text-lg">
            <div className="flex items-start gap-3">
              <MapPin className="text-[var(--color-yellow)]" />
              <span>
                Example Street 1.
                <br />
                Helsinki, Finland
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="text-[var(--color-yellow)]" />
              <span>info@allstarshelsinki.com</span>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-[var(--color-yellow)]" />
              <span>+123 456 7890</span>
            </div>
          </div>
        </div>

        {/* Strategies & Stats */}
        <div className="border-t border-[var(--color-white)] pt-12">
          <h2 className="text-[var(--color-yellow)] text-2xl font-bold mb-4 tracking-wide">
            STRATEGIES & STATISTICS
          </h2>
          <p className="text-[var(--color-white)] text-lg max-w-2xl">
            Stay up to date with our playing strategies, match analytics, and
            performance insights.
          </p>
        </div>
      </div>
    </section>
  );
}
